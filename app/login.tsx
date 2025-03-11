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
import { encryptLoginCredentials } from "../utils/encryption";

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
  } | null>(null);
  const [previousUsername, setPreviousUsername] = useState<string | null>(null);

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
        setLoginWithBiometrics(
          isBiometricAvailable && isBiometricEnabled && credentials
        );
      }
    };

    initialize();
  }, []);

  useEffect(() => {
    if (lastLoginCredentials) {
      setLoginWithBiometrics(isBiometricAvailable && isBiometricEnabled);
    }
  }, [isBiometricAvailable, isBiometricEnabled, lastLoginCredentials]);

  const handleLogin = async (useBiometric = false) => {
    // Reset error state
    setError(null);

    // Validate form
    if (!institution) {
      setError(translations.loginErrors.institution);
      return;
    }

    if (!username) {
      setError(translations.loginErrors.username);
      return;
    }

    if (!password && !useBiometric) {
      setError(translations.loginErrors.password);
      return;
    }

    if (!deviceId) {
      setError(translations.loginErrors.deviceId);
      return;
    }

    setIsLoading(true);

    try {
      // Check if user is trying to login with different credentials
      if (
        !useBiometric &&
        previousUsername &&
        username !== previousUsername &&
        isBiometricEnabled
      ) {
        // Disable biometric for previous user
        await setBiometricEnabled(false);
        await AsyncStorage.removeItem(STORAGE_KEYS.LAST_LOGIN_CREDENTIALS);
      }

      const functionsInstance = getFunctions();
      const createCustomTokenFn = httpsCallable(
        functionsInstance,
        "createCustomToken"
      );

      // Encrypt credentials
      const encryptedCredentials = encryptLoginCredentials({
        username,
        password,
        deviceId,
        // deviceId: '123456789012345',
        companyName: institution,
        // companyName: 'Credit Force'
      });

      const result = await createCustomTokenFn({
        ...encryptedCredentials,
        biometric: useBiometric,
      });

      const { token } = result.data;

      // Save credentials for biometric login if not using biometric
      if (!useBiometric) {
        // Show biometric prompt if available and not already enabled
        // Only show if this is a new user or first time login
        if (
          isBiometricAvailable &&
          (!isBiometricEnabled || username !== previousUsername)
        ) {
          setShowBiometricPrompt(true);
          return;
        }
      }

      // Save credentials for future use
      await AsyncStorage.setItem(
        STORAGE_KEYS.LAST_LOGIN_CREDENTIALS,
        JSON.stringify({
          institution,
          username,
          password,
        })
      );

      // Sign in with custom token
      await signInWithCustomToken(auth, token);
    } catch (error: any) {
      console.error("Login error code:", error.details.code);
      console.error("Login error:", error.message);

      const errorCode =
        error.response?.data?.code || error.details.code || "007";
      const errorMessage = getLoginErrorMessage(errorCode, language);

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
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
        handleLogin(true);
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.logoContainer}>
            <SVG.LOGO width={300} height={90} />
          </View>

          <Text style={styles.welcomeText}>{translations.welcome}</Text>

          <View style={styles.form}>
            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>

                <TouchableOpacity onPress={() => setError(null)}>
                  <X size={20} color="red" />
                </TouchableOpacity>
              </View>
            )}

            {/* INSTITUTION  */}
            <Text style={styles.inputLabel}>{translations.institution}</Text>
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
                <Text style={styles.inputLabel}>{translations.password}</Text>
                <View style={styles.inputContainer}>
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
                  <TouchableOpacity onPress={togglePasswordVisibility}>
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
                  institution &&
                    username &&
                    password &&
                    styles.loginButtonEnable,
                  isLoading && styles.loginButtonDisabled,
                ]}
                onPress={() => handleLogin(false)}
                disabled={isLoading}
              >
                <Text
                  style={[
                    styles.loginButtonText,
                    institution &&
                      username &&
                      password &&
                      styles.loginButtonTextEnable,
                  ]}
                >
                  {isLoading ? translations.signingIn : translations.signIn}
                </Text>
              </TouchableOpacity>
            )}

            {!loginWithBiometrics && lastLoginCredentials && (
              <TouchableOpacity onPress={() => setLoginWithBiometrics(true)}>
                <View style={styles.faceIdContainer}>
                  <Text style={[styles.biometricText, { color: "#0093D4" }]}>
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
        </ScrollView>
        <View style={styles.radarWavesContainer}>
          <SVG.RADAR_WAVES width="100%" height="100%" fill="#F34A2D" />
        </View>
      </KeyboardAvoidingView>

      <BiometricPrompt
        visible={showBiometricPrompt}
        onClose={() => {
          setShowBiometricPrompt(false);
        }}
        onEnable={handleEnableBiometrics}
        onSkip={() => {
          setShowBiometricPrompt(false);
          handleLogin(true);
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
  },
  keyboardAvoid: {
    flex: 1,
    marginHorizontal: 20,
    backgroundColor: "#F5F5F6",
    borderRadius: 24,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    paddingBottom: 200, // Extra padding to account for the radar waves
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
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 3,
    borderLeftColor: "#FF3B30",
    flexDirection: "row",
  },
  errorText: {
    color: "#FF3B30",
    fontFamily: "Quicksand_500Medium",
    fontSize: 14,
    marginRight: 10,
    flex: 1,
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
  },
  input: {
    flex: 1,
    height: "100%",
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
    height: 200,
    overflow: "hidden",
  },
});
