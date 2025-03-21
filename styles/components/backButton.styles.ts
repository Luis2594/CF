import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#E6E6E7",
    borderRadius: 12,
    paddingVertical: 8, // No lo puedo ver en FIGMA, es calculado
    paddingHorizontal: 12, // No lo puedo ver en FIGMA, es calculado
    marginBottom: 20, // No lo puedo ver en FIGMA, es calculado
  },
  backText: {
    fontSize: 12,
    fontFamily: "Quicksand_700Bold",
    color: "#717275",
    marginLeft: 4,
  },
});