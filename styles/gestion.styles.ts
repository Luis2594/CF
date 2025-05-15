import { StatusBar, StyleSheet } from "react-native";
import { colors } from "@/constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.common.white,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    flex: 1,
    margin: 22,
  },
  title: {
    fontSize: 22,
    fontFamily: "Quicksand",
    fontWeight: "700",
    color: colors.primary.main,
    textAlign: "center",
    marginVertical: 22,
  },
  spacing: {
    marginBottom: 12,
  },
  containerInputs: {
    marginTop: 22,
    marginBottom: 20,
  },
  label: {
    fontFamily: "Quicksand",
    fontWeight: "700",
    fontSize: 14,
    color: colors.gray[500],
  },
  containerOperations: {
    marginTop: 22,
  },
  photoButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.common.white,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.primary.main,
    paddingVertical: 12,
    marginTop: 20,
    marginBottom: 12,
  },
  photoButtonText: {
    color: colors.primary.main,
    fontSize: 16,
    fontFamily: "Quicksand",
    fontWeight: "600",
    marginRight: 8,
  },
  saveButton: {
    backgroundColor: colors.primary.main,
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 20,
  },
  saveButtonText: {
    color: colors.common.white,
    fontSize: 16,
    fontFamily: "Quicksand",
    fontWeight: "600",
  },
  photoPreview: {
    marginVertical: 20,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  photoImage: {
    width: "100%",
    height: 146,
    resizeMode: "cover",
  },
  closeButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: colors.border.main,
    borderRadius: 20,
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  closeButtonText: {
    fontSize: 18,
    color: "#333",
  },
});
