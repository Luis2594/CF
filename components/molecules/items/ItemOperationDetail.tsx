import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "@/styles/components/itemOperationDetail.styles";
import { CreditCard } from "lucide-react-native";
import Divider from "@/components/atoms/Divider";
import { SVG } from "@/constants/assets";
import { useLanguage } from "@/context/LanguageContext";

export interface Operation {
  operationId: number;
  description: string;
  productCode: string;
  lastPaymentDate: string;
  operationType: string;
  overdueDays: number;
  minimumPayment: number;
  overdueBalance: number;
  totalBalance: number;
  currency: string;
}

export default function ItemOperationDetail({
  operation,
}: {
  operation: Operation;
}) {
  const [expanded, setExpanded] = useState(false);
  const { translations } = useLanguage();

  const renderDetail = (
    label: string,
    value: string | number,
    isMoney?: boolean
  ) => (
    <View style={styles.operationRow}>
      <Text style={styles.operationLabel}>{label}</Text>
      <Text style={styles.operationValue}>
        {isMoney ? `₡${value.toLocaleString()}` : value}
      </Text>
    </View>
  );

  return (
    <View style={styles.cardContainer}>
      <View>
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleContainer}>
            <CreditCard size={20} color="#FF3B30" />
            <View>
              <Text style={styles.cardTitle}>{operation.description}</Text>
              <Text style={styles.cardNumber}>{operation.description}</Text>
            </View>
          </View>
          <View style={styles.currencyBadge}>
            <Text style={styles.currencyText}>Colones</Text>
          </View>
        </View>
        <Divider orientation="horizontal" color="#E6E6E7" />

        <View style={styles.operationDetails}>
          {renderDetail(translations.operations.overdueDays, operation.overdueDays)}
          {renderDetail(translations.operations.overduePayments, "1")}
          {renderDetail(translations.operations.totalBalance, operation.totalBalance, true)}
          {renderDetail(translations.operations.overdueBalance, operation.overdueBalance, true)}
          {renderDetail(translations.operations.minimumPayment, operation.minimumPayment, true)}
          {renderDetail(translations.operations.cycle, translations.operations.cycleValue)}

          {expanded && (
            <View>
              {renderDetail(translations.operations.overdueDays, operation.overdueDays)}
              {renderDetail(translations.operations.overduePayments, "1")}
              {renderDetail(translations.operations.totalBalance, operation.totalBalance, true)}
              {renderDetail(translations.operations.overdueBalance, operation.overdueBalance, true)}
              {renderDetail(translations.operations.minimumPayment, operation.minimumPayment, true)}
              {renderDetail(translations.operations.cycle, translations.operations.cycleValue)}
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