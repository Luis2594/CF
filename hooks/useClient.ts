import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/storage';
import { Client } from '@/components/molecules/items/ItemInfoClient';
import { useLanguage } from '@/context/LanguageContext';

export const useClient = (id: string) => {
  const { translations } = useLanguage();
  const [client, setClient] = useState<Client | null>(null);
  const [loadingClient, setLoading] = useState<boolean>(true);
  const [errorClient, setError] = useState<string | null>(null);

  useEffect(() => {
    loadClientData();
  }, [id, translations]);

  const loadClientData = async () => {
    try {
      const storedClient = await AsyncStorage.getItem(
        STORAGE_KEYS.SELECTED_CLIENT
      );

      if (storedClient) {
        const parsedClient = JSON.parse(storedClient);
        if (parsedClient.clientId.toString() === id) {
          setClient(parsedClient);
        } else {
          setError(translations.clients.errors.notFound);
        }
      } else {
        setError(translations.clients.errors.noData);
      }
    } catch (error) {
      console.error("Error loading client data:", error);
      setError(translations.clients.errors.loading);
    } finally {
      setLoading(false);
    }
  };

  return {
    client,
    loadingClient,
    errorClient,
    setError
  };
};