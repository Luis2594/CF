import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    width: 200,
    marginTop: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  optionsContainer: {
    padding: 12,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  selectedOption: {
    backgroundColor: 'rgba(240, 78, 35, 0.1)',
  },
  optionText: {
    fontSize: 14,
    fontFamily: 'Quicksand_500Medium',
    color: '#666',
  },
  selectedOptionText: {
    color: '#F04E23',
    fontFamily: 'Quicksand_700Bold',
  },
  checkIcon: {
    marginLeft: 8,
  },
});