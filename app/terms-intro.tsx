import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { router } from "expo-router";
import { useLanguage } from "../context/LanguageContext";
import { useOnboarding } from "../context/OnboardingContext";
import { IMAGES } from "../constants/assets";
import { styles } from "@/styles/terms-intro.styles";
import BackButton from "@/components/BackButton";
import Button from "@/components/Button";

export default function TermsIntroScreen() {
  const { translations } = useLanguage();
  const { setOnboardingComplete } = useOnboarding();

  const handleBack = () => {
    router.back();
  };

  const handleContinue = async () => {
    // Mark onboarding as complete
    await setOnboardingComplete();
    router.replace("/login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapContainer}>
        {/* Back button */}
        <BackButton text={translations.back} onPress={handleBack} />

        {/* Main content container */}
        <View style={styles.contentContainer}>
          {/* Illustration */}
          <Image
            source={IMAGES.TERMS_ILLUSTRATION}
            style={styles.illustration}
          />
          <View style={{ flex: 1, marginHorizontal: 22 }}>
            {/* Progress dots */}
            <View style={styles.progressDots}>
              <View style={styles.dot} />
              <View style={styles.containerDotActive}>
                <View style={[styles.dot, styles.activeDot]} />
              </View>
            </View>
            <View style={styles.wrapContentText}>
              {/* Terms title */}
              <Text style={styles.title}>{translations.termsTitle}</Text>

              {/* Description text */}
              <Text style={styles.description}>
                {translations.termsDescription}
              </Text>
            </View>
            <Button text={translations.next} onPress={handleContinue} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
