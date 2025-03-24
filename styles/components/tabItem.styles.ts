import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#F04E23",
  },
  tabText: {
    fontSize: 16,
    fontFamily: 'Quicksand_600Medium',
    fontWeight: '600',
    color: '#717275'
  },
  activeTabText: {
    color: "#F04E23",
  },
});