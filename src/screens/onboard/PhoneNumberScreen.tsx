// import {
//   Image,
//   Keyboard,
//   KeyboardAvoidingView,
//   StatusBar,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import CenterHeader from '../../component/Header/CenterHeader';
// import { whitePhoneIc } from '../../constants/imgURL';
// import { useFocusEffect, useNavigation } from '@react-navigation/native';
// import { OnboardingNavigationProp } from '../../component/onboarding/Onboarding';
// import firebase from '../../../firebaseConfig';
// import { useCallback, useEffect, useState } from 'react';
// import { errorMessage, saveAccessToken, saveUserId, successMessage } from '../../utils';
// import Loader from '../../component/Loader/Loader';
// import { useDispatch } from 'react-redux';
// import { onVerifyUser } from '../../redux/ducks/User/verifyUser';
// import { useAppSelector } from '../../constants';

// const PhoneNumberScreen = () => {
//   const navigation = useNavigation<OnboardingNavigationProp>();
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [loading, setLoading] = useState(false);


//   const dispatch = useDispatch()

//   useFocusEffect(
//     useCallback(() => {
//       setLoading(false)
//     }, [])
//   )

//   // async function signInWithPhoneNumber(number: string) {
//   //   if (number === '') {
//   //     errorMessage('Please enter phone number')
//   //     return
//   //   }
//   //   if (number?.length < 10) {
//   //     errorMessage('Please enter valid phone number')
//   //     return
//   //   }
//   //   setLoading(true)
//   //   Keyboard.dismiss()
   
//   //   const confirmation = await firebase.auth().signInWithPhoneNumber("+91" + number)
//   //   navigation.navigate('OtpVerifyScreen', { confirm: confirmation, phoneNumber })
//   // }

//   const sendOtp = async () => {
    
//     if (!phoneNumber) {
//       errorMessage('Please enter your phone number');
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await fetch('https://backend.axces.in/api/send-otp', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ phoneNumber }),
//       });

//       const responseData = await response.json();
//       console.log('====================================');
//       console.log('responseData', responseData);
//       console.log('====================================');

//       if (responseData.Status === 'Success') {
//         successMessage(responseData.Status);
//         setLoading(false);
//         navigation.navigate('OtpVerifyScreen', {phoneNumber, responseData});
//       } else {
//         errorMessage(responseData.Details);
//         setLoading(false);
//       }
//     } catch (error) {
//       console.error('Error sending OTP:', error);
//       errorMessage('An error occurred while sending OTP. Please try again.');
//     }
//   };
//   return (
//     <KeyboardAvoidingView className=" flex-1">
//       <SafeAreaView className=" flex-1 relative">
//         <Loader loading={loading} />
//         <StatusBar barStyle={'light-content'} backgroundColor={'#181A53'} />
//         <CenterHeader
//           HeaderIc={
//             'https://res.cloudinary.com/krishanucloud/image/upload/v1714428506/Group_obmg8b.png'
//           }
//         />
//         <View className="flex-1  bg-[#181A53] px-6 pt-14">
//           <Text className=" text-white text-2xl font-bold">
//             Let’s get started..
//           </Text>
//           <Text className=" text-base text-white/60 my-3">
//             Where every step forward brings you closer to your dreams
//           </Text>
//           <View className=" w-full p-3 bg-white/20 rounded-full flex flex-row items-center mt-3">
//             <Image
//               source={{ uri: whitePhoneIc }}
//               resizeMode="contain"
//               className=" w-4 h-4 mr-2"
//             />
//             <View className=" flex flex-row items-start">
//               <Text className="text-base text-white/60 mr-1 mt-[2px]">+91</Text>
//               <TextInput
//                 style={{
//                   paddingVertical: 1.5,
//                   textAlignVertical: 'center',
//                 }}
//                 value={phoneNumber}
//                 // onChangeText={(value) => setPhoneNumber(value)}
//                 onChangeText={setPhoneNumber}
//                 maxLength={10}
//                 placeholder="Enter mobile number"
//                 placeholderTextColor="#FFFFFF99"
//                 className=" text-base text-white/60 flex-1"
//                 keyboardType='number-pad'
//               />
//             </View>
//           </View>
//         </View>
//         <View className=' absolute bottom-0 left-0 right-0 px-6'>
//           <TouchableOpacity
//             onPress={() => {
              
//               sendOtp()
//             }}
//             className="w-full p-3 bg-[#BDEA09] rounded-full my-4">
//             <Text className="text-[#181A53] text-base text-center font-medium">
//               Next
//             </Text>
//           </TouchableOpacity>

//         </View>
//       </SafeAreaView>
//     </KeyboardAvoidingView>
//   );
// };

// export default PhoneNumberScreen;


