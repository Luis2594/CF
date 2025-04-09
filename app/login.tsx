import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Keyboard,
  BackHandler,
  ActivityIndicator,
} from "react-native";
import { useLanguage } from "../context/LanguageContext";
import { SVG } from "../constants/assets";
import { auth } from "../config/firebase";
import { signInWithCustomToken } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getDeviceId } from "../utils/deviceId";
import { useBiometrics } from "../hooks/useBiometrics";
import BiometricPrompt from "../components/organism/BiometricPrompt";
import { STORAGE_KEYS } from "../constants/storage";
import { encryptLoginCredentials, encryptText } from "../utils/encryption";
import { TouchableWithoutFeedback } from "react-native";
import { styles } from "@/styles/login.styles";
import Button from "@/components/molecules/buttons/Button";
import CustomInput from "@/components/organism/CustomInput";
import AlertErrorMessage from "@/components/molecules/alerts/AlertErrorMessage";
import { useOfflineSync } from "@/hooks/useOfflineSync";

type ErrorsInput = {
  institution?: string;
  username?: string;
  password?: string;
};

export interface LoginCredentials {
  institution: string;
  username: string;
  password: string;
  token: string;
  deviceId: string;
  useBiometric: boolean;
}

export default function Login() {
  const { translations, language } = useLanguage();
  const [institution, setInstitution] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [showBiometricPrompt, setShowBiometricPrompt] = useState(false);
  const [loginWithBiometrics, setLoginWithBiometrics] = useState(false);
  const [optionLoginWithBiometrics, setOptionLoginWithBiometrics] = useState<
    "option" | "biometrics"
  >("biometrics");
  const [lastLoginCredentials, setLastLoginCredentials] = useState<{
    institution: string;
    username: string;
    password: string;
    useBiometric: boolean;
  } | null>(null);
  const [previousUsername, setPreviousUsername] = useState<string | null>(null);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [errorsInput, setErrorsInput] = useState<ErrorsInput>();

  const {
    isAvailable: isBiometricAvailable,
    biometricType,
    isEnabled: isBiometricEnabled,
    authenticate,
    setBiometricEnabled,
  } = useBiometrics();

  const { saveDataInCache, getDataFromCache, clearDataInCache } =
    useOfflineSync({
      storageKey: STORAGE_KEYS.LOGIN_CACHE,
      onSync: async () => {},
    });

  useEffect(() => {
    // Get device ID and last login credentials on component mount
    const initialize = async () => {
      // TODO DELETE
      // await clearDataInCache(STORAGE_KEYS.LAST_LOGIN_CREDENTIALS);

      const id = await getDeviceId();
      setDeviceId(id);

      // Load last login credentials
      getDataFromCache({
        key: STORAGE_KEYS.LAST_LOGIN_CREDENTIALS,
        onSuccess: (data) => {
          const credentials = data as LoginCredentials;
          if (credentials) {
            setLastLoginCredentials(credentials);
            setPreviousUsername(credentials.username);
            // Pre-fill the form with saved credentials
            setInstitution(credentials.institution);
            setUsername(credentials.username);
            setPassword(credentials.password);
          }
        },
      });
    };

    initialize();
  }, []);

  useEffect(() => {
    if (lastLoginCredentials) {
      setLoginWithBiometrics(
        isBiometricAvailable &&
          isBiometricEnabled &&
          lastLoginCredentials.useBiometric
      );
    }
  }, [isBiometricAvailable, isBiometricEnabled, lastLoginCredentials]);

  // LISTENER
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    const backHandlerListener = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        BackHandler.exitApp();
        return true;
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
      backHandlerListener.remove();
    };
  }, []);

  const validateInputs = () => {
    setErrorsInput({});
    const currentErrorsInput = {
      institution: !institution
        ? translations.loginErrors.institution
        : undefined,
      username: !username ? translations.loginErrors.username : undefined,
      password: !password ? translations.loginErrors.password : undefined,
    };

    // Validaciones
    setErrorsInput(currentErrorsInput);
  };

  const handleLogin = async (
    askBiometric = false,
    useBiometric = lastLoginCredentials?.useBiometric
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const isNewUser = username !== previousUsername;
      const shouldDisableBiometric =
        !useBiometric && previousUsername && isNewUser && isBiometricEnabled;

      if (shouldDisableBiometric) {
        await setBiometricEnabled(false);
        await clearDataInCache(STORAGE_KEYS.LAST_LOGIN_CREDENTIALS);
      }

      if (!deviceId) {
        setError(translations.loginErrors.deviceId);
        return;
      }

      const createCustomTokenFn = httpsCallable(
        getFunctions(),
        "createCustomToken"
      );

      const encryptedCredentials = encryptLoginCredentials({
        username,
        password,
        deviceId,
        companyName: institution,
      });

      const {
        data: { token, claims },
      } = await createCustomTokenFn({
        ...encryptedCredentials,
        biometric: useBiometric,
        language,
      });

      // Si no es login biométrico y se debe mostrar el prompt
      if (
        askBiometric &&
        isBiometricAvailable &&
        (!isBiometricEnabled || isNewUser || !useBiometric)
      ) {
        setShowBiometricPrompt(true);
        return;
      }

      await saveDataInCache(STORAGE_KEYS.LAST_LOGIN_CREDENTIALS, {
        institution,
        username,
        password,
        token: claims.token,
        deviceId: encryptText(deviceId),
        useBiometric,
        claims,
      });
      await signInWithCustomToken(auth, token);
    } catch (error: any) {
      console.log("Login error code:", error.details?.code);
      console.log("Login error:", error.message);

      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBiometricLogin = async () => {
    if (isLoading) return;
    if (!lastLoginCredentials) {
      setError(translations.loginErrors.emptyBiometric);
      return;
    }

    const success = await authenticate();
    if (success) {
      setInstitution(lastLoginCredentials.institution);
      setUsername(lastLoginCredentials.username);
      setPassword(lastLoginCredentials.password);
      handleLogin(true);
    } else {
      setError(translations.loginErrors.failBiometric);
    }
  };

  const handleEnableBiometrics = async () => {
    try {
      const success = await authenticate();
      if (success) {
        await setBiometricEnabled(true);
        setShowBiometricPrompt(false);
        handleLogin(false, true);
      } else {
        Alert.alert(
          translations.loginErrors.errorTitleBiometric,
          translations.loginErrors.errorDescriptionBiometric,
          [{ text: translations.ok }]
        );
      }
    } catch (error) {
      Alert.alert(
        translations.loginErrors.errorConfigTitleBiometric,
        translations.loginErrors.errorConfigDescriptionBiometric,
        [{ text: translations.ok }]
      );
    }
  };

  const onChangeInstitution = (text: string) => {
    setInstitution(text);
    setError(null);
    setErrorsInput({ ...errorsInput, institution: undefined });

    if (
      lastLoginCredentials?.useBiometric &&
      lastLoginCredentials?.institution === text &&
      lastLoginCredentials.username === username
    ) {
      setLoginWithBiometrics(true);
    } else {
      setLoginWithBiometrics(false);
    }
  };

  const onChangeUsername = (text: string) => {
    setUsername(text);
    setError(null);
    setErrorsInput({ ...errorsInput, username: undefined });

    if (
      lastLoginCredentials?.useBiometric &&
      lastLoginCredentials?.username === text &&
      lastLoginCredentials?.institution === institution
    ) {
      setLoginWithBiometrics(true);
    } else {
      setLoginWithBiometrics(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AlertErrorMessage error={error} onClose={() => setError(null)} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <View
          style={[
            styles.radarWavesContainer,
            keyboardVisible && { opacity: 0, zIndex: -1000 },
          ]}
        >
          <SVG.RADAR_WAVES width="100%" height="100%" fill="#F34A2D" />
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1 }}>
              <View style={styles.logoContainer}>
                <SVG.LOGO width={300} height={90} />
              </View>

              <Text style={styles.welcomeText}>{translations.welcome}</Text>

              <View style={styles.form}>
                {/* INSTITUTION  */}
                <CustomInput
                  label={translations.institution}
                  placeholder={translations.institution}
                  value={institution}
                  onChangeText={onChangeInstitution}
                  errorMessage={errorsInput?.institution}
                />

                {/* USERNAME  */}
                <CustomInput
                  label={translations.username}
                  placeholder={translations.username}
                  value={username}
                  onChangeText={onChangeUsername}
                  errorMessage={errorsInput?.username}
                />

                {/* PASSWORD  */}
                {(!loginWithBiometrics ||
                  optionLoginWithBiometrics === "option") && (
                  <CustomInput
                    label={translations.password}
                    placeholder={translations.password}
                    value={password}
                    isPassword
                    onChangeText={(text) => {
                      setPassword(text);
                      setError(null);
                      setErrorsInput({ ...errorsInput, password: undefined });
                    }}
                    errorMessage={errorsInput?.password}
                  />
                )}

                {loginWithBiometrics &&
                  optionLoginWithBiometrics === "biometrics" && (
                    <TouchableOpacity onPress={handleBiometricLogin}>
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          marginVertical: 10,
                        }}
                      >
                        <View style={styles.faceIdContainer}>
                          <Text style={styles.biometricText}>
                            {translations.faceIdLogin(biometricType)}
                          </Text>
                          {biometricType === "facial" ? (
                            <SVG.FACE_ID width={24} height={24} />
                          ) : (
                            <SVG.FINGERPRINT width={24} height={24} />
                          )}
                        </View>
                        {isLoading ? (
                          <ActivityIndicator size="large" color={"#F04E23"} />
                        ) : biometricType === "facial" ? (
                          <SVG.FACE_ID_CIRCLE width={60} height={60} />
                        ) : (
                          <SVG.FINGERPRINT_CIRCLE width={60} height={60} />
                        )}

                        <TouchableOpacity
                          onPress={() => {
                            if (isLoading) return;
                            setOptionLoginWithBiometrics("option");
                          }}
                        >
                          <Text
                            style={[
                              styles.biometricText,
                              { color: "#0093D4", marginTop: 5 },
                            ]}
                          >
                            {translations.orPassword}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  )}

                {/* LOGIN BUTTON  */}
                {(!loginWithBiometrics ||
                  optionLoginWithBiometrics === "option") && (
                  <Button
                    text={translations.signIn}
                    disabled={!(institution && username && password)}
                    variant={isLoading ? "default" : "outline"}
                    isLoading={isLoading}
                    customStyleContainer={{ marginTop: 10 }}
                    onPressDisable={() => validateInputs()}
                    onPress={() => {
                      if (institution || username || password) {
                        handleLogin(true);
                      }
                    }}
                  />
                )}

                {loginWithBiometrics &&
                  optionLoginWithBiometrics === "option" && (
                    <TouchableOpacity
                      onPress={() => {
                        if (isLoading) return;
                        setOptionLoginWithBiometrics("biometrics");
                      }}
                    >
                      <View style={styles.faceIdContainer}>
                        <Text
                          style={[styles.biometricText, { color: "#0093D4" }]}
                        >
                          {translations.faceIdLogin(biometricType)}
                        </Text>
                        {biometricType === "facial" ? (
                          <SVG.FACE_ID_BLUE width={24} height={24} />
                        ) : (
                          <SVG.FINGERPRINT_BLUE width={24} height={24} />
                        )}
                      </View>
                    </TouchableOpacity>
                  )}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>

      <BiometricPrompt
        visible={showBiometricPrompt}
        onClose={() => {
          setShowBiometricPrompt(false);
        }}
        onEnable={handleEnableBiometrics}
        onSkip={() => {
          setShowBiometricPrompt(false);
          handleLogin(false, false);
        }}
        biometricType={biometricType}
      />
    </SafeAreaView>
  );
}
