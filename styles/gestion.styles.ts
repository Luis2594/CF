import { StatusBar, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: StatusBar.currentHeight, // FIX status bar in android
  },
  scrollView: {
    flex: 1,
    margin: 22,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Quicksand',
    fontWeight: '700',
    color: '#F04E23',
    textAlign: 'center',
    marginVertical: 22,
  },
  spacing: {
    marginBottom: 12
  },
  spacingTagOperation: {
    marginBottom: 20
  },
  label: {
    fontSize: 14,
    fontFamily: 'Quicksand',
    fontWeight: '600',
    color: '#717275',
  },
  commentInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D0D0D1',
    padding: 16,
    height: 120,
    textAlignVertical: 'top',
    fontSize: 16,
    fontFamily: 'Quicksand_500Medium',
    color: '#666666',
    marginBottom: 20
  },
  keyboardAvoid: {
  },
  photoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#F04E23',
    paddingVertical: 12,
    marginTop: 20,
    marginBottom: 12,
  },
  photoButtonText: {
    color: '#F04E23',
    fontSize: 16,
    fontFamily: 'Quicksand_600SemiBold',
    marginLeft: 8,
  },
  saveButton: {
    backgroundColor: '#F04E23',
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Quicksand_600SemiBold',
  },
});