import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/storage';
import { useLanguage } from '@/context/LanguageContext';
import { useOfflineSync } from './useOfflineSync';
import { Operation } from '@/components/molecules/items/ItemOperationDetail';
import { Management } from '@/components/molecules/items/ItemOperationHistory';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { decryptText } from '@/utils/encryption';

export interface Client {
  clientId: string;
  name: string;
  shortName: string;
  id: string;
  personalPhoneNumber: string;
  homePhoneNumber: string;
  workPhoneNumber: string | null;
  workPhoneNumber2: string;
  jobPosition: string;
  addressLevel1: string;
  addressLevel2: string;
  address: string;
  civilStatus: string;
  cycle: number;
  status: number;
  portfolio: string;
  portfolioId: string;
  operations: Operation[];
  managements: Management[];
}

export const useClient = () => {
  const { translations } = useLanguage();
  const [clients, setClients] = useState<Array<Client>>([]);
  const [client, setClient] = useState<Client | null>(null);
  const [loadingClient, setLoading] = useState<boolean>(true);
  const [errorClient, setError] = useState<string | null>(null);
  const functions = getFunctions();

  const {
    isOnline,
    saveDataInCache,
    getDataFromCache,
    clearDataInCache
  } = useOfflineSync<Client>({
    storageKey: STORAGE_KEYS.CLIENTS_CACHE,
    onSync: async () => { },
  });

  const getClients = async (token: string) => {
    try {
      if (isOnline) {
        const getClientsFn = httpsCallable(functions, "getClients");
        const result = await getClientsFn({
          token: token,
        });

        if (result?.data?.success) {
          // If API returns empty data, use mock data
          const clientsData = decryptClientsData(result.data.data.clients);
          setClients(clientsData);
          await saveDataInCache(STORAGE_KEYS.CLIENTS, clientsData);
        } else {
          getDataFromCache({
            key: STORAGE_KEYS.CLIENTS,
            onSuccess: (data) => {
              setClients(data as Array<Client>);
            },
            onError: (error: Error) => {
              const errorMsj = result?.data?.message || error.message;
              console.error("Error fetching clients:", result);
              setError(errorMsj);
            }
          });
        }
      } else {
        getDataFromCache({
          key: STORAGE_KEYS.CLIENTS,
          onSuccess: (data) => {
            setClients(data as Array<Client>);
          },
          onError: (error: Error) => {
            if (error) {
              console.error("Error fetching clients from cache:", error);
              setError(error.message);
            }
          }
        });
      }
    } catch (error: any) {
      getDataFromCache({
        key: STORAGE_KEYS.CLIENTS,
        onSuccess: (data) => {
          setClients(data as Array<Client>);
        },
        onError: (error: Error) => {
          if (error) {
            console.error("Error fetching clients from cache:", error);
            setError(error.message);
          }
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const saveClient = async (client: Client) => {
    await saveDataInCache(STORAGE_KEYS.SELECTED_CLIENT, client);
  }

  const getClient = async (id: string) => {
    getDataFromCache({
      key: STORAGE_KEYS.SELECTED_CLIENT,
      onSuccess: (data) => {
        const client = data as Client;
        if (client.clientId.toString() === id) {
          setClient(client);
        } else {
          setError(translations.clients.errors.notFound);
        }
        setLoading(false);
      },
      onError: (error) => {
        setError(error.message);
        setLoading(false);
      }
    })
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

  const clearClientData = () => {
    clearDataInCache(STORAGE_KEYS.CLIENTS);
    clearDataInCache(STORAGE_KEYS.SELECTED_CLIENT);
  }

  return {
    clients,
    client,
    loadingClient,
    errorClient,
    setError,
    saveClient,
    getClient,
    getClients,
    clearClientData
  };
};