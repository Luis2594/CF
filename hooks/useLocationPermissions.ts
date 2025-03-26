import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export const useLocationPermissions = () => {
  const [status, setStatus] = useState<Location.PermissionStatus | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    try {
      const { status, canAskAgain } = await Location.getForegroundPermissionsAsync();
      console.log('Current Permission Status:', status, 'Can Ask Again:', canAskAgain);
      setStatus(status);
    } catch (error) {
      setErrorMsg('Error checking location permissions');
      console.error('Error checking permissions:', error);
    }
  };

  const requestPermissions = async () => {
    try {
      const { status, canAskAgain } = await Location.requestForegroundPermissionsAsync();
      console.log('Permission Request Status:', status);
      setStatus(status);

      if (status === Location.PermissionStatus.GRANTED) {
        return true;
      } else if (status === Location.PermissionStatus.DENIED && !canAskAgain) {
        setErrorMsg('Permissions permanently denied. Enable them in settings.');
      }

      return false;
    } catch (error) {
      setErrorMsg('Error requesting location permissions');
      console.error('Error requesting permissions:', error);
      return false;
    }
  };

  return {
    status,
    errorMsg,
    requestPermissions,
    checkPermissions,
  };
};
