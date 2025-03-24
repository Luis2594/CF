import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Camera } from "lucide-react-native";
import Dropdown from "@/components/organism/Dropdown";
import { styles } from "@/styles/gestion.styles";
import BackButton from "@/components/molecules/buttons/BackButton";
import Button from "@/components/molecules/buttons/Button";
import * as DataHarcode from "@/data/dataHarcode";
import TagOperation from "@/components/atoms/TagOperation";
import CustomInput from "@/components/organism/CustomInput";

export default function GestionScreen() {
  const { id } = useLocalSearchParams();
  const [action, setAction] = useState("");
  const [result, setResult] = useState("");
  const [reason, setReason] = useState("");
  const [comment, setComment] = useState("");
  const [montoLocal, setMontoLocal] = useState("");
  const [montoExt, setMontoExt] = useState("");
  const [date, setDate] = useState("");

  const handleSave = () => {
    // Implement save logic here
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <BackButton />

        {/* Title */}
        <Text style={styles.title}>Grabar gestión</Text>

        {/* Form */}
        <View>
          <Dropdown
            label="Acción"
            items={DataHarcode.actions}
            selectedValue={action}
            onSelect={(item) => setAction(item.value)}
            required
            containerStyle={styles.spacing}
            labelStyle={styles.label}
          />

          <Dropdown
            label="Resultado"
            items={DataHarcode.results}
            selectedValue={result}
            onSelect={(item) => setResult(item.value)}
            required
            containerStyle={styles.spacing}
            labelStyle={styles.label}
          />

          <Dropdown
            label="Razón no pago"
            items={DataHarcode.reasons}
            selectedValue={reason}
            onSelect={(item) => setReason(item.value)}
            required
            containerStyle={styles.spacing}
            labelStyle={styles.label}
          />

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

          {(result === "PRP") && (
            <View>
              <View>
                <TagOperation
                  text="Operación 123654- Tarjeta de crédito"
                  customContainerStyle={styles.spacingTagOperation}
                />
                <Dropdown
                  label="Resultado"
                  items={DataHarcode.results}
                  selectedValue={result}
                  onSelect={(item) => setResult(item.value)}
                  required
                  containerStyle={styles.spacing}
                  labelStyle={styles.label}
                  disable
                />

                <CustomInput
                  label="Monto Local"
                  value={montoLocal}
                  onChangeText={setMontoLocal}
                  placeholder="0.00"
                  isRequired
                  isCurrency
                />

                <CustomInput
                  label="Monto Ext"
                  value={montoExt}
                  onChangeText={setMontoExt}
                  placeholder="0.00"
                  isRequired
                  isCurrency
                />

                <CustomInput
                  label="Fecha de pago"
                  value={date}
                  onChangeText={setDate}
                  placeholder="00/00/0000"
                  isRequired
                  isDate
                />
              </View>
            </View>
          )}

          <TouchableOpacity style={styles.photoButton}>
            <Camera size={20} color="#F04E23" />
            <Text style={styles.photoButtonText}>Tomar foto</Text>
          </TouchableOpacity>

          <Button text="Guardar" onPress={handleSave} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
