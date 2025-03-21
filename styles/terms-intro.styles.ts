import { StatusBar, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F6",
    paddingTop: StatusBar.currentHeight, // FIX status bar in android
  },
  wrapContainer: {
    flex: 1,
    margin: 22,
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
  },
});
