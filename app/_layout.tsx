import { useCallback, useEffect, useState } from "react";
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
import EventBus from "@/utils/eventBus";
import { User } from "firebase/auth";

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
  const [userAuth, setUserAuth] = useState<User | null>(null);
  const [navigationEnableAuth, setNavigationEnableAuth] = useState(false);
  const [finishLottie, setFinishLottie] = useState(false);

  const onLayoutRootView = useCallback(async () => {
    if ((fontsLoaded || fontError) && isLanguageLoaded) {
      window.frameworkReady?.();
    }
  }, [fontsLoaded, fontError, isLanguageLoaded]);

  useEffect(() => {
    if ((fontsLoaded || fontError) && isLanguageLoaded) {
      onLayoutRootView();
    }
  }, [fontsLoaded, fontError, isLanguageLoaded, onLayoutRootView]);

  useEffect(() => {
    if (finishLottie && navigationEnableAuth) {
      handleNavigation();
    }
  }, [finishLottie, navigationEnableAuth, userAuth]);

  useEffect(() => {
    // Check initial auth state
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUserAuth(user);
      setNavigationEnableAuth(true);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const finishAnimationListener = (data: any) => {
      setFinishLottie(true);
      handleNavigation();
    };

    // Escuchar evento
    EventBus.on("finishAnimation", finishAnimationListener);
    // Keep splash screen visible while we check auth state
    SplashScreen.preventAutoHideAsync();
    // Cleanup al desmontar
    return () => {
      EventBus.off("finishAnimation", finishAnimationListener);
    };
  }, []);

  const handleNavigation = async () => {
    try {
      if (userAuth) {
        SplashScreen.hideAsync();
        // userAuth is signed in, get their claims
        const idTokenResult = await userAuth.getIdTokenResult();

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
          router.replace("/language");
        }
      }
    } catch (error) {
      console.error("Error checking auth state:", error);
      router.replace("/login");
    }
  };

  return (
    <LanguageProvider>
      <>
        <Stack screenOptions={{ headerShown: false, gestureEnabled: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </>
    </LanguageProvider>
  );
}
