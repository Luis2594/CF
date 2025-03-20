import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  BackHandler,
} from "react-native";
import { router } from "expo-router";
import { useLanguage, Language } from "../context/LanguageContext";
import { useOnboarding } from "../context/OnboardingContext";
import { SVG } from "../constants/assets";
import Dropdown from "@/components/Dropdown";

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
      {error && (
        <View style={styles.errorContainer}>
          <TouchableOpacity onPress={() => setError(null)}>
            <SVG.CLOSE width={20} height={20} />
          </TouchableOpacity>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      <View style={styles.contentContainer}>
        <View style={styles.wrapForm}>
          <View style={styles.logoContainer}>
            <SVG.LOGO width={300} height={90} />
          </View>

          <Dropdown
            label={translations.languageSelection}
            items={translations.languages.map(lang => ({
              value: lang.code,
              label: lang.name
            }))}
            selectedValue={language || ''}
            onSelect={handleLanguageSelect}
            placeholder={translations.languagePlaceHolder}
          />

          <TouchableOpacity
            style={[styles.button, !language && styles.buttonDisable]}
            onPress={handleContinue}
          >
            <Text
              style={[styles.buttonText, !language && styles.buttonTextDisable]}
            >
              {translations.continue}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.radarWavesContainer}>
          <SVG.RADAR_WAVES width="100%" height="100%" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: StatusBar.currentHeight, // FIX status bar in android
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#F5F5F6",
    borderRadius: 24,
    margin: 22,
  },
  wrapForm: {
    marginTop: 196,
    marginHorizontal: 13,
  },
  logoContainer: {
    marginBottom: 20,
  },
  button: {
    height: 48,
    borderRadius: 50,
    backgroundColor: "#F04E23",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  buttonDisable: {
    backgroundColor: "#F5F5F6",
    borderWidth: 1,
    borderColor: "#D0D0D1",
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Quicksand_600SemiBold",
    color: "white",
  },
  buttonTextDisable: {
    color: "#717275",
  },
  radarWavesContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "21%",
    overflow: "hidden",
    borderBottomEndRadius: 24,
    borderBottomStartRadius: 24,
  },
  errorContainer: {
    backgroundColor: "rgba(255, 59, 48, 0.1)",
    padding: 12,
    borderRadius: 6,
    marginBottom: 16,
    flexDirection: "row",
    alignContent: "center",
  },
  errorText: {
    color: "#FF3B30",
    fontFamily: "Quicksand_500Medium",
    fontSize: 14,
    marginLeft: 12,
  },
});