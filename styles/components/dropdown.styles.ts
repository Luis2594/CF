import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Quicksand_500Medium',
    color: '#666666',
  },
  required: {
    color: '#9D2B2B',
    marginLeft: 4,
  },
  dropdown: {
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#D0D0D1',
  },
  text: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Quicksand_500Medium',
    color: '#666666',
  },
  placeholder: {
    color: '#D0D0D1',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  dropdownList: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 4,
  },
  containerDropdownList: {
    backgroundColor: "white",
    borderRadius: 60,
    overflow: "hidden",
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  itemText: {
    fontSize: 16,
    fontFamily: 'Quicksand_500Medium',
    color: '#666666',
  },
});
