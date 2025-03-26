import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { styles } from "@/styles/components/feedbackModal.styles";
import { SVG } from "@/constants/assets";

interface FeedbackModalProps {
  visible: boolean;
  type: "success" | "error";
  title: string;
  message: string;
  onClose: () => void;
  onContinue: () => void;
}

export default function FeedbackModal({
  visible,
  type,
  title,
  message,
  onClose,
  onContinue,
}: FeedbackModalProps) {
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
          <View style={styles.wrapBody}>
            <View style={styles.iconContainer}>
              {type === "success" ? (
                <View style={[styles.icon, styles.successIcon]}>
                  <SVG.SUCCESS_MODAL width={36} height={36} />
                </View>
              ) : (
                <View style={[styles.icon, styles.errorIcon]}>
                  <SVG.ERROR_MODAL width={36} height={36} />
                </View>
              )}
            </View>

            <Text style={[styles.title, type === "error" && styles.errorTitle]}>
              {title}
            </Text>
            <Text style={styles.message}>{message}</Text>

            <TouchableOpacity style={styles.button} onPress={onContinue}>
              <Text style={styles.buttonText}>Continuar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
