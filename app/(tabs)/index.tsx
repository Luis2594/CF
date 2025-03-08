import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { LogOut } from 'lucide-react-native';
import { getAuth, signOut } from "firebase/auth";
import { router } from 'expo-router';
import { useLanguage } from '../../context/LanguageContext';

export default function HomeScreen() {
  const [name, setName] = useState<string>('');
  const { language } = useLanguage();
  const auth = getAuth();

  useEffect(() => {
    // Get the current user's claims
    const getCurrentUser = async () => {
      const user = auth.currentUser;
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        if (idTokenResult.claims.name) {
          setName(idTokenResult.claims.name);
        }
      }
    };

    getCurrentUser();
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      router.replace('/login');
    }).catch((error) => {
      console.error('Logout error:', error);
      Alert.alert(
        'Error',
        language === 'es'
          ? 'Error al cerrar sesión. Por favor intente de nuevo.'
          : 'Error logging out. Please try again.',
        [{ text: 'OK' }]
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello{name ? `, ${name}` : ''}</Text>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <LogOut size={20} color="#FF3B30" />
          <Text style={styles.logoutText}>
            {language === 'es' ? 'Cerrar Sesión' : 'Logout'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  greeting: {
    fontSize: 24,
    fontFamily: 'Quicksand_700Bold',
    color: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  logoutText: {
    marginLeft: 8,
    color: '#FF3B30',
    fontSize: 14,
    fontFamily: 'Quicksand_600SemiBold',
  },
});