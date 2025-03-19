import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useLanguage } from "../context/LanguageContext";
import { useOnboarding } from "../context/OnboardingContext";
import { IMAGES } from "../constants/assets";

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
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ChevronLeft size={24} color="#717275" />
          <Text style={styles.backText}>{translations.back}</Text>
        </TouchableOpacity>

        {/* Main content container */}
        <View style={styles.contentContainer}>
          <View style={{ flex: 1 }}>
            {/* Illustration */}
            <Image
              source={IMAGES.TERMS_ILLUSTRATION}
              style={styles.illustration}
            />

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
          </View>

          {/* Continue button */}
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
          >
            <Text style={styles.continueButtonText}>{translations.next}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F6",
    paddingTop: StatusBar.currentHeight, // FIX status bar in android
  },
  wrapContainer: {
    flex: 1,
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
  contentContainer: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 24,
  },
  illustration: {
    width: "100%",
    height: "65%",
    resizeMode: "stretch",
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
  },
  progressDots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    marginBottom: 10,
  },
  containerDotActive: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FBC7AD",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#D9D9D9",
  },
  activeDot: {
    backgroundColor: "#F34A2D",
  },
  wrapContentText: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontFamily: "Quicksand_700Bold",
    color: "#F04E23",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    fontFamily: "Quicksand_400Regular",
    color: "#717275",
    textAlign: "center",
    marginBottom: 20,
    marginHorizontal: 22,
  },
  continueButton: {
    height: 48,
    marginHorizontal: 22,
    borderRadius: 50,
    marginBottom: 22,
    backgroundColor: "#F04E23",
    alignItems: "center",
    justifyContent: "center",
  },
  continueButtonText: {
    fontSize: 18,
    color: "white",
    fontFamily: "Quicksand_600SemiBold",
  },
});
