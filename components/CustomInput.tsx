import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Eye, EyeOff, Info } from "lucide-react-native"; // Íconos para el ojo y el tooltip
import { styles } from "@/styles/components/customInput.styles";

type CustomInputProps = {
  label: string;
  value: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  errorMessage?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  showTooltip?: boolean;
  isPassword?: boolean;
};

export default function CustomInput({
  label,
  value,
  onChangeText,
  placeholder,
  errorMessage,
  isRequired = false,
  isDisabled = false,
  showTooltip = false,
  isPassword = false,
}: CustomInputProps) {
  const [secureText, setSecureText] = useState(isPassword);

  return (
    <View style={styles.container}>
      {/* Label del input */}
      <View style={styles.labelContainer}>
        <Text style={styles.label}>
          {label} {isRequired && <Text style={styles.asterisk}>*</Text>}
        </Text>
        {showTooltip && (
          <TouchableOpacity>
            <Info size={16} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      {/* Input */}
      <View style={[styles.inputContainer, isDisabled && styles.inputDisabled]}>
        <TextInput
          style={[styles.input, isDisabled && styles.inputDisabledText]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          editable={!isDisabled}
          placeholderTextColor="#D0D0D1"
          secureTextEntry={secureText} // Ocultar texto si es una contraseña
        />

        {/* Botón para mostrar/ocultar contraseña */}
        {isPassword && (
          <TouchableOpacity
            onPress={() => setSecureText(!secureText)}
            style={styles.eyeIcon}
          >
            {secureText ? (
              <Eye size={20} color="#666" />
            ) : (
              <EyeOff size={20} color="#666" />
            )}
          </TouchableOpacity>
        )}
      </View>

      {/* Error message */}
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
}
