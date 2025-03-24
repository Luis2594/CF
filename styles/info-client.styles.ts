import { StatusBar, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F6',
    paddingTop: StatusBar.currentHeight, // FIX status bar in android
  },
  backButton: {
    width: 28,
    height: 28,
    borderRadius: 10,
    backgroundColor: '#E6E6E7',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 22,
    marginVertical: 22
  },
  containerInfo: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    paddingHorizontal: 22
  },
  avatar: {
    marginBottom: 12,
    marginTop: -58
  },
  name: {
    fontSize: 22,
    fontFamily: 'Quicksand_600SemiBold',
    color: '#717275',
    marginBottom: 8,
    textAlign: 'center',
  },
  portfolioType: {
    fontSize: 16,
    fontFamily: 'Quicksand_400Regular',
    fontWeight: '400',
    color: '#F04E23',
  },
  portfolioValue: {
    color: '#F04E23',
    fontFamily: 'Quicksand_700Bold',
    fontWeight: '700',
  },
  shadowWrapper: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 4,
    width: '100%',
    marginVertical: 22,
  },
  containerInfoTabs: {
    backgroundColor: "white",
    borderRadius: 60,
    overflow: "hidden",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  content: {
    flex: 1,
    width: '100%',
  },
  operationsContainer: {
    borderWidth: 1,
    borderColor: '#E6E6E7',
    borderRadius: 20,
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Quicksand_500Medium',
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'Quicksand_500Medium',
    color: '#FF3B30',
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    marginTop: 20,
  },
});