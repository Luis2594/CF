import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { router } from "expo-router";
import { ChevronLeft, Check, Square } from "lucide-react-native";
import { useLanguage } from "../context/LanguageContext";
import { useTerms } from "../context/TermsContext";
import { auth, functions } from "../config/firebase";
import { httpsCallable } from "firebase/functions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "@/constants/storage";

export default function TermsAcceptanceScreen() {
  const { translations, language } = useLanguage();
  const { setTermsAccepted } = useTerms();
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const canGoBack = router.canGoBack();

  const handleBack = () => {
    router.back();
  };

  const handleToggleCheckbox = () => {
    setIsChecked(!isChecked);
    if (error) setError(null);
  };

  const handleContinue = async () => {
    if (!isChecked) {
      setError(translations.acceptTermsError);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Get current user
      const user = auth.currentUser;
      if (!user) {
        throw new Error("No authenticated user");
      }

      // Get ID token result to get user claims
      const idTokenResult = await user.getIdTokenResult();
      const userId = idTokenResult.claims.userId;

      if (!userId) {
        throw new Error("No user ID in claims");
      }

      const savedCredentials = await AsyncStorage.getItem(
        STORAGE_KEYS.LAST_LOGIN_CREDENTIALS
      );

      const savedCredentialsJSON = savedCredentials
        ? JSON.parse(savedCredentials)
        : null;

      // Call the acceptTerms function
      const acceptTermsFn = httpsCallable(functions, "acceptTerms");

      await acceptTermsFn({
        userId,
        deviceId: savedCredentialsJSON?.deviceId,
        acceptedOn: new Date().toISOString(),
        language,
        token: savedCredentialsJSON?.token,
      });

      // Save terms acceptance status locally
      await setTermsAccepted(true);

      // Navigate to home screen
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Error accepting terms:", error);
      setError(translations.acceptTermsNextError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back button - only show if we can go back */}
      {canGoBack && (
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ChevronLeft size={24} color="#666" />
          <Text style={styles.backText}>{translations.back}</Text>
        </TouchableOpacity>
      )}

      <View style={styles.content}>
        <Text style={styles.title}>{translations.termsTitle}</Text>

        <ScrollView style={styles.termsContainer}>
          <Text style={styles.termsText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae, sed
            imperdiet vel commodo a, vel volutpat porttitor commodo. Platea
            lectus ultricies nibh eu feugiat. Sagittis convallis neque, molestie
            pellentesque ipsum, sit. Nullam dis neque etiam phasellus.
          </Text>

          <Text style={styles.termsText}>
            Tincidunt sapien, eu nulla habitant duis. Quam eu, elementum
            eleifend gravida orci, integer molestie maecenas.
          </Text>

          <Text style={styles.termsText}>
            Erat elementum lobortis sapien vel vestibulum elit cursus mi. In
            pretium morbi integer adipiscing iaculis commodo pellentesque
            cursus. Quisque cursus nulla aenean est nec rhoncus lorem vitae,
            laoreet.
          </Text>

          <Text style={styles.termsText}>
            Nullam tristique sagittis vulputate dolor, ipsum ultrices lectus ut.
            Scelerisque libero at sed dolor. Ut arcu ipsum vel vitae magna vel
            enim faucibus mattis. Nam urna mauris, vitae egestas tortor volutpat
            tristique. Lobortis lacus dictumst eget egestas amet vivamus orci
            phasellus nunc.
          </Text>

          <Text style={styles.termsText}>
            Sed enim id lectus risus phasellus volutpat. Aliquam nisi sagittis
            sit ligula. Turpis leo, maecenas sed nisi. Malesuada euismod dolor
            posuere tincidunt laoreet lorem quam nulla porta. Etiam dui quam
            purus enim lectus.
          </Text>

          <Text style={styles.termsText}>
            Sed odio sollicitudin volutpat nibh. Viverra cras morbi blandit
            phasellus a quis vel id.
          </Text>
        </ScrollView>
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={handleToggleCheckbox}
        activeOpacity={0.7}
      >
        {isChecked ? (
          <View style={styles.checkedBox}>
            <Check size={20} color="#FFFFFF" />
          </View>
        ) : (
          <View style={styles.uncheckedBox}>
            <Square size={20} color="#D1D5DB" />
          </View>
        )}
        <Text style={styles.checkboxText}>
          {translations.acceptTermsCheckbox}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.continueButton, !isChecked && styles.disabledButton]}
        onPress={handleContinue}
        disabled={!isChecked || isLoading}
        activeOpacity={isChecked ? 0.7 : 1}
      >
        <Text style={styles.continueButtonText}>
          {isLoading ? translations.processing : translations.next}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F6",
    paddingTop: StatusBar.currentHeight, // FIX status bar in android,
    margin: 22,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#E6E6E7",
    borderRadius: 12,
    paddingVertical: 8, // No lo puedo ver en FIGMA, es calculado
    paddingHorizontal: 12, // No lo puedo ver en FIGMA, es calculado
    marginBottom: 20, // No lo puedo ver en FIGMA, es calculado
  },
  backText: {
    fontSize: 12,
    fontFamily: "Quicksand_700Bold",
    color: "#717275",
    marginLeft: 4,
  },
  content: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#F5F5F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontFamily: "Quicksand_700Bold",
    color: "#717275",
    marginVertical: 20,
    textAlign: "center",
  },
  termsContainer: {
    flex: 1,
    borderRadius: 20,
    marginBottom: 20,
  },
  termsText: {
    fontSize: 14,
    fontFamily: "Quicksand_400Regular",
    color: "#717275",
    marginBottom: 16,
    lineHeight: 24,
    marginHorizontal: 10,
  },
  errorContainer: {
    backgroundColor: "rgba(255, 59, 48, 0.1)",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 3,
    borderLeftColor: "#FF3B30",
  },
  errorText: {
    color: "#FF3B30",
    fontFamily: "Quicksand_500Medium",
    fontSize: 14,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  uncheckedBox: {
    borderRadius: 4,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  checkedBox: {
    borderRadius: 4,
    backgroundColor: "#F34A2D",
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxText: {
    fontSize: 14,
    fontFamily: "Quicksand_700Bold",
    color: "#717275",
  },
  continueButton: {
    backgroundColor: "#F04E23",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    height: 48,
  },
  disabledButton: {
    backgroundColor: "#CCCCCC",
  },
  continueButtonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Quicksand_600SemiBold",
  },
});
