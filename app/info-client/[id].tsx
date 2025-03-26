import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react-native";
import { useLanguage } from "../../context/LanguageContext";
import { styles } from "@/styles/info-client.styles";
import Avatar from "@/components/atoms/Avatar";
import ItemInfoClient from "@/components/molecules/items/ItemInfoClient";
import CardOperations from "./CardOperations";
import Tabs, { TabType } from "./Tabs";
import CardHistory from "./CardHistory";
import { getInitials } from "@/utils/utils";
import AlertErrorMessage from "@/components/molecules/alerts/AlertErrorMessage";
import { useClient } from "@/hooks/useClient";

export default function InfoClientScreen() {
  const { id } = useLocalSearchParams();
  const { client, loadingClient, errorClient, setError, getClient } =
    useClient();
  const { translations } = useLanguage();

  const [activeTab, setActiveTab] = useState<TabType>("information");

  useEffect(() => {
    getClient(id.toString());
  }, []);

  if (loadingClient) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>{translations.clients.loading}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <AlertErrorMessage error={errorClient} onClose={() => setError(null)} />
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
          <Text style={styles.portfolioValue}>{client?.portfolio}</Text>
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
