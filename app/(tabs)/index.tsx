import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { LogOut } from 'lucide-react-native';
import { getAuth, signOut } from "firebase/auth";
import { router } from 'expo-router';
import { useLanguage } from '../../context/LanguageContext';
import TestList from '../../components/TestList';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { useOfflineSync } from '@/hooks/useOfflineSync';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

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
      // Implement sync logic here when needed
      console.log('Syncing client:', clientId, data);
    }
  });

  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    // Get the current user's claims
    const getCurrentUser = async () => {
      const user = auth.currentUser;
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        if (idTokenResult.claims.name) {
          setName(idTokenResult.claims.name);
        }

        // Fetch clients
        try {
          const getClientsFn = httpsCallable(functions, 'getClients');
          const result = await getClientsFn({ token: idTokenResult.claims.token });
          
          if (result.data.success) {
            setClients(applyPendingChanges(result.data.data));
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

  const renderClient = ({ item }: { item: Client }) => (
    <View style={styles.clientCard}>
      <Text style={styles.clientName}>{item.name}</Text>
      <Text style={styles.clientDetails}>{item.email}</Text>
      <Text style={styles.clientDetails}>{item.phone}</Text>
      <Text style={styles.clientDetails}>{item.address}</Text>
    </View>
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
  clientName: {
    fontSize: 18,
    fontFamily: 'Quicksand_600SemiBold',
    color: '#333',
    marginBottom: 8,
  },
  clientDetails: {
    fontSize: 14,
    fontFamily: 'Quicksand_400Regular',
    color: '#666',
    marginBottom: 4,
  },
});