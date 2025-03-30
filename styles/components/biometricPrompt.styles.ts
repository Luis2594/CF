import { StyleSheet } from "react-native";
import { colors } from '@/constants/colors';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.background.modal,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: colors.common.white,
    borderRadius: 20,
    width: "90%",
    maxWidth: 400,
    shadowColor: colors.common.black,
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
    backgroundColor: colors.gray[200],
    shadowColor: colors.common.black,
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
    fontFamily: "Quicksand",
    fontWeight: '700',
    color: colors.gray[500],
    marginBottom: 8,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    fontFamily: "Quicksand",
    fontWeight: '400',
    color: colors.text.secondary,
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
    color: colors.secondary.light,
    fontSize: 16,
    fontFamily: "Quicksand",
    fontWeight: '600',
  },
  enableButton: {
    flex: 1,
    backgroundColor: colors.primary.main,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },
  enableButtonText: {
    color: colors.common.white,
    fontSize: 16,
    fontFamily: "Quicksand",
    fontWeight: '600',
  },
});