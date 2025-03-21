import React from "react";
import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ViewStyle,
} from "react-native";
import { styles } from "@/styles/components/button.styles";

type ButtonProps = {
  text: string;
  onPress: () => void;
  onPressDisable?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  variant?: "default" | "outline"; // "outline" para el estilo con borde gris
  customStyleContainer?: ViewStyle;
};

export default function Button({
  text,
  onPress,
  onPressDisable,
  disabled = false,
  isLoading = false,
  variant = "default",
  customStyleContainer = {},
}: ButtonProps) {
  const isDisabled = disabled; // Deshabilitar el botón si está cargando

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isDisabled &&
          (variant === "outline"
            ? styles.buttonDisabledOutline
            : styles.buttonDisabled),
        customStyleContainer, // Aplicar el estilo personalizado
      ]}
      onPress={!isDisabled && !isLoading ? onPress : onPressDisable}
      disabled={isDisabled && !onPressDisable}
    >
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={variant === "outline" ? "#A0A0A0" : "white"}
        />
      ) : (
        <Text
          style={[styles.buttonText, isDisabled && styles.buttonTextDisabled]}
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
}
