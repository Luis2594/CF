import { StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

export const styles = StyleSheet.create({
  clientCard: {
    backgroundColor: colors.common.white,
    borderRadius: 20,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border.light,
    shadowColor: colors.common.black,
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
    color: colors.gray[500],
    marginLeft: 4
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 8,
  },
  statusPending: {
    backgroundColor: colors.status.pending,
  },
  statusVisited: {
    backgroundColor: colors.status.visited,
  },
  textStatus: {
    fontSize: 12,
    fontFamily: 'Quicksand',
    fontWeight: '400',
    color: colors.gray[500],
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
    color: colors.gray[500],
  },
  infoValue: {
    fontWeight: '700',
  },
  pendingText: {
    color: colors.error.main,
  },
  visitedText: {
    color: colors.success.light,
  },
});