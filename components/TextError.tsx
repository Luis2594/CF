import React from "react";
import { Text } from "react-native";
import { styles } from "@/styles/components/textError.styles";

interface TextErrorProps {
  error: string | null;
}

export default function TextError({ error }: TextErrorProps) {
  return <>{error && <Text style={styles.errorText}>{error}</Text>}</>;
}
