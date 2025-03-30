import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    margin: 22,
  },
  wrappGreeting: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 8,
  },
  greeting: {
    fontSize: 22,
    fontFamily: 'Quicksand_600SemiBold',
    color: "#F04E23",
    marginLeft: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Quicksand_600SemiBold',
    color: "#717275",
  },
  textShowFilter: {
    fontSize: 22,
    fontFamily: 'Quicksand',
    fontWeight: '700',
    color: "#F04E23",
    textAlign: 'center',
    marginVertical: 22
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 4,
  },
  searchInputContainer: {
    flex: 1,
  },
  buttonLocation: {
    backgroundColor: '#F04E23',
    borderWidth: 0
  },
  buttonClose: {
    borderWidth: 0,
    padding: 0,
    width: 24,
    height: 24,
    borderRadius: 0,
  }
});