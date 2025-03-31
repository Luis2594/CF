import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocation } from '@/hooks/useLocation';
import { useLanguage } from '@/context/LanguageContext';
import { colors } from '@/constants/colors';
import { ChevronLeft } from 'lucide-react-native';
import { router } from 'expo-router';

// Only import MapView components when not on web
let MapView: any;
let Marker: any;
let Circle: any;
if (Platform.OS !== 'web') {
  const Maps = require('react-native-maps');
  MapView = Maps.default;
  Marker = Maps.Marker;
  Circle = Maps.Circle;
}

type RadioType = 'suggested' | 'custom';

export default function MapScreen() {
  const { location } = useLocation();
  const { translations } = useLanguage();
  const [selectedRadio, setSelectedRadio] = useState<RadioType>('suggested');

  const latitude = parseFloat(location.latitude);
  const longitude = parseFloat(location.longitude);

  // Mock data for client locations
  const clientLocations = [
    { id: '1', latitude: latitude + 0.002, longitude: longitude + 0.001 },
    { id: '2', latitude: latitude - 0.001, longitude: longitude + 0.002 },
    { id: '3', latitude: latitude + 0.001, longitude: longitude - 0.001 },
  ];

  const renderMap = () => {
    if (Platform.OS === 'web') {
      return (
        <View style={styles.webMapPlaceholder}>
          <Text style={styles.webMapText}>Maps are not supported on web platform</Text>
        </View>
      );
    }

    return (
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
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
          radius={500} // 500 meters radius
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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={colors.gray[500]} />
        </TouchableOpacity>
        <Text style={styles.title}>{translations.home.client.statusTypes.pending}</Text>
      </View>

      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={[styles.radioOption, selectedRadio === 'suggested' && styles.radioSelected]}
          onPress={() => setSelectedRadio('suggested')}
        >
          <View style={[styles.radio, selectedRadio === 'suggested' && styles.radioCircleSelected]}>
            <View style={selectedRadio === 'suggested' ? styles.radioInnerCircle : undefined} />
          </View>
          <View>
            <Text style={styles.radioTitle}>Radio local sugerido</Text>
            <Text style={styles.radioSubtitle}>Mostrarme los de esta zona</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.radioOption, selectedRadio === 'custom' && styles.radioSelected]}
          onPress={() => setSelectedRadio('custom')}
        >
          <View style={[styles.radio, selectedRadio === 'custom' && styles.radioCircleSelected]}>
            <View style={selectedRadio === 'custom' ? styles.radioInnerCircle : undefined} />
          </View>
          <View>
            <Text style={styles.radioTitle}>Radio local personalizado</Text>
            <Text style={styles.radioSubtitle}>Mostrarme ubicaciones dentro de una distacia específica.</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Aplicar</Text>
        </TouchableOpacity>
      </View>

      {renderMap()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.common.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Quicksand_600SemiBold',
    color: colors.gray[500],
  },
  radioContainer: {
    padding: 20,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
  },
  radioSelected: {
    backgroundColor: colors.primary.background,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.gray[300],
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioCircleSelected: {
    borderColor: colors.primary.main,
  },
  radioInnerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary.main,
  },
  radioTitle: {
    fontSize: 16,
    fontFamily: 'Quicksand_600SemiBold',
    color: colors.gray[500],
  },
  radioSubtitle: {
    fontSize: 14,
    fontFamily: 'Quicksand_400Regular',
    color: colors.gray[400],
  },
  applyButton: {
    backgroundColor: colors.primary.main,
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  applyButtonText: {
    color: colors.common.white,
    fontSize: 16,
    fontFamily: 'Quicksand_600SemiBold',
  },
  map: {
    flex: 1,
  },
  webMapPlaceholder: {
    flex: 1,
    backgroundColor: colors.gray[50],
    justifyContent: 'center',
    alignItems: 'center',
  },
  webMapText: {
    fontSize: 16,
    fontFamily: 'Quicksand_500Medium',
    color: colors.gray[500],
  },
});