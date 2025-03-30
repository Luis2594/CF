import { StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

export const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    color: colors.error.main,
    fontSize: 12,
    fontFamily: "Quicksand",
    fontWeight: '400'
  },
});