import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderBottomRightRadius: 20,
    shadowColor: "#000",
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
    color: "#717275",
    fontSize: 14,
    fontFamily: "Quicksand",
    fontWeight: '600'
  },
});