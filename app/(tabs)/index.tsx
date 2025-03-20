import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { LogOut } from 'lucide-react-native';
import { getAuth, signOut } from "firebase/auth";
import { router } from 'expo-router';
import { useLanguage } from '../../context/LanguageContext';
import TestList from '../../components/TestList';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { useOfflineSync } from '@/hooks/useOfflineSync';
import { STORAGE_KEYS } from "@/constants/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

const mockClientData = {
  success: true,
  message: "Clients returned succesful",
  clients: [
    {
      clientId: 45421,
      name: "JUANA ROSAURA LOBOS MAS",
      id: "2483650531408",
      personalPhoneNumber: "38342921",
      workPhoneNumber: null,
      jobPosition: "Auxiliar de Producción",
      addressLevel1: "Chimaltenango",
      addressLevel2: "Chimaltenango",
      address: "Sin definir,CHIMALTENANGO, ZONA 4, 03 CJ COLONIA SOCOBAL",
      civilStatus: "S",
      cycle: "Ciclo 01",
      status: 1,
      operations: [
        {
          operationId: 12180,
          description: "MIGRADA - CELULAR",
          productCode: "10539",
          lastPaymentDate: "2024-01-10",
          operationType: "Compra Tienda",
          overdueDays: 0,
          minimumPayment: 359.32,
          overdueBalance: 207.33,
          totalBalance: 1095.79,
          currency: "320"
        }
      ],
      managements: [
        {
          id: "247812",
          date: "2025-01-22",
          action: "28",
          result: "77",
          comment: "Que le vallan a recoger el dinero al trabajo que lo tiene en efectivo",
          manager: "raul.hidalgo",
          portfolio: "1",
          contactPhone: "86067979"
        }
      ]
    }
  ]
};

export default function HomeScreen() {
  const [name, setName] = useState<string>('');
  const { language, translations } = useLanguage();
  const auth = getAuth();
  const functions = getFunctions();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { 
    isOnline,
    pendingChanges,
    addPendingChange,
    applyPendingChanges,
    showOfflineAlert
  } = useOfflineSync<Client>({
    storageKey: 'clientsCache',
    language,
    onSync: async (clientId, data) => {
      console.log('Syncing client:', clientId, data);
    }
  });

  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    console.log('HOLAAA');
    const getCurrentUser = async () => {
      const user = auth.currentUser;
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        if (idTokenResult.claims.name) {
          setName(idTokenResult.claims.name);
        }

        try {
          const savedCredentials = await AsyncStorage.getItem(
            STORAGE_KEYS.LAST_LOGIN_CREDENTIALS
          );

          const savedCredentialsJSON = savedCredentials
            ? JSON.parse(savedCredentials)
            : null;

          console.log('TOKEN: ', avedCredentialsJSON?.token);
          
          const getClientsFn = httpsCallable(functions, 'getClients');
          const result = await getClientsFn({ token: savedCredentialsJSON?.token });
          
          if (result.data.success) {
            // If API returns empty data, use mock data
            const clientsData = result.data.data?.length > 0 ? result.data.data : mockClientData.clients;
            setClients(applyPendingChanges(clientsData));
          } else {
            setError(translations.clients.errors.loading);
          }
        } catch (error: any) {
          console.error('Error fetching clients:', error);
          const errorCode = error.details?.code || '007';
          setError(getErrorMessage(errorCode));
        } finally {
          setLoading(false);
        }
      }
    };

    getCurrentUser();
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      router.replace('/login');
    }).catch((error) => {
      console.error('Logout error:', error);
      Alert.alert(
        'Error',
        language === 'es'
          ? 'Error al cerrar sesión. Por favor intente de nuevo.'
          : 'Error logging out. Please try again.',
        [{ text: 'OK' }]
      );
    });
  };

  const getErrorMessage = (code: string): string => {
    const errorMessages = {
      '001': translations.clients.errors.invalidParams,
      '002': translations.clients.errors.unauthorized,
      '007': translations.clients.errors.general
    };

    return errorMessages[code as keyof typeof errorMessages] || translations.clients.errors.general;
  };

  const handleClientPress = (client: Client) => {
    // Store the selected client in AsyncStorage before navigation
    AsyncStorage.setItem(STORAGE_KEYS.SELECTED_CLIENT, JSON.stringify(client))
      .then(() => {
        router.push(`/info-client/${client.clientId}`);
      })
      .catch((error) => {
        console.error('Error storing client data:', error);
        // Navigate anyway even if storage fails
        router.push(`/info-client/${client.clientId}`);
      });
  };

  const renderClient = ({ item }: { item: Client }) => (
    <TouchableOpacity onPress={() => handleClientPress(item)}>
      <View style={styles.clientCard}>
        <View style={styles.clientHeader}>
          <Text style={styles.clientName}>{item.name}</Text>
          <View style={[styles.statusIndicator, item.status === 1 ? styles.statusPending : styles.statusVisited]} />
        </View>
        <View style={styles.clientInfo}>
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
            <Text style={styles.infoValue}>{item.operations[0]?.operationType || 'N/A'}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello{name ? `, ${name}` : ''}</Text>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <LogOut size={20} color="#FF3B30" />
          <Text style={styles.logoutText}>
            {language === 'es' ? 'Cerrar Sesión' : 'Logout'}
          </Text>
        </TouchableOpacity>
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {loading ? (
        <View style={styles.centerContainer}>
          <Text style={styles.loadingText}>
            {translations.clients.loading}
          </Text>
        </View>
      ) : clients.length > 0 ? (
        <FlatList
          data={[clients[0]]}
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
    backgroundColor: 'white',
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  greeting: {
    fontSize: 24,
    fontFamily: 'Quicksand_700Bold',
    color: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  logoutText: {
    marginLeft: 8,
    color: '#FF3B30',
    fontSize: 14,
    fontFamily: 'Quicksand_600SemiBold',
  },
  errorContainer: {
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    padding: 16,
    margin: 16,
    borderRadius: 8,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    fontFamily: 'Quicksand_500Medium',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Quicksand_500Medium',
    color: '#666',
  },
  noDataText: {
    fontSize: 16,
    fontFamily: 'Quicksand_500Medium',
    color: '#666',
  },
  clientList: {
    padding: 16,
  },
  clientCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  clientHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  clientName: {
    fontSize: 18,
    fontFamily: 'Quicksand_600SemiBold',
    color: '#333',
    flex: 1,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: 8,
  },
  statusPending: {
    backgroundColor: '#FF3B30',
  },
  statusVisited: {
    backgroundColor: '#34C759',
  },
  clientInfo: {
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: 'Quicksand_600SemiBold',
    color: '#666',
    width: 80,
  },
  infoValue: {
    fontSize: 14,
    fontFamily: 'Quicksand_400Regular',
    color: '#333',
    flex: 1,
  },
});