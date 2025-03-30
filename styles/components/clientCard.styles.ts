import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  clientCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F5F5F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  clientHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  clientName: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Quicksand',
    fontWeight: '700',
    color: '#717275',
    marginLeft: 4
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 8,
  },
  statusPending: {
    backgroundColor: '#FC4343',
  },
  statusVisited: {
    backgroundColor: '#15DD7D',
  },
  textStatus: {
    fontSize: 12,
    fontFamily: 'Quicksand',
    fontWeight: '400',
    color: '#717275',
  },
  clientInfo: {
    gap: 4,
    marginTop: 12
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoLabel: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'Quicksand',
    fontWeight: '400',
    color: '#717275',
  },
  infoValue: {
    fontWeight: '700',
  },
  pendingText: {
    color: '#FF3B30',
  },
  visitedText: {
    color: '#34C759',
  },
});