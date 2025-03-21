import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 50,
    marginBottom: 22,
    backgroundColor: "#F04E23",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontFamily: "Quicksand_600SemiBold",
    fontWeight: '600'
  },
  buttonDisabled: {
    backgroundColor: "#D9D9D9",
  },
  buttonDisabledOutline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#D0D0D1",
  },
  buttonTextDisabled: {
    color: "#717275",
  },
});
