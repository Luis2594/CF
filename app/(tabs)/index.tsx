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
import { getAuth, signOut } from "firebase/auth";
import { router } from "expo-router";
import { useLanguage } from "../../context/LanguageContext";
import TestList from "../../components/organism/list/TestList";
import { STORAGE_KEYS } from "@/constants/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "@/hooks/useUser";
import { useGestion } from "@/hooks/useGestion";

interface Operation {
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

interface Management {
  id: string;
  date: string;
  action: string;
  result: string;
  comment: string;
  manager: string;
  portfolio: string;
  contactPhone: string;
}

interface Client {
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

export default function HomeScreen() {
  const { language, translations } = useLanguage();
  const { user, clients, loadingUser, errorUser } = useUser();
  const { fetchActionsResults, fetchReasonsNoPayment, errorGestion } =
    useGestion();

  const [error, setError] = useState<string | null>(null);

  const auth = getAuth();

  useEffect(() => {
    if (user.token) {
      Promise.all([
        fetchActionsResults(user.token),
        fetchReasonsNoPayment(user.token),
      ]);
    }
  }, [user]);

  useEffect(() => {
    if (errorUser || errorGestion) {
      setError(errorUser || errorGestion);
    }
  }, [errorUser, errorGestion]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        router.replace("/login");
      })
      .catch((error) => {
        console.error("Logout error:", error);
        Alert.alert(
          "Error",
          language === "es"
            ? "Error al cerrar sesión. Por favor intente de nuevo."
            : "Error logging out. Please try again.",
          [{ text: "OK" }]
        );
      });
  };

  const handleClientPress = (client: Client) => {
    // Store the selected client in AsyncStorage before navigation
    AsyncStorage.setItem(STORAGE_KEYS.SELECTED_CLIENT, JSON.stringify(client))
      .then(() => {
        router.push(`/info-client/${client.clientId}`);
      })
      .catch((error) => {
        console.error("Error storing client data:", error);
        // Navigate anyway even if storage fails
        router.push(`/info-client/${client.clientId}`);
      });
  };

  const renderClient = ({ item }: { item: Client }) => (
    <TouchableOpacity onPress={() => handleClientPress(item)}>
      <View style={styles.clientCard}>
        <View style={styles.clientHeader}>
          <Text style={styles.clientName}>{item.name}</Text>
          {/* <View
            style={[
              styles.statusIndicator,
              item.status === 1 ? styles.statusPending : styles.statusVisited,
            ]}
          /> */}
        </View>
        {/* <View style={styles.clientInfo}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Region:</Text>
            <Text style={styles.infoValue}>{item.addressLevel1}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>City:</Text>
            <Text style={styles.infoValue}>{item.addressLevel2}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Portfolio:</Text>
            <Text style={styles.infoValue}>
              {item.operations[0]?.operationType || "N/A"}
            </Text>
          </View>
        </View> */}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello {user.name}</Text>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
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

      {loadingUser ? (
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

      <TestList language={language} />
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
