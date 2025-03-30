import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    position: 'absolute',
    top: 0,
    right: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
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
  selectedOption: {
    backgroundColor: 'rgba(240, 78, 35, 0.1)',
  },
  optionText: {
    fontSize: 14,
    fontFamily: 'Quicksand',
    fontWeight: '400',
    color: '#717275',
  },
  selectedOptionText: {
    fontWeight: '700',
  },
  checkIcon: {
    marginLeft: 8,
  },
});