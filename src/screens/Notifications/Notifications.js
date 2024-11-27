// import { StyleSheet, Text, View,SafeAreaView, StatusBar, Image, FlatList } from 'react-native'
// import React from 'react'
// import CenterHeader from '../../component/Header/CenterHeader';
// import SelectDropdown from 'react-native-select-dropdown'; 

// const Notifications = () => {

//     const dropdownOptions = ['Option 1', 'Option 2', 'Option 3'];

//     const data = [
//       {
//         id: 1,
//         time: '2 hours ago',
//         title: 'Hey Champ!',
//         subtitle:
//           'We are introducing a new feature in.We are introducing a new feature in.',
//       },
//       {
//         id: 2,
//         time: '2 hours ago',
//         title: 'Hey Champ!',
//         subtitle:
//           'We are introducing a new feature in.We are introducing a new feature in.',
//       },
//       {
//         id: 2,
//         time: '2 hours ago',
//         title: 'Hey Champ!',
//         subtitle:
//           'We are introducing a new feature in.We are introducing a new feature in.',
//       },
//       {
//         id: 2,
//         time: '2 hours ago',
//         title: 'Hey Champ!',
//         subtitle:
//           'We are introducing a new feature in.We are introducing a new feature in.',
//       },
//       {
//         id: 2,
//         time: '2 hours ago',
//         title: 'Hey Champ!',
//         subtitle:
//           'We are introducing a new feature in.We are introducing a new feature in.',
//       },
//       {
//         id: 2,
//         time: '2 hours ago',
//         title: 'Hey Champ!',
//         subtitle:
//           'We are introducing a new feature in.We are introducing a new feature in.',
//       },
//       {
//         id: 2,
//         time: '2 hours ago',
//         title: 'Hey Champ!',
//         subtitle:
//           'We are introducing a new feature in.We are introducing a new feature in.',
//       },
//       {
//         id: 2,
//         time: '2 hours ago',
//         title: 'Hey Champ!',
//         subtitle:
//           'We are introducing a new feature in.We are introducing a new feature in.',
//       },
//       {
//         id: 2,
//         time: '2 hours ago',
//         title: 'Hey Champ!',
//         subtitle:
//           'We are introducing a new feature in.We are introducing a new feature in.',
//       },
//     ];


//     const renderItem = () =>{
//         return (
//           <>
//             <View style={styles.container}>
//               {/* Left Side: Image */}
//               <View style={styles.leftSection}>
//                 <Image
//                   source={require('../../../assets/notificationicon.png')} // Replace with your image URL
//                   style={styles.image}
//                 />
//               </View>

//               {/* Right Side: Texts and Dropdown */}
//               <View style={styles.rightSection}>
//                 <Text style={styles.time}>2 hours ago</Text>
//                 <Text style={styles.title}>Hey Champ!</Text>
//                 <Text style={styles.subtitle}>
//                   We are introducing a new feature in.We are introducing a new
//                   feature in.
//                 </Text>
//               </View>
//               <SelectDropdown
//                 data={dropdownOptions}
//                 onSelect={(selectedItem, index) => {
//                   console.log(selectedItem, index);
//                 }}
//                 buttonStyle={styles.dropdownButton}
//                 buttonTextStyle={styles.dropdownButtonText}
//               />
//               {/* <Image
//                 source={{
//                   uri: 'https://cdn-icons-png.flaticon.com/512/60/60995.png',
//                 }}
//                 style={{height: 12, width: 12, margin: 8}}
//               /> */}
//             </View>
//           </>
//         );
//     }

//   return (
//     <>
//       <StatusBar
//         // translucent
//         backgroundColor="#181A53"
//         // barStyle="light-content" // You can use 'dark-content' based on your preference
//       />
//       <SafeAreaView style={{flex: 1, backgroundColor: '#F2F8F6'}}>
//         <View
//           style={{
//             height: 80,
//             marginTop: 24,
//             backgroundColor: '#181A53',
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}>
//           <CenterHeader title="Notifications" />
//         </View>
//         <View
//           style={{
//             // borderWidth: 1,
//             width: '90%',
//             marginHorizontal: 18,
//             marginTop: 10,
//           }}>
//           <Text
//             style={{
//               color: 'black',
//               fontWeight: 'bold',
//               fontSize: 20,
//               fontFamily: 'Figtree',
//             }}>
//             All notifications
//           </Text>
//           <View style={{marginTop: 10}}>
//            <FlatList
//            data={data}
//            renderItem={renderItem}
//             showsVerticalScrollIndicator={false}
//            />
//           </View>
//         </View>
//         {/* </View> */}
//       </SafeAreaView>
//     </>
//   );
// }

// export default Notifications

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     // padding: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     // borderWidth:1,
//     padding: 10,
//     borderBottomWidth: 0.5,
//     borderColor: '#0E0E0C99',
//   },
//   leftSection: {
//     width: '20%',
//     justifyContent: 'center',
//   },
//   rightSection: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingLeft: 10,
//   },
//   image: {
//     width: 60,
//     height: 60, // Adjust height as needed
//     resizeMode: 'cover',
//     // borderWidth: 1,
//     // borderColor: 'red',
//     borderRadius: 50,
//     backgroundColor: '#BDEA09',
//   },
//   time: {
//     fontSize: 12,
//     fontWeight: 'bold',
//     color: '#292929',
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginTop: 5,
//     color: '#0E0E0C',
//     fontFamily: 'Figtree',
//   },
//   subtitle: {
//     fontSize: 12,
//     color: '#0E0E0C99',
//     marginTop: 2,
//     fontWeight: '400',
//   },
//   dropdownButton: {
//     marginTop: 10,
//     width: '100%',
//     backgroundColor: '#f0f0f0',
//     borderRadius: 5,
//   },
//   dropdownButtonText: {
//     fontSize: 14,
//     textAlign: 'center',
//   },
// });

