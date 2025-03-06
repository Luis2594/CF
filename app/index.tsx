import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useLanguage } from '../context/LanguageContext';
import { ANIMATIONS, SVG } from '../constants/assets';

export default function SplashScreen() {
  const { translations } = useLanguage();
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    // Start the animation
    if (animationRef.current) {
      animationRef.current.play();
    }

    // Navigate to language selection after 2 seconds
    const timer = setTimeout(() => {
      router.replace('/language');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {/* <LottieView
          ref={animationRef}
          source={ANIMATIONS.LOGO}
          style={styles.logo}
          autoPlay
          loop={false}
        />
        <Text style={styles.appName}>{translations.appName}</Text> */}
        <SVG.LOGO width={300} height={90} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
  },
  appName: {
    marginTop: 20,
    fontSize: 32,
    fontFamily: 'Quicksand_700Bold',
    color: '#666666',
  },
});