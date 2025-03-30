import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  SectionList,
} from "react-native";
import { useEffect, useState, useMemo, useRef } from "react";
import { LogOut, FileSliders as Sliders } from "lucide-react-native";
import { router } from "expo-router";
import { useLanguage } from "../../context/LanguageContext";
import { useUser } from "@/hooks/useUser";
import { useGestion } from "@/hooks/useGestion";
import { useLocationPermissions } from "@/hooks/useLocationPermissions";
import { Client, useClient } from "@/hooks/useClient";
import AlertErrorMessage from "@/components/molecules/alerts/AlertErrorMessage";
import FilterModal from "@/components/molecules/modals/FilterModal";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import { styles } from "@/styles/home.styles";
import CustomInput from "@/components/organism/CustomInput";
import ButtonIcon from "@/components/molecules/buttons/ButtonIcon";

const ClientCard = ({
  client,
  onPress,
  translations,
}: {
  client: Client;
  onPress: () => void;
  translations: any;
}) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.clientCard}>
      <View style={styles.clientHeader}>
        <Text style={styles.clientName}>{client.name}</Text>
        <View
          style={[
            styles.statusIndicator,
            client.status === 1 ? styles.statusPending : styles.statusVisited,
          ]}
        />
      </View>
      <View style={styles.clientInfo}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>
            <Text>{translations.home.client.portfolio}</Text>
            <Text>: </Text>
          </Text>
          <Text style={styles.infoValue}>{client.portfolio}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>
            <Text>{translations.home.client.id}</Text>
            <Text>: </Text>
          </Text>
          <Text style={styles.infoValue}>{client.id}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>
            <Text>{translations.home.client.status}</Text>
            <Text>: </Text>
          </Text>
          <Text
            style={[
              styles.infoValue,
              client.status === 1 ? styles.pendingText : styles.visitedText,
            ]}
          >
            {client.status === 1
              ? translations.home.client.statusTypes.pending
              : translations.home.client.statusTypes.visited}
          </Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

interface Section {
  title: string;
  data: Client[];
}

export default function HomeScreen() {
  const { language, translations, isLanguageLoaded } = useLanguage();
  const { user, loadingUser, errorUser } = useUser();
  const { clients, loadingClient, getClients, saveClient } = useClient();
  const { getDataToUseInGestion, errorGestion } = useGestion();
  const { status, requestPermissions, errorMsg } = useLocationPermissions();

  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredClients, setFilteredClients] = useState<Client[]>(clients);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Only create filter options when translations are loaded
  const filterOptions = useMemo(() => {
    if (!isLanguageLoaded || !translations.home?.filters) return [];
    return [
      { id: "pending", label: translations.home.filters.pending },
      { id: "visited", label: translations.home.filters.visited },
      { id: "all", label: translations.home.filters.all },
    ];
  }, [isLanguageLoaded, translations]);

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

  const anchorRef = useRef<View>(null);

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
    setFilteredClients(clients);
  }, [clients]);

  useEffect(() => {
    if (
      (isLanguageLoaded && status === "denied") ||
      status === "undetermined"
    ) {
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
  }, [status, language, isLanguageLoaded]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filtered = clients.filter(
      (client) =>
        client.name.toLowerCase().includes(text.toLowerCase()) ||
        client.id.toLowerCase().includes(text.toLowerCase()) ||
        client.portfolio.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredClients(filtered);
  };

  const handleFilterSelect = (filterId: string) => {
    setSelectedFilter(filterId);
    const filtered = clients.filter((client) => {
      if (filterId === "all") return true;
      if (filterId === "pending") return client.status === 1;
      if (filterId === "visited") return client.status === 2;
      return true;
    });
    setFilteredClients(filtered);
  };

  const handleClientPress = async (client: Client) => {
    await saveClient(client);
    router.push(`/info-client/${client.clientId}`);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => router.replace("/login"))
      .catch(console.error);
  };

  const renderSectionHeader = ({ section }: { section: Section }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <Text style={styles.sectionCount}>
        {section.data.length}{" "}
        {section.data.length === 1
          ? translations.home.client.client
          : translations.home.client.clients}
      </Text>
    </View>
  );

  const SearchBar = ({
    translations,
    onSearch,
    searchValue,
    onFilterPress,
  }: {
    translations: any;
    onSearch: (text: string) => void;
    searchValue: string;
    onFilterPress: () => void;
  }) => (
    <View style={styles.searchContainer}>
      <View style={styles.searchInputContainer}>
        <CustomInput
          label=""
          placeholder={translations.home.search.placeholder}
          onChangeText={onSearch}
          value={searchValue}
          isSearch
        />
      </View>
      <ButtonIcon
        ref={anchorRef}
        icon={Sliders}
        onPress={onFilterPress}
      />

       <ButtonIcon
        icon={Sliders}
        onPress={onFilterPress}
      />
    </View>
  );

  // Show loading state while translations are loading
  if (!isLanguageLoaded) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <AlertErrorMessage error={error} onClose={() => setError(null)} />

      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>
            {translations.home.greeting}, {user.name}
          </Text>
          <Text style={styles.subtitle}>{translations.home.subtitle}</Text>
        </View>
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

      <SearchBar
        translations={translations}
        onSearch={handleSearch}
        searchValue={searchQuery}
        onFilterPress={() => setShowFilterModal(true)}
      />

      {filterOptions.length > 0 && (
        <FilterModal
          visible={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          onSelect={handleFilterSelect}
          selectedOption={selectedFilter}
          options={filterOptions}
          anchorRef={anchorRef}
        />
      )}

      {loadingUser || loadingClient ? (
        <View style={styles.centerContainer}>
          <Text style={styles.loadingText}>{translations.clients.loading}</Text>
        </View>
      ) : filteredClients.length > 0 ? (
        <SectionList
          sections={sections}
          renderItem={({ item }) => (
            <ClientCard
              client={item}
              onPress={() => handleClientPress(item)}
              translations={translations}
            />
          )}
          renderSectionHeader={renderSectionHeader}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.clientList}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled
        />
      ) : (
        <View style={styles.centerContainer}>
          <Text style={styles.noDataText}>
            {searchQuery
              ? translations.clients.noSearchResults
              : translations.clients.noClients}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}