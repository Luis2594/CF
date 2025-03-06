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
import { View } from 'react-native';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}

function RootLayoutNav() {
  const { isLanguageLoaded } = useLanguage();
  const [fontsLoaded, fontError] = useFonts({
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if ((fontsLoaded || fontError) && isLanguageLoaded) {
      await SplashScreen.hideAsync();
      window.frameworkReady?.();
    }
  }, [fontsLoaded, fontError, isLanguageLoaded]);

  useEffect(() => {
    if ((fontsLoaded || fontError) && isLanguageLoaded) {
      onLayoutRootView();
    }
  }, [fontsLoaded, fontError, isLanguageLoaded, onLayoutRootView]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  if (!isLanguageLoaded) {
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
  return (
    <LanguageProvider>
      <TermsProvider>
        <RootLayoutNav />
        <StatusBar style="auto" />
      </TermsProvider>
    </LanguageProvider>
  );
}