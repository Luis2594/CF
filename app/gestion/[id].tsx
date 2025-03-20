import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ChevronLeft, Camera } from 'lucide-react-native';
import Dropdown from '@/components/Dropdown';
import { styles } from '@/styles/gestion.styles';

const actions = [
  { value: 'VT', label: 'VT - VISITA TRABAJO' },
  { value: 'VC', label: 'VC - VISITA CASA' },
  { value: 'LT', label: 'LT - LLAMADA TRABAJO' },
  { value: 'LC', label: 'LC - LLAMADA CASA' },
];

const results = [
  { value: 'CSP', label: 'CSP - CONTACTO SIN PROMESA' },
  { value: 'CCP', label: 'CCP - CONTACTO CON PROMESA' },
  { value: 'NL', label: 'NL - NO LOCALIZADO' },
];

const reasons = [
  { value: 'DES', label: 'Desempleado' },
  { value: 'ENF', label: 'Enfermedad' },
  { value: 'ING', label: 'Ingresos insuficientes' },
];

export default function GestionScreen() {
  const { id } = useLocalSearchParams();
  const [action, setAction] = useState('');
  const [result, setResult] = useState('');
  const [reason, setReason] = useState('');
  const [comment, setComment] = useState('');

  const handleSave = () => {
    // Implement save logic here
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ChevronLeft size={24} color="#666" />
            <Text style={styles.backText}>Regresar</Text>
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text style={styles.title}>Grabar gestión</Text>

        {/* Form */}
        <View style={styles.form}>
          <Dropdown
            label="Acción"
            items={actions}
            selectedValue={action}
            onSelect={(item) => setAction(item.value)}
            required
          />

          <View style={styles.spacing} />

          <Dropdown
            label="Resultado"
            items={results}
            selectedValue={result}
            onSelect={(item) => setResult(item.value)}
            required
          />

          <View style={styles.spacing} />

          <Dropdown
            label="Razón no pago"
            items={reasons}
            selectedValue={reason}
            onSelect={(item) => setReason(item.value)}
            required
          />

          <View style={styles.spacing} />

          <Text style={styles.label}>Comentario</Text>
          <TextInput
            style={styles.commentInput}
            value={comment}
            onChangeText={setComment}
            placeholder="Comentario"
            multiline
            numberOfLines={4}
            placeholderTextColor="#D0D0D1"
          />

          <TouchableOpacity style={styles.photoButton}>
            <Camera size={20} color="#F04E23" />
            <Text style={styles.photoButtonText}>Tomar foto</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}