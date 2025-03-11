import { useCallback, useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useFrameworkReady } from "@/hooks/useFrameworkReady";
import { auth } from "../config/firebase";
import { router } from "expo-router";
import { LanguageProvider, useLanguage } from "../context/LanguageContext";
import {
  useFonts,
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from "@expo-google-fonts/quicksand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "@/constants/storage";

// Keep splash screen visible while we check auth state
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();
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

  useEffect(() => {
    // Check initial auth state
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      try {
        if (user) {
          // User is signed in, get their claims
          const idTokenResult = await user.getIdTokenResult();
          // Navigate based on terms acceptance
          if (idTokenResult.claims.acceptedTerms) {
            router.replace("/(tabs)");
          } else {
            router.replace("/terms-acceptance");
          }
        } else {
          const savedCredentials = await AsyncStorage.getItem(
            STORAGE_KEYS.LAST_LOGIN_CREDENTIALS
          );

          if (savedCredentials) {
            router.replace("/login");
          } else {
            const timer = setTimeout(() => {
              router.replace("/language");
            }, 7000);
          }

          return () => clearTimeout(timer);
        }
      } catch (error) {
        console.error("Error checking auth state:", error);
        router.replace("/login");
      } finally {
        // Hide splash screen
        await SplashScreen.hideAsync();
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  return (
    <LanguageProvider>
      <>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </>
    </LanguageProvider>
  );
}
