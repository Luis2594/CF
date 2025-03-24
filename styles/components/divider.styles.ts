import { StyleSheet } from 'react-native';

export const getStyles = (color: string, size: number) => StyleSheet.create({
  dividerH: {
    width: "100%",
    height: size,
    backgroundColor: color,
  },
  dividerV: {
    height: "100%",
    width: size,
    backgroundColor: color,
  },
});