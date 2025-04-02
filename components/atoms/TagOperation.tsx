import React from "react";
import { Text, View, ViewStyle } from "react-native";
import { styles } from "@/styles/components/tagOperation.styles";

interface TagOperationProps {
  text: string;
  visible?: boolean;
  color?: string;
  customContainerStyle?: ViewStyle;
}

export default function TagOperation(props: TagOperationProps) {
  const {
    text,
    visible = true,
    color = "#F04E23",
    customContainerStyle,
  } = props;
  return (
    <>
      {visible && (
        <View style={styles.shadowWrapper}>
          <View style={[styles.container, customContainerStyle]}>
            <View style={[styles.indicator, { backgroundColor: color }]} />
            <Text style={styles.text}>{text}</Text>
          </View>
        </View>
      )}
    </>
  );
}
