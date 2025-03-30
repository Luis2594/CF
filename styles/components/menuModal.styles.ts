import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  content: {
    position: 'absolute',
    top: 0,
    right: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    width: 253,
    borderWidth: 1,
    borderColor: '#D0D0D1'
  },
  optionsContainer: {
    padding: 8,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    borderRadius: 8,
  },
  wrapItem: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center'
  },
  optionText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'Quicksand',
    fontWeight: '700',
    color: '#717275',
  },
  selectedOptionText: {
    fontWeight: '700',
  },
  checkIcon: {
    marginLeft: 8,
  },
});