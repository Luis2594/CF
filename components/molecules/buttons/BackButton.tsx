import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { styles } from "@/styles/components/backButton.styles";
import { router } from "expo-router";
import { useLanguage } from "@/context/LanguageContext";

type BackButtonProps = {
  text?: string;
  onPress?: () => void;
};

export default function BackButton({ text, onPress }: BackButtonProps) {
  const { translations } = useLanguage();

  const onPressBack = () => {
    if (onPress) {
      onPress();
    } else {
      router.back();
    }
  };

  return (
    <TouchableOpacity style={styles.backButton} onPress={onPressBack}>
      <ChevronLeft size={24} color="#717275" />
      <Text style={styles.backText}>{text || translations.back}</Text>
    </TouchableOpacity>
  );
}
