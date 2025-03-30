import { StatusBar, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
    paddingTop: StatusBar.currentHeight,
  },
  wrapContainer: {
    flex: 1,
    margin: 22,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: colors.common.white,
    borderRadius: 24,
  },
  illustration: {
    width: "100%",
    height: "65%",
    resizeMode: "stretch",
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
  },
  progressDots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    marginBottom: 10,
  },
  containerDotActive: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary.light,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.gray[200],
  },
  activeDot: {
    backgroundColor: colors.primary.dark,
  },
  wrapContentText: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontFamily: 'Quicksand',
    fontWeight: '700',
    color: colors.primary.main,
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    fontFamily: 'Quicksand',
    fontWeight: '400',
    color: colors.gray[500],
    textAlign: "center",
    marginBottom: 20,
  },
});