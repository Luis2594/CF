import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import type { BiometricType } from "../hooks/useBiometrics";
import { useLanguage } from "@/context/LanguageContext";

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
          <Text style={styles.title}>
            {translations.textsBiometrics(biometricType, "title")}
          </Text>

          <Text style={styles.description}>
            {translations.textsBiometrics(biometricType, "description")}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={styles.button} onPress={onSkip}>
              <Text style={styles.cancelButtonText}>
                {translations.disableBiometrics}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onEnable}>
              <Text style={styles.okButtonText}>
                {translations.enableBiometrics}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
    width: "90%",
    maxWidth: 400,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    right: 16,
    top: 16,
    padding: 8,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(76, 102, 159, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: "Quicksand_700Bold",
    color: "#333",
    marginBottom: 12,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    fontFamily: "Quicksand_400Regular",
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 12,
  },
  okButtonText: {
    color: "#F04E23",
    fontSize: 16,
    fontFamily: "Quicksand_600SemiBold",
  },
  cancelButtonText: {
    color: "#00AEEF",
    fontSize: 16,
    fontFamily: "Quicksand_500Medium",
  },
});
