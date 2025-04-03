import { StatusBar, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F6',
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
    paddingHorizontal: 22,
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
    width: '100%',
    marginTop: 37,
    marginBottom: 22,
    borderRadius: 60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 4,
  },
  containerInfoTabs: {
    width: '100%',
    backgroundColor: "white",
    borderRadius: 60,
    overflow: "hidden",
    marginTop: -15,
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
    marginHorizontal: 22
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Quicksand_500Medium',
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    marginTop: 20,
    marginHorizontal: 22
  },
});