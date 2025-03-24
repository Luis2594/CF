import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "@/styles/components/itemOperationDetail.styles";
import { ChevronDown, ChevronUp, CreditCard } from "lucide-react-native";
import Divider from "@/components/atoms/Divider";
import { SVG } from "@/constants/assets";

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
          {renderDetail("Días vencidos", operation.overdueDays)}
          {renderDetail("Pagos vencidos", "1")}
          {renderDetail("Saldo total", operation.totalBalance, true)}
          {renderDetail("Saldo vencido", operation.overdueBalance, true)}
          {renderDetail("Saldo total", operation.minimumPayment, true)}
          {renderDetail("Ciclo", "30 días")}

          {expanded && (
            <View>
              {renderDetail("Días vencidos", operation.overdueDays)}
              {renderDetail("Pagos vencidos", "1")}
              {renderDetail("Saldo total", operation.totalBalance, true)}
              {renderDetail("Saldo vencido", operation.overdueBalance, true)}
              {renderDetail("Saldo total", operation.minimumPayment, true)}
              {renderDetail("Ciclo", "30 días")}
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
