import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/storage';
import { Client } from '@/components/molecules/items/ItemInfoClient';
import { useLanguage } from '@/context/LanguageContext';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { useOfflineSync } from './useOfflineSync';
import { auth } from '@/config/firebase';
import { decryptText } from '@/utils/encryption';
import { Operation } from '@/components/molecules/items/ItemOperationDetail';
import { Management } from '@/components/molecules/items/ItemOperationHistory';

export const useUser = () => {
  const { translations, language } = useLanguage();
  const [user, setUser] = useState({});
  const [clients, setClients] = useState<Client[]>([]);
  const [loadingUser, setLoading] = useState<boolean>(true);
  const [errorUser, setError] = useState<string | null>(null);

  const functions = getFunctions();

  const {
    isOnline,
    pendingChanges,
    addPendingChange,
    applyPendingChanges,
    showOfflineAlert,
  } = useOfflineSync<Client>({
    storageKey: "clientsCache",
    language,
    onSync: async (clientId, data) => {
      console.log("Syncing client:", clientId, data);
    },
  });

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    const userAuth = auth.currentUser;
    if (userAuth) {
      try {
        const idTokenResult = await userAuth.getIdTokenResult();

        const savedCredentials = await AsyncStorage.getItem(
          STORAGE_KEYS.LAST_LOGIN_CREDENTIALS
        );

        const savedCredentialsJSON = savedCredentials
          ? JSON.parse(savedCredentials)
          : null;

        setUser({
          ...userAuth,
          idTokenResult,
          name: idTokenResult.claims.name || "",
          token: savedCredentialsJSON?.token,
        });

        if (!isOnline) {
          return getDataFromCache();
        }

        const getClientsFn = httpsCallable(functions, "getClients");
        const result = await getClientsFn({
          token: savedCredentialsJSON?.token,
        });

        if (result?.data?.success) {
          // If API returns empty data, use mock data
          const clientsDataDecrypt = decryptClientsData(result.data.data.clients);

          const clientsData = applyPendingChanges(clientsDataDecrypt)
          setClients(clientsData);

          await AsyncStorage.setItem(
            STORAGE_KEYS.CLIENTS,
            JSON.stringify(clientsData)
          );
        } else {
          getDataFromCache();
        }
      } catch (error: any) {
        getDataFromCache(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const getDataFromCache = async (error?: any) => {
    const cachedData = await AsyncStorage.getItem(STORAGE_KEYS.CLIENTS);
    if (cachedData) {
      setClients(JSON.parse(cachedData));
    } else {
      if (error) {
        console.error("Error fetching clients:", error);
        const errorCode = error.details?.code || "007";
        setError(getErrorMessage(errorCode));
      }
    }
  }

  const getErrorMessage = (code: string): string => {
    const errorMessages = {
      "001": translations.clients.errors.invalidParams,
      "002": translations.clients.errors.unauthorized,
      "007": translations.clients.errors.general,
    };

    return (
      errorMessages[code as keyof typeof errorMessages] ||
      translations.clients.errors.general
    );
  };

  /**
 * Decrypts all encrypted fields in clientsData
 * @param clients - Array of encrypted clients
 * @returns Decrypted clients array
 */
  const decryptClientsData = (clients: any[]) => {
    return clients.map((client) => ({
      ...client,
      clientId: decryptText(client.clientId),
      name: decryptText(client.name),
      shortName: decryptText(client.shortName),
      id: decryptText(client.id),
      personalPhoneNumber: decryptText(client.personalPhoneNumber),
      homePhoneNumber: decryptText(client.homePhoneNumber),
      workPhoneNumber: decryptText(client.workPhoneNumber),
      workPhoneNumber2: decryptText(client.workPhoneNumber2),
      jobPosition: decryptText(client.jobPosition),
      addressLevel1: decryptText(client.addressLevel1),
      addressLevel2: decryptText(client.addressLevel2),
      address: decryptText(client.address),
      civilStatus: decryptText(client.civilStatus),
      portfolio: decryptText(client.portfolio),
      portfolioId: decryptText(client.portfolioId),
      operations: client.operations.map((operation: Operation) => ({
        ...operation,
        operationId: decryptText(operation.operationId),
        description: decryptText(operation.description),
        productCode: decryptText(operation.productCode),
        lastPaymentDate: decryptText(operation.lastPaymentDate),
        operationType: decryptText(operation.operationType),
        clientId: decryptText(operation.clientId),
        portfolio: decryptText(operation.portfolio),
      })),
      managements: client.managements.map((management: Management) => ({
        ...management,
        id: decryptText(management.id),
        dateManagement: decryptText(management.dateManagement),
        action: decryptText(management.action),
        result: decryptText(management.result),
        comment: decryptText(management.comment),
        manager: decryptText(management.manager),
        portfolio: decryptText(management.portfolio),
        contactPhone: decryptText(management.contactPhone),
        actionDate: decryptText(management.actionDate),
        reasonDelay: decryptText(management.reasonDelay),
      })),
    }));
  };

  return {
    user,
    clients,
    loadingUser,
    errorUser,
  };
};