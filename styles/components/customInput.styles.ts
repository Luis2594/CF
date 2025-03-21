import { StyleSheet } from 'react-native';

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
    fontWeight: '700'
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
    justifyContent: "center",
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
  inputDisabled: {
    backgroundColor: "#E5E5E5",
  },
  inputDisabledText: {
    color: "#D0D0D1",
  },
  eyeIcon: {
    padding: 10,
  },
  errorText: {
    marginTop: 5,
    color: "#E33C3C",
    fontSize: 12,
    fontFamily: "Quicksand",
    fontWeight: '400'
  },
});