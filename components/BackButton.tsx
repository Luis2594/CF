import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { useLanguage } from "@/context/LanguageContext";
import { styles } from "@/styles/components/backButton.styles";

type BackButtonProps = {
  text: string;
  onPress: () => void;
};

export default function BackButton({ text, onPress }: BackButtonProps) {
  return (
    <TouchableOpacity style={styles.backButton} onPress={onPress}>
      <ChevronLeft size={24} color="#717275" />
      <Text style={styles.backText}>{text}</Text>
    </TouchableOpacity>
  );
}
