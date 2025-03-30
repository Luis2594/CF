import { StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.common.white,
    borderBottomRightRadius: 20,
    shadowColor: colors.common.black,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 4,
  },
  indicator: {
    width: 5,
    height: "100%",
  },
  text: {
    marginVertical: 10,
    marginHorizontal: 12,
    color: colors.gray[500],
    fontSize: 14,
    fontFamily: "Quicksand",
    fontWeight: '600'
  },
});