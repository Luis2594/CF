import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Alert, Animated } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, CreditCard, DollarSign, ChevronDown, ChevronUp } from 'lucide-react-native';
import { useLanguage } from '../../context/LanguageContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '@/constants/storage';
import { styles } from '@/styles/info-client.styles';

type TabType = 'information' | 'operations' | 'history';

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

interface OperationSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

interface HistoryItemProps {
  management: Management;
  index: number;
}

function HistoryItem({ management, index }: HistoryItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const animationHeight = useRef(new Animated.Value(0)).current;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    Animated.timing(animationHeight, {
      toValue: isExpanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.historyItem}>
      <TouchableOpacity onPress={toggleExpand}>
        <View style={styles.historyHeader}>
          <DollarSign size={24} color="#FF3B30" />
          <Text style={styles.historyTitle}>Gestión {String(index + 1).padStart(2, '0')}</Text>
          {isExpanded ? (
            <ChevronUp size={24} color="#666" />
          ) : (
            <ChevronDown size={24} color="#666" />
          )}
        </View>
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.historyDetails,
          {
            maxHeight: animationHeight.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 500],
            }),
            opacity: animationHeight,
            overflow: 'hidden',
          },
        ]}
      >
        <View style={styles.historyRow}>
          <Text style={styles.historyLabel}>Fecha gestión</Text>
          <Text style={styles.historyValue}>{management.date}</Text>
        </View>
        <View style={styles.historyRow}>
          <Text style={styles.historyLabel}>Acción</Text>
          <Text style={styles.historyValue}>{management.action}</Text>
        </View>
        <View style={styles.historyRow}>
          <Text style={styles.historyLabel}>Resultado</Text>
          <Text style={styles.historyValue}>{management.result}</Text>
        </View>
        <View style={styles.historyRow}>
          <Text style={styles.historyLabel}>Comentario</Text>
          <Text style={styles.historyValue}>{management.comment}</Text>
        </View>
        <View style={styles.historyRow}>
          <Text style={styles.historyLabel}>Contacto</Text>
          <Text style={styles.historyValue}>{management.contactPhone}</Text>
        </View>
      </Animated.View>
    </View>
  );
}

function OperationSection({ title, icon, children }: OperationSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const animationHeight = useRef(new Animated.Value(0)).current;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    Animated.timing(animationHeight, {
      toValue: isExpanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.operationSection}>
      <TouchableOpacity onPress={toggleExpand}>
        <View style={styles.operationHeader}>
          {icon}
          <Text style={styles.operationTitle}>{title}</Text>
          {isExpanded ? (
            <ChevronUp size={24} color="#666" />
          ) : (
            <ChevronDown size={24} color="#666" />
          )}
        </View>
      </TouchableOpacity>
      
      <Animated.View
        style={[
          styles.operationContent,
          {
            maxHeight: animationHeight.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 500],
            }),
            opacity: animationHeight,
          },
        ]}
      >
        {children}
      </Animated.View>
    </View>
  );
}

export default function InfoClientScreen() {
  const { id } = useLocalSearchParams();
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('information');
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadClientData = async () => {
      try {
        const storedClient = await AsyncStorage.getItem(STORAGE_KEYS.SELECTED_CLIENT);
        if (storedClient) {
          const parsedClient = JSON.parse(storedClient);
          if (parsedClient.clientId.toString() === id) {
            setClient(parsedClient);
          } else {
            setError(language === 'es' ? 'Cliente no encontrado' : 'Client not found');
          }
        } else {
          setError(language === 'es' ? 'Datos del cliente no disponibles' : 'Client data not available');
        }
      } catch (error) {
        console.error('Error loading client data:', error);
        setError(language === 'es' ? 'Error al cargar los datos del cliente' : 'Error loading client data');
      } finally {
        setLoading(false);
      }
    };

    loadClientData();
  }, [id, language]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleManage = () => {
    if (client) {
      router.push(`/gestion/${client.clientId}`);
    }
  };

  const renderInformation = () => (
    <View style={styles.infoContainer}>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Identificación</Text>
        <Text style={styles.infoValue}>{client?.id}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Estado civil</Text>
        <Text style={styles.infoValue}>{client?.civilStatus === 'S' ? 'Soltero' : 'Casado'}</Text>
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
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Teléfono móvil</Text>
        <Text style={styles.infoValue}>{client?.personalPhoneNumber}</Text>
      </View>
      {client?.workPhoneNumber && (
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Teléfono trabajo</Text>
          <Text style={styles.infoValue}>{client.workPhoneNumber}</Text>
        </View>
      )}
    </View>
  );

  const renderOperationDetails = (operation: Operation) => (
    <View style={styles.operationDetails}>
      <View style={styles.operationRow}>
        <Text style={styles.operationLabel}>Días vencidos</Text>
        <Text style={styles.operationValue}>{operation.overdueDays}</Text>
      </View>
      <View style={styles.operationRow}>
        <Text style={styles.operationLabel}>Pagos vencidos</Text>
        <Text style={styles.operationValue}>1</Text>
      </View>
      <View style={styles.operationRow}>
        <Text style={styles.operationLabel}>Saldo total</Text>
        <Text style={styles.operationValue}>{operation.totalBalance}</Text>
      </View>
      <View style={styles.operationRow}>
        <Text style={styles.operationLabel}>Saldo vencido</Text>
        <Text style={styles.operationValue}>{operation.overdueBalance}</Text>
      </View>
      <View style={styles.operationRow}>
        <Text style={styles.operationLabel}>Saldo total</Text>
        <Text style={styles.operationValue}>{operation.minimumPayment}</Text>
      </View>
      <View style={styles.operationRow}>
        <Text style={styles.operationLabel}>Ciclo</Text>
        <Text style={styles.operationValue}>30 días</Text>
      </View>
    </View>
  );

  const renderOperations = () => (
    <View style={styles.operationsContainer}>
      {client?.operations.map((operation, index) => (
        <OperationSection
          key={operation.operationId}
          title={`${operation.description} - ${operation.productCode}`}
          icon={<CreditCard size={24} color="#FF3B30" />}
        >
          {renderOperationDetails(operation)}
        </OperationSection>
      ))}

      <TouchableOpacity style={styles.manageButton} onPress={handleManage}>
        <Text style={styles.manageButtonText}>Gestionar</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHistory = () => (
    <View style={styles.historyContainer}>
      {client?.managements.map((management, index) => (
        <HistoryItem
          key={management.id}
          management={management}
          index={index}
        />
      ))}
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>
          {language === 'es' ? 'Cargando...' : 'Loading...'}
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
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft size={24} color="#666" />
        </TouchableOpacity>
        
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{client ? getInitials(client.name) : ''}</Text>
          </View>
          <Text style={styles.name}>{client?.name}</Text>
          <Text style={styles.portfolioType}>
            Grupo de cartera: <Text style={styles.portfolioValue}>Consumo</Text>
          </Text>
        </View>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'information' && styles.activeTab]}
          onPress={() => setActiveTab('information')}
        >
          <Text style={[styles.tabText, activeTab === 'information' && styles.activeTabText]}>
            Información
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'operations' && styles.activeTab]}
          onPress={() => setActiveTab('operations')}
        >
          <Text style={[styles.tabText, activeTab === 'operations' && styles.activeTabText]}>
            Operaciones
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'history' && styles.activeTab]}
          onPress={() => setActiveTab('history')}
        >
          <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>
            Historial
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'information' && renderInformation()}
        {activeTab === 'operations' && renderOperations()}
        {activeTab === 'history' && renderHistory()}
      </ScrollView>
    </SafeAreaView>
  );
}