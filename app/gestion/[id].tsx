import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
  Alert,
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

interface ActionResult {
  actionId: string;
  actionDescription: string;
  resultId: string;
  resultDescription: string;
}

interface ReasonNoPayment {
  reasonId: string;
  reasonDescription: string;
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
  const [actionsResults, setActionsResults] = useState<ActionResult[]>([]);
  const [reasonsNoPayment, setReasonsNoPayment] = useState<ReasonNoPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

      if (result.data.success) {
        const actionsResultsData = result.data.data || [];
        setActionsResults(applyPendingChanges(actionsResultsData) as ActionResult[]);
        await AsyncStorage.setItem(
          "actionsResults",
          JSON.stringify(actionsResultsData)
        );
      }
    } catch (error) {
      console.error("Error fetching actions-results:", error);
      const cachedData = await AsyncStorage.getItem("actionsResults");
      if (cachedData) {
        setActionsResults(JSON.parse(cachedData));
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

      const getReasonsNoPaymentFn = httpsCallable(functions, "getReasonsNoPayment");
      const result = await getReasonsNoPaymentFn({
        token: savedCredentialsJSON?.token,
      });

      if (result.data.success) {
        const reasonsData = result.data.data || [];
        setReasonsNoPayment(applyPendingChanges(reasonsData) as ReasonNoPayment[]);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Promise.all([fetchActionsResults(), fetchReasonsNoPayment()]);
  }, []);

  const handleSave = () => {
    router.back();
  };

  const actionItems = actionsResults.map((item) => ({
    value: item.actionId,
    label: `${item.actionId} - ${item.actionDescription}`,
  }));

  const reasonItems = reasonsNoPayment.map((item) => ({
    value: item.reasonId,
    label: `${item.reasonId} - ${item.reasonDescription}`,
  }));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <BackButton />

        <Text style={styles.title}>Grabar gestión</Text>

        <View>
          {error && <Text style={styles.errorText}>{error}</Text>}

          <Dropdown
            label="Acción"
            items={actionItems}
            selectedValue={action}
            onSelect={(item) => setAction(item.value)}
            required
            containerStyle={styles.spacing}
            labelStyle={styles.label}
          />

          <Dropdown
            label="Resultado"
            items={DataHarcode.results}
            selectedValue={result}
            onSelect={(item) => setResult(item.value)}
            required
            containerStyle={styles.spacing}
            labelStyle={styles.label}
          />

          <Dropdown
            label="Razón no pago"
            items={reasonItems}
            selectedValue={reason}
            onSelect={(item) => setReason(item.value)}
            required
            containerStyle={styles.spacing}
            labelStyle={styles.label}
          />

          <Text style={styles.label}>Comentario</Text>
          <TextInput
            style={styles.commentInput}
            value={comment}
            onChangeText={setComment}
            placeholder="Comentario"
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
                  label="Resultado"
                  items={DataHarcode.results}
                  selectedValue={result}
                  onSelect={(item) => setResult(item.value)}
                  required
                  containerStyle={styles.spacing}
                  labelStyle={styles.label}
                  disable
                />

                <CustomInput
                  label="Monto Local"
                  value={montoLocal}
                  onChangeText={setMontoLocal}
                  placeholder="0.00"
                  isRequired
                  isCurrency
                />

                <CustomInput
                  label="Monto Ext"
                  value={montoExt}
                  onChangeText={setMontoExt}
                  placeholder="0.00"
                  isRequired
                  isCurrency
                />

                <CustomInput
                  label="Fecha de pago"
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
            <Text style={styles.photoButtonText}>Tomar foto</Text>
          </TouchableOpacity>

          <Button text="Guardar" onPress={handleSave} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}