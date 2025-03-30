import { StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

export const styles = StyleSheet.create({
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: colors.gray[100],
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  backText: {
    fontSize: 12,
    fontFamily: "Quicksand",
    fontWeight: '700',
    color: colors.gray[500],
    marginLeft: 4,
  },
});