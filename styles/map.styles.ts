import { Platform, StyleSheet } from "react-native";
import { colors } from "@/constants/colors";
import { StatusBar } from "react-native";

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
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Quicksand",
    fontWeight: "700",
    fontSize: 22,
    flex: 1,
    color: colors.primary.main,
    textAlign: "center",
    marginRight: 28,
  },
  radioContainer: {
    marginTop: 22,
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
    fontFamily: "Quicksand",
    fontWeight: "700",
    fontSize: 14,
    color: colors.text.primary,
  },
  radioSubtitle: {
    fontFamily: "Quicksand",
    fontWeight: "400",
    fontSize: 12,
    color: colors.text.primary,
  },
  customRadioContent: {
    flex: 1,
  },
  slider: {
    width: "100%",
    borderRadius: 10,
    marginTop: -10,
    ...Platform.select({
      android: {
        width: "109%",
        marginLeft: -15,
        marginTop: -1,
      },
      ios: {
        marginBottom: -10,
      },
    }),
  },
  containerTextSlider: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerMap: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.gray[300],
    overflow: "hidden",
  },
  map: {
    flex: 1,
  },
  customMarker: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.common.white,
    justifyContent: "center",
    alignItems: "center",
  },
  customMarkerView: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: colors.primary.main,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(18, 17, 17, 0.46)",
  },
  bottomSheet: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: colors.common.white,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
  },
  bottomSheetContent: {
    padding: 22,
  },
  bottomSheetTitle: {
    fontFamily: "Quicksand",
    fontWeight: "700",
    fontSize: 22,
    color: colors.primary.main,
    marginBottom: 22,
    textAlign: "center",
  },
  clientName: {
    fontFamily: "Quicksand",
    fontWeight: "700",
    fontSize: 16,
    color: colors.gray[500],
    marginBottom: 14,
  },
  containerDistance: {
    flexDirection: "row",
    backgroundColor: colors.gray[10],
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginBottom: 14,
  },
  clientDistance: {
    fontFamily: "Quicksand",
    fontWeight: "700",
    fontSize: 14,
    color: colors.text.primary,
    marginLeft: 6,
  },
  wrapAddress: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  clientAddress: {
    fontFamily: "Quicksand",
    fontWeight: "600",
    fontSize: 14,
    color: colors.text.primary,
    marginBottom: 14,
  },
});
