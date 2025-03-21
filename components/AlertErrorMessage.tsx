import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "@/styles/components/alertErrorMessage.styles";
import { SVG } from "../constants/assets";

interface ErrorMessageProps {
  error: string | null;
  onClose: () => void;
}

export default function AlertErrorMessage({
  error,
  onClose,
}: ErrorMessageProps) {
  return (
    <>
      {error && (
        <View style={styles.errorContainer}>
          <TouchableOpacity onPress={onClose}>
            <SVG.CLOSE width={20} height={20} />
          </TouchableOpacity>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </>
  );
}
