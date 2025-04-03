import { StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

export const styles = StyleSheet.create({
  shadowWrapper: {
    width: '100%',
    marginVertical: 15,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 3,
  },
  clientCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 12,
    borderColor: colors.border.light,
    marginTop: -15,
    backgroundColor: colors.common.white,
  },
  clientHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  clientName: {
    flex: 1,
    fontFamily: 'Quicksand',
    fontWeight: '700',
    fontSize: 14,
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
    fontFamily: 'Quicksand',
    fontWeight: '400',
    fontSize: 12,
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
    fontFamily: 'Quicksand',
    fontWeight: '400',
    fontSize: 12,
    flex: 1,
    color: colors.gray[500],
  },
  infoValue: {
    fontWeight: '700',
  },
});