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
  const [selectedRadio, setSelectedRadio] = useState<RadioType>("suggested");

  const [latitude, setLatitude] = useState(parseFloat(location.latitude));
  const [longitude, setLongitude] = useState(parseFloat(location.longitude));

  useEffect(() => {
    setLatitude(parseFloat(location.latitude));
    setLongitude(parseFloat(location.longitude));
  }, [location]);

  // Mock data for client locations
  const clientLocations = [
    { id: "1", latitude: latitude + 0.002, longitude: longitude + 0.001 },
    { id: "2", latitude: latitude - 0.001, longitude: longitude + 0.002 },
    { id: "3", latitude: latitude + 0.001, longitude: longitude - 0.001 },
  ];

  const getDeltaFromRadius = (radiusInKm: number) => {
    const radiusInMeters = radiusInKm * 1000;
    const oneDegree = 111320;
    return radiusInMeters / oneDegree;
  };

  const renderMap = () => {
    const radius = 1;
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
        {clientLocations.map((client) => (
          <Marker
            key={client.id}
            coordinate={{
              latitude: client.latitude,
              longitude: client.longitude,
            }}
            pinColor={colors.error.main}
          />
        ))}
      </MapView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerPadding}>
        {/* HEADER  */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ChevronLeft size={20} color="#666" />
          </TouchableOpacity>
          <Text style={styles.title}>
            {translations.home.client.statusTypes.pending}
          </Text>
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
              <Text style={styles.radioTitle}>Radio local sugerido</Text>
              <Text style={styles.radioSubtitle}>
                Mostrarme los de esta zona
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
            <View>
              <Text style={styles.radioTitle}>Radio local personalizado</Text>
              <Text style={styles.radioSubtitle}>
                Mostrarme ubicaciones dentro de una distacia específica.
              </Text>
            </View>
          </TouchableOpacity>

          {/* BUTTON  */}
          <Button text="Aplicar" onPress={() => {}} />
        </View>
        {renderMap()}
      </View>
    </SafeAreaView>
  );
}
