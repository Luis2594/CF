import { useState, useEffect, useTransition } from 'react';
import { Platform, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { useLanguage } from '@/context/LanguageContext';
import { GLOBAL } from '@/utils/global';

interface OfflineSyncOptions {
  storageKey: string;
  onSync: (id: string, data: any) => Promise<void>;
}

interface CacheOptions<T> {
  key: string;
  onSuccess: (data: T) => void;
  onError?: (error: Error) => void;
}

export function useOfflineSync<T extends { id: string }>({
  storageKey,
  onSync
}: OfflineSyncOptions) {

  const { language } = useLanguage()
  const [isOnline, setIsOnline] = useState(true);
  const [pendingChanges, setPendingChanges] = useState<{ [key: string]: any }>({});

  // Load pending changes from storage on mount
  useEffect(() => {
    const loadPendingChanges = async () => {
      try {
        const savedChanges = await AsyncStorage.getItem(storageKey);
        if (savedChanges) {
          setPendingChanges(JSON.parse(savedChanges));
        }
      } catch (error) {
        console.error('Error loading pending changes:', error);
      }
    };

    if (Platform.OS !== 'web') {
      loadPendingChanges();
    }
  }, [storageKey]);

  // Save pending changes to storage whenever they change
  useEffect(() => {
    const savePendingChanges = async () => {
      try {
        if (Object.keys(pendingChanges).length > 0) {
          await AsyncStorage.setItem(storageKey, JSON.stringify(pendingChanges));
        } else {
          await AsyncStorage.removeItem(storageKey);
        }
      } catch (error) {
        console.error('Error saving pending changes:', error);
      }
    };

    if (Platform.OS !== 'web') {
      savePendingChanges();
    }
  }, [pendingChanges, storageKey]);

  // Monitor network status and sync when online
  useEffect(() => {
    if (Platform.OS !== 'web') {
      const unsubscribe = NetInfo.addEventListener(state => {
        const newOnlineState = state.isConnected ?? true;
        setIsOnline(newOnlineState);

        if (newOnlineState && Object.keys(pendingChanges).length > 0) {
          syncPendingChanges();
        }
      });

      return () => unsubscribe();
    }
  }, [pendingChanges]);

  const syncPendingChanges = async () => {
    const changes = { ...pendingChanges };
    const failedChanges: { [key: string]: any } = {};
    const updatedChanges = { ...pendingChanges };

    for (const [id, data] of Object.entries(changes)) {
      if (GLOBAL.syncingIds.has(id)) continue;

      GLOBAL.syncingIds.add(id);
      delete updatedChanges[id];
      setPendingChanges(updatedChanges);
      try {
        await onSync(id, data);
      } catch (error) {
        console.error(`Error syncing changes for id ${id}:`, error);
        failedChanges[id] = data;
      }
    }

    if (Object.keys(failedChanges).length > 0) {
      setPendingChanges(failedChanges);
      Alert.alert(
        language === 'es' ? 'Error de sincronización' : 'Sync Error',
        language === 'es'
          ? 'Algunos cambios no pudieron sincronizarse'
          : 'Some changes could not be synchronized'
      );
    }
  };

  const addPendingChange = (id: string, data: any) => {
    setPendingChanges(prev => ({
      ...prev,
      [id]: data
    }));
  };

  const applyPendingChanges = (items: T[]): T[] => {
    return items.map(item => ({
      ...item,
      ...pendingChanges[item.id]
    }));
  };

  const saveDataInCache = async (key: string, data: any) => {
    try {
      await AsyncStorage.setItem(
        key,
        JSON.stringify(data)
      );
    } catch (error) {
      console.error('Error saving cache:', error);
    }
  }

  const getDataFromCache = async <T>({ key, onSuccess, onError }: CacheOptions<T>): Promise<void> => {
    try {
      const cachedData = await AsyncStorage.getItem(key);
      if (cachedData) {
        try {
          const parsedData: T = JSON.parse(cachedData);
          onSuccess(parsedData);
        } catch (error) {
          // Error de parseo JSON
          if (onError) {
            onError(new Error('Error parsing cached data'));
          }
        }
      } else {
        // No se encontraron datos en cache
        if (onError) {
          onError(new Error('No cached data found'));
        }
      }
    } catch (error) {
      // Error de AsyncStorage
      if (onError) {
        onError(new Error('Error accessing AsyncStorage'));
      }
    }
  };

  const clearDataInCache = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  }

  return {
    isOnline,
    pendingChanges,
    addPendingChange,
    applyPendingChanges,
    saveDataInCache,
    getDataFromCache,
    clearDataInCache,
    hasPendingChanges: Object.keys(pendingChanges).length > 0
  };
}