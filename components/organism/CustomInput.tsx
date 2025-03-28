import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  PanResponder,
  TouchableWithoutFeedback,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Eye, EyeOff, Info } from "lucide-react-native"; // Icons
import { styles } from "@/styles/components/customInput.styles";
import TextError from "../atoms/TextError";
import { SVG } from "@/constants/assets";
import numeral from "numeral";

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
  currency?: string;
  isDate?: boolean;
  isTextarea?: boolean;
  setScrollEnabled?: (enabled: boolean) => void;
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
  isTextarea = false,
  setScrollEnabled,
}: CustomInputProps) {
  const [secureText, setSecureText] = useState(isPassword);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [inputHeight, setInputHeight] = useState(44);
  const lastHeight = useRef(inputHeight);

  // Detect user's drag to change the size of the textarea
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        if (setScrollEnabled) {
          setScrollEnabled(false);
        }
      }, // Disable scroll when starting drag
      onPanResponderMove: (_, gestureState) => {
        const newHeight = Math.max(50, lastHeight.current + gestureState.dy);
        setInputHeight(newHeight);
      },
      onPanResponderRelease: () => {
        lastHeight.current = inputHeight;
        if (setScrollEnabled) {
          setScrollEnabled(true);
        }
      },
    })
  ).current;

  // Handle date selection
  const onChangeDate = (date: Date) => {
    setShowDatePicker(false);
    if (date) {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses en JavaScript empiezan desde 0
      const year = date.getFullYear();

      const formattedDate = `${day}/${month}/${year}`;
      onChangeText && onChangeText(formattedDate);
    }
  };

  const formatNumber = (text: string) => {
    // Replace comma with period only if the comma is at the end
    if (text.endsWith(",")) {
      text = text.slice(0, -1) + ".";
    }

    // Allow only numbers and one decimal point
    let numericValue = text.replace(/[^0-9.]/g, "");
    let parts = numericValue.split(".");

    if (parts.length > 2) {
      parts = [parts[0], parts.slice(1).join("")]; // Join additional decimals
    }

    if (parts[1] && parts[1].length > 2) {
      parts[1] = parts[1].slice(0, 2); // Limit to two decimals without deleting everything
    }

    // Avoid premature formatting while the user is entering data
    if (numericValue.endsWith(".")) {
      return numeral(parts[0]).format("0,0") + ".";
    }
    if (numericValue.endsWith(".0") || numericValue.endsWith(".00")) {
      return numeral(parts[0]).format("0,0") + "." + parts[1];
    }

    // Format integer part with thousands separators without affecting editing
    let integerPart = parts[0].replace(/^0+(?=\d)/, ""); // Remove leading zeros
    let formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    let formattedValue = formattedInteger;
    if (parts.length > 1) {
      formattedValue += "." + parts[1];
    }

    return formattedValue;
  };

  const handleChange = (text: string) => {
    if (onChangeText) {
      if (currency) {
        if (text === "") {
          onChangeText("");
          return;
        }
        const formattedText = formatNumber(text);
        onChangeText(formattedText);
      } else {
        onChangeText(text);
      }
    }
  };

  const onPressIsDate = () => {
    if (isDate) {
      setShowDatePicker(true);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onPressIsDate}>
      <View style={styles.container}>
        {/* Input label */}
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

        {/* Input container */}
        <View
          style={[
            styles.inputContainer,
            isDisabled && styles.inputDisabled,
            { height: inputHeight },
          ]}
        >
          {/* Currency prefix */}
          {currency && <Text style={styles.prefix}>{currency}</Text>}

          {/* Input */}
          <TextInput
            style={[
              styles.input,
              isDisabled && styles.inputDisabledText,
              currency && styles.inputWithPrefix,
              isTextarea && styles.textarea,
              isTextarea && { height: inputHeight },
            ]}
            placeholder={placeholder}
            value={value}
            onChangeText={handleChange}
            editable={!isDisabled && !isDate}
            onPress={onPressIsDate}
            placeholderTextColor="#D0D0D1"
            secureTextEntry={secureText}
            keyboardType={currency ? "numeric" : "default"}
            multiline={isTextarea}
            numberOfLines={isTextarea ? 4 : 1}
            textAlignVertical={isTextarea ? "top" : "center"}
          />

          {/* Resize handle icon */}
          {isTextarea && (
            <View {...panResponder.panHandlers} style={styles.resizeHandle}>
              <SVG.EXPAND width={12} height={12} />
            </View>
          )}

          {/* Show/Hide password button */}
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

          {/* Calendar button */}
          {isDate && <SVG.CALENDAR width={20} height={20} />}
        </View>

        {/* DateTimePicker to select date */}
        <DateTimePickerModal
          isVisible={isDate && showDatePicker}
          mode="date"
          onConfirm={onChangeDate}
          onCancel={() => setShowDatePicker(false)}
        />

        {/* Error message */}
        {errorMessage && <TextError error={errorMessage} />}
      </View>
    </TouchableWithoutFeedback>
  );
}
