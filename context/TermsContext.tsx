import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define context type
type TermsContextType = {
  hasAcceptedTerms: boolean;
  setTermsAccepted: (accepted: boolean) => Promise<void>;
  isTermsLoaded: boolean;
};

// Create the context with default values
const TermsContext = createContext<TermsContextType>({
  hasAcceptedTerms: false,
  setTermsAccepted: async () => {},
  isTermsLoaded: false,
});

// Storage key
const TERMS_ACCEPTED_KEY = 'terms_accepted';

// Provider component
export const TermsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState<boolean>(false);
  const [isTermsLoaded, setIsTermsLoaded] = useState<boolean>(false);

  // Load saved terms acceptance status on mount
  useEffect(() => {
    const loadTermsStatus = async () => {
      try {
        const savedStatus = await AsyncStorage.getItem(TERMS_ACCEPTED_KEY);
        setHasAcceptedTerms(savedStatus === 'true');
        setIsTermsLoaded(true);
      } catch (error) {
        console.error('Failed to load terms acceptance status:', error);
        setIsTermsLoaded(true); // Even on error, mark as loaded with default (false)
      }
    };

    loadTermsStatus();
  }, []);

  // Function to set terms acceptance status
  const setTermsAccepted = async (accepted: boolean) => {
    try {
      await AsyncStorage.setItem(TERMS_ACCEPTED_KEY, accepted.toString());
      setHasAcceptedTerms(accepted);
    } catch (error) {
      console.error('Failed to save terms acceptance status:', error);
    }
  };

  return (
    <TermsContext.Provider value={{ hasAcceptedTerms, setTermsAccepted, isTermsLoaded }}>
      {children}
    </TermsContext.Provider>
  );
};

// Custom hook for using the terms context
export const useTerms = () => useContext(TermsContext);