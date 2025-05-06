import {
  View,
  Text,
  SafeAreaView,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useEffect, useState, useMemo, useRef } from "react";
import { router } from "expo-router";
import { useLanguage } from "../context/LanguageContext";
import { useUser } from "@/hooks/useUser";
import { useGestion } from "@/hooks/useGestion";
import { useLocationPermissions } from "@/hooks/useLocationPermissions";
import AlertErrorMessage from "@/components/molecules/alerts/AlertErrorMessage";
import FilterModal from "@/components/molecules/modals/FilterModal";
import MenuModal from "@/components/molecules/modals/MenuModal";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import { styles } from "@/styles/home.styles";
import CustomInput from "@/components/organism/CustomInput";
import ButtonIcon from "@/components/molecules/buttons/ButtonIcon";
import { SVG } from "@/constants/assets";
import ListClients from "@/components/organism/list/ListClients";

export default function HomeScreen() {
  const { language, translations, isLanguageLoaded } = useLanguage();
  const { user, errorUser } = useUser();
  const { getDataToUseInGestion, errorGestion } = useGestion();
  const { status, requestPermissions, errorMsg } = useLocationPermissions();

  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const anchorRef = useRef<View>(null);
  const menuRef = useRef<View>(null);

  // Only create filter options when translations are loaded
  const filterOptions = useMemo(() => {
    if (!isLanguageLoaded || !translations.home?.filters) return [];
    return [
      { id: "pending", label: translations.home.filters.pending },
      { id: "visited", label: translations.home.filters.visited },
      { id: "all", label: translations.home.filters.all },
    ];
  }, [isLanguageLoaded, translations]);

  useEffect(() => {
    if (user.token) {
      getDataToUseInGestion(user.token);
    }
  }, [user]);

  useEffect(() => {
    if (errorUser || errorGestion || errorMsg) {
      setError(errorUser || errorGestion || errorMsg);
    }
  }, [errorUser, errorGestion, errorMsg]);

  useEffect(() => {
    if (isLanguageLoaded && status === "undetermined") {
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

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setShowMenuModal(false);
        router.replace("/login");
      })
      .catch(console.error);
  };

  const renderHeader = (name: string) => {
    return (
      <View style={styles.header}>
        <ButtonIcon
          ref={menuRef}
          Icon={<SVG.MENU width={24} height={24} />}
          onPress={() => setShowMenuModal(true)}
          style={styles.buttonMenu}
        />
        <View style={styles.wrappGreeting}>
          <SVG.JET width={24} height={24} />
          <Text style={styles.greeting}>
            {translations.home.greeting} {name}
          </Text>
        </View>
        <Text style={styles.subtitle}>{translations.home.subtitle}</Text>
      </View>
    );
  };

  const SearchBar = () => {
    return (
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <CustomInput
            label=""
            placeholder={translations.home.search.placeholder}
            onChangeText={setSearchQuery}
            value={searchQuery}
            isSearch
          />
        </View>
        {/* {selectedFilter !== "all" && (
          <ButtonIcon Icon={<SVG.CALENDAR_GRAY width={24} height={24} />} />
        )} */}

        <ButtonIcon
          ref={anchorRef}
          Icon={<SVG.FILTER width={24} height={24} />}
          onPress={() => setShowFilterModal(true)}
        />

        {selectedFilter === "all" && (
          <ButtonIcon
            Icon={<SVG.LOCATION width={24} height={24} />}
            style={styles.buttonLocation}
            onPress={() => router.push("/map")}
          />
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <AlertErrorMessage error={error} onClose={() => setError(null)} />

      <TouchableWithoutFeedback
        style={{ flex: 1, zIndex: 1000 }}
        onPress={Keyboard.dismiss}
      >
        <View style={styles.containerPadding}>
          {selectedFilter === "all" ? (
            renderHeader(user.name)
          ) : (
            <Text style={styles.textShowFilter}>
              {translations.home.titleFilter}
            </Text>
          )}

          {SearchBar()}

          <ListClients
            user={user}
            searchQuery={searchQuery}
            filterId={selectedFilter}
          />

          <MenuModal
            visible={showMenuModal}
            onClose={() => setShowMenuModal(false)}
            options={[
              {
                id: "1",
                label: translations.settingsItems.logout,
                onPress: handleLogout,
              },
            ]}
            menuRef={menuRef}
          />

          {filterOptions.length > 0 && (
            <FilterModal
              visible={showFilterModal}
              onClose={() => setShowFilterModal(false)}
              onSelect={setSelectedFilter}
              selectedOption={selectedFilter}
              options={filterOptions}
              anchorRef={anchorRef}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
