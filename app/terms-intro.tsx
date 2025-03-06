import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { useLanguage } from '../context/LanguageContext';
import { IMAGES } from '../constants/assets';

export default function TermsIntroScreen() {
  const { translations, language } = useLanguage();

  const handleBack = () => {
    router.back();
  };

  const handleContinue = () => {
    router.replace('/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <ChevronLeft size={24} color="#666" />
        <Text style={styles.backText}>
          {language === 'es' ? 'Regresar' : 'Back'}
        </Text>
      </TouchableOpacity>

      {/* Main content container */}
      <View style={styles.contentContainer}>
        {/* Illustration */}
        <Image
          source={IMAGES.TERMS_ILLUSTRATION}
          style={styles.illustration}
        />

        {/* Progress dots */}
        <View style={styles.progressDots}>
          <View style={styles.dot} />
          <View style={[styles.dot, styles.activeDot]} />
        </View>

        {/* Terms title */}
        <Text style={styles.title}>{translations.termsTitle}</Text>

        {/* Description text */}
        <Text style={styles.description}>{translations.termsDescription}</Text>

        {/* Continue button */}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>
            {language === 'es' ? 'Siguiente' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5f6',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBEBEB',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 30,
    alignSelf: 'flex-start',
    marginBottom: 20,
    marginLeft: 20,
  },
  backText: {
    fontSize: 12,
    fontFamily: 'Quicksand_700Bold',
    color: '#717275',
    marginLeft: 4,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    marginHorizontal: 20,
  },
  illustration: {
    width: '100%',
    height: 470,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  progressDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D9D9D9',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#F34A2D',
    width: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Quicksand_700Bold',
    color: '#F04E23',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    fontFamily: 'Quicksand_400Regular',
    color: '#717275',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 25,
    marginHorizontal: 20,
  },
  continueButton: {
    backgroundColor: '#F04E23',
    paddingVertical: 15,
    borderRadius: 30,
    marginHorizontal: 30,
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Quicksand_600SemiBold',
  },
});