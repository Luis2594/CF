import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { Check, CircleAlert as AlertCircle, X } from 'lucide-react-native';
import { styles } from '@/styles/components/feedbackModal.styles';

interface FeedbackModalProps {
  visible: boolean;
  type: 'success' | 'error';
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
            <X size={20} color="#717275" />
          </TouchableOpacity>

          <View style={styles.iconContainer}>
            {type === 'success' ? (
              <View style={[styles.icon, styles.successIcon]}>
                <Check size={32} color="#4CAF50" />
              </View>
            ) : (
              <View style={[styles.icon, styles.errorIcon]}>
                <AlertCircle size={32} color="#FF3B30" />
              </View>
            )}
          </View>

          <Text style={[styles.title, type === 'error' && styles.errorTitle]}>
            {title}
          </Text>
          <Text style={styles.message}>{message}</Text>

          <TouchableOpacity
            style={[styles.button, type === 'error' && styles.errorButton]}
            onPress={onContinue}
          >
            <Text style={styles.buttonText}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}