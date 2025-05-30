import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { en } from "../localization/en";
import { es } from "../localization/es";
import * as Localization from "expo-localization";

// Define available languages
export type Language = "en" | "es";
export type Translations = typeof en;

const languageCodeDevice: Language = Localization.getLocales()[0]
  ?.languageCode as "en" | "es";

// Create context type
type LanguageContextType = {
  language?: Language;
  translations: Translations;
  setLanguage: (language?: Language) => Promise<void>;
  isLanguageLoaded: boolean;
};

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: "es",
  translations: es,
  setLanguage: async () => {},
  isLanguageLoaded: false,
});

// Storage key
const LANGUAGE_STORAGE_KEY = "app_language";

// Provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language | undefined>();
  const [translations, setTranslations] = useState<Translations>(
    languageCodeDevice === "es" ? es : en
  );
  const [isLanguageLoaded, setIsLanguageLoaded] = useState(false);

  // Load saved language on mount
  useEffect(() => {
    const loadSavedLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (savedLanguage === "en" || savedLanguage === "es") {
          await updateLanguage(savedLanguage as Language);
        } else {
          // If no language is saved, mark as loaded with default
          setIsLanguageLoaded(true);
        }
      } catch (error) {
        console.error("Failed to load language preference:", error);
        // Even on error, mark as loaded with default
        setIsLanguageLoaded(true);
      }
    };

    loadSavedLanguage();
  }, []);

  // Function to update language state and translations
  const updateLanguage = async (newLanguage: Language) => {
    setLanguageState(newLanguage);
    updateTranslation(newLanguage);
    setIsLanguageLoaded(true);
  };

  const updateTranslation = async (language: Language) => {
    setTranslations(language === "en" ? en : es);
  };

  // Function to set language
  const setLanguage = async (newLanguage?: Language) => {
    try {
      // Only allow English or Spanish
      if (newLanguage !== "en" && newLanguage !== "es") {
        await AsyncStorage.removeItem(LANGUAGE_STORAGE_KEY);
        setLanguageState(newLanguage);
        updateTranslation(languageCodeDevice);
      } else {
        // Save to storage
        await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage);
        // Update state
        await updateLanguage(newLanguage);
      }
    } catch (error) {
      console.error("Failed to save language preference:", error);
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        translations,
        setLanguage,
        isLanguageLoaded,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = () => useContext(LanguageContext);
