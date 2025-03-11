import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { router } from "expo-router";
import { ChevronDown } from "lucide-react-native";
import { useLanguage, Language } from "../context/LanguageContext";
import { useOnboarding } from "../context/OnboardingContext";
import { SVG } from "../constants/assets";

export default function LanguageSelection() {
  const { translations, language, setLanguage } = useLanguage();
  const { hasCompletedOnboarding, setOnboardingComplete } = useOnboarding();
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    language || "es"
  );
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);

  // Check if onboarding is completed on mount
  useEffect(() => {
    if (hasCompletedOnboarding) {
      router.replace("/login");
    }
  }, [hasCompletedOnboarding]);

  // Update selected language when the app language changes
  useEffect(() => {
    if (language != selectedLanguage) {
      setLanguage(selectedLanguage);
    }
  }, [selectedLanguage]);

  const languages = [
    { code: "es", name: translations.languages.es },
    { code: "en", name: translations.languages.en },
  ];

  const handleLanguageSelect = (code: Language) => {
    setSelectedLanguage(code);
    setDropdownVisible(false);
  };

  const handleContinue = async () => {
    // Apply the language change immediately
    await setLanguage(selectedLanguage);

    // Force a re-render of this component
    setForceUpdate((prev) => prev + 1);

    // Navigate after a short delay to ensure translations are applied
    setTimeout(() => {
      router.push("/welcome");
    }, 100);
  };

  // This effect will trigger when forceUpdate changes
  useEffect(() => {
    // This is just to ensure the component re-renders after language change
  }, [forceUpdate, translations]);

  // If onboarding is completed, don't render this screen
  if (hasCompletedOnboarding) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
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
              <Text style={styles.dropdownText}>
                {languages.find((lang) => lang.code === selectedLanguage)
                  ?.name || translations.languages.es}
              </Text>
              <ChevronDown size={20} color="#666666" />
            </TouchableOpacity>

            {dropdownVisible && (
              <View style={styles.dropdownMenu}>
                {languages.map((language) => (
                  <TouchableOpacity
                    key={language.code}
                    style={[
                      styles.dropdownItem,
                      selectedLanguage === language.code && styles.selectedItem,
                    ]}
                    onPress={() =>
                      handleLanguageSelect(language.code as Language)
                    }
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        selectedLanguage === language.code &&
                          styles.selectedItemText,
                      ]}
                    >
                      {language.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>{translations.continue}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.radarWavesContainer}>
          <SVG.RADAR_WAVES width="100%" height={200} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    backgroundColor: "#F5F5F6",
    borderRadius: 24,
  },
  wrapForm: {
    width: "90%",
    marginBottom: 150,
  },
  logoContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#717275",
    marginBottom: 10,
    fontFamily: "Quicksand_700Bold",
  },
  dropdownContainer: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D0D0D1",
    marginBottom: 15,
    height: 44,
  },
  dropdown: {
    width: "100%",
    height: 44,
    borderRadius: 30,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdownText: {
    fontSize: 14,
    fontFamily: "Quicksand_500Medium",
    color: "#4F4E50",
  },
  dropdownMenu: {
    position: "absolute",
    top: 65,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1001,
  },
  dropdownItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  selectedItem: {
    backgroundColor: "rgba(243, 74, 45, 0.1)",
  },
  dropdownItemText: {
    fontSize: 16,
    fontFamily: "Quicksand_500Medium",
    color: "#4F4E50",
  },
  selectedItemText: {
    color: "#F34A2D",
    fontFamily: "Quicksand_700Bold",
  },
  button: {
    width: "100%",
    height: 48,
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: "#F04E23",
    borderColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Quicksand_600SemiBold",
    color: "white",
  },
  radarWavesContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 180,
    overflow: "hidden",
  },
});
