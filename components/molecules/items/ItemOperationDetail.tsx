import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "@/styles/components/itemOperationDetail.styles";
import Divider from "@/components/atoms/Divider";
import { SVG } from "@/constants/assets";
import { useLanguage } from "@/context/LanguageContext";

export interface Operation {
  operationId: string;
  description: string;
  productCode: string;
  lastPaymentDate: string;
  lastPaymentAmount: number;
  nextPaymentDate: string;
  operationType: string;
  overdueDays: number;
  overdueBalance: number;
  overduePayments: number;
  minimumPayment: number;
  outstanding: number;
  totalBalance: number;
  clientId: string;
  portfolio: string;
  currency: string;
  currencyCode: string;
  currencyISO: number;
  currencySymbol: string;
  cycle: number;

  foreignCurrency?: string;
  foreignCurrencyCode?: string;
  foreignCurrencyISO?: number;
  foreignCurrencySymbol?: string;
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
        {isMoney ? `${operation.currencySymbol} ${value}` : value}
      </Text>
    </View>
  );

  return (
    <View style={styles.cardContainer}>
      <View>
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleContainer}>
            {operation.operationType === "Préstamo" ? (
              <SVG.BAG width={25} height={25} />
            ) : (
              <SVG.CARD width={25} height={25} />
            )}
            <View style={styles.containerText}>
              <Text style={styles.cardTitle} numberOfLines={5}>
                {operation.description} - 
                <Text style={styles.cardNumber}> {operation.operationId}</Text>
              </Text>
            </View>
            <View style={styles.currencyBadge}>
              <Text style={styles.currencyText}>{operation.currency}</Text>
            </View>
          </View>
        </View>
        <Divider orientation="horizontal" color="#E6E6E7" />

        <View style={styles.operationDetails}>
          {renderDetail(
            translations.operations.overdueDays,
            operation.overdueDays
          )}
          {renderDetail(
            translations.operations.overduePayments,
            operation.overduePayments
          )}
          {renderDetail(
            translations.operations.totalBalance,
            operation.totalBalance,
            true
          )}

          {renderDetail(
            translations.operations.overdueBalance,
            operation.overdueBalance,
            true
          )}
          {renderDetail(translations.operations.cycle, operation.cycle)}

          {expanded && (
            <View>
              {renderDetail(
                translations.operations.portfolio,
                operation.portfolio
              )}
              {renderDetail(
                translations.operations.nextPaymentDate,
                operation.nextPaymentDate
              )}
              {renderDetail(
                translations.operations.lastPaymentDate,
                operation.lastPaymentDate
              )}
              {renderDetail(
                translations.operations.lastPaymentAmount,
                operation.lastPaymentAmount,
                true
              )}
              {renderDetail(
                translations.operations.pendingInstallment,
                operation.outstanding,
                true
              )}
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
