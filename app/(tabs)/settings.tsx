import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import { useState } from 'react';
import { ChevronRight, Bell, Moon, Globe, Lock, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native';
import { useLanguage, Language } from '../../context/LanguageContext';

export default function SettingsScreen() {
  const { translations, language, setLanguage } = useLanguage();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  
  const handleLanguageChange = async () => {
    // Toggle between English and Spanish
    const newLanguage: Language = language === 'en' ? 'es' : 'en';
    await setLanguage(newLanguage);
    
    // Show confirmation of language change
    Alert.alert(
      translations.settingsItems.language,
      language === 'en' 
        ? 'Idioma cambiado a Español' 
        : 'Language changed to English',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{translations.settings}</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{translations.preferences}</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: 'rgba(76, 102, 159, 0.1)' }]}>
                <Bell size={20} color="#4c669f" />
              </View>
              <Text style={styles.settingText}>{translations.settingsItems.notifications}</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#e0e0e0', true: '#4c669f' }}
              thumbColor="white"
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: 'rgba(90, 90, 90, 0.1)' }]}>
                <Moon size={20} color="#555" />
              </View>
              <Text style={styles.settingText}>{translations.settingsItems.darkMode}</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#e0e0e0', true: '#4c669f' }}
              thumbColor="white"
            />
          </View>
          
          <TouchableOpacity style={styles.settingItem} onPress={handleLanguageChange}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: 'rgba(52, 199, 89, 0.1)' }]}>
                <Globe size={20} color="#34c759" />
              </View>
              <Text style={styles.settingText}>{translations.settingsItems.language}</Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={styles.settingValue}>{language === 'en' ? 'English' : 'Español'}</Text>
              <ChevronRight size={20} color="#999" />
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{translations.account}</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: 'rgba(76, 102, 159, 0.1)' }]}>
                <Lock size={20} color="#4c669f" />
              </View>
              <Text style={styles.settingText}>{translations.settingsItems.privacy}</Text>
            </View>
            <ChevronRight size={20} color="#999" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: 'rgba(255, 149, 0, 0.1)' }]}>
                <HelpCircle size={20} color="#ff9500" />
              </View>
              <Text style={styles.settingText}>{translations.settingsItems.help}</Text>
            </View>
            <ChevronRight size={20} color="#999" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: 'rgba(255, 59, 48, 0.1)' }]}>
                <LogOut size={20} color="#ff3b30" />
              </View>
              <Text style={[styles.settingText, { color: '#ff3b30' }]}>{translations.settingsItems.logout}</Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>{translations.appVersion}</Text>
          <Text style={styles.copyright}>{translations.copyright}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Quicksand_600SemiBold',
    color: '#333',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Quicksand_600SemiBold',
    color: '#333',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingText: {
    fontSize: 16,
    fontFamily: 'Quicksand_500Medium',
    color: '#333',
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontSize: 14,
    fontFamily: 'Quicksand_400Regular',
    color: '#666',
    marginRight: 8,
  },
  appInfo: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  appVersion: {
    fontSize: 14,
    fontFamily: 'Quicksand_400Regular',
    color: '#999',
    marginBottom: 4,
  },
  copyright: {
    fontSize: 12,
    fontFamily: 'Quicksand_400Regular',
    color: '#999',
  },
});