import { StyleSheet } from 'react-native';

export const getStyles = (color: string, size: number) => StyleSheet.create({
  avatar: {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: color,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 34,
    fontWeight: '600',
    fontFamily: 'Quicksand_600SemiBold',
  },
});