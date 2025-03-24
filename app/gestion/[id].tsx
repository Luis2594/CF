import React, { useState, useEffect, Fragment } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Camera } from "lucide-react-native";
import Dropdown from "@/components/organism/Dropdown";
import { styles } from "@/styles/gestion.styles";
import BackButton from "@/components/molecules/buttons/BackButton";
import Button from "@/components/molecules/buttons/Button";
import * as DataHarcode from "@/data/dataHarcode";
import TagOperation from "@/components/atoms/TagOperation";
import CustomInput from "@/components/organism/CustomInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "@/constants/storage";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useOfflineSync } from "@/hooks/useOfflineSync";
import { useLanguage } from "@/context/LanguageContext";
import { Client } from "@/components/molecules/items/ItemInfoClient";
import AlertErrorMessage from "@/components/molecules/alerts/AlertErrorMessage";
import { SVG } from "@/constants/assets";

interface ResultCodes {
  id: string;
  codeResult: string;
  description: string;
  promise: boolean;
}

interface ActionResult {
  id: string;
  actionCode: string;
  description: string;
  resultCodes: Array<ResultCodes>;
}

interface ReasonNoPayment {
  id: string;
  reason: string;
}

interface ErrorsInput {
  action?: string;
  result?: string;
  reason?: string;
  montoLocal?: string;
  montoExt?: string;
  date?: string;
}

