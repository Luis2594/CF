import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { auth } from '../config/firebase';
import { router } from 'expo-router';

// Keep splash screen visible while we check auth state
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();

  useEffect(() => {
    // Check initial auth state
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      try {
        if (user) {
          // User is signed in, get their claims
          const idTokenResult = await user.getIdTokenResult();
          
          // Navigate based on terms acceptance
          if (idTokenResult.claims.acceptedTerms) {
            router.replace('/(tabs)');
          } else {
            router.replace('/terms-acceptance');
          }
        } else {
          // User is signed out
          router.replace('/login');
        }
      } catch (error) {
        console.error('Error checking auth state:', error);
        router.replace('/login');
      } finally {
        // Hide splash screen
        await SplashScreen.hideAsync();
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}