import { useCallback, useEffect, useState } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
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
    // Cleanup al desmontar
    return () => {
      EventBus.off("finishAnimation", finishAnimationListener);
    };
  }, []);

  const handleNavigation = async () => {
    try {
      console.log("userAuth: ", userAuth);
      const savedCredentials = await AsyncStorage.getItem(
        STORAGE_KEYS.LAST_LOGIN_CREDENTIALS
      );

      if (userAuth && savedCredentials) {
        // userAuth is signed in, get their claims
        const idTokenResult = await userAuth.getIdTokenResult();
        console.log("idTokenResult: ", idTokenResult);
        // Navigate based on terms acceptance
        if (idTokenResult.claims.acceptedTerms) {
          console.log("GO TO tabs");
          router.replace("/(tabs)");
        } else {
          console.log("GO TO terms-acceptance");
          router.replace("/terms-acceptance");
        }
      } else {
        if (finishLottie) {
          if (savedCredentials) {
            console.log("GO TO login");
            router.replace("/login");
          } else {
            console.log("GO TO language");
            router.replace("/language");
          }
        }
      }
    } catch (error) {
      console.log("Error checking auth state:", error);
      router.replace("/login");
    }
  };

  return (
    <LanguageProvider>
      <Stack screenOptions={{ headerShown: false, gestureEnabled: false }} />
      <StatusBar style="auto" />
    </LanguageProvider>
  );
}
