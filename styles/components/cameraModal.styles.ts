import { StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.common.black,
  },
  camera: {
    flex: 1,
  },
  controls: {
    flex: 1,
    backgroundColor: colors.common.transparent,
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
    backgroundColor: colors.primary.main,
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
    backgroundColor: colors.common.white,
  },
  webMessage: {
    fontSize: 16,
    marginBottom: 20,
    color: colors.text.secondary,
  },
  closeButtonText: {
    color: colors.primary.main,
    fontSize: 16,
  },
});