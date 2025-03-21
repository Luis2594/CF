import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
    justifyContent: 'center'
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  wrapText: {
    padding: 24
  },
  title: {
    fontSize: 20,
    fontFamily: "Quicksand_700Bold",
    color: "#717275",
    marginBottom: 8,
    textAlign: "center",
    fontWeight: "700"
  },
  description: {
    fontSize: 16,
    fontFamily: "Quicksand_400Regular",
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 8,
  },
  skipButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: "center",
  },
  skipButtonText: {
    color: "#00AEEF",
    fontSize: 16,
    fontFamily: "Quicksand_600SemiBold",
  },
  enableButton: {
    flex: 1,
    backgroundColor: "#F04E23",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },
  enableButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Quicksand_600SemiBold",
  },
});
