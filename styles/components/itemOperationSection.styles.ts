import { StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

export const styles = StyleSheet.create({
  operationSection: {
    borderRadius: 20,
  },
  operationHeader: {
    padding: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  operationTitle: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'Quicksand',
    fontWeight: '600',
    color: colors.text.primary,
    marginLeft: 12,
  },
  dividerH: {
    width: "100%",
    height: 2,
    backgroundColor: colors.gray[100]
  },
});