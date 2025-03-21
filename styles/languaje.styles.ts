import { StatusBar, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: StatusBar.currentHeight, // FIX status bar in android
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#F5F5F6",
    borderRadius: 24,
    margin: 22,
  },
  wrapForm: {
    marginTop: 196,
    marginHorizontal: 13,
  },
  logoContainer: {
    marginBottom: 20,
  },
  radarWavesContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "21%",
    overflow: "hidden",
    borderBottomEndRadius: 24,
    borderBottomStartRadius: 24,
  },
});