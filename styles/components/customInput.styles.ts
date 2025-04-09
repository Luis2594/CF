import { StyleSheet } from "react-native";
import { colors } from '@/constants/colors';

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
    fontFamily: "Quicksand",
    color: colors.gray[500],
    fontWeight: "700",
    fontSize: 14,
  },
  asterisk: {
    color: colors.error.main,
  },
  inputContainer: {
    height: 44,
    borderWidth: 1,
    borderColor: colors.gray[100],
    borderRadius: 25,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.common.white,
  },
  input: {
    flex: 1,
    height: 44,
    fontFamily: "Quicksand",
    fontWeight: "500",
    fontSize: 14,
    color: colors.gray[500],
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
    // backgroundColor: colors.gray[50],
  },
  inputDisabledText: {
    // color: colors.gray[300],
  },
  eyeIcon: {
    padding: 10,
  },
  prefix: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.gray[500],
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