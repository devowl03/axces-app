import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const configurePushNotifications = () => {
  PushNotification.configure({
    // Called when a remote or local notification is opened or received
    onNotification: async function (notification) {
      console.log('Notification received: ', notification);

      // Store the notification in AsyncStorage
      const existingNotifications =
        JSON.parse(await AsyncStorage.getItem('notifications')) || [];
      // existingNotifications.push({
      //   id: existingNotifications.length + 1,
      //   time: new Date().toLocaleTimeString(),
      //   title: notification.title,
      //   subtitle: notification.message,
      // });
      // await AsyncStorage.setItem(
      //   'notifications',
      //   JSON.stringify(existingNotifications),
      // );

      // (required) Called when a remote is received or opened, or local notification is opened
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // For Android only: GCM or FCM Sender ID
    senderID: 'YOUR_FCM_SENDER_ID',

    // Permissions to request (for iOS)
    requestPermissions: Platform.OS === 'ios',
  });

  // Create a notification channel for Android (required for Android 8.0+)
  PushNotification.createChannel(
    {
      channelId: 'your-channel-id', // Required
      channelName: 'My Channel', // Required
      channelDescription: 'A channel to categorize your notifications', // Optional
      soundName: 'default', // Optional
      importance: 4, // Optional (default 4 is high)
      vibrate: true, // Optional
      lights: true, // Turn on LED light (on supported devices)
      lightColor: '#FF0000', // LED light color
      visibility: 'public', // Notification will show content on lock screen
    },
    created => console.log(`Create channel returned '${created}'`), // Log if channel was created
  );
};

export default configurePushNotifications;


// import AsyncStorage from '@react-native-async-storage/async-storage';
// import messaging from '@react-native-firebase/messaging';
// import {Alert, PermissionsAndroid} from 'react-native';

// export async function requestUserPermission() {
//   if (Platform.OS === 'ios') {
//     const authStatus = await PushNotificationIOS.requestPermissions();
//     const isAuthorized =
//       authStatus.alert || authStatus.badge || authStatus.sound;
//     console.log('iOS Push Notification Permission Status:', isAuthorized);
//   }

//   if (Platform.OS === 'android') {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
//       {
//         title: 'Notification Permission',
//         message: 'App needs access to notifications',
//         buttonPositive: 'OK',
//       },
//     );
//     if (granted) {
//       console.log('Authorization status:', authStatus);
//       getFcmToken();
//     }
//     console.log('Android Push Notification Permission Status:', granted);
//   }
// };
//   // const authStatus = await messaging().requestPermission();
//   // const enabled =
//   //   authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//   //   authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   // if (enabled) {
//   //   console.log('Authorization status:', authStatus);
//   //   getFcmToken();
//   // }

// const getFcmToken = async () => {
//   let fcmToken = await AsyncStorage.getItem('fcmToken');
//   console.log(fcmToken, 'the old token::::::::::::::');
//   if (!fcmToken) {
//     try {
//       const fcmToken = await messaging().getToken();
//       if (fcmToken) {
//         console.log(fcmToken, 'the new generated token:::::::::::::');
//         await AsyncStorage.setItem('fcmToken', fcmToken);
//       }
//     } catch (error) {
//       console.log(error, 'error raised in fcmToken');
//     }
//   }
// };

// export const notifictionListener = async () => {
//   messaging().onNotificationOpenedApp(remoteMessage => {
//     console.log(
//       'Notification caused app to open from background state:',
//       remoteMessage.notification,
//     );
//   });

//   // messaging().onMessage(async remoteMessage => {
//   //   console.log(
//   //       'Recieved in foreground' , remoteMessage
//   //   )
//   // })

//   messaging()
//     .getInitialNotification()
//     .then(remoteMessage => {
//       if (remoteMessage) {
//         console.log(
//           'Notification caused app to open from quit state:',
//           remoteMessage.notification,
//         );
//       }
//     });
// };

