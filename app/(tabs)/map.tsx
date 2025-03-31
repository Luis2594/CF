import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
import { IMAGES } from "@/constants/assets";
import AlertErrorMessage from "@/components/molecules/alerts/AlertErrorMessage";

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

export default function MapScreen() {
  const { location } = useLocation();
  const { translations } = useLanguage();
  const { pendingClients } = useClient();
  const [selectedRadio, setSelectedRadio] = useState<RadioType>("suggested");
  const [customRadius, setCustomRadius] = useState(1);
  const [filteredClients, setFilteredClients] = useState(pendingClients);
  const [error, setError] = useState<string | null>(null);

  const [latitude, setLatitude] = useState(parseFloat(location.latitude));
  const [longitude, setLongitude] = useState(parseFloat(location.longitude));

  useEffect(() => {
    setLatitude(parseFloat(location.latitude));
    setLongitude(parseFloat(location.longitude));
  }, [location]);

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  };

  // Filter clients based on radius
  const filterClientsByRadius = () => {
    const radius = selectedRadio === "suggested" ? 1 : customRadius;

    const filtered = pendingClients.filter((client) => {
      if (!client.latitude || !client.longitude) return false;

      const distance = calculateDistance(
        latitude,
        longitude,
        parseFloat(client.latitude),
        parseFloat(client.longitude)
      );

      return distance <= radius;
    });

    console.log("filtered: ", filtered);
    setFilteredClients(filtered);
  };

  useEffect(() => {
    filterClientsByRadius();
  }, [pendingClients, selectedRadio, customRadius, latitude, longitude]);

  useEffect(() => {
    if (filteredClients.length === 0) {
      setError("No hay clientes disponibles en el radio de la zona");
    } else {
      setError(null);
    }
  }, [filteredClients]);

  const getDeltaFromRadius = (radiusInKm: number) => {
    const radiusInMeters = radiusInKm * 1000;
    const oneDegree = 111320;
    return radiusInMeters / oneDegree;
  };

  const renderMap = () => {
    const radius = selectedRadio === "suggested" ? 1 : customRadius;
    const delta = getDeltaFromRadius(radius) * 3;

    return (
      <MapView
        style={styles.map}
        region={{
          latitude,
          longitude,
          latitudeDelta: delta,
          longitudeDelta: delta,
        }}
      >
        {/* Current location marker */}
        <Marker
          coordinate={{
            latitude,
            longitude,
          }}
          pinColor={colors.primary.main}
        />

        {/* Coverage circle */}
        <Circle
          center={{
            latitude,
            longitude,
          }}
          radius={radius * 1000}
          fillColor="rgba(240, 78, 35, 0.1)"
          strokeColor={colors.primary.main}
          strokeWidth={1}
        />

        {/* Client markers */}
        {filteredClients.map((client) => {
          if (client.latitude && client.longitude) {
            return (
              <Marker
                key={client.clientId}
                coordinate={{
                  latitude: parseFloat(client.latitude),
                  longitude: parseFloat(client.longitude),
                }}
                pinColor={colors.error.main}
                onPress={() => router.push(`/info-client/${client.clientId}`)}
              />
            );
          }
          return null;
        })}
      </MapView>
    );
  };

  const handleRadiusChange = (value: number) => {
    setCustomRadius(value);
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
                value={customRadius}
                onValueChange={handleRadiusChange}
                minimumTrackTintColor={colors.primary.main}
                maximumTrackTintColor={colors.gray[100]}
                thumbImage={IMAGES.THUMB}
              />
              <View style={styles.containerTextSlider}>
                <Text style={styles.radioTitle}>1</Text>
                <Text style={styles.radioTitle}>100</Text>
              </View>
              <CustomInput
                label="Kilómetros"
                value={`${customRadius}Km`}
                placeholder="0Km"
                keyboardType="number-pad"
                isDisabled
              />
            </View>
          )}

          {/* BUTTON  */}
          <Button
            text={translations.map.apply}
            onPress={filterClientsByRadius}
          />
        </View>
        {renderMap()}
      </View>
    </SafeAreaView>
  );
}
