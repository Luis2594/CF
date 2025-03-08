import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/storage';

interface OnboardingContextType {
  hasCompletedOnboarding: boolean;
  setOnboardingComplete: () => Promise<void>;
  isLoading: boolean;
}

const OnboardingContext = createContext<OnboardingContextType>({
  hasCompletedOnboarding: false,
  setOnboardingComplete: async () => {},
  isLoading: true,
});

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const status = await AsyncStorage.getItem(STORAGE_KEYS.HAS_COMPLETED_ONBOARDING);
      setHasCompletedOnboarding(status === 'true');
    } catch (error) {
      console.error('Error checking onboarding status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setOnboardingComplete = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.HAS_COMPLETED_ONBOARDING, 'true');
      setHasCompletedOnboarding(true);
    } catch (error) {
      console.error('Error saving onboarding status:', error);
    }
  };

  return (
    <OnboardingContext.Provider
      value={{
        hasCompletedOnboarding,
        setOnboardingComplete,
        isLoading,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => useContext(OnboardingContext);