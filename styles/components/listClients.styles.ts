import { StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

export const styles = StyleSheet.create({
  clientList: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.common.white,
    paddingBottom: 22
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Quicksand',
    fontWeight: '700',
    color: colors.primary.main,
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
    fontFamily: 'Quicksand',
    fontWeight: '500',
  },
});