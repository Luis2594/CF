import { useState } from "react";
import { Platform, Linking } from "react-native";
import { CameraType, useCameraPermissions } from "expo-camera";
import { useLanguage } from "@/context/LanguageContext";

export const useCamera = () => {
  const [type, setType] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [error, setError] = useState<string | null>(null);
  const { translations } = useLanguage();

  const toggleCameraType = () => {
    setType((current) => (current === "back" ? "front" : "back"));
  };

  const handleRequestPermission = async () => {
    if (Platform.OS === "web") return; // No aplica para web

    try {
      const result = await requestPermission();

      if (!result.granted) {
        // El usuario negó el permiso
        if (result.canAskAgain) {
          setError(translations.camera.error.deniedTemporarily);
        } else {
          // El usuario bloqueó el permiso permanentemente
          setError(translations.camera.error.deniedPermanently);
          Linking.openSettings();
        }
      } else {
        setError(null); // Limpia cualquier error anterior
      }
    } catch (err) {
      setError(translations.camera.error.checking);
      console.error("Error requesting permission:", err);
    }
  };

  return {
    type,
    permission,
    error,
    toggleCameraType,
    handleRequestPermission, // Usar este en el botón
  };
};
