import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Platform,
} from 'react-native';
import { Fingerprint, Scan, X } from 'lucide-react-native';
import type { BiometricType } from '../hooks/useBiometrics';

interface BiometricPromptProps {
  visible: boolean;
  onClose: () => void;
  onEnable: () => void;
  onSkip: () => void;
  biometricType: BiometricType;
  language: 'en' | 'es';
}

export default function BiometricPrompt({
  visible,
  onClose,
  onEnable,
  onSkip,
  biometricType,
  language,
}: BiometricPromptProps) {
  const getBiometricIcon = () => {
    switch (biometricType) {
      case 'fingerprint':
        return <Fingerprint size={48} color="#4c669f" />;
      case 'facial':
      case 'iris':
        return <Scan size={48} color="#4c669f" />;
      default:
        return null;
    }
  };

  const getBiometricName = () => {
    switch (biometricType) {
      case 'fingerprint':
        return language === 'es' ? 'huella digital' : 'fingerprint';
      case 'facial':
        return language === 'es' ? 'reconocimiento facial' : 'Face ID';
      case 'iris':
        return language === 'es' ? 'reconocimiento de iris' : 'iris recognition';
      default:
        return '';
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color="#666" />
          </TouchableOpacity>

          <View style={styles.iconContainer}>
            {getBiometricIcon()}
          </View>

          <Text style={styles.title}>
            {language === 'es'
              ? `¿Habilitar ${getBiometricName()}?`
              : `Enable ${getBiometricName()}?`}
          </Text>

          <Text style={styles.description}>
            {language === 'es'
              ? `Inicia sesión de forma rápida y segura usando tu ${getBiometricName()}`
              : `Sign in quickly and securely using your ${getBiometricName()}`}
          </Text>

          <TouchableOpacity style={styles.enableButton} onPress={onEnable}>
            <Text style={styles.enableButtonText}>
              {language === 'es' ? 'Habilitar' : 'Enable'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
            <Text style={styles.skipButtonText}>
              {language === 'es' ? 'Ahora no' : 'Not now'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    padding: 8,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(76, 102, 159, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Quicksand_700Bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    fontFamily: 'Quicksand_400Regular',
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  enableButton: {
    backgroundColor: '#4c669f',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  enableButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Quicksand_600SemiBold',
  },
  skipButton: {
    paddingVertical: 12,
  },
  skipButtonText: {
    color: '#666',
    fontSize: 16,
    fontFamily: 'Quicksand_500Medium',
  },
});