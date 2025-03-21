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
} from "react-native";
import { useLanguage } from "../context/LanguageContext";
import { SVG } from "../constants/assets";
import { auth } from "../config/firebase";
import { signInWithCustomToken } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getDeviceId } from "../utils/deviceId";
import { getLoginErrorMessage } from "../constants/loginErrors";
import { useBiometrics } from "../hooks/useBiometrics";
import BiometricPrompt from "../components/BiometricPrompt";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "../constants/storage";
import { encryptLoginCredentials, encryptText } from "../utils/encryption";
import { TouchableWithoutFeedback } from "react-native";
import { styles } from "@/styles/login.styles";
import Button from "@/components/Button";
import CustomInput from "@/components/CustomInput";
import AlertErrorMessage from "@/components/AlertErrorMessage";

type ErrorsInput = {
  institution?: string;
  username?: string;
  password?: string;
};

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

  useEffect(() => {
    // Get device ID and last login credentials on component mount
    const initialize = async () => {
      // COMENTAR
      // await AsyncStorage.removeItem(STORAGE_KEYS.LAST_LOGIN_CREDENTIALS);

      const id = await getDeviceId();
      setDeviceId(id);

      // Load last login credentials
      const savedCredentials = await AsyncStorage.getItem(
        STORAGE_KEYS.LAST_LOGIN_CREDENTIALS
      );

      if (savedCredentials) {
        const credentials = JSON.parse(savedCredentials);
        setLastLoginCredentials(credentials);
        setPreviousUsername(credentials.username);
        // Pre-fill the form with saved credentials
        setInstitution(credentials.institution);
        setUsername(credentials.username);
        setPassword(credentials.password);
      }
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

    try {
      const isNewUser = username !== previousUsername;
      const shouldDisableBiometric =
        !useBiometric && previousUsername && isNewUser && isBiometricEnabled;

      if (shouldDisableBiometric) {
        await setBiometricEnabled(false);
        await AsyncStorage.removeItem(STORAGE_KEYS.LAST_LOGIN_CREDENTIALS);
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
      await saveLoginCredentials({
        institution,
        username,
        password,
        token: claims.token,
        deviceId,
        useBiometric,
      });
      await signInWithCustomToken(auth, token);
    } catch (error: any) {
      console.log("Login error code:", error.details?.code);
      console.log("Login error:", error.message);

      const errorCode =
        error.response?.data?.code || error.details?.code || "007";
      setError(getLoginErrorMessage(errorCode, language || "es"));
    } finally {
      setIsLoading(false);
    }
  };

  const saveLoginCredentials = async ({
    institution,
    username,
    password,
    token,
    deviceId,
    useBiometric,
  }: {
    institution: string;
    username: string;
    password: string;
    token: string;
    deviceId: string;
    useBiometric?: boolean;
  }) => {
    await AsyncStorage.setItem(
      STORAGE_KEYS.LAST_LOGIN_CREDENTIALS,
      JSON.stringify({
        institution,
        username,
        password,
        token,
        deviceId: encryptText(deviceId),
        useBiometric,
      })
    );
  };

  const handleBiometricLogin = async () => {
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
                {!loginWithBiometrics && (
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

                {loginWithBiometrics && (
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
                      {biometricType === "facial" ? (
                        <SVG.FACE_ID_CIRCLE width={60} height={60} />
                      ) : (
                        <SVG.FINGERPRINT_CIRCLE width={60} height={60} />
                      )}
                      <TouchableOpacity
                        onPress={() => setLoginWithBiometrics(false)}
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
                {!loginWithBiometrics && (
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

                {!loginWithBiometrics && lastLoginCredentials?.useBiometric && (
                  <TouchableOpacity
                    onPress={() => setLoginWithBiometrics(true)}
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
          handleLogin();
        }}
        biometricType={biometricType}
      />
    </SafeAreaView>
  );
}
