import { StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.background.modal,
    justifyContent: 'center',
    alignItems: 'center',
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
  wrapBody: {
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconContainer: {
    marginBottom: 20,
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIcon: {
    backgroundColor: colors.success.background,
  },
  errorIcon: {
    backgroundColor: colors.error.background,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Quicksand',
    fontWeight: '600',
    color: colors.success.dark,
    marginBottom: 8,
    textAlign: 'center',
  },
  errorTitle: {
    color: colors.error.main,
  },
  message: {
    fontSize: 14,
    fontFamily: 'Quicksand',
    fontWeight: '400',
    color: colors.gray[500],
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: colors.primary.main,
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.common.white,
    fontSize: 16,
    fontFamily: 'Quicksand',
    fontWeight: '600',
  },
});