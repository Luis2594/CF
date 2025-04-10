import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  Modal,
  Alert,
  Linking,
  SafeAreaView,
} from "react-native";
import { useLocation } from "@/hooks/useLocation";
import { useLanguage } from "@/context/LanguageContext";
import { colors } from "@/constants/colors";
import { ChevronLeft } from "lucide-react-native";
import { router } from "expo-router";
import { styles } from "@/styles/map.styles";
import Button from "@/components/molecules/buttons/Button";
import Slider from "@react-native-community/slider";
import CustomInput from "@/components/organism/CustomInput";
import { useClient } from "@/hooks/useClient";
import { IMAGES, SVG } from "@/constants/assets";
import AlertErrorMessage from "@/components/molecules/alerts/AlertErrorMessage";
import { Client } from "@/hooks/useClient";
import { useUser } from "@/hooks/useUser";
import { calculateDistance } from "@/utils/utils";
import * as Clipboard from "expo-clipboard";

// Only import MapView components when not on web
let MapView: any;
let Marker: any;
let Circle: any;
if (Platform.OS !== "web") {
  const Maps = require("react-native-maps");
  MapView = Maps.default;
  Marker = Maps.Marker;
  Circle = Maps.Circle;
}

type RadioType = "suggested" | "custom";

const BOTTOM_SHEET_HEIGHT = 246;
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function MapScreen() {
  const { location, loading } = useLocation();
  const { translations } = useLanguage();
  const { user } = useUser();
  const { loadingClient, pendingClients, getClients } = useClient();
  const [selectedRadio, setSelectedRadio] = useState<RadioType>("suggested");
  const [slider, setSlider] = useState(1);
  const [customRadius, setCustomRadius] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const [latitude, setLatitude] = useState(parseFloat(location.latitude));
  const [longitude, setLongitude] = useState(parseFloat(location.longitude));

  // Bottom sheet animation
  const bottomSheetAnimation = useRef(
    new Animated.Value(SCREEN_HEIGHT)
  ).current;

  const filteredClients = useMemo(() => {
    return pendingClients.filter((client) => {
      if (!client.latitude || !client.longitude) return false;

      const distance = calculateDistance(
        latitude,
        longitude,
        parseFloat(client.latitude),
        parseFloat(client.longitude)
      );

      return distance <= customRadius;
    });
  }, [loadingClient, pendingClients, customRadius, location]);

  useEffect(() => {
    setLatitude(parseFloat(location.latitude));
    setLongitude(parseFloat(location.longitude));
  }, [location]);

  useEffect(() => {
    if (user.token && user.claims) {
      getRadioDefaultByUser(user.claims.parameters.RadioProximity);
      getClients(user.token);
    }
  }, [user]);

  useEffect(() => {
    if (!loading && !loadingClient) {
      if (filteredClients.length === 0) {
        setError(translations.map.noClients);
      }

      if (location.latitude === "0" || location.longitude === "0") {
        setError(translations.map.noLocation);
      }
    } else {
      setError(null);
    }
  }, [filteredClients, translations, location]);

  const getRadioDefaultByUser = (text: string) => {
    let clearText = text.replace(/km/gi, "");

    const value = parseInt(clearText);
    if (!isNaN(value) && value >= 1 && value <= 100) {
      setSlider(value);
      setCustomRadius(value);
    }
  };

  const getDeltaFromRadius = (radiusInKm: number) => {
    const radiusInMeters = radiusInKm * 1000;
    const oneDegree = 111320;
    return radiusInMeters / oneDegree;
  };

  const showBottomSheet = (client: Client) => {
    setSelectedClient(client);
    Animated.spring(bottomSheetAnimation, {
      toValue: SCREEN_HEIGHT - BOTTOM_SHEET_HEIGHT,
      useNativeDriver: true,
    }).start();
  };

  const hideBottomSheet = () => {
    setSelectedClient(null);
    Animated.spring(bottomSheetAnimation, {
      toValue: SCREEN_HEIGHT,
      useNativeDriver: true,
    }).start();
  };

  const handleNavigation = () => {
    if (!selectedClient?.latitude || !selectedClient?.longitude) {
      Alert.alert(translations.map.noLocation);
      return;
    }

    const clientLat = parseFloat(selectedClient.latitude);
    const clientLng = parseFloat(selectedClient.longitude);

    Alert.alert(
      translations.map.navigationOptions.title,
      translations.map.navigationOptions.message,
      [
        {
          text: "Waze",
          onPress: () => {
            const wazeUrl = `waze://?ll=${clientLat},${clientLng}&navigate=yes`;
            const wazeWebUrl = `https://www.waze.com/ul?ll=${clientLat}%2C${clientLng}&navigate=yes`;

            Linking.canOpenURL(wazeUrl).then((supported) => {
              if (supported) {
                Linking.openURL(wazeUrl);
              } else {
                Linking.openURL(wazeWebUrl);
              }
            });
          },
        },
        {
          text: translations.map.navigationOptions.maps,
          onPress: () => {
            const scheme = Platform.select({
              ios: "maps:",
              android: "geo:",
            });
            const url = Platform.select({
              ios: `${scheme}${clientLat},${clientLng}`,
              android: `${scheme}${clientLat},${clientLng}`,
              web: `https://www.google.com/maps/dir/?api=1&destination=${clientLat},${clientLng}`,
            });

            if (url) {
              Linking.openURL(url);
            }
          },
        },
        {
          text: translations.map.navigationOptions.cancel,
          style: "cancel",
        },
      ]
    );
  };

  const renderMap = () => {
    const delta = getDeltaFromRadius(customRadius) * 3;

    if (loading || loadingClient) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary.main} />
        </View>
      );
    }

    return (
      <View style={styles.containerMap}>
        <MapView
          style={styles.map}
          region={{
            latitude,
            longitude,
            latitudeDelta: delta,
            longitudeDelta: delta,
          }}
        >
          {/* Coverage circle */}
          <Circle
            center={{
              latitude,
              longitude,
            }}
            radius={customRadius * 1000}
            fillColor="rgba(251, 199, 173, 0.5)"
            strokeColor={colors.primary.main}
            strokeWidth={1}
          />

          {filteredClients.map((client) => {
            return (
              <Marker
                key={client.clientId}
                coordinate={{
                  latitude: client.latitude,
                  longitude: client.longitude,
                }}
                onPress={() => showBottomSheet(client)}
              >
                <View style={styles.customMarker}>
                  <View style={styles.customMarkerView} />
                </View>
              </Marker>
            );
          })}
        </MapView>
      </View>
    );
  };

  const handleRadiusChange = () => {
    setCustomRadius(slider);
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(
      `${selectedClient?.addressLevel1}, ${selectedClient?.addressLevel2}, ${selectedClient?.address}`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <AlertErrorMessage error={error} onClose={() => setError(null)} />
      <View style={styles.containerPadding}>
        {/* HEADER  */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ChevronLeft size={20} color="#666" />
          </TouchableOpacity>
          <Text style={styles.title}>{translations.map.title}</Text>
        </View>

        {/* RADIOS */}
        <View style={styles.radioContainer}>
          {/* RADIO SUGGEST  */}
          <TouchableOpacity
            style={styles.radioOption}
            onPress={() => setSelectedRadio("suggested")}
          >
            <View
              style={[
                styles.radio,
                selectedRadio === "suggested" && styles.radioCircleSelected,
              ]}
            >
              <View
                style={
                  selectedRadio === "suggested"
                    ? styles.radioInnerCircle
                    : undefined
                }
              />
            </View>
            <View>
              <Text style={styles.radioTitle}>
                {translations.map.suggestedRadius.title}
              </Text>
              <Text style={styles.radioSubtitle}>
                {translations.map.suggestedRadius.description}
              </Text>
            </View>
          </TouchableOpacity>

          {/* RADIO CUSTOM  */}
          <TouchableOpacity
            style={styles.radioOption}
            onPress={() => setSelectedRadio("custom")}
          >
            <View
              style={[
                styles.radio,
                selectedRadio === "custom" && styles.radioCircleSelected,
              ]}
            >
              <View
                style={
                  selectedRadio === "custom"
                    ? styles.radioInnerCircle
                    : undefined
                }
              />
            </View>
            <View style={styles.customRadioContent}>
              <View>
                <Text style={styles.radioTitle}>
                  {translations.map.customRadius.title}
                </Text>
                <Text style={styles.radioSubtitle}>
                  {translations.map.customRadius.description}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {selectedRadio === "custom" && (
            <View>
              <Slider
                minimumValue={1}
                maximumValue={100}
                step={1}
                value={slider}
                onSlidingComplete={(val) => setSlider(val)}
                minimumTrackTintColor={colors.primary.main}
                maximumTrackTintColor={colors.gray[100]}
                thumbImage={IMAGES.THUMB}
                style={styles.slider}
              />
              <View style={styles.containerTextSlider}>
                <Text style={styles.radioTitle}>1</Text>
                <Text style={styles.radioTitle}>100</Text>
              </View>
              <CustomInput
                label={translations.map.kilometers}
                value={`${slider}Km`}
                placeholder="0Km"
                keyboardType="number-pad"
                isDisabled
              />
            </View>
          )}

          {/* BUTTON  */}
          <Button text={translations.map.apply} onPress={handleRadiusChange} />
        </View>
        {renderMap()}
      </View>

      {/* Bottom Sheet */}
      <Modal visible={!!selectedClient} transparent animationType="none">
        <TouchableWithoutFeedback onPress={hideBottomSheet}>
          <View style={styles.overlay}>
            <Animated.View
              style={[
                styles.bottomSheet,
                {
                  transform: [{ translateY: bottomSheetAnimation }],
                },
              ]}
            >
              {selectedClient && (
                <View style={styles.bottomSheetContent}>
                  <Text style={styles.bottomSheetTitle}>
                    {translations.map.selectedClient}
                  </Text>
                  <Text style={styles.clientName}>{selectedClient.name}</Text>
                  <View style={styles.containerDistance}>
                    <SVG.MOTO width={16} height={16} />
                    <Text style={styles.clientDistance}>
                      {calculateDistance(
                        latitude,
                        longitude,
                        parseFloat(selectedClient.latitude || "0"),
                        parseFloat(selectedClient.longitude || "0")
                      ).toFixed(1)}{" "}
                      km
                    </Text>
                  </View>
                  <TouchableOpacity onPress={copyToClipboard}>
                    <View style={styles.wrapAddress}>
                      <Text
                        style={styles.clientAddress}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {`${selectedClient?.addressLevel1}, ${selectedClient?.addressLevel2}`}
                      </Text>
                      <SVG.COPY width={18} height={18} />
                    </View>
                  </TouchableOpacity>

                  <Button
                    text={translations.map.goTo}
                    onPress={handleNavigation}
                  />
                </View>
              )}
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}
