import { useState, useEffect } from 'react';
import { Platform, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

interface OfflineSyncOptions {
  storageKey: string;
  language: 'en' | 'es';
  onSync: (id: string, data: any) => Promise<void>;
}

export function useOfflineSync<T extends { id: string }>({ 
  storageKey, 
  language,
  onSync 
}: OfflineSyncOptions) {
  const [isOnline, setIsOnline] = useState(true);
  const [pendingChanges, setPendingChanges] = useState<{[key: string]: any}>({});

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
    const failedChanges: {[key: string]: any} = {};

    for (const [id, data] of Object.entries(changes)) {
      try {
        await onSync(id, data);
        
        const updatedChanges = { ...pendingChanges };
        delete updatedChanges[id];
        setPendingChanges(updatedChanges);
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

  const showOfflineAlert = () => {
    Alert.alert(
      language === 'es' ? 'Modo sin conexión' : 'Offline Mode',
      language === 'es'
        ? 'Los cambios se sincronizarán cuando vuelva la conexión'
        : 'Changes will sync when connection is restored'
    );
  };

  return {
    isOnline,
    pendingChanges,
    addPendingChange,
    applyPendingChanges,
    showOfflineAlert,
    hasPendingChanges: Object.keys(pendingChanges).length > 0
  };
}