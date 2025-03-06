import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { Bell, MessageSquare, Heart, UserPlus, Calendar } from 'lucide-react-native';
import { useLanguage } from '../../context/LanguageContext';

const notifications = [
  {
    id: '1',
    type: 'message',
    title: 'New message from Sarah',
    description: 'Hey, can we discuss the project details?',
    time: '10 min ago',
    read: false,
  },
  {
    id: '2',
    type: 'like',
    title: 'Michael liked your post',
    description: 'Your project "Mobile App Redesign" received a like',
    time: '1 hour ago',
    read: false,
  },
  {
    id: '3',
    type: 'follow',
    title: 'New follower',
    description: 'Jessica started following you',
    time: '3 hours ago',
    read: true,
  },
  {
    id: '4',
    type: 'reminder',
    title: 'Meeting reminder',
    description: 'Team standup in 30 minutes',
    time: '30 min ago',
    read: true,
  },
  {
    id: '5',
    type: 'message',
    title: 'New message from David',
    description: 'The client approved our proposal!',
    time: '5 hours ago',
    read: true,
  },
];

export default function NotificationsScreen() {
  const { translations } = useLanguage();

  const renderNotificationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageSquare size={24} color="#4c669f" />;
      case 'like':
        return <Heart size={24} color="#ff2d55" />;
      case 'follow':
        return <UserPlus size={24} color="#34c759" />;
      case 'reminder':
        return <Calendar size={24} color="#ff9500" />;
      default:
        return <Bell size={24} color="#4c669f" />;
    }
  };

  const renderItem = ({ item }: { item: typeof notifications[0] }) => (
    <TouchableOpacity 
      style={[
        styles.notificationItem, 
        !item.read && styles.unreadNotification
      ]}
    >
      <View style={styles.iconContainer}>
        {renderNotificationIcon(item.type)}
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationDesc}>{item.description}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{translations.notifications}</Text>
        <TouchableOpacity>
          <Text style={styles.markAllRead}>{translations.markAllRead}</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  markAllRead: {
    fontSize: 14,
    fontFamily: 'Quicksand_500Medium',
    color: '#4c669f',
  },
  listContent: {
    padding: 16,
  },
  notificationItem: {
    flexDirection: 'row',
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
  unreadNotification: {
    backgroundColor: 'rgba(76, 102, 159, 0.05)',
    borderLeftWidth: 3,
    borderLeftColor: '#4c669f',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(76, 102, 159, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontFamily: 'Quicksand_600SemiBold',
    color: '#333',
    marginBottom: 4,
  },
  notificationDesc: {
    fontSize: 14,
    fontFamily: 'Quicksand_400Regular',
    color: '#666',
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
    fontFamily: 'Quicksand_400Regular',
    color: '#999',
  },
});