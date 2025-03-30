import { StatusBar, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
    paddingTop: StatusBar.currentHeight,
  },
  backButton: {
    width: 28,
    height: 28,
    borderRadius: 10,
    backgroundColor: colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 22,
    marginVertical: 22
  },
  containerInfo: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.common.white,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    paddingHorizontal: 22
  },
  avatar: {
    marginBottom: 12,
    marginTop: -58
  },
  name: {
    fontSize: 22,
    fontFamily: 'Quicksand',
    fontWeight: '600',
    color: colors.gray[500],
    marginBottom: 8,
    textAlign: 'center',
  },
  portfolioType: {
    fontSize: 16,
    fontFamily: 'Quicksand',
    fontWeight: '400',
    color: colors.primary.main,
  },
  portfolioValue: {
    color: colors.primary.main,
    fontFamily: 'Quicksand',
    fontWeight: '700',
  },
  shadowWrapper: {
    shadowColor: colors.common.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 4,
    width: '100%',
    marginVertical: 22,
  },
  containerInfoTabs: {
    backgroundColor: colors.common.white,
    borderRadius: 60,
    overflow: "hidden",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  content: {
    flex: 1,
    width: '100%',
  },
  operationsContainer: {
    borderWidth: 1,
    borderColor: colors.gray[100],
    borderRadius: 20,
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Quicksand',
    fontWeight: '500',
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    marginTop: 20,
  },
});