import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { getFirestore, collection, query, getDocs } from 'firebase/firestore';

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
  const db = getFirestore();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const testsRef = collection(db, 'tests');
        const q = query(testsRef);
        const querySnapshot = await getDocs(q);
        
        const testData: Test[] = [];
        querySnapshot.forEach((doc) => {
          testData.push({
            id: doc.id,
            ...doc.data()
          } as Test);
        });

        setTests(testData);
      } catch (error) {
        console.error('Error fetching tests:', error);
        Alert.alert(
          'Error',
          language === 'es'
            ? 'Error al cargar las pruebas'
            : 'Error loading tests'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, [language]);

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
      <Text style={styles.testName}>{item.name}</Text>
    </View>
  );

  return (
    <FlatList
      data={tests}
      renderItem={renderTest}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
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
  testName: {
    fontSize: 16,
    fontFamily: 'Quicksand_600SemiBold',
    color: '#333',
  },
});