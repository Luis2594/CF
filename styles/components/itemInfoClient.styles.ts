import { StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

export const styles = StyleSheet.create({
  infoContainer: {
    padding: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.gray[100],
    shadowColor: colors.common.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomColor: colors.gray[100],
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: 'Quicksand',
    fontWeight: '400',
    color: colors.gray[500],
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    fontFamily: 'Quicksand',
    fontWeight: '700',
    color: colors.gray[500],
    flex: 2,
    textAlign: 'right',
  },
});