import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { CreditCard as Edit2, Settings, Award, Calendar, Clock } from 'lucide-react-native';
import { useLanguage } from '../../context/LanguageContext';
import { IMAGES } from '../../constants/assets';

export default function ProfileScreen() {
  const { translations } = useLanguage();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: IMAGES.PROFILE_DEFAULT }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editButton}>
              <Edit2 size={16} color="white" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.name}>Alex Johnson</Text>
          <Text style={styles.title}>Product Designer</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>125</Text>
              <Text style={styles.statLabel}>{translations.stats.projects}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12K</Text>
              <Text style={styles.statLabel}>{translations.stats.followers}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>48</Text>
              <Text style={styles.statLabel}>{translations.stats.following}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{translations.aboutMe}</Text>
          <Text style={styles.aboutText}>
            {translations.aboutMeText}
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{translations.achievements}</Text>
          <View style={styles.achievementsList}>
            <View style={styles.achievementItem}>
              <View style={[styles.achievementIcon, { backgroundColor: 'rgba(76, 102, 159, 0.1)' }]}>
                <Award size={24} color="#4c669f" />
              </View>
              <View style={styles.achievementContent}>
                <Text style={styles.achievementTitle}>{translations.achievementItems.topDesigner.title}</Text>
                <Text style={styles.achievementDesc}>{translations.achievementItems.topDesigner.desc}</Text>
              </View>
            </View>
            
            <View style={styles.achievementItem}>
              <View style={[styles.achievementIcon, { backgroundColor: 'rgba(52, 199, 89, 0.1)' }]}>
                <Calendar size={24} color="#34c759" />
              </View>
              <View style={styles.achievementContent}>
                <Text style={styles.achievementTitle}>{translations.achievementItems.milestone.title}</Text>
                <Text style={styles.achievementDesc}>{translations.achievementItems.milestone.desc}</Text>
              </View>
            </View>
            
            <View style={styles.achievementItem}>
              <View style={[styles.achievementIcon, { backgroundColor: 'rgba(255, 149, 0, 0.1)' }]}>
                <Clock size={24} color="#ff9500" />
              </View>
              <View style={styles.achievementContent}>
                <Text style={styles.achievementTitle}>{translations.achievementItems.projects.title}</Text>
                <Text style={styles.achievementDesc}>{translations.achievementItems.projects.desc}</Text>
              </View>
            </View>
          </View>
        </View>
        
        <TouchableOpacity style={styles.editProfileButton}>
          <Text style={styles.editProfileText}>{translations.editProfile}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4c669f',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'white',
  },
  name: {
    fontSize: 24,
    fontFamily: 'Quicksand_700Bold',
    color: '#333',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Quicksand_400Regular',
    color: '#666',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#f5f5f7',
    borderRadius: 16,
    padding: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Quicksand_700Bold',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Quicksand_400Regular',
    color: '#666',
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: '#ddd',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Quicksand_600SemiBold',
    color: '#333',
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 16,
    fontFamily: 'Quicksand_400Regular',
    color: '#444',
    lineHeight: 24,
  },
  achievementsList: {
    marginTop: 8,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
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
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontFamily: 'Quicksand_600SemiBold',
    color: '#333',
    marginBottom: 4,
  },
  achievementDesc: {
    fontSize: 14,
    fontFamily: 'Quicksand_400Regular',
    color: '#666',
  },
  editProfileButton: {
    backgroundColor: '#4c669f',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  editProfileText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Quicksand_600SemiBold',
  },
});