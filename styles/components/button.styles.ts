import { StyleSheet } from "react-native";
import { colors } from '@/constants/colors';

export const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 50,
    marginBottom: 22,
    backgroundColor: colors.primary.main,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    color: colors.common.white,
    fontFamily: "Quicksand",
    fontWeight: '600'
  },
  buttonDisabled: {
    backgroundColor: colors.gray[200],
  },
  buttonDisabledOutline: {
    backgroundColor: colors.common.transparent,
    borderWidth: 1,
    borderColor: colors.gray[300],
  },
  buttonTextDisabled: {
    color: colors.gray[500],
  },
});