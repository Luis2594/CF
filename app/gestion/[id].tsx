import React, { useState, useEffect } from "react";
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

export default function GestionScreen() {
  const { id } = useLocalSearchParams();
  const [action, setAction] = useState("");
  const [result, setResult] = useState("");
  const [reason, setReason] = useState("");
  const [comment, setComment] = useState("");
  const [montoLocal, setMontoLocal] = useState("");
  const [montoExt, setMontoExt] = useState("");
  const [date, setDate] = useState("");
  const [actionsResults, setActionsResults] = useState<Array<ActionResult>>([]);
  const [reasonsNoPayment, setReasonsNoPayment] = useState<Array<ReasonNoPayment>>([]);
  const { translations, language } = useLanguage();

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

  const handleSave = () => {
    router.back();
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
      <ScrollView style={styles.scrollView}>
        <BackButton />

        <Text style={styles.title}>{translations.gestion.title}</Text>

        <View>
          <Dropdown
            label={translations.gestion.action}
            items={actionItems}
            selectedValue={action}
            onSelect={(item) => setAction(item.value)}
            required
            containerStyle={styles.spacing}
            labelStyle={styles.label}
          />

          <Dropdown
            label={translations.gestion.result}
            items={resultsItems}
            selectedValue={result}
            onSelect={(item) => setResult(item.value)}
            required
            containerStyle={styles.spacing}
            labelStyle={styles.label}
          />

          <Dropdown
            label={translations.gestion.reasonNoPayment}
            items={reasonItems}
            selectedValue={reason}
            onSelect={(item) => setReason(item.value)}
            required
            containerStyle={styles.spacing}
            labelStyle={styles.label}
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

          {result === "PRP" && (
            <View>
              <View>
                <TagOperation
                  text="Operación 123654- Tarjeta de crédito"
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
                  onChangeText={setMontoLocal}
                  placeholder="0.00"
                  isRequired
                  isCurrency
                />

                <CustomInput
                  label={translations.gestion.extAmount}
                  value={montoExt}
                  onChangeText={setMontoExt}
                  placeholder="0.00"
                  isRequired
                  isCurrency
                />

                <CustomInput
                  label={translations.gestion.paymentDate}
                  value={date}
                  onChangeText={setDate}
                  placeholder="00/00/0000"
                  isRequired
                  isDate
                />
              </View>
            </View>
          )}

          <TouchableOpacity style={styles.photoButton}>
            <Camera size={20} color="#F04E23" />
            <Text style={styles.photoButtonText}>{translations.gestion.takePhoto}</Text>
          </TouchableOpacity>

          <Button text={translations.gestion.save} onPress={handleSave} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}