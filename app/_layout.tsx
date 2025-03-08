import { useEffect, useState, useCallback } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { 
  useFonts, 
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold 
} from '@expo-google-fonts/quicksand';
import { LanguageProvider, useLanguage } from '../context/LanguageContext';
import { TermsProvider } from '../context/TermsContext';
import { OnboardingProvider } from '../context/OnboardingContext';
import { View } from 'react-native';
import { auth } from '../config/firebase';
import { router, Slot } from 'expo-router';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}

function RootLayoutNav() {
  const { isLanguageLoaded } = useLanguage();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [initialRoute, setInitialRoute] = useState<string | null>(null);
  const [fontsLoaded, fontError] = useFonts({
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
  });

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in
        const idTokenResult = await user.getIdTokenResult();
        setInitialRoute(idTokenResult.claims.acceptedTerms ? '/(tabs)' : '/terms-acceptance');
      } else {
        // No user is signed in, start with language selection
        setInitialRoute('/language');
      }
      setIsAuthChecked(true);
    });

    return () => unsubscribe();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if ((fontsLoaded || fontError) && isLanguageLoaded && isAuthChecked && initialRoute) {
      await SplashScreen.hideAsync();
      window.frameworkReady?.();
      
      // Navigate only after everything is ready
      if (initialRoute) {
        router.replace(initialRoute);
      }
    }
  }, [fontsLoaded, fontError, isLanguageLoaded, isAuthChecked, initialRoute]);

  useEffect(() => {
    if ((fontsLoaded || fontError) && isLanguageLoaded && isAuthChecked && initialRoute) {
      onLayoutRootView();
    }
  }, [fontsLoaded, fontError, isLanguageLoaded, isAuthChecked, initialRoute, onLayoutRootView]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  if (!isLanguageLoaded || !isAuthChecked || !initialRoute) {
    return <View />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="language" />
      <Stack.Screen name="welcome" />
      <Stack.Screen name="terms-intro" />
      <Stack.Screen name="login" />
      <Stack.Screen name="terms" />
      <Stack.Screen name="terms-acceptance" />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function RootLayout() {
  useFrameworkReady();
  return (
    <LanguageProvider>
      <TermsProvider>
        <OnboardingProvider>
          <RootLayoutNav />
          <StatusBar style="auto" />
        </OnboardingProvider>
      </TermsProvider>
    </LanguageProvider>
  );
}