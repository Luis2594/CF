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
  containerTextSlider: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    marginTop: -10
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.gray[300],
    marginTop: 16,
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: colors.common.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: colors.common.black,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bottomSheetContent: {
    padding: 20,
  },
  clientName: {
    fontSize: 18,
    fontFamily: "Quicksand",
    fontWeight: '700',
    color: colors.gray[500],
    marginBottom: 8,
  },
  clientDistance: {
    fontSize: 14,
    fontFamily: "Quicksand",
    fontWeight: '400',
    color: colors.primary.main,
    marginBottom: 8,
  },
  clientAddress: {
    fontSize: 14,
    fontFamily: "Quicksand",
    fontWeight: '400',
    color: colors.gray[500],
    marginBottom: 16,
  },
  navigateButton: {
    marginTop: 0,
    marginBottom: 0,
  },
});