import React from "react";
import { View, Text } from "react-native";
import { styles } from "@/styles/components/itemInfoClient.styles";
import { useLanguage } from "@/context/LanguageContext";
import { Client } from "@/hooks/useClient";
import { SVG } from "@/constants/assets";

export default function ItemInfoClient({ client }: { client: Client | null }) {
  const { translations } = useLanguage();

  const clientInfo = [
    { label: translations.client.info.identification, value: client?.id },
    { label: translations.client.info.code, value: client?.clientId },
    {
      label: translations.client.info.civilStatus,
      value: client?.civilStatus,
    },
    { label: translations.client.info.position, value: client?.jobPosition },
    { label: translations.client.info.address, value: client?.address },
    { label: translations.client.info.cycle, value: client?.cycle },
    client?.personalPhoneNumber && {
      label: translations.client.info.mobilePhone,
      value: client.personalPhoneNumber,
    },
    client?.homePhoneNumber && {
      label: translations.client.info.homePhone,
      value: client.homePhoneNumber,
    },
    client?.workPhoneNumber && {
      label: translations.client.info.workPhone,
      value: client.workPhoneNumber,
    },
    client?.workPhoneNumber2 && {
      label: translations.client.info.workPhone,
      value: client.workPhoneNumber2,
    },
  ].filter(Boolean);

  return (
    <View>
      {client?.status === 2 && (
        <View style={styles.tagIsVisited}>
          <SVG.CHECK_CIRCLE width={20} height={20} />
          <Text style={styles.textIsVisited}>
            {translations.client.info.isVisited}
          </Text>
        </View>
      )}
      <View style={{ width: "100%", paddingHorizontal: 22 }}>
        <View style={styles.shadowWrapper}>
          <View style={styles.infoContainer}>
            {clientInfo.map(({ label, value }, index) => (
              <View key={index} style={styles.infoRow}>
                <Text style={styles.infoLabel}>{label}</Text>
                <Text style={styles.infoValue}>{value}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}
