import { StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

export const getStyles = (color: string, size: number) => StyleSheet.create({
  dividerH: {
    width: "100%",
    height: size,
    backgroundColor: color || colors.gray[100],
  },
  dividerV: {
    height: "100%",
    width: size,
    backgroundColor: color || colors.gray[100],
  },
});