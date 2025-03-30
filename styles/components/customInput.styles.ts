import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    fontFamily: "Quicksand",
    color: "#717275",
    fontWeight: "700",
  },
  asterisk: {
    color: "red",
  },
  inputContainer: {
    height: 44,
    borderWidth: 1,
    borderColor: "#D0D0D1",
    borderRadius: 25,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    height: 44,
    fontFamily: "Quicksand_500Medium",
    fontSize: 14,
    color: "#717275",
  },
  searchInput: {
    marginLeft: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  inputWithPrefix: {
    marginLeft: 5,
  },
  inputDisabled: {
    backgroundColor: "#E5E5E5",
  },
  inputDisabledText: {
    color: "#D0D0D1",
  },
  eyeIcon: {
    padding: 10,
  },
  prefix: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#717275",
    marginRight: 5,
  },
  resizeHandle: {
    position: "absolute",
    right: 5,
    bottom: 5,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textarea: {
    textAlignVertical: "top",
    paddingVertical: 10,
  },
});