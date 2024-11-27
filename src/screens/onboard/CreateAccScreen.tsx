import {
  Alert,
  BackHandler,
  Image,
  KeyboardAvoidingView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CenterHeader from '../../component/Header/CenterHeader';
import { whiteEmail, whitePhoneIc, whiteUser } from '../../constants/imgURL';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { OnboardingNavigationProp } from '../../component/onboarding/Onboarding';
import { useDispatch } from 'react-redux';
import { errorMessage, saveAccessToken, saveUserId, successMessage } from '../../utils';
import { onCreateProfile } from '../../redux/ducks/Auth/profile';
import { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '../../constants';
import firebase from '../../../firebaseConfig';
import Loader from '../../component/Loader/Loader';
import { getMessaging } from '@react-native-firebase/messaging';

const CreateAccScreen = ({ route }: any) => {
  const navigation = useNavigation<OnboardingNavigationProp>();
  const profileApi = useAppSelector((state) => state.profile);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const { phoneNumber } = route?.params

     


  const registerUser = async () => {

     const token = await getMessaging().getToken();
     console.log('FCM Token:', token);

    const userData = {
      number: phoneNumber,
      name: name,
      email: email,
      device_token: token,
    };

    if (!name || !email) {
      errorMessage('Please enter name and email');
      return;
    }

    console.log('====================================');
    console.log('userData', userData);
    console.log('====================================');

    setLoading(true);

    try {
      const response = await fetch('https://backend.axces.in/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.status === 400) {
        const errorData = await response.json();
        errorMessage(errorData.message);
        setLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (result.status === 'success') {
        const { id, token } = result.data;
        successMessage(result.message);
        saveAccessToken(token);
        saveUserId(id);
        navigation.navigate('Dashboard');
      } else {
        errorMessage(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      errorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <KeyboardAvoidingView className=" flex-1">
      <SafeAreaView className=" flex-1 relative">
        <StatusBar barStyle={'light-content'} backgroundColor={'#181A53'} />
        <CenterHeader
         back={false}
          HeaderIc={
            'https://res.cloudinary.com/krishanucloud/image/upload/v1714428506/Group_obmg8b.png'
          }
          
        />
        <Loader loading={loading} color={'white'} />
        <View className="flex-1  bg-[#181A53] px-6 pt-14">
          <Text className=" text-white text-2xl font-bold">
            Create your account
          </Text>
          <Text className=" text-base text-white/60 my-3">
            When people call you by name, it says little about who you are
          </Text>
          <View className=" w-full p-3 bg-white/20 rounded-full flex flex-row items-center mt-3">
            <Image
              source={{ uri: whiteUser }}
              resizeMode="contain"
              className=" w-4 h-4 mr-2"
            />
            <View className=" flex flex-row items-start">
              <TextInput
                value={name}
                onChangeText={(value) => setName(value)}
                style={{
                  paddingVertical: 0,
                  padding: 0,
                  textAlignVertical: 'center',
                }}
                placeholder="Name"
                placeholderTextColor="#FFFFFF99"
                className=" text-base text-white/60 flex-1"
                textContentType='telephoneNumber'
              />
            </View>
          </View>
          <View className=" w-full p-3 bg-white/20 rounded-full flex flex-row items-center mt-3">
            <Image
              source={{ uri: whiteEmail }}
              resizeMode="contain"
              className=" w-4 h-4 mr-2"
            />
            <View className=" flex flex-row items-start">
              <TextInput
                value={email}
                onChangeText={(value) => setEmail(value)}
                style={{
                  paddingVertical: 0,
                  padding: 0,
                  textAlignVertical: 'center',
                }}
                placeholder="E-mail"
                placeholderTextColor="#FFFFFF99"
                className=" text-base text-white/60 flex-1"
                textContentType='emailAddress'
                keyboardType='email-address'

              />
            </View>
          </View>
        </View>
        <View className=' absolute bottom-0 left-0 right-0 px-6'>
          <TouchableOpacity
            onPress={() => { registerUser() }}
            className="w-full p-3 bg-[#BDEA09] rounded-full my-4">
            <Text className="text-[#181A53] text-base text-center font-medium">
              Next
            </Text>
          </TouchableOpacity>

        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default CreateAccScreen;

