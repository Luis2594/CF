import { StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

export const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.common.white,
    paddingBottom: 22,
    paddingTop: 7
  },
  sectionTitle: {
    fontFamily: 'Quicksand',
    fontWeight: '700',
    fontSize: 16,
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