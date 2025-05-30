import { StatusBar, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
    paddingTop: StatusBar.currentHeight,
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
    backgroundColor: colors.gray[100],
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  backText: {
    fontSize: 12,
    fontFamily: 'Quicksand',
    fontWeight: '700',
    color: colors.gray[500],
    marginLeft: 4,
  },
  content: {
    flex: 1,
    backgroundColor: colors.common.white,
    borderRadius: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.gray[50],
    shadowColor: colors.common.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Quicksand',
    fontWeight: '700',
    color: colors.gray[500],
    marginVertical: 20,
    textAlign: "center",
  },
  termsContainer: {
    flex: 1,
    borderRadius: 20,
  },
  termsText: {
    fontSize: 14,
    fontFamily: 'Quicksand',
    fontWeight: '400',
    color: colors.gray[500],
    marginBottom: 16,
    lineHeight: 24,
    marginHorizontal: 10,
  },
  errorContainer: {
    backgroundColor: colors.error.background,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 3,
    borderLeftColor: colors.error.main,
  },
  errorText: {
    marginTop: 5,
    color: colors.error.main,
    fontSize: 12,
    fontFamily: 'Quicksand',
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
    borderColor: colors.primary.dark,
    backgroundColor: colors.primary.dark,
    alignItems: "center",
    justifyContent: "center",
  },
  uncheckedBox: {
    backgroundColor: colors.common.transparent,
    borderColor: colors.gray[300],
  },
  checkboxText: {
    fontSize: 14,
    fontFamily: 'Quicksand',
    fontWeight: '700',
    color: colors.gray[500],
  },
  continueButton: {
    backgroundColor: colors.primary.main,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    height: 48,
  },
  disabledButton: {
    backgroundColor: colors.gray[300],
  },
  continueButtonText: {
    color: colors.common.white,
    fontSize: 18,
    fontFamily: 'Quicksand',
    fontWeight: '600',
  },
});