import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Eye, EyeOff, Info, Calendar } from "lucide-react-native"; // Íconos
import { styles } from "@/styles/components/customInput.styles";
import TextError from "../atoms/TextError";
import { SVG } from "@/constants/assets";

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
  currency?: string; // Nuevo: Indica si el input tiene prefijo de moneda
  isDate?: boolean; // Nuevo: Indica si el input es una fecha
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
  currency,
  isDate = false,
}: CustomInputProps) {
  const [secureText, setSecureText] = useState(isPassword);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Manejar selección de fecha
  const onChangeDate = (date: Date) => {
    setShowDatePicker(false);
    if (date) {
      onChangeText &&
        onChangeText(
          date.toLocaleDateString() // Formato dd/mm/yyyy
        );
    }
  };

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

      {/* Input Container */}
      <View style={[styles.inputContainer, isDisabled && styles.inputDisabled]}>
        {/* Prefijo de moneda */}
        {currency && (
          <Text style={styles.prefix}>{currency === "320" ? "₡" : "$"}</Text>
        )}

        {/* Input */}
        <TextInput
          style={[
            styles.input,
            isDisabled && styles.inputDisabledText,
            currency && styles.inputWithPrefix,
          ]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          editable={!isDisabled && !isDate}
          onPress={() => {
            if (isDate) {
              setShowDatePicker(true);
            }
          }}
          placeholderTextColor="#D0D0D1"
          secureTextEntry={secureText} // Ocultar texto si es contraseña
          keyboardType={currency ? "numeric" : "default"} // Solo números si es moneda
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

        {/* Botón de calendario */}
        {isDate && <SVG.CALENDAR width={20} height={20} />}
      </View>

      {/* DateTimePicker para seleccionar fecha */}
      <DateTimePickerModal
        isVisible={isDate && showDatePicker}
        mode="date"
        onConfirm={onChangeDate}
        onCancel={() => setShowDatePicker(false)}
      />

      {/* Error message */}
      {errorMessage && <TextError error={errorMessage} />}
    </View>
  );
}
