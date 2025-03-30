import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  clientList: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom: 22
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Quicksand_700Bold',
    color: '#F04E23',
  },
  centerContainer: {
    flex: 1,
    marginHorizontal: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flex: 1,
    marginHorizontal: 22,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Quicksand_500Medium',
  },
});