import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './src/routes/MainStack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import configurePushNotifications from './Pushnotificationsconfig'; // Import the config
import messaging from '@react-native-firebase/messaging';

function App(): React.JSX.Element {
  const requestUserPermission = async () => {
    if (Platform.OS === 'ios') {
      const authStatus = await PushNotificationIOS.requestPermissions();
      const isAuthorized =
        authStatus.alert || authStatus.badge || authStatus.sound;
      console.log('iOS Push Notification Permission Status:', isAuthorized);
    }

    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: 'Notification Permission',
          message: 'App needs access to notifications',
          buttonPositive: 'OK',
        },
      );
      console.log('Android Push Notification Permission Status:', granted);
    }
  };


  const getFCMToken = async () => {
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
    return token;
  };


  useEffect(() => {
      getFCMToken();
    requestUserPermission();
    // configurePushNotifications(); // Initialize push notifications
  }, []);

 useEffect(() => {
   const unsubscribe = messaging().onMessage(async remoteMessage => {
     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
   });

   return unsubscribe;
 }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <SafeAreaProvider>
          <MainStack />
        </SafeAreaProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;


// import 'react-native-gesture-handler';
// import React, {useEffect} from 'react';
// import {SafeAreaProvider} from 'react-native-safe-area-context';
// import {NavigationContainer} from '@react-navigation/native';
// import MainStack from './src/routes/MainStack';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import {Alert, PermissionsAndroid, Platform} from 'react-native';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
// import messaging from '@react-native-firebase/messaging';
// import {
//   notifictionListener,
//   requestUserPermission,
// } from './Pushnotificationsconfig';
// function App(): React.JSX.Element {
//   useEffect(() => {
//     requestUserPermission();
//     notifictionListener();
//   }, []);

//   return (
//     <GestureHandlerRootView style={{flex: 1}}>
//       <NavigationContainer>
//         <SafeAreaProvider>
//           <MainStack />
//         </SafeAreaProvider>
//       </NavigationContainer>
//     </GestureHandlerRootView>
//   );
// }

// export default App;