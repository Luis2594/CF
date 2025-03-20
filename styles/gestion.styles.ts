import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#E6E6E7',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  backText: {
    fontSize: 12,
    fontFamily: 'Quicksand_700Bold',
    color: '#717275',
    marginLeft: 4,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Quicksand_700Bold',
    color: '#F04E23',
    textAlign: 'center',
    marginBottom: 32,
  },
  form: {
    paddingHorizontal: 20,
  },
  spacing: {
    height: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Quicksand_500Medium',
    color: '#666666',
    marginBottom: 8,
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