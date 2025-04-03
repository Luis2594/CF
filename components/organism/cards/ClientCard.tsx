import React from "react";
import { View, Text, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { styles } from "@/styles/components/clientCard.styles";
import { Client } from "@/hooks/useClient";
import { useLanguage } from "@/context/LanguageContext";
import { SVG } from "@/constants/assets";
import Divider from "@/components/atoms/Divider";

interface ClientCardProps {
  client: Client;
  onPress: () => void;
}

export default function ClientCard({ client, onPress }: ClientCardProps) {
  const { translations } = useLanguage();
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.shadowWrapper}>
        <View style={styles.clientCard}>
          <View style={styles.clientHeader}>
            <SVG.USER width={14} height={14} />
            <Text style={styles.clientName}>{client.name}</Text>
            <View
              style={[
                styles.statusIndicator,
                client.status === 1
                  ? styles.statusPending
                  : styles.statusVisited,
              ]}
            />
            <Text style={styles.textStatus}>
              {client.status === 1
                ? translations.home.client.statusTypes.pending
                : translations.home.client.statusTypes.visited}
            </Text>
          </View>

          <Divider orientation="horizontal" thickness={1} color="#E6E6E7" />

          <View style={styles.clientInfo}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>
                {translations.home.client.card.region}
              </Text>
              <Text style={styles.infoLabel}>
                {translations.home.client.card.state}
              </Text>
              <Text style={styles.infoLabel}>
                {translations.home.client.card.portfolioGroup}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, styles.infoValue]}>
                {client.addressLevel1}
              </Text>
              <Text style={[styles.infoLabel, styles.infoValue]}>
                {client.addressLevel2}
              </Text>
              <Text style={[styles.infoLabel, styles.infoValue]}>
                {client.portfolio}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