// import {useState, useEffect} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   StatusBar,
//   Image,
//   FlatList,
//   Platform,
//   TouchableOpacity,
// } from 'react-native';
// import CenterHeader from '../../component/Header/CenterHeader';
// import PushNotification from 'react-native-push-notification';
// import SelectDropdown from 'react-native-select-dropdown';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Icon from 'react-native-vector-icons/MaterialIcons'; // Import your icon library

// const Notifications = () => {
//   // State to store notifications
//   const [notifications, setNotifications] = useState([]);
//   const dropdownOptions = ['Option 1', 'Option 2', 'Option 3'];

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const storedNotifications = await AsyncStorage.getItem('notifications');
//         if (storedNotifications) {
//           setNotifications(JSON.parse(storedNotifications));
//         }
//       } catch (error) {
//         console.log('Error retrieving notifications: ', error);
//       }
//     };

//     fetchNotifications();
//   }, []);

//   // Function to delete a notification
//   const deleteNotification = async id => {
//     const updatedNotifications = notifications.filter(
//       notification => notification.id !== id,
//     );
//     setNotifications(updatedNotifications);

//     // Update AsyncStorage
//     await AsyncStorage.setItem(
//       'notifications',
//       JSON.stringify(updatedNotifications),
//     );
//   };

//   // Render each notification item
//   const renderItem = ({item}) => {
//     return (
//       <View style={styles.container}>
//         {/* Left Side: Image */}
//         <View style={styles.leftSection}>
//           <Image
//             source={require('../../../assets/notificationicon.png')} // Replace with your image path
//             style={styles.image}
//           />
//         </View>

//         {/* Right Side: Texts and Dropdown */}
//         <View style={styles.rightSection}>
//           <Text style={styles.time}>{item.time}</Text>
//           <Text style={styles.title}>{item.title}</Text>
//           <Text style={styles.subtitle}>{item.subtitle}</Text>
//         </View>

//         <SelectDropdown
//           data={dropdownOptions}
//           onSelect={(selectedItem, index) => {
//             console.log(selectedItem, index);
//           }}
//           buttonStyle={styles.dropdownButton}
//           buttonTextStyle={styles.dropdownButtonText}
//         />

//         {/* Delete Icon */}
//         <TouchableOpacity onPress={() => deleteNotification(item.id)}>
//           <Icon name="delete" size={24} color="#FF0000" />
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   return (
//     <>
//       <StatusBar backgroundColor="#181A53" />
//       <SafeAreaView style={{flex: 1, backgroundColor: '#F2F8F6'}}>
//         <View
//           style={{
//             height: 80,
//             marginTop: 24,
//             backgroundColor: '#181A53',
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}>
//           <CenterHeader title="Notifications" />
//         </View>
//         <View style={{width: '90%', marginHorizontal: 18, marginTop: 10}}>
//           <Text
//             style={{
//               color: 'black',
//               fontWeight: 'bold',
//               fontSize: 20,
//               fontFamily: 'Figtree',
//             }}>
//             All notifications
//           </Text>
//           <FlatList
//             data={notifications}
//             renderItem={renderItem}
//             keyExtractor={item => item.id.toString()}
//             showsVerticalScrollIndicator={false}
//           />
//         </View>
//       </SafeAreaView>
//     </>
//   );
// };

// export default Notifications;

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between', // Changed to space-between for better layout
//     padding: 10,
//     borderBottomWidth: 0.5,
//     borderColor: '#0E0E0C99',
//   },
//   leftSection: {
//     width: '20%',
//     justifyContent: 'center',
//   },
//   rightSection: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingLeft: 10,
//   },
//   image: {
//     width: 60,
//     height: 60,
//     resizeMode: 'cover',
//     borderRadius: 50,
//     backgroundColor: '#BDEA09',
//   },
//   time: {
//     fontSize: 12,
//     fontWeight: 'bold',
//     color: '#292929',
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginTop: 5,
//     color: '#0E0E0C',
//     fontFamily: 'Figtree',
//   },
//   subtitle: {
//     fontSize: 12,
//     color: '#0E0E0C99',
//     marginTop: 2,
//     fontWeight: '400',
//   },
//   dropdownButton: {
//     marginTop: 10,
//     width: '100%',
//     backgroundColor: '#f0f0f0',
//     borderRadius: 5,
//   },
//   dropdownButtonText: {
//     fontSize: 14,
//     textAlign: 'center',
//   },
// });

import {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  FlatList,
  Platform,
  TouchableOpacity,
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
            marginTop: 24,
            backgroundColor: '#181A53',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <CenterHeader title="Notifications" />
        </View>
        <View style={{backgroundColor: '#F2F8F6', flex: 1}}>
          <View
            style={{
              flex: 1,
              width: '90%',
              marginHorizontal: 18,
              marginTop: 10,
            }}>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 20,
                fontFamily: 'Figtree',
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
    fontFamily: 'Figtree',
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 50,
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


