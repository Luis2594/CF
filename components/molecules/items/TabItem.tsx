import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { styles } from "@/styles/components/tabItem.styles";

type TabItemProps = {
  label: string;
  isActive: boolean;
  onPress: () => void;
};

const TabItem: React.FC<TabItemProps> = ({ label, isActive, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.tab, isActive && styles.activeTab]}
      onPress={onPress}
    >
      <Text style={[styles.tabText, isActive && styles.activeTabText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default TabItem;
