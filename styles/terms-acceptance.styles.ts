import { StatusBar, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F6",
    paddingTop: StatusBar.currentHeight, // FIX status bar in android,
  },
  wrappMargin: {
    flex: 1,
    marginHorizontal: 22,
    marginTop: 10
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
  content: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#F5F5F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontFamily: "Quicksand_700Bold",
    color: "#717275",
    marginVertical: 20,
    textAlign: "center",
  },
  termsContainer: {
    flex: 1,
    borderRadius: 20,
  },
  termsText: {
    fontSize: 14,
    fontFamily: "Quicksand_400Regular",
    color: "#717275",
    marginBottom: 16,
    lineHeight: 24,
    marginHorizontal: 10,
  },
  errorContainer: {
    backgroundColor: "rgba(255, 59, 48, 0.1)",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 3,
    borderLeftColor: "#FF3B30",
  },
  errorText: {
    marginTop: 5,
    color: "#E33C3C",
    fontSize: 12,
    fontFamily: "Quicksand",
    fontWeight: '400'
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 22
  },
  checkedBox: {
    borderRadius: 4,
    borderWidth: 1,
    marginRight: 8,
    height: 16,
    width: 16,
    borderColor: '#F34A2D',
    backgroundColor: "#F34A2D",
    alignItems: "center",
    justifyContent: "center",
  },
  uncheckedBox: {
    backgroundColor: "transparent",
    borderColor: '#D1D5DB',
  },
  checkboxText: {
    fontSize: 14,
    fontFamily: "Quicksand_700Bold",
    color: "#717275",
  },
  continueButton: {
    backgroundColor: "#F04E23",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    height: 48,
  },
  disabledButton: {
    backgroundColor: "#CCCCCC",
  },
  continueButtonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Quicksand_600SemiBold",
  },
});
