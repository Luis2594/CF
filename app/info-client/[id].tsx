import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react-native";
import { useLanguage } from "../../context/LanguageContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "@/constants/storage";
import { styles } from "@/styles/info-client.styles";
import Avatar from "@/components/atoms/Avatar";
import ItemInfoClient, {
  Client,
} from "@/components/molecules/items/ItemInfoClient";
import CardOperations from "./CardOperations";
import Tabs, { TabType } from "./Tabs";
import CardHistory from "./CardHistory";
import { getInitials } from "@/utils/utils";

export default function InfoClientScreen() {
  const { id } = useLocalSearchParams();
  const { language, translations, setLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>("information");
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLanguage('en');
    const loadClientData = async () => {
      try {
        const storedClient = await AsyncStorage.getItem(
          STORAGE_KEYS.SELECTED_CLIENT
        );
        if (storedClient) {
          const parsedClient = JSON.parse(storedClient);
          if (parsedClient.clientId.toString() === id) {
            setClient(parsedClient);
          } else {
            setError(translations.clients.errors.notFound);
          }
        } else {
          setError(translations.clients.errors.noData);
        }
      } catch (error) {
        console.error("Error loading client data:", error);
        setError(translations.clients.errors.loading);
      } finally {
        setLoading(false);
      }
    };

    loadClientData();
  }, [id, language, translations]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>
          {translations.clients.loading}
        </Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ChevronLeft size={20} color="#666" />
      </TouchableOpacity>

      <View style={styles.containerInfo}>
        <Avatar
          name={getInitials(client?.name)}
          customStyleContainer={styles.avatar}
        />

        <Text style={styles.name}>{client?.name}</Text>
        <Text style={styles.portfolioType}>
          {translations.client.portfolioGroup}:{" "}
          <Text style={styles.portfolioValue}>{translations.client.consumption}</Text>
        </Text>

        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <ScrollView style={styles.content}>
          {activeTab === "information" && <ItemInfoClient client={client} />}
          {activeTab === "operations" && <CardOperations client={client} />}
          {activeTab === "history" && <CardHistory client={client} />}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}