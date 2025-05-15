import React, { useState, Fragment, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Dropdown from "@/components/organism/Dropdown";
import { styles } from "@/styles/gestion.styles";
import BackButton from "@/components/molecules/buttons/BackButton";
import Button from "@/components/molecules/buttons/Button";
import { useLanguage } from "@/context/LanguageContext";
import AlertErrorMessage from "@/components/molecules/alerts/AlertErrorMessage";
import { SVG } from "@/constants/assets";
import { useClient } from "@/hooks/useClient";
import { ResultCodes, useGestion } from "@/hooks/useGestion";
import { Operation } from "@/components/molecules/items/ItemOperationDetail";
import OperationItem from "./OperationItem";
import { useCamera } from "@/hooks/useCamera";
import CameraModal from "@/components/organism/CameraModal";
import { encryptText } from "@/utils/encryption";
import { useUser } from "@/hooks/useUser";
import FeedbackModal from "@/components/molecules/modals/FeedbackModal";
import { useLocation } from "@/hooks/useLocation";
import CustomInput from "@/components/organism/CustomInput";
import { CameraCapturedPicture } from "expo-camera";
import { X } from "lucide-react-native";

interface ErrorsInput {
  action?: string;
  result?: string;
  reason?: string;
}

export interface RequestOperationData {
  operationId: string;
  localCurrency?: string;
  foreignCurrency?: string;
  promiseDate?: string;
  existPromise?: string;
}

export default function GestionScreen() {
  const { id } = useLocalSearchParams();
  const { translations } = useLanguage();
  const { user } = useUser();
  const { client, getClient, updateClientStatus } = useClient();
  const {
    actionItems,
    resultsItems,
    reasonItems,
    updateActionSelected,
    actionsResults,
    errorGestion,
    setError,
    createGestion,
  } = useGestion();
  const { type, toggleCameraType, permission, handleRequestPermission } =
    useCamera();
  const { location } = useLocation();

  const [action, setAction] = useState("");
  const [result, setResult] = useState<ResultCodes>();
  const [reason, setReason] = useState("");
  const [comment, setComment] = useState("");
  const [photo, setPhoto] = useState<CameraCapturedPicture | undefined>();
  const [showCamera, setShowCamera] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackType, setFeedbackType] = useState<"success" | "error">(
    "success"
  );
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const [errorSomePromise, setErrorSomePromise] = useState<string | null>(null);
  const [errorsInput, setErrorsInput] = useState<ErrorsInput>();

  const [isRequestPermissionCamera, setIsRequestPermissionCamera] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const operationsRefs = useRef<{ [key: string]: any }>({});

  let operations = client?.operations || ([] as Operation[]);
  const operationMap = new Map<string, Operation>();

  operations.forEach((op) => {
    const existing = operationMap.get(op.operationId);

    if (!existing) {
      operationMap.set(op.operationId, op);
    } else {
      if (user.claims.parameters.ForeingCurrency) {
        operationMap.set(existing.operationId, {
          ...existing,
          foreignCurrency: user.claims.parameters.ForeingCurrency,
          foreignCurrencySymbol: user.claims.parameters.ForeingCurrencySymbol,
        });
      }
    }
  });

  operations = Array.from(operationMap.values());

  useEffect(() => {
    getClient(id.toString());
  }, []);

  useEffect(() => {
    if (permission?.granted && isRequestPermissionCamera) {
      setShowCamera(true);
    }
  }, [permission]);

  const handleCapture = (capturedPhoto?: CameraCapturedPicture) => {
    setError(null);
    if (capturedPhoto) {
      setPhoto(capturedPhoto);
    } else {
      setError(translations.camera.error.taking);
    }
    setShowCamera(false);
  };

  const validateOperation = (operationId: string) => {
    const ref = operationsRefs.current[operationId];
    return ref ? ref.currentErrorsInput() : false;
  };

  const currentErrorsInput = (): boolean => {
    setErrorsInput({});
    setErrorSomePromise(null);
    let reviewOperationsFlat = false;

    if (result?.promise) {
      reviewOperationsFlat = operations
        .map((op, index) => validateOperation(`${op.operationId} - ${index}`))
        .some((isInvalid) => isInvalid);
    }

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

  const getDataByOperation = (operationId: string): RequestOperationData => {
    const ref = operationsRefs.current[operationId];
    return ref.getDataToSend();
  };

  const getDataByOperationSin = (operationId: string): RequestOperationData => {
    const ref = operationsRefs.current[operationId];
    return ref.getDataToSendSin();
  };

  const handleModalContinue = () => {
    if (feedbackType === "success") {
      router.replace("/home");
    }

    setShowFeedbackModal(false);
  };

  const handleSave = async () => {
    setLoading(true);
    if (currentErrorsInput()) {
      setLoading(false);
      return;
    }

    try {
      if (!user) {
        setFeedbackType("error");
        setFeedbackMessage(translations.clients.errors.unauthorized);
        setShowFeedbackModal(true);
        setLoading(false);
        return;
      }

      // TODO DELETE It's to show data decript
      const gestionDataSin = {
        userId: user.uid,
        clientId: client?.clientId.toString() || "",
        portfolioId: client?.portfolioId || "",
        actionCodeId: action,
        resultCodeId: result?.id,
        reasonNoPaymentId: reason,
        comments: comment,
        latitude: location.latitude,
        longitude: location.longitude,
        isRealTime: encryptText("1"),
        files: photo ? [photo?.base64] : undefined,
        detail: result?.promise
          ? operations?.map((op: Operation, index) =>
              getDataByOperationSin(`${op.operationId} - ${index}`)
            ) || []
          : undefined,
        token: user?.token,
      };

      console.log("gestionDataSin: ", gestionDataSin);

      const gestionData = {
        userId: user.uid,
        clientId: encryptText(client?.clientId.toString() || ""),
        portfolioId: encryptText(client?.portfolioId || ""),
        actionCodeId: action,
        resultCodeId: result?.id,
        reasonNoPaymentId: reason,
        comments: encryptText(comment),
        latitude: encryptText(location.latitude),
        longitude: encryptText(location.longitude),
        isRealTime: encryptText("1"),
        files: photo ? [photo?.base64] : undefined,
        detail: result?.promise
          ? operations?.map((op: Operation, index) =>
              getDataByOperation(`${op.operationId} - ${index}`)
            ) || []
          : [],
        token: user?.token,
      };

      // console.log("gestionData: ", gestionData);
      createGestion({
        gestion: gestionData,
        onSuccess: async () => {
          // Update client status after successful gestion
          if (client) {
            await updateClientStatus(client.clientId);
          }
          setFeedbackType("success");
          setFeedbackMessage(translations.gestion.success);
          setShowFeedbackModal(true);
          setLoading(false);
        },
        onError: async (error) => {
          setFeedbackType("error");
          setFeedbackMessage(error);
          setShowFeedbackModal(true);
          setLoading(false);
        },
      });
    } catch (error) {
      console.log("Error saving gestion:: ", error);
      console.error("Error saving gestion:", error);
      setFeedbackType("error");
      setFeedbackMessage(translations.gestion.errors.saveFailed);
      setShowFeedbackModal(true);
      setLoading(false);
    }
  };

  const renderOperations = () => {
    return (
      <View style={styles.containerOperations}>
        {operations.map((operation, index) => (
          <Fragment key={`${operation.operationId} - ${index}`}>
            <OperationItem
              ref={(el) =>
                (operationsRefs.current[`${operation.operationId} - ${index}`] =
                  el)
              }
              operation={operation}
              resultCodes={
                actionsResults.find((a) => a.id === action)?.resultCodes || []
              }
              resultsItems={resultsItems}
              minPromiseAmountLocal={parseInt(
                user.claims.parameters.MinPromiseAmountLocal
              )}
              minPromiseAmountForeing={parseInt(
                user.claims.parameters.MinPromiseAmountForeing
              )}
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
      <ScrollView
        style={styles.scrollView}
        scrollEnabled={scrollEnabled}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
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
            selectedValue={result?.id || ""}
            onSelect={(item) => {
              const findeResultSelected = actionsResults
                .find((a) => a.id === action)
                ?.resultCodes.find((rc) => rc.id === item.value);
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

          <CustomInput
            label={translations.gestion.comment}
            value={comment}
            onChangeText={setComment}
            placeholder={translations.gestion.commentPlaceholder}
            isTextarea
            setScrollEnabled={setScrollEnabled}
          />

          {result?.promise && renderOperations()}

          {photo && (
            <View style={styles.photoPreview}>
              <Image source={{ uri: photo.uri }} style={styles.photoImage} />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setPhoto(undefined)}
              >
                <X color="black" size={24} />
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            style={styles.photoButton}
            onPress={async () => {
              await handleRequestPermission();
              setIsRequestPermissionCamera(true);
            }}
          >
            <Text style={styles.photoButtonText}>
              {translations.gestion.takePhoto}
            </Text>
            <SVG.CAMERA width={20} height={20} />
          </TouchableOpacity>

          <Button
            text={translations.gestion.save}
            onPress={handleSave}
            isLoading={loading}
          />
        </View>
      </ScrollView>

      <CameraModal
        visible={showCamera}
        onClose={() => setShowCamera(false)}
        onCapture={handleCapture}
        type={type}
        toggleType={toggleCameraType}
      />

      <FeedbackModal
        visible={showFeedbackModal}
        type={feedbackType}
        title={
          feedbackType === "success"
            ? translations.gestion.successTitle
            : translations.gestion.errorTitle
        }
        message={feedbackMessage}
        onClose={handleModalContinue}
        onContinue={handleModalContinue}
      />
    </SafeAreaView>
  );
}
