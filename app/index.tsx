import { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { ANIMATIONS } from "../constants/assets";

export default function SplashScreen() {
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    // Start the animation
    if (animationRef.current) {
      animationRef.current.play();
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <LottieView
          ref={animationRef}
          source={ANIMATIONS.LOGO}
          style={styles.logo}
          autoPlay
          loop={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 300,
    height: 700,
  },
  appName: {
    marginTop: 20,
    fontSize: 32,
    fontFamily: "Quicksand_700Bold",
    color: "#666666",
  },
});
