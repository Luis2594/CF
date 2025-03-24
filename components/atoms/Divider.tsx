import React from "react";
import { getStyles } from "@/styles/components/divider.styles";
import { View } from "react-native";

interface DividerProps {
  orientation: "vertical" | "horizontal";
  color?: string;
  thickness?: number;
}

export default function Divider({
  orientation,
  color = "#D0D0D1",
  thickness = 2,
}: DividerProps) {
  const styles = getStyles(color, thickness);

  return (
    <View
      style={orientation === "vertical" ? styles.dividerV : styles.dividerH}
    />
  );
}
