import { StatusBar, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.paper,
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
    paddingHorizontal: 22,
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
    width: '100%',
    marginTop: 37,
    marginBottom: 22,
    borderRadius: 60,
    shadowColor:  colors.common.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 4,
  },
  containerInfoTabs: {
    width: '100%',
    backgroundColor: colors.common.white,
    borderRadius: 60,
    overflow: "hidden",
    marginTop: -15,
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
    marginHorizontal: 22
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
    marginHorizontal: 22
  },
});