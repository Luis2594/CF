import { useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../constants/storage';
import { useOfflineSync } from './useOfflineSync';
import { auth } from '@/config/firebase';
import { LoginCredentials } from '@/app/login';
import { Client } from './useClient';

export const useUser = () => {
  const [user, setUser] = useState({});
  const [loadingUser, setLoading] = useState<boolean>(true);
  const [errorUser, setError] = useState<string | null>(null);

  const {
    getDataFromCache,
  } = useOfflineSync<Client>({
    storageKey: STORAGE_KEYS.USER_CACHE,
    onSync: async () => {
    },
  });

  useEffect(() => {
    getDataFromCache({
      key: STORAGE_KEYS.LAST_LOGIN_CREDENTIALS,
      onSuccess: (data) => {
        const credentials = data as LoginCredentials;
        if (credentials) {
          getCurrentUser(credentials);
        }
      }
    })
  }, []);

  const getCurrentUser = async (credentials: LoginCredentials) => {
    const userAuth = auth.currentUser;
    if (userAuth) {
      try {
        const idTokenResult = await userAuth.getIdTokenResult();
        setUser({
          ...userAuth,
          idTokenResult,
          name: idTokenResult.claims.name || "",
          token: credentials.token,
        });
      } catch (error) {
        setError(error?.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return {
    user,
    loadingUser,
    errorUser,
  };
};