import { StatusBar, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: StatusBar.currentHeight, // FIX status bar in android
  },
  keyboardAvoid: {
    flex: 1,
    marginTop: 22,
    marginHorizontal: 22,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: "#f5f5f6",
  },
  scrollContent: {
    flex: 1,
    padding: 24,
  },
  logoContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  welcomeText: {
    fontSize: 28,
    fontFamily: "Quicksand_700Bold",
    color: "#717275",
    textAlign: "center",
    marginBottom: 10,
  },
  form: {
    width: "100%",
  },
  faceIdContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  recoverText: {
    fontFamily: "Quicksand_400Regular",
    fontSize: 16,
    color: "#F04E23",
    marginBottom: 10,
  },
  biometricText: {
    fontFamily: "Quicksand_500Medium",
    fontSize: 16,
    color: "#717275",
    marginRight: 8,
  },
  radarWavesContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "21%",
    overflow: "hidden",
  },
});
