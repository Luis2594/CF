import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/storage';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { useOfflineSync } from './useOfflineSync';
import { DropdownItem } from '@/components/organism/Dropdown';
import { encryptText } from '@/utils/encryption';
import { useUser } from './useUser';

export interface ResultCodes {
  id: string;
  codeResult: string;
  description: string;
  promise: boolean;
}

export interface ActionResult {
  id: string;
  actionCode: string;
  description: string;
  resultCodes: Array<ResultCodes>;
}

export interface ReasonNoPayment {
  id: string;
  reason: string;
}

export const useGestion = () => {
  const { user } = useUser();
  const [actionsResults, setActionsResults] = useState<Array<ActionResult>>([]);
  const [reasonsNoPayment, setReasonsNoPayment] = useState<
    Array<ReasonNoPayment>
  >([]);
  const [errorGestion, setError] = useState<string | null>(null);
  const [actionItems, setActionItems] = useState<Array<DropdownItem>>([]);
  const [resultsItems, setResultsItems] = useState<Array<DropdownItem>>([]);
  const [reasonItems, setReasonItems] = useState<Array<DropdownItem>>([]);
  const [actionSelected, setActionSelected] = useState<ActionResult>();

  const functions = getFunctions();

  const {
    isOnline,
    addPendingChange,
    saveDataInCache,
    getDataFromCache,
    clearDataInCache,
  } = useOfflineSync({
    storageKey: STORAGE_KEYS.GESTIONS_CACHE,
    onSync: async (id, data) => {
      createGestion({
        gestion: { ...data, token: user.token },
        onSuccess: () => {
          console.log('Ya lo ejecute en cache');
        },
        onError: () => {
        },
      })
    },
  });

  useEffect(() => {
    getDataFromCache({
      key: STORAGE_KEYS.ACTIONS_RESULT,
      onSuccess: (data) => {
        const actions = data as Array<ActionResult>;
        setActionsResults(actions)
      },
    })
    getDataFromCache({
      key: STORAGE_KEYS.REASON_NO_PAYMENT,
      onSuccess: (data) => {
        const reasons = data as Array<ReasonNoPayment>;
        setReasonsNoPayment(reasons);
      },
    })
  }, []);

  useEffect(() => {
    if (actionsResults) {
      setActionItems(actionsResults.map((item) => ({
        value: item.actionCode,
        label: `${item.actionCode} - ${item.description}`,
      })));
    }

    if (actionSelected) {
      setResultsItems(actionSelected?.resultCodes?.map((item: ResultCodes) => ({
        value: item.codeResult,
        label: `${item.codeResult} - ${item.description}`,
      })) ?? [])
    }

    if (reasonsNoPayment) {
      setReasonItems(reasonsNoPayment.map((item) => ({
        value: item.id,
        label: `${item.reason}`,
      })))
    }
  }, [actionsResults, actionSelected, reasonsNoPayment]);

  const getDataToUseInGestion = async (token: string) => {
    fetchData({
      token,
      functionName: "getActionsResults",
      storageKey: STORAGE_KEYS.ACTIONS_RESULT,
      setState: setActionsResults,
    });

    fetchData({
      token,
      functionName: "getReasonsNoPayment",
      storageKey: STORAGE_KEYS.REASON_NO_PAYMENT,
      setState: setReasonsNoPayment,
    });
  };

  const fetchData = async <T>({
    token,
    functionName,
    storageKey,
    setState,
  }: {
    token: string;
    functionName: string;
    storageKey: string;
    setState: (data: T[]) => void;
  }) => {
    if (isOnline) {
      try {
        const callableFn = httpsCallable(functions, functionName);
        const result = await callableFn({ token });

        if (result?.data?.success) {
          const data = result.data.data.result || [];
          setState(data);
          saveDataInCache(storageKey, data);
        } else {
          getDataFromCache({
            key: storageKey,
            onSuccess: (data) => setState(data as T[]),
            onError: (error: Error) => {
              const errorMsj = result?.data?.message || error.message;
              setError(errorMsj);
            }
          });
        }
      } catch (error) {
        console.log('token: ', token);
        console.error(`Error fetching ${functionName}:`, error);
        // [FirebaseError: Authentication token is required or invalid]
        getDataFromCache({
          key: storageKey,
          onSuccess: (data) => setState(data as T[]),
          onError: () => setError(error instanceof Error ? error.message : "An error occurred"),
        });
      }
    } else {
      getDataFromCache({
        key: storageKey,
        onSuccess: (data) => setState(data as T[]),
        onError: (error) => setError(error.message),
      });
    }
  };

  const updateActionSelected = (action: string) => {
    setActionSelected(actionsResults.find(
      (item) => item.actionCode === action
    ) as ActionResult);
  }

  const createGestion = async ({ gestion, onSuccess, onError }: { gestion: any, onSuccess: () => void, onError: (error: string) => void }) => {

    try {
      gestion = {
        ...gestion,
        isRealTime: encryptText(isOnline ? "1" : "0"),
      }

      if (isOnline) {
        const functions = getFunctions();
        const postGestorFn = httpsCallable(functions, "postGestor");
        const response = await postGestorFn(gestion);
        console.log("Error response: ", response);
        if (response?.data?.success) {
          onSuccess();
        } else {
          onError(response?.data?.message);
        }
      } else {
        // Store for offline sync
        addPendingChange(`${gestion?.clientId} - ${gestion?.portfolioId}`, gestion);
        onSuccess();
      }
    } catch (error) {
      console.log("Error in createGestion: ", error);
      onError(error.message);
    }
  }

  const clearDataGestion = () => {
    clearDataInCache(STORAGE_KEYS.ACTIONS_RESULT);
    clearDataInCache(STORAGE_KEYS.REASON_NO_PAYMENT);
  }

  return {
    getDataToUseInGestion,
    actionItems,
    actionSelected,
    resultsItems,
    reasonItems,
    updateActionSelected,
    actionsResults,
    errorGestion,
    setError,
    createGestion,
    clearDataGestion
  };
};