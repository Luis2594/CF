import { StatusBar, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.common.white,
    paddingTop: StatusBar.currentHeight,
  },
  keyboardAvoid: {
    flex: 1,
    marginTop: 22,
    marginHorizontal: 22,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: colors.gray[50],
  },
  scrollContent: {
    flex: 1,
    padding: 24,
  },
  logoContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  welcomeText: {
    fontSize: 28,
    fontFamily: 'Quicksand',
    fontWeight: '700',
    color: colors.gray[500],
    textAlign: "center",
    marginBottom: 10,
  },
  form: {
    width: "100%",
  },
  faceIdContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  recoverText: {
    fontFamily: 'Quicksand',
    fontWeight: '400',
    fontSize: 16,
    color: colors.primary.main,
    marginBottom: 10,
  },
  biometricText: {
    fontFamily: 'Quicksand',
    fontWeight: '500',
    fontSize: 16,
    color: colors.gray[500],
    marginRight: 8,
  },
  radarWavesContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "21%",
    overflow: "hidden",
  },
});