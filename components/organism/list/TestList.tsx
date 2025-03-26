import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, TextInput, TouchableOpacity, Platform } from 'react-native';
import { 
  collection, 
  query, 
  doc, 
  updateDoc,
  onSnapshot
} from 'firebase/firestore';
import { CreditCard as Edit2, Check, X, Wifi, WifiOff } from 'lucide-react-native';
import { db } from '../../../config/firebase';
import { useOfflineSync } from '../../../hooks/useOfflineSync';

interface Test {
  id: string;
  name: string;
}

interface TestListProps {
  language: 'en' | 'es';
}

export default function TestList({ language }: TestListProps) {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const { 
    isOnline, 
    pendingChanges,
    addPendingChange,
    applyPendingChanges,
  } = useOfflineSync<Test>({
    storageKey: 'pendingTestChanges',
    onSync: async (testId, newName) => {
      const testRef = doc(db, 'tests', testId);
      await updateDoc(testRef, {
        name: newName,
        updatedAt: new Date().toISOString()
      });
    }
  });

  useEffect(() => {
    let unsubscribe: () => void;

    const setupTestsListener = async () => {
      try {
        const testsRef = collection(db, 'tests');
        const q = query(testsRef);

        unsubscribe = onSnapshot(q, 
          (snapshot) => {
            const testData: Test[] = [];
            snapshot.forEach((doc) => {
              testData.push({
                id: doc.id,
                ...doc.data()
              } as Test);
            });

            setTests(applyPendingChanges(testData));
            setLoading(false);
          },
          (error) => {
            console.error('Error fetching tests:', error);
            Alert.alert(
              'Error',
              language === 'es'
                ? 'Error al cargar las pruebas'
                : 'Error loading tests'
            );
            setLoading(false);
          }
        );
      } catch (error) {
        console.error('Error setting up tests listener:', error);
        setLoading(false);
      }
    };

    setupTestsListener();
    return () => unsubscribe?.();
  }, [language, applyPendingChanges]);

  const handleEdit = (test: Test) => {
    setEditingId(test.id);
    setEditingName(pendingChanges[test.id]?.name || test.name);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditingName('');
  };

  const handleSave = async (testId: string) => {
    if (!editingName.trim()) {
      Alert.alert(
        'Error',
        language === 'es'
          ? 'El nombre no puede estar vacío'
          : 'Name cannot be empty'
      );
      return;
    }

    const newName = editingName.trim();

    if (Platform.OS !== 'web' && !isOnline) {
      addPendingChange(testId, { name: newName });
    } else {
      try {
        const testRef = doc(db, 'tests', testId);
        await updateDoc(testRef, {
          name: newName,
          updatedAt: new Date().toISOString()
        });
      } catch (error) {
        console.error('Error updating test:', error);
        Alert.alert(
          'Error',
          language === 'es'
            ? 'Error al actualizar la prueba'
            : 'Error updating test'
        );
        return;
      }
    }

    setEditingId(null);
    setEditingName('');
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text style={styles.loadingText}>
          {language === 'es' ? 'Cargando...' : 'Loading...'}
        </Text>
      </View>
    );
  }

  if (tests.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.noDataText}>
          {language === 'es' ? 'No hay pruebas disponibles' : 'No tests available'}
        </Text>
      </View>
    );
  }

  const renderTest = ({ item }: { item: Test }) => (
    <View style={styles.testItem}>
      {editingId === item.id ? (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.editInput}
            value={editingName}
            onChangeText={setEditingName}
            autoFocus
            selectTextOnFocus
          />
          <View style={styles.editActions}>
            <TouchableOpacity
              style={[styles.actionButton, styles.saveButton]}
              onPress={() => handleSave(item.id)}
            >
              <Check size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.cancelButton]}
              onPress={handleCancel}
            >
              <X size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.testContent}>
          <Text style={[
            styles.testName,
            pendingChanges[item.id] && styles.pendingChange
          ]}>
            {pendingChanges[item.id]?.name || item.name}
          </Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => handleEdit(item)}
          >
            <Edit2 size={18} color="#666" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {Platform.OS !== 'web' && (
        <View style={[styles.statusBar, !isOnline && styles.statusBarOffline]}>
          {isOnline ? (
            <>
              <Wifi size={16} color="#4CAF50" />
              <Text style={styles.statusText}>
                {language === 'es' ? 'Conectado' : 'Online'}
              </Text>
            </>
          ) : (
            <>
              <WifiOff size={16} color="#FF3B30" />
              <Text style={[styles.statusText, styles.statusTextOffline]}>
                {language === 'es' ? 'Sin conexión' : 'Offline'}
              </Text>
            </>
          )}
        </View>
      )}
      <FlatList
        data={tests}
        renderItem={renderTest}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
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
  listContent: {
    padding: 20,
  },
  testItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
  },
  testContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  testName: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Quicksand_600SemiBold',
    color: '#333',
  },
  pendingChange: {
    fontStyle: 'italic',
    color: '#666',
  },
  editButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  editInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    fontFamily: 'Quicksand_500Medium',
    color: '#333',
    backgroundColor: '#f9f9f9',
  },
  editActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
  },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    backgroundColor: '#E8F5E9',
    marginBottom: 8,
  },
  statusBarOffline: {
    backgroundColor: '#FFEBEE',
  },
  statusText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'Quicksand_600SemiBold',
    color: '#4CAF50',
  },
  statusTextOffline: {
    color: '#FF3B30',
  },
});