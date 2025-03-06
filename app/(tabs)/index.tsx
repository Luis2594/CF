import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { Search, Plus, Calendar, ChartBar as BarChart2 } from 'lucide-react-native';
import { useLanguage } from '../../context/LanguageContext';

export default function HomeScreen() {
  const { translations } = useLanguage();

  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{translations.hello}</Text>
            <Text style={styles.date}>Monday, June 2, 2025</Text>
          </View>
          <TouchableOpacity style={styles.searchButton}>
            <Search size={24} color="#333" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: 'rgba(76, 102, 159, 0.1)' }]}>
              <Calendar size={24} color="#4c669f" />
            </View>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Tasks Today</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: 'rgba(52, 199, 89, 0.1)' }]}>
              <BarChart2 size={24} color="#34c759" />
            </View>
            <Text style={styles.statValue}>85%</Text>
            <Text style={styles.statLabel}>Completion</Text>
          </View>
        </View>
        
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{translations.todayTasks}</Text>
          <TouchableOpacity style={styles.addButton}>
            <Plus size={20} color="#4c669f" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.taskList}>
          {[1, 2, 3].map((item) => (
            <View key={item} style={styles.taskItem}>
              <View style={styles.taskCheckbox} />
              <View style={styles.taskContent}>
                <Text style={styles.taskTitle}>{translations.taskTitle}</Text>
                <Text style={styles.taskTime}>10:00 AM - 11:30 AM</Text>
              </View>
            </View>
          ))}
        </View>
        
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{translations.recentProjects}</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>{translations.viewAll}</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.projectsContainer}
        >
          {[1, 2, 3].map((item) => (
            <TouchableOpacity key={item} style={styles.projectCard}>
              <Image
                source={{ uri: `https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D` }}
                style={styles.projectImage}
              />
              <Text style={styles.projectTitle}>{translations.projectTitle}</Text>
              <Text style={styles.projectProgress}>{translations.progress}: 60%</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '60%' }]} />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView> */}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontFamily: 'Quicksand_700Bold',
    color: '#333',
  },
  date: {
    fontSize: 14,
    fontFamily: 'Quicksand_400Regular',
    color: '#666',
    marginTop: 4,
  },
  searchButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f5f5f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Quicksand_700Bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Quicksand_400Regular',
    color: '#666',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Quicksand_600SemiBold',
    color: '#333',
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(76, 102, 159, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewAllText: {
    fontSize: 14,
    fontFamily: 'Quicksand_500Medium',
    color: '#4c669f',
  },
  taskList: {
    marginBottom: 24,
  },
  taskItem: {
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
  taskCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4c669f',
    marginRight: 16,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontFamily: 'Quicksand_500Medium',
    color: '#333',
    marginBottom: 4,
  },
  taskTime: {
    fontSize: 14,
    fontFamily: 'Quicksand_400Regular',
    color: '#666',
  },
  projectsContainer: {
    paddingBottom: 20,
  },
  projectCard: {
    width: 200,
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  projectImage: {
    width: '100%',
    height: 120,
  },
  projectTitle: {
    fontSize: 16,
    fontFamily: 'Quicksand_600SemiBold',
    color: '#333',
    margin: 12,
    marginBottom: 4,
  },
  projectProgress: {
    fontSize: 14,
    fontFamily: 'Quicksand_400Regular',
    color: '#666',
    marginHorizontal: 12,
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    marginHorizontal: 12,
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4c669f',
    borderRadius: 3,
  },
});