import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, Platform } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import { Camera as CameraIcon, X, RotateCcw } from 'lucide-react-native';
import { useLanguage } from '@/context/LanguageContext';
import { styles } from '@/styles/components/cameraModal.styles';

interface CameraModalProps {
  visible: boolean;
  onClose: () => void;
  onCapture: (photo: any) => void;
  type: 'front' | 'back';
  toggleType: () => void;
}

export default function CameraModal({ visible, onClose, onCapture, type, toggleType }: CameraModalProps) {
  const cameraRef = useRef<Camera>(null);
  const { translations } = useLanguage();

  const handleCapture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: true,
      });
      onCapture(photo);
    }
  };

  if (Platform.OS === 'web') {
    return (
      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.webMessage}>{translations.camera.notAvailable}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>{translations.camera.close}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.container}>
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          type={type}
        >
          <View style={styles.controls}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X color="white" size={24} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.captureButton} onPress={handleCapture}>
              <CameraIcon color="white" size={32} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.flipButton} onPress={toggleType}>
              <RotateCcw color="white" size={24} />
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
    </Modal>
  );
}