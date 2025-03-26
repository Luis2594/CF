import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/storage';
import { useLanguage } from '@/context/LanguageContext';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { useOfflineSync } from './useOfflineSync';
import { DropdownItem } from '@/components/organism/Dropdown';

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
  const { language } = useLanguage();
  const [actionsResults, setActionsResults] = useState<Array<ActionResult>>([]);
  const [resultCode, setResultCodes] = useState<Array<ResultCodes>>([]);
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
    pendingChanges,
    addPendingChange,
    applyPendingChanges,
    showOfflineAlert,
  } = useOfflineSync({
    storageKey: "clientsCache",
    language,
    onSync: async () => {
    },
  });

  useEffect(() => {
    getActionsFromCache();
    getReasonFromCache();
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

  const fetchActionsResults = async (token: string) => {
    try {
      if (!isOnline) {
        return getActionsFromCache();
      }

      const getActionsResultsFn = httpsCallable(functions, "getActionsResults");
      const result = await getActionsResultsFn({
        token,
      });

      if (result?.data?.success) {
        const actionsResultsData = result.data.data.result || [];

        setActionsResults(actionsResultsData);

        await AsyncStorage.setItem(
          STORAGE_KEYS.ACTIONS_RESULT,
          JSON.stringify(actionsResultsData)
        );
      } else {
        getActionsFromCache(result);
      }
    } catch (error) {
      getActionsFromCache(error);
    }
  };

  const fetchReasonsNoPayment = async (token: string) => {
    try {
      if (!isOnline) {
        return getReasonFromCache();
      }

      const getReasonsNoPaymentFn = httpsCallable(
        functions,
        "getReasonsNoPayment"
      );
      const result = await getReasonsNoPaymentFn({
        token,
      });

      if (result?.data?.success) {
        const reasonsData = result.data.data.result || [];

        setReasonsNoPayment(reasonsData);

        await AsyncStorage.setItem(
          STORAGE_KEYS.REASON_NO_PAYMENT,
          JSON.stringify(reasonsData)
        );
      } else {
        getReasonFromCache(result);
      }
    } catch (error) {
      getReasonFromCache(error);
    }
  };

  const getActionsFromCache = async (error?: any) => {
    const cachedData = await AsyncStorage.getItem(STORAGE_KEYS.ACTIONS_RESULT);
    if (cachedData) {
      setActionsResults(JSON.parse(cachedData));
    } else {
      if (error) {
        console.error("Error fetching actions:", error);
        setError(error.details?.message);
      }
    }
  }

  const getReasonFromCache = async (error?: any) => {
    const cachedData = await AsyncStorage.getItem(STORAGE_KEYS.REASON_NO_PAYMENT);
    if (cachedData) {
      setReasonsNoPayment(JSON.parse(cachedData));
    } else {
      if (error) {
        console.error("Error fetching actions:", error);
        setError(error.details?.message);
      }
    }
  }

  const updateActionSelected = (action: string) => {
    setActionSelected(actionsResults.find(
      (item) => item.actionCode === action
    ) as ActionResult);
  }

  return {
    fetchActionsResults,
    fetchReasonsNoPayment,
    actionItems,
    actionSelected,
    resultsItems,
    reasonItems,
    updateActionSelected,
    actionsResults,
    errorGestion,
    setError
  };
};