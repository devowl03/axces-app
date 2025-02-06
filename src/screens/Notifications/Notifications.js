import {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import CenterHeader from '../../component/Header/CenterHeader';
import SelectDropdown from 'react-native-select-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import your icon library

const Notifications = () => {
  // State to store notifications
  const [notifications, setNotifications] = useState([]);
  const dropdownOptions = ['Option 1', 'Option 2', 'Option 3'];

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const storedNotifications = await AsyncStorage.getItem('notifications');
        if (storedNotifications) {
          setNotifications(JSON.parse(storedNotifications));
        }
      } catch (error) {
        console.log('Error retrieving notifications: ', error);
      }
    };

    fetchNotifications();
  }, []);

  // Function to delete a notification
  const deleteNotification = async id => {
    const updatedNotifications = notifications.filter(
      notification => notification.id !== id,
    );
    setNotifications(updatedNotifications);

    // Update AsyncStorage
    await AsyncStorage.setItem(
      'notifications',
      JSON.stringify(updatedNotifications),
    );
  };

  // Render each notification item
  const renderItem = ({item}) => {
    return (
      <View style={styles.container}>
        {/* Left Side: Image */}
        <View style={styles.leftSection}>
          <Image
            source={require('../../../assets/notificationicon.png')} // Replace with your image path
            style={styles.image}
          />
        </View>

        {/* Right Side: Texts and Dropdown */}
        <View style={styles.rightSection}>
          <Text style={styles.time}>{item.time}</Text>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>

        <SelectDropdown
          data={dropdownOptions}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          buttonStyle={styles.dropdownButton}
          buttonTextStyle={styles.dropdownButtonText}
        />

        {/* Delete Icon */}
        <TouchableOpacity onPress={() => deleteNotification(item.id)}>
          <Icon name="delete" size={24} color="#FF0000" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: '#181A53'}}>
        <StatusBar backgroundColor="#181A53" />
        <View
          style={{
            height: 80,
            // marginTop: 24,
            backgroundColor: '#181A53',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <CenterHeader title="Notifications" />
        </View>
        <View
          style={{
            backgroundColor: '#F2F8F6',
            flex: 1,
            minHeight: Dimensions.get('window').height,
          }}>
          <View
            style={{
              flex: 1,
              width: '90%',
              marginHorizontal: 18,
              marginTop: 20,
            }}>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              All notifications
            </Text>
            {notifications.length == 0 ? (
              <View style={styles.noNotificationsContainer}>
                {/* <Image
                source={require('../../../assets/no_notifications.png')} // Replace with your image path for no notifications
              /> */}
                <Text style={styles.noNotificationsText}>
                  No Notifications Found
                </Text>
                <Text style={styles.noNotificationsSubText}>
                  You're all caught up! Come back later for more updates.
                </Text>
              </View>
            ) : (
              <FlatList
                data={notifications}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
              />
            )}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Changed to space-between for better layout
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: '#0E0E0C99',
  },
  leftSection: {
    width: '20%',
    justifyContent: 'center',
  },
  rightSection: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    borderRadius: 50,
    backgroundColor: '#BDEA09',
  },
  time: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#292929',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#0E0E0C',
  },
  subtitle: {
    fontSize: 12,
    color: '#0E0E0C99',
    marginTop: 2,
    fontWeight: '400',
  },
  dropdownButton: {
    marginTop: 10,
    width: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  dropdownButtonText: {
    fontSize: 14,
    textAlign: 'center',
  },
  noNotificationsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: Dimensions.get('window').height / 1.6,
  },
  noNotificationsImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  noNotificationsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#181A53',
    marginTop: 20,
  },
  noNotificationsSubText: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
    textAlign: 'center',
  },
});
