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
import { IMAGES } from "../constants/assets";
import { styles } from "@/styles/welcome.styles";
import BackButton from "@/components/molecules/buttons/BackButton";
import Button from "@/components/molecules/buttons/Button";

export default function WelcomeScreen() {
  const { translations } = useLanguage();

  const handleContinue = () => {
    router.push("/terms-intro");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapContainer}>
        {/* Back button */}
        <BackButton />

        {/* Main content container */}
        <View style={styles.contentContainer}>
          <Image
            source={IMAGES.WELCOME_ILLUSTRATION}
            style={styles.illustration}
          />
          {/* Illustration */}
          <View style={{ flex: 1, marginHorizontal: 22 }}>
            {/* Progress dots */}
            <View style={styles.progressDots}>
              <View style={styles.containerDotActive}>
                <View style={[styles.dot, styles.activeDot]} />
              </View>

              <View style={styles.dot} />
            </View>
            <View style={styles.wrapContentText}>
              {/* Welcome text */}
              <Text style={styles.title}>{translations.welcome}</Text>

              {/* Description text */}
              <Text style={styles.description}>
                {translations.welcomeDescription}
              </Text>
            </View>
            {/* Continue button */}
            <Button text={translations.next} onPress={handleContinue} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
