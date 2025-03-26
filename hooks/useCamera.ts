import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { CameraType, useCameraPermissions, CameraCapturedPicture } from 'expo-camera';
import { useLanguage } from '@/context/LanguageContext';

export const useCamera = () => {
  const [type, setType] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<CameraCapturedPicture | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { translations } = useLanguage();

  useEffect(() => {
    if (Platform.OS !== 'web') {
      checkPermissions();
    }
  }, []);

  const checkPermissions = async () => {
    try {
      if (!permission?.granted) {
        await requestPermission();
      }
    } catch (err) {
      setError(translations.camera.error.checking);
      console.error('Error checking permissions:', err);
    }
  };

  const toggleCameraType = () => {
    setType(current => (current === 'back' ? 'front' : 'back'));
  };

  const takePicture = async (camera: any) => {
    try {
      if (!camera) return;
      
      const photo = await camera.takePictureAsync({
        quality: 0.8,
        base64: true,
      });
      
      setPhoto(photo);
      return photo;
    } catch (err) {
      setError(translations.camera.error.taking);
      console.error('Error taking picture:', err);
      return null;
    }
  };

  const clearPhoto = () => {
    setPhoto(null);
  };

  return {
    type,
    permission,
    photo,
    error,
    toggleCameraType,
    takePicture,
    clearPhoto,
    requestPermission
  };
};