import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { Platform } from 'react-native';

export const useLocation = () => {
  const [location, setLocation] = useState<{
    latitude: string;
    longitude: string;
  }>({
    latitude: "0",
    longitude: "0"
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let locationSubscription: Location.LocationSubscription;

    const getLocation = async () => {
      try {
        if (Platform.OS === 'web') {
          if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                setLocation({
                  latitude: position.coords.latitude.toString(),
                  longitude: position.coords.longitude.toString()
                });
              },
              (error) => {
                setError('Error getting location: ' + error.message);
              }
            );
          } else {
            setError('Geolocation is not supported in this browser');
          }
          return;
        }

        const { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status !== 'granted') {
          setError('Permission to access location was denied');
          return;
        }

        // Get initial location
        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High
        });

        setLocation({
          latitude: currentLocation.coords.latitude.toString(),
          longitude: currentLocation.coords.longitude.toString()
        });

        // Subscribe to location updates
        locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 10000, // Update every 10 seconds
            distanceInterval: 10 // Update if device moves by 10 meters
          },
          (newLocation) => {
            setLocation({
              latitude: newLocation.coords.latitude.toString(),
              longitude: newLocation.coords.longitude.toString()
            });
          }
        );
      } catch (err) {
        setError('Error getting location: ' + (err instanceof Error ? err.message : String(err)));
      }
    };

    getLocation();

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, []);

  return { location, error };
};