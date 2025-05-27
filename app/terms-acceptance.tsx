import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { useLanguage } from "../context/LanguageContext";
import { useTerms } from "../context/TermsContext";
import { auth, functions } from "../config/firebase";
import { httpsCallable } from "firebase/functions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "@/constants/storage";
import { SVG } from "@/constants/assets";
import { styles } from "@/styles/terms-acceptance.styles";
import { signOut } from "firebase/auth";
import Button from "@/components/molecules/buttons/Button";
import AlertErrorMessage from "@/components/molecules/alerts/AlertErrorMessage";
import BackButton from "@/components/molecules/buttons/BackButton";
import { getLoginErrorMessage } from "@/constants/loginErrors";
import TextError from "@/components/atoms/TextError";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TermsAcceptanceScreen() {
  const { translations, language } = useLanguage();
  const { setTermsAccepted } = useTerms();
  const [isChecked, setIsChecked] = useState(false);
  const [errorAcceptTerms, setErrorAcceptTerms] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const insets = useSafeAreaInsets();

  const handleBack = () => {
    signOut(auth)
      .then(() => {
        router.replace("/login");
      })
      .catch((error) => {
        console.error("Logout error:", error);
        Alert.alert(
          "Error",
          language === "es"
            ? "Error al cerrar sesión. Por favor intente de nuevo."
            : "Error logging out. Please try again.",
          [{ text: "OK" }]
        );
      });
  };

  const handleToggleCheckbox = () => {
    setIsChecked(!isChecked);
    if (errorAcceptTerms) setErrorAcceptTerms(null);
    if (error) setError(null);
  };

  const handleContinue = async () => {
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

      const response = await acceptTermsFn({
        userId,
        deviceId: savedCredentialsJSON?.deviceId,
        acceptedOn: new Date().toISOString(),
        language,
        token: savedCredentialsJSON?.token,
      });

      if (response.data.data.success) {
        // Save terms acceptance status locally
        await setTermsAccepted(true);
        // Navigate to home screen
        router.replace("/home");
      } else {
        let errorCode =
          response?.data?.data?.code || response?.data?.data?.details?.code;
        if (errorCode) {
          setError(getLoginErrorMessage(errorCode, language || "es"));
        } else {
          setError(response?.data?.data?.message);
        }
      }
    } catch (error) {
      console.error("Error accepting terms:", error);
      setError(translations.acceptTermsNextError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AlertErrorMessage error={error} onClose={() => setError(null)} />
      <View style={styles.wrappMargin}>
        {/* Back button - only show if we can go back */}
        <BackButton onPress={handleBack} />

        <View style={styles.content}>
          <Text style={styles.title}>{translations.termsTitle}</Text>

          <ScrollView style={styles.termsContainer}>
            <Text style={styles.termsText}>{translations.terms}</Text>
          </ScrollView>
        </View>

        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={handleToggleCheckbox}
          activeOpacity={0.7}
        >
          {isChecked ? (
            <View style={styles.checkedBox}>
              <SVG.CHECK width={10} height={10} />
            </View>
          ) : (
            <View style={[styles.checkedBox, styles.uncheckedBox]} />
          )}
          <Text style={styles.checkboxText}>
            {translations.acceptTermsCheckbox}
          </Text>
        </TouchableOpacity>

        {/* Error message */}
        {errorAcceptTerms && <TextError error={errorAcceptTerms} />}

        <Button
          text={translations.next}
          disabled={!isChecked}
          variant={"default"}
          isLoading={isLoading}
          customStyleContainer={{
            marginTop: 22,
            marginBottom: insets.bottom + 12,
          }}
          onPressDisable={() => {
            if (!isChecked) {
              setErrorAcceptTerms(translations.acceptTermsError);
              return;
            }
          }}
          onPress={handleContinue}
        />
      </View>
    </SafeAreaView>
  );
}
