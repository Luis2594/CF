import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
  },
  controls: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingBottom: 40,
  },
  closeButton: {
    padding: 15,
    borderRadius: 50,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  captureButton: {
    padding: 20,
    borderRadius: 50,
    backgroundColor: '#F04E23',
  },
  flipButton: {
    padding: 15,
    borderRadius: 50,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  webMessage: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
  closeButtonText: {
    color: '#F04E23',
    fontSize: 16,
  },
});