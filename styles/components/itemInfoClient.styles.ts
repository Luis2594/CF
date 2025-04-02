import { StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

export const styles = StyleSheet.create({
  shadowWrapper: {
    width: '100%',
    marginVertical: 15,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 3,
  },
  infoContainer: {
    marginTop: -15,
    padding: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border.main,
    overflow: "hidden",
    backgroundColor: colors.common.white
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