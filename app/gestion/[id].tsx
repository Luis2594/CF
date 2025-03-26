import React, { useState, useEffect, Fragment, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import Dropdown from "@/components/organism/Dropdown";
import { styles } from "@/styles/gestion.styles";
import BackButton from "@/components/molecules/buttons/BackButton";
import Button from "@/components/molecules/buttons/Button";
import { useOfflineSync } from "@/hooks/useOfflineSync";
import { useLanguage } from "@/context/LanguageContext";
import AlertErrorMessage from "@/components/molecules/alerts/AlertErrorMessage";
import { SVG } from "@/constants/assets";
import { useClient } from "@/hooks/useClient";
import { ResultCodes, useGestion } from "@/hooks/useGestion";
import { Operation } from "@/components/molecules/items/ItemOperationDetail";
import OperationItem from "./OperationItem";
import { useCamera } from "@/hooks/useCamera";
import CameraModal from "@/components/organism/CameraModal";
import { CameraCapturedPicture } from "expo-camera";

interface ErrorsInput {
  action?: string;
  result?: string;
  reason?: string;
}

export default function GestionScreen() {
  const { id } = useLocalSearchParams();
  const { translations } = useLanguage();
  const { client } = useClient(id.toString());
  const {
    actionItems,
    resultsItems,
    reasonItems,
    updateActionSelected,
    actionsResults,
    errorGestion,
    setError,
  } = useGestion();
  const { type, toggleCameraType, clearPhoto } = useCamera();

  const [action, setAction] = useState("");
  const [result, setResult] = useState<ResultCodes>();
  const [reason, setReason] = useState("");
  const [comment, setComment] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [photo, setPhoto] = useState<CameraCapturedPicture | null>(null);

  const [errorSomePromise, setErrorSomePromise] = useState<string | null>(null);
  const [errorsInput, setErrorsInput] = useState<ErrorsInput>();

  const operationsRefs = useRef<{ [key: string]: any }>({});

  const operations = client?.operations || ([] as Array<Operation>);

  const handleCapture = (capturedPhoto: CameraCapturedPicture | null) => {
    setPhoto(capturedPhoto);
    setShowCamera(false);
  };

  const handleSave = async () => {
    if (currentErrorsInput()) return;
  };

  const validateOperation = (
    operationId: string,
    type: "errors" | "promise"
  ) => {
    const ref = operationsRefs.current[operationId];
    return ref
      ? type === "errors"
        ? ref.currentErrorsInput()
        : ref.isPromise()
      : false;
  };

  const currentErrorsInput = (): boolean => {
    setErrorsInput({});
    setErrorSomePromise(null);

    const hasSomePromise = operations.some((op, index) =>
      validateOperation(`${op.operationId} - ${index}`, "promise")
    );

    if (!hasSomePromise) {
      setErrorSomePromise(
        "Result code requires promise of payment in the detail array"
      );
      return true;
    }

    const reviewOperationsFlat = operations
      .map((op, index) =>
        validateOperation(`${op.operationId} - ${index}`, "errors")
      )
      .some((isInvalid) => isInvalid);

    const currentErrorsInput: ErrorsInput = {
      action: action ? undefined : translations.gestion.errors.action,
      result: result ? undefined : translations.gestion.errors.result,
      reason: reason ? undefined : translations.gestion.errors.reason,
    };

    setErrorsInput(currentErrorsInput);

    return (
      Object.values(currentErrorsInput).some(Boolean) || reviewOperationsFlat
    );
  };

  const clearInputError = (key: keyof ErrorsInput) => {
    setErrorsInput((prevErrors) => ({
      ...prevErrors,
      [key]: undefined,
    }));
  };

  const renderOperations = () => {
    return (
      <View>
        {operations.map((operation, index) => (
          <Fragment key={`${operation.operationId} - ${index}`}>
            <OperationItem
              ref={(el) =>
                (operationsRefs.current[`${operation.operationId} - ${index}`] =
                  el)
              }
              operation={operation}
              resultCodes={
                actionsResults.find((a) => a.actionCode === action)
                  ?.resultCodes || []
              }
              resultsItems={resultsItems}
            />
          </Fragment>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <AlertErrorMessage
        error={errorGestion || errorSomePromise}
        onClose={() => {
          setError(null);
          setErrorSomePromise(null);
        }}
      />
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
              updateActionSelected(item.value);
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
            selectedValue={result?.codeResult || ""}
            onSelect={(item) => {
              const findeResultSelected = actionsResults
                .find((a) => a.actionCode === action)
                ?.resultCodes.find((rc) => rc.codeResult === item.value);
              setResult(findeResultSelected);
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

          {result?.promise && renderOperations()}

          <TouchableOpacity
            style={styles.photoButton}
            onPress={() => setShowCamera(true)}
          >
            <Text style={styles.photoButtonText}>
              {translations.gestion.takePhoto}
            </Text>
            <SVG.CAMERA width={20} height={20} />
          </TouchableOpacity>

          <Button text={translations.gestion.save} onPress={handleSave} />
        </View>
      </ScrollView>

      <CameraModal
        visible={showCamera}
        onClose={() => setShowCamera(false)}
        onCapture={handleCapture}
        type={type}
        toggleType={toggleCameraType}
      />
    </SafeAreaView>
  );
}
