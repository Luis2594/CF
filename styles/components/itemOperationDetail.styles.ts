import { StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

export const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    margin: 15,
    borderWidth: 1,
    borderColor: colors.gray[300],
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
    color: colors.gray[500],
  },
  cardNumber: {
    fontSize: 14,
    fontFamily: "Quicksand",
    fontWeight: "400",
    color: colors.gray[500],
  },
  currencyBadge: {
    backgroundColor: colors.gray[50],
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  currencyText: {
    fontSize: 14,
    fontFamily: "Quicksand",
    fontWeight: "700",
    color: colors.text.primary,
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
    color: colors.gray[500],
    fontFamily: "Quicksand",
    fontWeight: "400",
    marginRight: 20
  },
  operationValue: {
    flexShrink: 1,
    fontSize: 12,
    color: colors.gray[500],
    fontFamily: "Quicksand",
    fontWeight: "700",
    textAlign: "right"
  },
  expandButton: {
    alignItems: "center",
    padding: 5
  },
});