// import {
//   Image,
//   Keyboard,
//   KeyboardAvoidingView,
//   StatusBar,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   StyleSheet,
// } from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import CenterHeader from '../../component/Header/CenterHeader';
// import {whitePhoneIc} from '../../constants/imgURL';
// import {useFocusEffect, useNavigation} from '@react-navigation/native';
// import {OnboardingNavigationProp} from '../../component/onboarding/Onboarding';
// import firebase from '../../../firebaseConfig';
// import {useCallback, useEffect, useState} from 'react';
// import {
//   errorMessage,
//   saveAccessToken,
//   saveUserId,
//   successMessage,
// } from '../../utils';
// import Loader from '../../component/Loader/Loader';
// import {useDispatch} from 'react-redux';
// import {onVerifyUser} from '../../redux/ducks/User/verifyUser';
// import {useAppSelector} from '../../constants';

// const PhoneNumberScreen = () => {
//   const navigation = useNavigation<OnboardingNavigationProp>();
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [loading, setLoading] = useState(false);

//   const dispatch = useDispatch();

//   useFocusEffect(
//     useCallback(() => {
//       setLoading(false);
//     }, []),
//   );

//   const sendOtp = async () => {
//     if (!phoneNumber) {
//       errorMessage('Please enter your phone number');
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await fetch('https://backend.axces.in/api/send-otp', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({phoneNumber}),
//       });

//       const responseData = await response.json();
//       if (responseData.Status === 'Success') {
//         successMessage(responseData.Status);
//         setLoading(false);
//         navigation.navigate('OtpVerifyScreen', {phoneNumber, responseData});
//       } else {
//         errorMessage(responseData.Details);
//         setLoading(false);
//       }
//     } catch (error) {
//       console.error('Error sending OTP:', error);
//       errorMessage('An error occurred while sending OTP. Please try again.');
//     }
//   };

//   return (
//     <KeyboardAvoidingView style={styles.container}>
//       <SafeAreaView style={styles.safeArea}>
//         <Loader loading={loading} />
//         <StatusBar barStyle={'light-content'} backgroundColor={'#181A53'} />
//         <CenterHeader
//           HeaderIc={
//             'https://res.cloudinary.com/krishanucloud/image/upload/v1714428506/Group_obmg8b.png'
//           }
//         />
//         <View style={styles.content}>
//           <Text style={styles.title}>Let’s get started..</Text>
//           <Text style={styles.subtitle}>
//             Where every step forward brings you closer to your dreams
//           </Text>
//           <View style={styles.inputContainer}>
//             <Image
//               source={{uri: whitePhoneIc}}
//               resizeMode="contain"
//               style={styles.icon}
//             />
//             <View style={styles.phoneInput}>
//               <Text style={styles.countryCode}>+91</Text>
//               <TextInput
//                 style={styles.textInput}
//                 value={phoneNumber}
//                 onChangeText={setPhoneNumber}
//                 maxLength={10}
//                 placeholder="Enter mobile number"
//                 placeholderTextColor="#FFFFFF99"
//                 keyboardType="number-pad"
//               />
//             </View>
//           </View>
//         </View>
//         <View style={styles.footer}>
//           <TouchableOpacity onPress={sendOtp} style={styles.button}>
//             <Text style={styles.buttonText}>Next</Text>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   safeArea: {
//     flex: 1,
//     position: 'relative',
//   },
//   content: {
//     flex: 1,
//     backgroundColor: '#181A53',
//     paddingHorizontal: 24,
//     paddingTop: 56,
//   },
//   title: {
//     color: '#FFFFFF',
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   subtitle: {
//     color: '#FFFFFF99',
//     fontSize: 16,
//     marginTop: 12,
//     marginBottom: 12,
//   },
//   inputContainer: {
//     width: '100%',
//     padding: 12,
//     backgroundColor: '#FFFFFF33',
//     borderRadius: 24,
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 12,
//   },
//   icon: {
//     width: 16,
//     height: 16,
//     marginRight: 8,
//   },
//   phoneInput: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   countryCode: {
//     fontSize: 16,
//     color: '#FFFFFF99',
//     marginRight: 4,
//     marginTop: 2,
//   },
//   textInput: {
//     flex: 1,
//     fontSize: 16,
//     color: '#FFFFFF99',
//     paddingVertical: 1.5,
//     textAlignVertical: 'center',
//   },
//   footer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     paddingHorizontal: 24,
//   },
//   button: {
//     width: '100%',
//     padding: 12,
//     backgroundColor: '#BDEA09',
//     borderRadius: 24,
//     marginBottom: 16,
//   },
//   buttonText: {
//     color: '#181A53',
//     fontSize: 16,
//     textAlign: 'center',
//     fontWeight: '500',
//   },
// });

// export default PhoneNumberScreen;

import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CenterHeader from '../../component/Header/CenterHeader';
import {whitePhoneIc} from '../../constants/imgURL';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {OnboardingNavigationProp} from '../../component/onboarding/Onboarding';
import firebase from '../../../firebaseConfig';
import {useCallback, useEffect, useState} from 'react';
import {
  errorMessage,
  saveAccessToken,
  saveUserId,
  successMessage,
} from '../../utils';
import Loader from '../../component/Loader/Loader';
import {useDispatch} from 'react-redux';
import {onVerifyUser} from '../../redux/ducks/User/verifyUser';
import {useAppSelector} from '../../constants';
import {Linking} from 'react-native'; // Import Linking
import Icon from 'react-native-vector-icons/MaterialIcons'; 

const PhoneNumberScreen = () => {
  const navigation = useNavigation<OnboardingNavigationProp>();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false); // Checkbox state

  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      setLoading(false);
    }, []),
  );

  const sendOtp = async () => {
    if (!phoneNumber) {
      errorMessage('Please enter your phone number');
      return;
    }
    if (!isChecked) {
      // Check if checkbox is checked
      errorMessage(
        'You must accept the Privacy Policy and Terms of Use to proceed',
      );
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('https://backend.axces.in/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({phoneNumber}),
      });

      const responseData = await response.json();
      if (responseData.Status === 'Success') {
        successMessage(responseData.Status);
        setLoading(false);
        navigation.navigate('OtpVerifyScreen', {phoneNumber, responseData});
      } else {
        errorMessage(responseData.Details);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      errorMessage('An error occurred while sending OTP. Please try again.');
    }
  };

 const openPrivacyPolicy = () => {
   Linking.openURL('https://www.axces.in/privacy_policy.html');
 };

 const openTermsOfUse = () => {
   Linking.openURL('https://www.axces.in/Terms_of_use.html');
 };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Loader loading={loading} />
        <StatusBar barStyle={'light-content'} backgroundColor={'#181A53'} />
        <CenterHeader
          HeaderIc={
            'https://res.cloudinary.com/krishanucloud/image/upload/v1714428506/Group_obmg8b.png'
          }
        />
        <View style={styles.content}>
          <Text style={styles.title}>Let’s get started..</Text>
          <Text style={styles.subtitle}>
            Where every step forward brings you closer to your dreams
          </Text>
          <View style={styles.inputContainer}>
            <Image
              source={{uri: whitePhoneIc}}
              resizeMode="contain"
              style={styles.icon}
            />
            <View style={styles.phoneInput}>
              <Text style={styles.countryCode}>+91</Text>
              <TextInput
                style={styles.textInput}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                maxLength={10}
                placeholder="Enter mobile number"
                placeholderTextColor="#FFFFFF99"
                keyboardType="number-pad"
                returnKeyType="done"
              />
            </View>
          </View>

          {/* Privacy Policy Checkbox */}
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              onPress={() => setIsChecked(!isChecked)}
              style={styles.checkbox}>
              {isChecked && <View style={styles.checked} />}
              <Icon
                name={isChecked ? 'check-box' : 'check-box-outline-blank'}
                size={24}
                color="#BDEA09"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={openPrivacyPolicy}>
              <Text style={styles.checkboxLabel}>
                I accept the{' '}
                <Text style={styles.privacyLink}>Privacy Policy</Text>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={openTermsOfUse}>
              <Text style={styles.checkboxLabel}>
                {' '}
                and <Text style={styles.privacyLink}>Terms of Use</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity onPress={sendOtp} style={styles.button}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#181A53',
  },
  content: {
    flex: 1,
    backgroundColor: '#181A53',
    paddingHorizontal: 24,
    paddingTop: 56,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#FFFFFF99',
    fontSize: 16,
    marginTop: 12,
    marginBottom: 12,
  },
  inputContainer: {
    width: '100%',
    padding: 12,
    backgroundColor: '#FFFFFF33',
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  phoneInput: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  countryCode: {
    fontSize: 16,
    color: '#FFFFFF99',
    marginRight: 4,
    marginTop: 2,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF99',
    paddingVertical: 1.5,
    textAlignVertical: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 340,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
  },
  button: {
    width: '100%',
    padding: 12,
    backgroundColor: '#BDEA09',
    borderRadius: 24,
    marginBottom: 16,
  },
  buttonText: {
    color: '#181A53',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  checked: {
    width: 16,
    height: 16,
    // backgroundColor: '#BDEA09',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  checkboxLabel: {
    color: '#FFFFFF99',
    fontSize: 13,
  },
  privacyLink: {
    color: '#BDEA09', // Link color for privacy policy
    textDecorationLine: 'underline',
  },
});

export default PhoneNumberScreen;
