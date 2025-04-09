import React, { useRef } from "react";
import { View, TouchableOpacity, Modal } from "react-native";
import { CameraCapturedPicture, CameraType, CameraView } from "expo-camera";
import { Camera as CameraIcon, X, RotateCcw } from "lucide-react-native";
import { styles } from "@/styles/components/cameraModal.styles";

interface CameraModalProps {
  visible: boolean;
  type: CameraType;
  onClose: () => void;
  onCapture: (photo?: CameraCapturedPicture) => void;
  toggleType: () => void;
}

export default function CameraModal({
  visible,
  type,
  onClose,
  onCapture,
  toggleType,
}: CameraModalProps) {
  const cameraRef = useRef<CameraView>(null);

  const handleCapture = async () => {
    if (cameraRef.current) {
      try {
        if (typeof cameraRef.current.takePictureAsync !== "function") {
          console.warn("Camera is not ready");
          onCapture();
          return;
        }
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.5,
          base64: true,
          skipProcessing: true,
        });
        onCapture(photo);
      } catch (error) {
        console.error("Error capturing photo:", error);
        onCapture();
      }
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.container}>
        <CameraView ref={cameraRef} style={styles.camera} facing={type}>
          <View style={styles.controls}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X color="white" size={24} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.captureButton}
              onPress={handleCapture}
            >
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
