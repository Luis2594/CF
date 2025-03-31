import { StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';
import { StatusBar } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: colors.common.white,
  },
  containerPadding: {
    flex: 1,
    margin: 22,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    width: 28,
    height: 28,
    borderRadius: 10,
    backgroundColor: colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    fontSize: 22,
    fontFamily: "Quicksand",
    fontWeight: '700',
    color: colors.primary.main,
    textAlign: 'center',
    marginRight: 28
  },
  radioContainer: {
    marginTop: 22
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  radio: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.gray[300],
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
  radioCircleSelected: {
    borderColor: colors.primary.main,
    backgroundColor: colors.primary.main,
  },
  radioInnerCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.background.default,
  },
  radioTitle: {
    fontSize: 14,
    fontFamily: "Quicksand",
    fontWeight: '700',
    color: colors.text.primary,
  },
  radioSubtitle: {
    fontSize: 12,
    fontFamily: "Quicksand",
    fontWeight: '400',
    color: colors.text.primary,
  },
  customRadioContent: {
    flex: 1,
  },
  sliderContainer: {
    marginTop: 12,
    marginBottom: 8,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  radiusInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: -8,
  },
  customInputContainer: {
    width: 120,
    marginBottom: 0,
  },
  map: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.gray[300],
    marginTop: 16,
  },
});