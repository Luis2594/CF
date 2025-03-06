import React, { useState } from 'react';
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
} from 'react-native';
import { router } from 'expo-router';
import { Eye, EyeOff, Scan } from 'lucide-react-native';
import { useLanguage } from '../context/LanguageContext';
import { useTerms } from '../context/TermsContext';
import LogoSvg from '../assets/images/logo.svg';
import RadarWavesSvg from '../assets/images/radar-waves.svg';
import Dropdown from '../components/Dropdown';
import { costaRicanBanks } from '../data/banks';

export default function Login() {
  const { language } = useLanguage();
  const { hasAcceptedTerms } = useTerms();
  const [institution, setInstitution] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = () => {
    // Reset error state
    setError(null);

    // Validate form
    if (!institution) {
      setError(
        language === 'es'
          ? 'Seleccione una institución'
          : 'Please select an institution'
      );
      return;
    }

    if (!username) {
      setError(
        language === 'es' ? 'Ingrese su usuario' : 'Please enter your username'
      );
      return;
    }

    if (!password) {
      setError(
        language === 'es'
          ? 'Ingrese su contraseña'
          : 'Please enter your password'
      );
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);

      // // Check if user has accepted terms
      // if (hasAcceptedTerms) {
      //   // User has accepted terms, navigate to home
      //   router.replace('/(tabs)');
      // } else {
      //   // User has not accepted terms, navigate to terms acceptance screen
      //   router.replace('/terms-acceptance');
      // }
      router.replace('/terms-acceptance');
    }, 1500);
  };

  const handleFaceIdLogin = () => {
    // Handle Face ID login - would also need to check terms acceptance
    console.log('Face ID login');

    // For demo purposes, we'll use the same logic as regular login
    // if (hasAcceptedTerms) {
    //   router.replace('/(tabs)');
    // } else {
    //   router.replace('/terms-acceptance');
    // }

    router.replace('/terms-acceptance');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSelectInstitution = (item: { value: string; label: string }) => {
    setInstitution(item.value);
    setError(null); // Clear error when user makes a selection
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.logoContainer}>
            <LogoSvg width={300} height={90} />
          </View>

          <Text style={styles.welcomeText}>
            {language === 'es' ? 'Bienvenido' : 'Welcome'}
          </Text>

          <View style={styles.form}>
            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            <Text style={styles.inputLabel}>
              {language === 'es' ? 'Institución' : 'Institution'}
            </Text>
            <Dropdown
              items={costaRicanBanks}
              selectedValue={institution}
              onSelect={handleSelectInstitution}
              placeholder={language === 'es' ? 'Institución' : 'Institution'}
              containerStyle={styles.dropdownContainer}
              dropdownStyle={styles.dropdown}
              textStyle={styles.dropdownText}
            />

            <Text style={styles.inputLabel}>
              {language === 'es' ? 'Usuario' : 'Username'}
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={language === 'es' ? 'Usuario' : 'Username'}
                value={username}
                onChangeText={(text) => {
                  setUsername(text);
                  setError(null);
                }}
                autoCapitalize="none"
                placeholderTextColor="#BBBBBB"
              />
            </View>

            <Text style={styles.inputLabel}>
              {language === 'es' ? 'Contraseña' : 'Password'}
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={language === 'es' ? 'Contraseña' : 'Password'}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setError(null);
                }}
                secureTextEntry={!showPassword}
                placeholderTextColor="#BBBBBB"
              />
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={styles.eyeIcon}
              >
                {showPassword ? (
                  <EyeOff size={20} color="#666666" />
                ) : (
                  <Eye size={20} color="#666666" />
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.faceIdContainer}
              onPress={handleFaceIdLogin}
            >
              <Text style={styles.recoverText}>
                {language === 'es'
                  ? 'Recuperar contraseña'
                  : 'Recover password'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.loginButton,
                institution && username && password && styles.loginButtonEnable,
                isLoading && styles.loginButtonDisabled,
              ]}
              onPress={handleLogin}
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
                {isLoading
                  ? language === 'es'
                    ? 'Iniciando sesión...'
                    : 'Logging in...'
                  : language === 'es'
                  ? 'Iniciar sesión'
                  : 'Login'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.faceIdContainer}
              onPress={handleFaceIdLogin}
            >
              <Text style={styles.faceIdText}>
                {language === 'es'
                  ? 'o ingrese con face ID'
                  : 'or login with face ID'}
              </Text>
              <Scan size={24} color="#0096FF" />
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.radarWavesContainer}>
          <RadarWavesSvg width="100%" height={200} fill="#F34A2D" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  keyboardAvoid: {
    flex: 1,
    marginHorizontal: 20,
    backgroundColor: '#F5F5F6',
    borderRadius: 20,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    paddingBottom: 200, // Extra padding to account for the radar waves
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 25,
  },
  welcomeText: {
    fontSize: 28,
    fontFamily: 'Quicksand_700Bold',
    color: '#666666',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  form: {
    width: '100%',
  },
  errorContainer: {
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontFamily: 'Quicksand_500Medium',
    fontSize: 14,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: 'Quicksand_500Medium',
    color: '#666666',
    marginBottom: 5,
  },
  dropdownContainer: {
    marginBottom: 10,
    height: 44,
  },
  dropdown: {
    backgroundColor: 'white',
    borderRadius: 30,
    height: 44,
  },
  dropdownText: {
    fontFamily: 'Quicksand_500Medium',
    color: '#666666',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    marginBottom: 10,
    paddingHorizontal: 20,
    height: 44,
  },
  input: {
    flex: 1,
    height: '100%',
    fontFamily: 'Quicksand_500Medium',
    fontSize: 16,
    color: '#666666',
  },
  eyeIcon: {
    padding: 8,
  },
  loginButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    height: 48,
  },
  loginButtonEnable: {
    backgroundColor: '#F04E23',
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    fontSize: 16,
    fontFamily: 'Quicksand_700SemiBold',
  },
  loginButtonTextEnable: {
    color: 'white',
  },
  faceIdContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recoverText: {
    fontFamily: 'Quicksand_400Medium',
    fontSize: 16,
    color: '#F04E23',
    marginBottom: 10,
  },
  faceIdText: {
    fontFamily: 'Quicksand_500Medium',
    fontSize: 16,
    color: '#0093D4',
    marginRight: 8,
  },
  radarWavesContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    overflow: 'hidden',
  },
});
