import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, SectionList, Text, View } from "react-native";
import { styles } from "@/styles/components/listClients.styles";
import { useLanguage } from "@/context/LanguageContext";
import ClientCard from "../cards/ClientCard";
import { Client, useClient } from "@/hooks/useClient";
import { router } from "expo-router";

interface Section {
  title: string;
  data: Client[];
}

interface ListClientsProps {
  user: any;
  searchQuery: string;
  filterId: string;
}

export default function ListClients({
  user,
  searchQuery,
  filterId,
}: ListClientsProps) {
  const { translations, isLanguageLoaded } = useLanguage();
  const { clients, loadingClient, getClients, saveClient } = useClient();

  const [filteredClients, setFilteredClients] = useState<Client[]>(clients);

  useEffect(() => {
    if (user.token) {
      getClients(user.token);
    }
  }, [user]);

  useEffect(() => {
    setFilteredClients(clients);
  }, [clients]);

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    handleFilterSelect(filterId);
  }, [filterId]);

  const sections = useMemo(() => {
    if (!isLanguageLoaded || !translations.home?.client) return [];

    const grouped = filteredClients.reduce(
      (acc: { [key: string]: Client[] }, client) => {
        const region =
          client.addressLevel2 || translations.home.client.noRegion;
        if (!acc[region]) {
          acc[region] = [];
        }
        acc[region].push(client);
        return acc;
      },
      {}
    );

    return Object.entries(grouped)
      .map(([title, data]) => ({ title, data }))
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [filteredClients, translations, isLanguageLoaded]);

  const handleFilterSelect = (filterId: string) => {
    const filtered = clients.filter((client) => {
      if (filterId === "all") return true;
      if (filterId === "pending") return client.status === 1;
      if (filterId === "visited") return client.status === 2;
      return true;
    });
    setFilteredClients(filtered);
  };

  const handleSearch = (text: string) => {
    const filterByStatus =
      filterId === "pending" ? 1 : filterId === "visited" ? 2 : null;
    const lowerText = text.toLowerCase();

    const filtered = clients.filter((client) => {
      const matchesText = lowerText
        ? client.name.toLowerCase().includes(lowerText) ||
          client.id.toLowerCase().includes(lowerText) ||
          client.portfolio.toLowerCase().includes(lowerText)
        : true;

      return filterByStatus
        ? matchesText && client.status === filterByStatus
        : matchesText;
    });

    setFilteredClients(filtered);
  };

  const handleClientPress = async (client: Client) => {
    await saveClient(client);
    router.push(`/info-client/${client.clientId}`);
  };

  const renderSectionHeader = ({ section }: { section: Section }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
    </View>
  );

  if (loadingClient || !user.token) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={"#F04E23"} />
        <Text style={styles.loadingText}>{translations.clients.loading}</Text>
      </View>
    );
  }

  if (filteredClients.length === 0) {
    return (
      <View style={styles.searchContainer}>
        <Text style={styles.loadingText}>
          {searchQuery
            ? translations.clients.noSearchResults
            : translations.clients.noClients}
        </Text>
      </View>
    );
  }

  return (
    <SectionList
      sections={sections}
      renderItem={({ item }) => (
        <ClientCard client={item} onPress={() => handleClientPress(item)} />
      )}
      renderSectionHeader={renderSectionHeader}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      stickySectionHeadersEnabled
    />
  );
}
