import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  profileSection: {
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FF3B30',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 32,
    fontFamily: 'Quicksand_700Bold',
  },
  name: {
    fontSize: 24,
    fontFamily: 'Quicksand_600SemiBold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  portfolioType: {
    fontSize: 16,
    fontFamily: 'Quicksand_400Regular',
    color: '#666',
  },
  portfolioValue: {
    color: '#FF3B30',
    fontFamily: 'Quicksand_700Bold',
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FF3B30',
  },
  tabText: {
    fontSize: 16,
    fontFamily: 'Quicksand_500Medium',
    color: '#666',
  },
  activeTabText: {
    color: '#FF3B30',
    fontFamily: 'Quicksand_700Bold',
  },
  content: {
    flex: 1,
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Quicksand_500Medium',
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'Quicksand_500Medium',
    color: '#FF3B30',
    textAlign: 'center',
    marginTop: 20,
  },
  infoContainer: {
    padding: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoLabel: {
    fontSize: 16,
    fontFamily: 'Quicksand_500Medium',
    color: '#666',
    flex: 1,
  },
  infoValue: {
    fontSize: 16,
    fontFamily: 'Quicksand_600SemiBold',
    color: '#333',
    flex: 2,
    textAlign: 'right',
  },
  operationsContainer: {
    padding: 20,
  },
  operationSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  operationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  operationTitle: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'Quicksand_600SemiBold',
    color: '#333',
    marginLeft: 12,
  },
  operationContent: {
    overflow: 'hidden',
  },
  operationDetails: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginTop: 16,
  },
  operationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  operationLabel: {
    fontSize: 14,
    fontFamily: 'Quicksand_500Medium',
    color: '#666',
  },
  operationValue: {
    fontSize: 14,
    fontFamily: 'Quicksand_600SemiBold',
    color: '#333',
  },
  manageButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 25,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  manageButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Quicksand_600SemiBold',
  },
  historyContainer: {
    padding: 20,
  },
  historyItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  historyTitle: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'Quicksand_600SemiBold',
    color: '#333',
    marginLeft: 12,
  },
  historyDetails: {
    gap: 12,
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyLabel: {
    fontSize: 14,
    fontFamily: 'Quicksand_500Medium',
    color: '#666',
  },
  historyValue: {
    fontSize: 14,
    fontFamily: 'Quicksand_600SemiBold',
    color: '#333',
  },
});