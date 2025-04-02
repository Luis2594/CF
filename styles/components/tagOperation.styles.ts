import { StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

export const styles = StyleSheet.create({
  shadowWrapper: {
    width: '100%',
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  container: {
    marginTop: -10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.common.white,
    borderBottomRightRadius: 20,
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