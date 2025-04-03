import { StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';
import { StatusBar } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: colors.common.white,
  },
  containerPadding: {
    flex: 1,
    margin: 22,
  },
  header: {
    marginBottom: 22,
  },
  wrappGreeting: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 8,
    gap: 8
  },
  greeting: {
    fontFamily: 'Quicksand',
    fontWeight: '600',
    fontSize: 22,
    color: colors.primary.main,
  },
  subtitle: {
    fontFamily: 'Quicksand',
    fontWeight: '600',
    fontSize: 14,
    color: colors.gray[500],
  },
  textShowFilter: {
    fontFamily: 'Quicksand',
    fontWeight: '700',
    fontSize: 22,
    color: colors.primary.main,
    textAlign: 'center',
    marginBottom: 22
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  searchInputContainer: {
    flex: 1,
  },
  buttonLocation: {
    backgroundColor: colors.primary.main,
    borderWidth: 0
  },
  buttonMenu: {
    borderWidth: 0,
    padding: 0,
    borderRadius: 0,
    width: 24,
    height: 24,
  }
});