import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  tagIsVisited: {
    backgroundColor: "#B7FFDC",
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    marginBottom: 22,
    paddingHorizontal: 22,
    paddingVertical: 16,
  },
  textIsVisited: {
    fontFamily: "Quicksand",
    fontWeight: "700",
    fontSize: 14,
    color: "#18784A",
  },
  shadowWrapper: {
    width: '100%',
    marginVertical: 15,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 3,
  },
  infoContainer: {
    marginTop: -15,
    padding: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E6E6E7',
    overflow: "hidden",
    backgroundColor: 'white'
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomColor: '#eee',
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: 'Quicksand_400Medium',
    fontWeight: '400',
    color: '#717275',
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    fontFamily: 'Quicksand_700SemiBold',
    fontWeight: '700',
    color: '#717275',
    flex: 2,
    textAlign: 'right',
  },
});