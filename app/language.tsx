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
import { ChevronDown, ChevronUp, Check } from "lucide-react-native";
import { useLanguage, Language } from "../context/LanguageContext";
import { useOnboarding } from "../context/OnboardingContext";
import { SVG } from "../constants/assets";

export default function LanguageSelection() {
  const { translations, language, setLanguage } = useLanguage();
  const { hasCompletedOnboarding, setOnboardingComplete } = useOnboarding();
  const [dropdownVisible, setDropdownVisible] = useState(false);
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

  const handleLanguageSelect = (code: Language) => {
    setLanguage(code);
    setDropdownVisible(false);
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

          <Text style={styles.label}>{translations.languageSelection}</Text>

          <View style={styles.dropdownContainer}>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setDropdownVisible(!dropdownVisible)}
            >
              <Text
                style={[
                  styles.dropdownText,
                  !language && styles.dropdownTextDisable,
                ]}
              >
                {translations.languages.find((lang) => lang.code === language)
                  ?.name || translations.languagePlaceHolder}
              </Text>
              {dropdownVisible ? (
                <ChevronUp size={20} color="#717275" />
              ) : (
                <ChevronDown size={20} color="#717275" />
              )}
            </TouchableOpacity>

            {dropdownVisible && (
              <View style={styles.dropdownMenu}>
                {translations.languages.map((lang) => (
                  <TouchableOpacity
                    key={lang.code}
                    style={styles.dropdownItem}
                    onPress={() => handleLanguageSelect(lang.code as Language)}
                  >
                    <Text style={styles.dropdownItemText}>{lang.name}</Text>

                    {language === lang.code && (
                      <Check size={20} color="#F04E23" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

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
    marginBottom: 20, // No lo puedo ver en FIGMA, es calculado
  },
  label: {
    fontSize: 14,
    color: "#717275",
    marginBottom: 10,
    fontFamily: "Quicksand_700Bold",
  },
  dropdownContainer: {
    height: 44,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#D0D0D1",
    borderRadius: 20,
    marginBottom: 25, // No lo puedo ver en FIGMA, es calculado
  },
  dropdown: {
    height: 44,
    paddingHorizontal: 12, // No lo puedo ver en FIGMA, es calculado
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdownText: {
    fontSize: 14,
    fontFamily: "Quicksand_500Medium",
    color: "#4F4E50",
  },
  dropdownTextDisable: {
    color: "#D0D0D1",
  },
  dropdownMenu: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginHorizontal: -1,
    position: "absolute",
    top: 43,
    left: 0,
    right: 0,
    shadowColor: "#000", // No lo puedo ver en FIGMA las propiedades de las sombras, lo hice calculado
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1001,
  },
  dropdownItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15, // No lo puedo ver en FIGMA, es calculado
  },
  dropdownItemText: {
    fontSize: 16,
    fontFamily: "Quicksand_500Medium",
    color: "#4F4E50",
  },
  button: {
    height: 48,
    borderRadius: 50,
    backgroundColor: "#F04E23",
    alignItems: "center",
    justifyContent: "center",
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
    height: "21%", // No lo puedo ver en FIGMA, es calculado
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
