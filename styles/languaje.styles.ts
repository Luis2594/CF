import { StatusBar, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.common.white,
    paddingTop: StatusBar.currentHeight,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: colors.gray[50],
    borderRadius: 24,
    margin: 22,
  },
  wrapForm: {
    marginTop: 196,
    marginHorizontal: 13,
  },
  logoContainer: {
    marginBottom: 20,
  },
  radarWavesContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "21%",
    overflow: "hidden",
    borderBottomEndRadius: 24,
    borderBottomStartRadius: 24,
  },
});