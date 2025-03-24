import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

  cardContainer: {
    borderRadius: 10,
    margin: 15,
    borderWidth: 1,
    borderColor: '#D0D0D1',
    padding: 15
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14
  },
  cardTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: "Quicksand",
    fontWeight: "700",
    color: "#717275",
  },
  cardNumber: {
    fontSize: 14,
    fontFamily: "Quicksand",
    fontWeight: "400",
    color: "#717275",
  },
  currencyBadge: {
    backgroundColor: "#F5F5F6",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  currencyText: {
    fontSize: 14,
    fontFamily: "Quicksand",
    fontWeight: "bold",
    color: "#1F2937",
  },
  operationDetails: {
    marginVertical: 10,
    paddingTop: 10,
  },
  operationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  operationLabel: {
    fontSize: 12,
    color: "#717275",
    fontFamily: "Quicksand",
    fontWeight: "400",
    marginRight: 20
  },
  operationValue: {
    flexShrink: 1,
    fontSize: 12,
    color: "#717275",
    fontFamily: "Quicksand",
    fontWeight: "700",
    textAlign: "right"
  },
  expandButton: {
    alignItems: "center",
    padding: 5
  },

});