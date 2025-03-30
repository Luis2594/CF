import { StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

export const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.common.transparent,
  },
  activeTab: {
    borderBottomColor: colors.primary.main,
  },
  tabText: {
    fontSize: 16,
    fontFamily: 'Quicksand',
    fontWeight: '600',
    color: colors.gray[500]
  },
  activeTabText: {
    color: colors.primary.main,
  },
});