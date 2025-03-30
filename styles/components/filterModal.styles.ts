import { StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.background.modal,
  },
  content: {
    position: 'absolute',
    top: 0,
    right: 1,
    backgroundColor: colors.common.white,
    borderRadius: 20,
    width: 200,
    shadowColor: colors.common.black,
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
    backgroundColor: colors.primary.background,
  },
  optionText: {
    fontSize: 14,
    fontFamily: 'Quicksand',
    fontWeight: '400',
    color: colors.gray[500],
  },
  selectedOptionText: {
    fontWeight: '700',
  },
  checkIcon: {
    marginLeft: 8,
  },
});