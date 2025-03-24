import React from "react";
import { View, Text } from "react-native";
import { styles } from "@/styles/components/itemInfoClient.styles";
import { Operation } from "./ItemOperationDetail";
import { Management } from "./ItemOperationHistory";

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
  return (
    <View style={styles.infoContainer}>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Identificación</Text>
        <Text style={styles.infoValue}>{client?.id}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Estado civil</Text>
        <Text style={styles.infoValue}>
          {client?.civilStatus === "S" ? "Soltero" : "Casado"}
        </Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Puesto</Text>
        <Text style={styles.infoValue}>{client?.jobPosition}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Dirección</Text>
        <Text style={styles.infoValue}>{client?.address}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Ciclo</Text>
        <Text style={styles.infoValue}>{client?.cycle}</Text>
      </View>

      {client?.personalPhoneNumber && (
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Teléfono móvil</Text>
          <Text style={styles.infoValue}>{client?.personalPhoneNumber}</Text>
        </View>
      )}
      {client?.workPhoneNumber && (
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Teléfono trabajo</Text>
          <Text style={styles.infoValue}>{client.workPhoneNumber}</Text>
        </View>
      )}
    </View>
  );
}
