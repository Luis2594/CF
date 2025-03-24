import React from "react";
import { getStyles } from "@/styles/components/avatar.styles";
import { View, Text, StyleProp, ViewStyle, TextStyle } from "react-native";

interface AvatarProps {
  name: string;
  color?: string;
  size?: number;
  customStyleContainer?: StyleProp<ViewStyle>;
  customStyleText?: StyleProp<TextStyle>;
}

export default function Avatar({
  name,
  color = "#F04E23",
  size = 100,
  customStyleContainer,
  customStyleText,
}: AvatarProps) {
  const styles = getStyles(color, size);

  return (
    <View style={[styles.avatar, customStyleContainer]}>
      <Text style={[styles.avatarText, customStyleText]}>{name}</Text>
    </View>
  );
}
