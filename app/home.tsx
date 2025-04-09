import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import { useEffect, useState } from "react";
import { LogOut } from "lucide-react-native";
import { router } from "expo-router";
import { useLanguage } from "../context/LanguageContext";
import { useUser } from "@/hooks/useUser";
import { useGestion } from "@/hooks/useGestion";
import { useLocationPermissions } from "@/hooks/useLocationPermissions";
import { Client, useClient } from "@/hooks/useClient";
import AlertErrorMessage from "@/components/molecules/alerts/AlertErrorMessage";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";

export default function HomeScreen() {
  const { language, translations } = useLanguage();
  const { user, loadingUser, errorUser } = useUser();
  const { clients, loadingClient, getClients, saveClient, clearClientData } =
    useClient();
  const { getDataToUseInGestion, errorGestion } =
    useGestion();
  const { status, requestPermissions, errorMsg } = useLocationPermissions();

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user.token) {
      getClients(user.token);
      getDataToUseInGestion(user.token);
    }
  }, [user]);

  useEffect(() => {
    if (errorUser || errorGestion || errorMsg) {
      setError(errorUser || errorGestion || errorMsg);
    }
  }, [errorUser, errorGestion, errorMsg]);

  useEffect(() => {
    if (status === "denied" || status === "undetermined") {
      Alert.alert(
        translations.locationPermissions.title,
        translations.locationPermissions.message,
        [
          {
            text: translations.locationPermissions.allow,
            onPress: requestPermissions,
          },
          {
            text: translations.locationPermissions.cancel,
            style: "cancel",
          },
        ]
      );
    }
  }, [status, language]);

  const handleClientPress = async (client: Client) => {
    await saveClient(client);
    router.push(`/info-client/${client.clientId}`);
  };

  const renderClient = ({ item }: { item: Client }) => (
    <TouchableOpacity onPress={() => handleClientPress(item)}>
      <View style={styles.clientCard}>
        <View style={styles.clientHeader}>
          <Text style={styles.clientName}>{item.name}</Text>
          <View
            style={[
              styles.statusIndicator,
              item.status === 1 ? styles.statusPending : styles.statusVisited,
            ]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <AlertErrorMessage error={error} onClose={() => setError(null)} />
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello {user.name}</Text>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            signOut(auth)
              .then(() => router.replace("/login"))
              .catch(console.error);
          }}
          activeOpacity={0.7}
        >
          <LogOut size={20} color="#FF3B30" />
          <Text style={styles.logoutText}>
            {language === "es" ? "Cerrar Sesión" : "Logout"}
          </Text>
        </TouchableOpacity>
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {loadingUser || loadingClient ? (
        <View style={styles.centerContainer}>
          <Text style={styles.loadingText}>{translations.clients.loading}</Text>
        </View>
      ) : clients.length > 0 ? (
        <FlatList
          data={clients}
          renderItem={renderClient}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.clientList}
        />
      ) : (
        <View style={styles.centerContainer}>
          <Text style={styles.noDataText}>
            {translations.clients.noClients}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  greeting: {
    fontSize: 24,
    fontFamily: "Quicksand_700Bold",
    color: "#333",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 59, 48, 0.1)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  logoutText: {
    marginLeft: 8,
    color: "#FF3B30",
    fontSize: 14,
    fontFamily: "Quicksand_600SemiBold",
  },
  errorContainer: {
    backgroundColor: "rgba(255, 59, 48, 0.1)",
    padding: 16,
    margin: 16,
    borderRadius: 8,
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 14,
    fontFamily: "Quicksand_500Medium",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    fontFamily: "Quicksand_500Medium",
    color: "#666",
  },
  noDataText: {
    fontSize: 16,
    fontFamily: "Quicksand_500Medium",
    color: "#666",
  },
  clientList: {
    padding: 16,
  },
  clientCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  clientHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  clientName: {
    fontSize: 18,
    fontFamily: "Quicksand_600SemiBold",
    color: "#333",
    flex: 1,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: 8,
  },
  statusPending: {
    backgroundColor: "#FF3B30",
  },
  statusVisited: {
    backgroundColor: "#34C759",
  },
  clientInfo: {
    gap: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: "Quicksand_600SemiBold",
    color: "#666",
    width: 80,
  },
  infoValue: {
    fontSize: 14,
    fontFamily: "Quicksand_400Regular",
    color: "#333",
    flex: 1,
  },
});
