import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  infoContainer: {
    padding: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E6E6E7',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 }, // Sombra solo abajo
    shadowOpacity: 0.1,
    shadowRadius: 1,
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