export default function GestionScreen() {
  const { id } = useLocalSearchParams();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [action, setAction] = useState("");
  const [result, setResult] = useState("");
  const [reason, setReason] = useState("");
  const [comment, setComment] = useState("");
  const [montoLocal, setMontoLocal] = useState("");
  const [montoExt, setMontoExt] = useState("");
  const [date, setDate] = useState("");
  const [actionsResults, setActionsResults] = useState<Array<ActionResult>>([]);
  const [reasonsNoPayment, setReasonsNoPayment] = useState<
    Array<ReasonNoPayment>
  >([]);
  const { translations, setLanguage } = useLanguage();
  const [errorsInput, setErrorsInput] = useState<ErrorsInput>();

  const functions = getFunctions();

  const {
    isOnline,
    pendingChanges,
    addPendingChange,
    applyPendingChanges,
    showOfflineAlert,
  } = useOfflineSync<ActionResult | ReasonNoPayment>({
    storageKey: "gestionsCache",
    language: "es",
    onSync: async () => {
      await Promise.all([fetchActionsResults(), fetchReasonsNoPayment()]);
    },
  });

  useEffect(() => {
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

    loadClientData();
  }, [id, translations]);

  const fetchActionsResults = async () => {
    try {
      const savedCredentials = await AsyncStorage.getItem(
        STORAGE_KEYS.LAST_LOGIN_CREDENTIALS
      );
      const savedCredentialsJSON = savedCredentials
        ? JSON.parse(savedCredentials)
        : null;

      const getActionsResultsFn = httpsCallable(functions, "getActionsResults");
      const result = await getActionsResultsFn({
        token: savedCredentialsJSON?.token,
      });

      if (result?.data?.success) {
        const actionsResultsData = (result.data.data.result ||
          []) as Array<ActionResult>;

        setActionsResults(actionsResultsData);
        await AsyncStorage.setItem(
          "actionsResults",
          JSON.stringify(actionsResultsData)
        );
      }
    } catch (error) {
      console.error("Error fetching actions-results:", error);
      const cachedData = await AsyncStorage.getItem("actionsResults");
      if (cachedData) {
        setActionsResults(JSON.parse(cachedData) as Array<ActionResult>);
      }
    }
  };

  const fetchReasonsNoPayment = async () => {
    try {
      const savedCredentials = await AsyncStorage.getItem(
        STORAGE_KEYS.LAST_LOGIN_CREDENTIALS
      );
      const savedCredentialsJSON = savedCredentials
        ? JSON.parse(savedCredentials)
        : null;

      const getReasonsNoPaymentFn = httpsCallable(
        functions,
        "getReasonsNoPayment"
      );
      const result = await getReasonsNoPaymentFn({
        token: savedCredentialsJSON?.token,
      });

      if (result?.data?.success) {
        const reasonsData = result.data.data.result || [];
        console.log("reasonsData: ", reasonsData);
        setReasonsNoPayment(
          applyPendingChanges(reasonsData) as ReasonNoPayment[]
        );
        await AsyncStorage.setItem(
          "reasonsNoPayment",
          JSON.stringify(reasonsData)
        );
      }
    } catch (error) {
      console.error("Error fetching reasons-no-payment:", error);
      const cachedData = await AsyncStorage.getItem("reasonsNoPayment");
      if (cachedData) {
        setReasonsNoPayment(JSON.parse(cachedData));
      }
    }
  };

  useEffect(() => {
    Promise.all([fetchActionsResults(), fetchReasonsNoPayment()]);
  }, []);

  useEffect(() => {
    if (action && result) {
      console.log("Consultar operaciones");
    }
  }, [action, result]);

  const handleSave = () => {
    if (validateInputs()) return;
  };

  const validateInputs = (): boolean => {
    setErrorsInput({});

    const currentErrorsInput: ErrorsInput = {
      action: !action ? translations.gestion.errors.action : undefined,
      result: !result ? translations.gestion.errors.result : undefined,
      reason: !reason ? translations.gestion.errors.reason : undefined,
      montoLocal: !montoLocal
        ? translations.gestion.errors.localAmount
        : undefined,
      montoExt: !montoExt ? translations.gestion.errors.extAmount : undefined,
      date: !date ? translations.gestion.errors.paymentDate : undefined,
    };

    setErrorsInput(currentErrorsInput);

    // Verifica si hay algún error en currentErrorsInput
    return Object.values(currentErrorsInput).some(
      (error) => error !== undefined
    );
  };

  const clearInputError = (key: keyof ErrorsInput) => {
    setErrorsInput((prevErrors) => ({
      ...prevErrors,
      [key]: undefined, // Elimina el error específico
    }));
  };

  const renderOperations = () => {
    return (
      <View>
        {client?.operations.map((operationDetail) => (
          <Fragment key={operationDetail.operationId}>
            <View>
              <TagOperation
                text={operationDetail.operationType}
                customContainerStyle={styles.spacingTagOperation}
              />
              <Dropdown
                label={translations.gestion.result}
                items={DataHarcode.results}
                selectedValue={result}
                onSelect={(item) => setResult(item.value)}
                required
                containerStyle={styles.spacing}
                labelStyle={styles.label}
                disable
              />

              <CustomInput
                label={translations.gestion.localAmount}
                value={montoLocal}
                onChangeText={(text) => {
                  setMontoLocal(text);
                  clearInputError("montoLocal");
                }}
                placeholder="0.00"
                isRequired
                currency={operationDetail.currency}
                errorMessage={errorsInput?.montoLocal}
              />

              <CustomInput
                label={translations.gestion.extAmount}
                value={montoExt}
                onChangeText={(text) => {
                  setMontoExt(text);
                  clearInputError("montoExt");
                }}
                placeholder="0.00"
                isRequired
                currency={"320"}
                errorMessage={errorsInput?.montoExt}
              />

              <CustomInput
                label={translations.gestion.paymentDate}
                value={date}
                onChangeText={(text) => {
                  setDate(text);
                  clearInputError("date");
                }}
                placeholder="00/00/0000"
                isRequired
                isDate
                errorMessage={errorsInput?.date}
              />
            </View>
          </Fragment>
        ))}
      </View>
    );
  };

  const actionItems = actionsResults.map((item) => ({
    value: item.actionCode,
    label: `${item.actionCode} - ${item.description}`,
  }));

  const actionSelected = actionsResults.find(
    (item) => item.actionCode === action
  );

  const resultsItems =
    actionSelected?.resultCodes?.map((item: ResultCodes) => ({
      value: item.codeResult,
      label: `${item.codeResult} - ${item.description}`,
    })) ?? [];

  const reasonItems = reasonsNoPayment.map((item) => ({
    value: item.id,
    label: `${item.reason}`,
  }));

  return (
    <SafeAreaView style={styles.container}>
      <AlertErrorMessage error={error} onClose={() => setError(null)} />
      <ScrollView style={styles.scrollView}>
        <BackButton />

        <Text style={styles.title}>{translations.gestion.title}</Text>

        <View>
          <Dropdown
            label={translations.gestion.action}
            items={actionItems}
            selectedValue={action}
            onSelect={(item) => {
              setAction(item.value);
              clearInputError("action");
            }}
            required
            containerStyle={styles.spacing}
            labelStyle={styles.label}
            error={errorsInput?.action}
          />

          <Dropdown
            label={translations.gestion.result}
            items={resultsItems}
            selectedValue={result}
            onSelect={(item) => {
              setResult(item.value);
              clearInputError("result");
            }}
            required
            containerStyle={styles.spacing}
            labelStyle={styles.label}
            error={errorsInput?.result}
          />

          <Dropdown
            label={translations.gestion.reasonNoPayment}
            items={reasonItems}
            selectedValue={reason}
            onSelect={(item) => {
              setReason(item.value);
              clearInputError("reason");
            }}
            required
            containerStyle={styles.spacing}
            labelStyle={styles.label}
            error={errorsInput?.reason}
          />

          <Text style={styles.label}>{translations.gestion.comment}</Text>
          <TextInput
            style={styles.commentInput}
            value={comment}
            onChangeText={setComment}
            placeholder={translations.gestion.commentPlaceholder}
            multiline
            numberOfLines={4}
            placeholderTextColor="#D0D0D1"
          />

          {result === "PRP" && renderOperations()}

          <TouchableOpacity style={styles.photoButton}>
            <Text style={styles.photoButtonText}>
              {translations.gestion.takePhoto}
            </Text>
            <SVG.CAMERA width={20} height={20} />
          </TouchableOpacity>

          <Button text={translations.gestion.save} onPress={handleSave} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
