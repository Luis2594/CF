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
    fontSize: 18,
    color: "white",
    fontFamily: "Quicksand_600SemiBold",
  },
  buttonDisabled: {
    backgroundColor: "#D9D9D9", // Color gris del botón deshabilitado
  },
  buttonDisabledOutline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#D9D9D9",
  },
  buttonTextDisabled: {
    color: "#A0A0A0", // Color de texto cuando está deshabilitado
  },
});
