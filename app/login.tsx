import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  StatusBar,
  Keyboard,
  BackHandler,
} from "react-native";
import { Eye, EyeOff, X } from "lucide-react-native";
import { useLanguage } from "../context/LanguageContext";
import { useTerms } from "../context/TermsContext";
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

export default function Login() {
  const { translations, language } = useLanguage();
  const { hasAcceptedTerms } = useTerms();
  const [institution, setInstitution] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

  const handleLogin = async (
    askBiometric = false,
    useBiometric = lastLoginCredentials?.useBiometric
  ) => {
    setError(null);

    // Validaciones
    const errors = {
      institution: !institution && translations.loginErrors.institution,
      username: !username && translations.loginErrors.username,
      password: !password && !useBiometric && translations.loginErrors.password,
      deviceId: !deviceId && translations.loginErrors.deviceId,
    };

    const firstError = Object.values(errors).find((err) => err);
    if (firstError) {
      setError(firstError);
      return;
    }

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

      // const encryptedCredentials = encryptLoginCredentials({
      //   username: "gestor.domiciliar",
      //   password: "Desa2025@",
      //   deviceId: "37EC15AE-D8E3-4735-B6A4-EA5E84DF90D7",
      //   companyName: "Una prueba",
      // });

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

      console.log({
        askBiometric,
        isBiometricAvailable,
        isBiometricEnabled,
        isNewUser,
        useBiometric,
        flat: !isBiometricEnabled || isNewUser,
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
      console.error("Login error code:", error.details?.code);
      console.error("Login error:", error.message);

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView style={styles.container}>
      {error && (
        <View style={styles.errorContainer}>
          <TouchableOpacity onPress={() => setError(null)}>
            <SVG.CLOSE width={20} height={20} />
          </TouchableOpacity>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

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
                <Text style={styles.inputLabel}>
                  {translations.institution}
                </Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder={translations.institution}
                    value={institution}
                    onChangeText={(text) => {
                      setInstitution(text);
                      setError(null);
                    }}
                    autoCapitalize="none"
                    placeholderTextColor="#D0D0D1"
                  />
                </View>

                {/* USERNAME  */}
                <Text style={styles.inputLabel}>{translations.username}</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder={translations.username}
                    value={username}
                    onChangeText={(text) => {
                      setUsername(text);
                      setError(null);
                    }}
                    autoCapitalize="none"
                    placeholderTextColor="#D0D0D1"
                  />
                </View>

                {/* PASSWORD  */}
                {!loginWithBiometrics && (
                  <View>
                    <Text style={styles.inputLabel}>
                      {translations.password}
                    </Text>
                    <View
                      style={styles.inputContainer}
                      pointerEvents="box-none"
                    >
                      <TextInput
                        style={styles.input}
                        placeholder={translations.password}
                        value={password}
                        onChangeText={(text) => {
                          setPassword(text);
                          setError(null);
                        }}
                        secureTextEntry={!showPassword}
                        placeholderTextColor="#D0D0D1"
                      />
                      <TouchableOpacity
                        onPress={togglePasswordVisibility}
                        style={{ padding: 10 }}
                      >
                        {showPassword ? (
                          <EyeOff size={20} color="#666666" />
                        ) : (
                          <Eye size={20} color="#666666" />
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
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
                  <TouchableOpacity
                    style={[
                      styles.loginButton,
                      (institution || username || password) &&
                        styles.loginButtonEnable,
                      isLoading && styles.loginButtonDisabled,
                    ]}
                    onPress={() => {
                      if (institution || username || password) {
                        handleLogin(true);
                      }
                    }}
                    disabled={isLoading}
                  >
                    <Text
                      style={[
                        styles.loginButtonText,
                        (institution || username || password) &&
                          styles.loginButtonTextEnable,
                      ]}
                    >
                      {isLoading ? translations.signingIn : translations.signIn}
                    </Text>
                  </TouchableOpacity>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: StatusBar.currentHeight, // FIX status bar in android
  },
  keyboardAvoid: {
    flex: 1,
    marginTop: 22,
    marginHorizontal: 22,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: "#f5f5f6",
  },
  scrollContent: {
    flex: 1,
    padding: 24,
  },
  logoContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  welcomeText: {
    fontSize: 28,
    fontFamily: "Quicksand_700Bold",
    color: "#717275",
    textAlign: "center",
    marginBottom: 10,
  },
  form: {
    width: "100%",
  },
  errorContainer: {
    backgroundColor: "rgba(255, 59, 48, 0.1)",
    padding: 12,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  errorText: {
    color: "#FF3B30",
    fontFamily: "Quicksand_500Medium",
    fontSize: 14,
    marginLeft: 12,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: "Quicksand_600SemiBold",
    color: "#717275",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#D0D0D1",
    borderRadius: 30,
    marginVertical: 8,
    padding: 12,
    height: 44,
  },
  input: {
    flex: 1,
    height: 44,
    fontFamily: "Quicksand_500Medium",
    fontSize: 16,
    color: "#666666",
  },
  loginButton: {
    backgroundColor: "#F5F5F5",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    height: 48,
  },
  loginButtonEnable: {
    backgroundColor: "#F04E23",
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    fontSize: 16,
    fontFamily: "Quicksand_700SemiBold",
  },
  loginButtonTextEnable: {
    color: "white",
  },
  faceIdContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  recoverText: {
    fontFamily: "Quicksand_400Regular",
    fontSize: 16,
    color: "#F04E23",
    marginBottom: 10,
  },
  biometricText: {
    fontFamily: "Quicksand_500Medium",
    fontSize: 16,
    color: "#717275",
    marginRight: 8,
  },
  radarWavesContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "21%",
    overflow: "hidden",
  },
});
