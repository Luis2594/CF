import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  BackHandler,
} from "react-native";
import { router } from "expo-router";
import { useLanguage, Language } from "../context/LanguageContext";
import { useOnboarding } from "../context/OnboardingContext";
import { SVG } from "../constants/assets";
import Dropdown from "@/components/Dropdown";
import { styles } from "@/styles/languaje.styles";
import AlertErrorMessage from "@/components/AlertErrorMessage";
import Button from "@/components/Button";

export default function LanguageSelection() {
  const { translations, language, setLanguage } = useLanguage();
  const { hasCompletedOnboarding, setOnboardingComplete } = useOnboarding();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLanguage();
  }, []);

  // Check if onboarding is completed on mount
  useEffect(() => {
    setLanguage();
    if (hasCompletedOnboarding) {
      router.replace("/login");
    }
  }, [hasCompletedOnboarding]);

  // LISTENER
  useEffect(() => {
    const backHandlerListener = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        BackHandler.exitApp();
        return true;
      }
    );

    return () => {
      backHandlerListener.remove();
    };
  }, []);

  const handleLanguageSelect = (item: { value: string; label: string }) => {
    setLanguage(item.value as Language);
    setError(null);
  };

  const handleContinue = async () => {
    if (language) {
      // Navigate after a short delay to ensure translations are applied
      setTimeout(() => {
        router.push("/welcome");
      }, 100);
    } else {
      setError(translations.languajeError);
    }
  };

  // If onboarding is completed, don't render this screen
  if (hasCompletedOnboarding) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <AlertErrorMessage error={error} onClose={() => setError(null)} />
      <View style={styles.contentContainer}>
        <View style={styles.wrapForm}>
          <View style={styles.logoContainer}>
            <SVG.LOGO width={300} height={90} />
          </View>

          <Dropdown
            label={translations.languageSelection}
            items={translations.languages.map((lang) => ({
              value: lang.code,
              label: lang.name,
            }))}
            selectedValue={language || ""}
            onSelect={handleLanguageSelect}
            placeholder={translations.languagePlaceHolder}
          />

          <Button
            text={translations.continue}
            disabled={!language}
            variant="outline"
            customStyleContainer={{ marginTop: 20 }}
            onPressDisable={() => setError(translations.languajeError)}
            onPress={handleContinue}
          />
        </View>

        <View style={styles.radarWavesContainer}>
          <SVG.RADAR_WAVES width="100%" height="100%" />
        </View>
      </View>
    </SafeAreaView>
  );
}
