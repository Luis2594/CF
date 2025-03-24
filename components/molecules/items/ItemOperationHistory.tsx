import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "@/styles/components/itemOperationHistory.styles";
import { CreditCard } from "lucide-react-native";
import Divider from "@/components/atoms/Divider";
import { SVG } from "@/constants/assets";
import { useLanguage } from "@/context/LanguageContext";
import { formatCurrency } from "@/utils/utils";

export interface Management {
  id: string;
  date: string;
  action: string;
  result: string;
  comment: string;
  manager: string;
  portfolio: string;
  contactPhone: string;
}

interface HistoryItemProps {
  management: Management;
  index: number;
}

export default function ItemOperationHistory({ management }: HistoryItemProps) {
  const [expanded, setExpanded] = useState(false);
  const { translations } = useLanguage();

  const renderDetail = (label: string, value: string | number) => (
    <View style={styles.operationRow}>
      <Text style={styles.operationLabel}>{label}</Text>
      <Text style={styles.operationValue}>{value}</Text>
    </View>
  );

  return (
    <View style={styles.cardContainer}>
      <View>
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleContainer}>
            <SVG.FINANCE width={22} height={22} />
            <View>
              <Text style={styles.cardTitle}>
                {translations.history.management} {management.id}
              </Text>
            </View>
          </View>
        </View>

        <Divider orientation="horizontal" color="#E6E6E7" />

        <View style={styles.operationDetails}>
          {renderDetail(translations.history.managementDate, management.date)}
          {renderDetail(translations.history.action, management.action)}
          {renderDetail(translations.history.result, management.result)}
          {renderDetail(translations.history.comment, management.comment)}
          {renderDetail(translations.history.contact, management.contactPhone)}

          {expanded && (
            <View>
              {renderDetail(translations.history.manager, management.manager)}
              {renderDetail(translations.history.portfolio, management.portfolio)}
            </View>
          )}
        </View>

        <Divider orientation="horizontal" color="#E6E6E7" />

        <TouchableOpacity
          style={styles.expandButton}
          onPress={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <SVG.CHEVRON_UP width={24} height={24} />
          ) : (
            <SVG.CHEVRON_DOWN width={24} height={24} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
