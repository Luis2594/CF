import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "@/styles/components/itemOperationSection.styles";
import Divider from "@/components/atoms/Divider";
import { SVG } from "@/constants/assets";

interface ItemOperationSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export default function ItemOperationSection({
  title,
  icon,
  children,
}: ItemOperationSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.operationSection}>
      <TouchableOpacity onPress={toggleExpand}>
        <View style={styles.operationHeader}>
          {icon}
          <Text style={styles.operationTitle}>{title}</Text>
          {isExpanded ? (
            <SVG.CHEVRON_UP width={24} height={24} />
          ) : (
            <SVG.CHEVRON_DOWN width={24} height={24} />
          )}
        </View>
      </TouchableOpacity>

      {isExpanded && <Divider orientation="horizontal" color="#E6E6E7" />}

      {isExpanded && <View pointerEvents="auto">{children}</View>}
    </View>
  );
}
