import { StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

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
    fontFamily: 'Quicksand',
    fontWeight: '500',
    color: colors.text.secondary,
  },
  required: {
    color: colors.error.dark,
    marginLeft: 4,
  },
  dropdown: {
    height: 44,
    backgroundColor: colors.common.white,
    borderRadius: 30,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.gray[300],
  },
  text: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Quicksand',
    fontWeight: '500',
    color: colors.text.secondary,
  },
  placeholder: {
    color: colors.gray[300],
  },
  overlay: {
    flex: 1,
    backgroundColor: colors.common.transparent,
  },
  dropdownList: {
    position: 'absolute',
    backgroundColor: colors.common.white,
    borderRadius: 12,
    shadowColor: colors.common.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 4,
  },
  containerDropdownList: {
    backgroundColor: colors.common.white,
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
    fontFamily: 'Quicksand',
    fontWeight: '500',
    color: colors.text.secondary,
  },
});