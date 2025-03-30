import { StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

export const getStyles = (color: string, size: number) => StyleSheet.create({
  avatar: {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: color || colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: colors.common.white,
    fontSize: 34,
    fontFamily: 'Quicksand',
    fontWeight: '600',
  },
});