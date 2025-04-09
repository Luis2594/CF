import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { CameraType, useCameraPermissions } from 'expo-camera';
import { useLanguage } from '@/context/LanguageContext';

export const useCamera = () => {
  const [type, setType] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
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

  return {
    type,
    permission,
    error,
    toggleCameraType,
    requestPermission
  };
};