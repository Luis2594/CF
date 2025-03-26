import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  errorIcon: {
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Quicksand',
    fontWeight: '600',
    color: '#18784A',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorTitle: {
    color: '#FF3B30',
  },
  message: {
    fontSize: 14,
    fontFamily: 'Quicksand',
    fontWeight: '400',
    color: '#717275',
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#F04E23',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Quicksand_600SemiBold',
  },
});