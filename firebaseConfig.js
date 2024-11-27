
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyA-Gg9VOv1u9ARCz3ps4Er5g2jNtc1HYgU',
  appId: '1:529247134619:android:4f8510b2db675747adf73e',
  messagingSenderId: 'Your Sender Id',
  projectId: 'axces-52c93',
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app()
}

export default firebase;
