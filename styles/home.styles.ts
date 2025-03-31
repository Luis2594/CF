import { StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';
import { StatusBar } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: colors.common.white,
  },
  header: {
    margin: 22,
  },
  wrappGreeting: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 8,
  },
  greeting: {
    fontSize: 22,
    fontFamily: 'Quicksand',
    fontWeight: '600',
    color: colors.primary.main,
    marginLeft: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Quicksand',
    fontWeight: '600',
    color: colors.gray[500],
  },
  textShowFilter: {
    fontSize: 22,
    fontFamily: 'Quicksand',
    fontWeight: '700',
    color: colors.primary.main,
    textAlign: 'center',
    marginVertical: 22
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 4,
  },
  searchInputContainer: {
    flex: 1,
  },
  buttonLocation: {
    backgroundColor: colors.primary.main,
    borderWidth: 0
  },
  buttonClose: {
    borderWidth: 0,
    padding: 0,
    width: 24,
    height: 24,
    borderRadius: 0,
  }
});