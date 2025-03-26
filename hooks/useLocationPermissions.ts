import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { Platform } from 'react-native';

export const useLocationPermissions = () => {
  const [status, setStatus] = useState<Location.PermissionStatus | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    try {
      if (Platform.OS === 'web') {
        const { state } = await navigator.permissions.query({ name: 'geolocation' });
        setStatus(state === 'granted' ? Location.PermissionStatus.GRANTED : Location.PermissionStatus.DENIED);
        return;
      }

      let { status } = await Location.getForegroundPermissionsAsync();
      setStatus(status);
    } catch (error) {
      setErrorMsg('Error checking location permissions');
      console.error('Error checking permissions:', error);
    }
  };

  const requestPermissions = async () => {
    try {
      if (Platform.OS === 'web') {
        const result = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        setStatus(Location.PermissionStatus.GRANTED);
        return true;
      }

      const { status } = await Location.requestForegroundPermissionsAsync();
      setStatus(status);
      return status === Location.PermissionStatus.GRANTED;
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
    checkPermissions
  };
};