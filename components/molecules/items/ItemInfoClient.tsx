import React from "react";
import { View, Text } from "react-native";
import { styles } from "@/styles/components/itemInfoClient.styles";
import { Operation } from "./ItemOperationDetail";
import { Management } from "./ItemOperationHistory";
import { useLanguage } from "@/context/LanguageContext";

export interface Client {
  clientId: number;
  name: string;
  id: string;
  personalPhoneNumber: string;
  workPhoneNumber: string | null;
  jobPosition: string;
  addressLevel1: string;
  addressLevel2: string;
  address: string;
  civilStatus: string;
  cycle: string;
  status: number;
  operations: Operation[];
  managements: Management[];
}

export default function ItemInfoClient({ client }: { client: Client | null }) {
  const { translations } = useLanguage();

  return (
    <View style={styles.infoContainer}>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>{translations.client.info.identification}</Text>
        <Text style={styles.infoValue}>{client?.id}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>{translations.client.info.civilStatus}</Text>
        <Text style={styles.infoValue}>
          {client?.civilStatus === "S" 
            ? translations.client.info.single 
            : translations.client.info.married}
        </Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>{translations.client.info.position}</Text>
        <Text style={styles.infoValue}>{client?.jobPosition}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>{translations.client.info.address}</Text>
        <Text style={styles.infoValue}>{client?.address}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>{translations.client.info.cycle}</Text>
        <Text style={styles.infoValue}>{client?.cycle}</Text>
      </View>

      {client?.personalPhoneNumber && (
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>{translations.client.info.mobilePhone}</Text>
          <Text style={styles.infoValue}>{client?.personalPhoneNumber}</Text>
        </View>
      )}
      {client?.workPhoneNumber && (
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>{translations.client.info.workPhone}</Text>
          <Text style={styles.infoValue}>{client.workPhoneNumber}</Text>
        </View>
      )}
    </View>
  );
}