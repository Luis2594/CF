import { StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

export const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: colors.error.light,
    padding: 16,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  errorText: {
    color: colors.error.dark,
    fontFamily: "Quicksand",
    fontWeight: '700',
    fontSize: 14,
    marginHorizontal: 12,
  },
});