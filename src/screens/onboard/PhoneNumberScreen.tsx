import {
  Image,
  KeyboardAvoidingView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CenterHeader from '../../component/Header/CenterHeader';
import { whitePhoneIc} from '../../constants/imgURL';
import { useNavigation } from '@react-navigation/native';
import { OnboardingNavigationProp } from '../../component/onboarding/Onboarding';

const PhoneNumberScreen = () => {
    const navigation = useNavigation<OnboardingNavigationProp>();
  return (
    <KeyboardAvoidingView className=" flex-1">
      <SafeAreaView className=" flex-1 relative">
        <StatusBar barStyle={'light-content'} backgroundColor={'#181A53'} />
        <CenterHeader
          HeaderIc={
            'https://res.cloudinary.com/krishanucloud/image/upload/v1714428506/Group_obmg8b.png'
          }
        />
        <View className="flex-1  bg-[#181A53] px-6 pt-14">
          <Text className=" text-white text-2xl font-bold">
            Let’s get started..
          </Text>
          <Text className=" text-base text-white/60 my-3">
            Where every step forward brings you closer to your dreams
          </Text>
          <View className=" w-full p-3 bg-white/20 rounded-full flex flex-row items-center mt-3">
            <Image
              source={{uri: whitePhoneIc}}
              resizeMode="contain"
              className=" w-4 h-4 mr-2"
            />
            <View className=" flex flex-row items-start">
              <Text className="text-base text-white/60 mr-1 mt-[2px]">+91</Text>
              <TextInput
                style={{
                  paddingVertical: 0,
                  padding: 0,
                  textAlignVertical: 'center',
                }}
                placeholder="Enter 10 digit mobile number"
                placeholderTextColor="#FFFFFF99"
                className=" text-base text-white/60 flex-1"
                textContentType='telephoneNumber'
              />
            </View>
          </View>
        </View>
        <View className=' absolute bottom-0 left-0 right-0 px-6'>
        <TouchableOpacity
            onPress={() => navigation.navigate('OtpVerifyScreen') }
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

export default PhoneNumberScreen;
