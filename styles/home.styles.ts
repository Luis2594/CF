import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontFamily: 'Quicksand_700Bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Quicksand_400Regular',
    color: '#666',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  logoutText: {
    marginLeft: 8,
    color: '#FF3B30',
    fontSize: 14,
    fontFamily: 'Quicksand_600SemiBold',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: 'white',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Quicksand_500Medium',
    color: '#666',
  },
  noDataText: {
    fontSize: 16,
    fontFamily: 'Quicksand_500Medium',
    color: '#666',
  },
  clientList: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Quicksand_700Bold',
    color: '#333',
  },
  sectionCount: {
    fontSize: 14,
    fontFamily: 'Quicksand_500Medium',
    color: '#666',
  },
  clientCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  clientHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  clientName: {
    fontSize: 18,
    fontFamily: 'Quicksand_600SemiBold',
    color: '#333',
    flex: 1,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: 8,
  },
  statusPending: {
    backgroundColor: '#FF3B30',
  },
  statusVisited: {
    backgroundColor: '#34C759',
  },
  clientInfo: {
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: 'Quicksand_600SemiBold',
    color: '#666',
    width: 80,
  },
  infoValue: {
    fontSize: 14,
    fontFamily: 'Quicksand_400Regular',
    color: '#333',
    flex: 1,
  },
  pendingText: {
    color: '#FF3B30',
  },
  visitedText: {
    color: '#34C759',
  },
});