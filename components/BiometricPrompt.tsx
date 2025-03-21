import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import type { BiometricType } from "../hooks/useBiometrics";
import { useLanguage } from "@/context/LanguageContext";
import { styles } from "@/styles/components/biometricPrompt.styles";
import { SVG } from "../constants/assets"; // Asegúrate de importar el ícono de cierre

interface BiometricPromptProps {
  visible: boolean;
  onClose: () => void;
  onEnable: () => void;
  onSkip: () => void;
  biometricType: BiometricType;
}

export default function BiometricPrompt({
  visible,
  onClose,
  onEnable,
  onSkip,
  biometricType,
}: BiometricPromptProps) {
  const { translations } = useLanguage();

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
            <SVG.CLOSE_SECOND width={20} height={20} />
          </TouchableOpacity>
          <View style={styles.divider} />
          <View style={styles.wrapText}>
            <Text style={styles.title}>
              {translations.textsBiometrics(biometricType, "title")}
            </Text>

            <Text style={styles.description}>
              {translations.textsBiometrics(biometricType, "description")}
            </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
                <Text style={styles.skipButtonText}>
                  {translations.disableBiometrics}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.enableButton} onPress={onEnable}>
                <Text style={styles.enableButtonText}>
                  {translations.enableBiometrics}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
