/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import FlashMessage from 'react-native-flash-message';
import messaging, { setBackgroundMessageHandler } from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);

  const existingNotifications =
    JSON.parse(await AsyncStorage.getItem('notifications')) || [];

  // Check if notification payload exists
  if (remoteMessage.notification) {
    const newNotification = {
      id: existingNotifications.length + 1,
      time: new Date().toLocaleTimeString(),
      title: remoteMessage.notification.title || 'No Title',
      subtitle: remoteMessage.notification.body || 'No Body',
    };

    existingNotifications.push(newNotification);
    await AsyncStorage.setItem(
      'notifications',
      JSON.stringify(existingNotifications),
    );
  } else {
    console.warn('No notification payload in the message.');
  }
});

const Main = () => {
    return (
      <Provider store={store}>
        <App/>
        <FlashMessage/>
      </Provider>
    );
  };

AppRegistry.registerComponent(appName, () => Main);
