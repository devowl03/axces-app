import {
  Image,
  KeyboardAvoidingView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CenterHeader from '../../component/Header/CenterHeader';
import {
  buyrentBanner,
  eventBanner,
  serviceBanner,
} from '../../constants/imgURL';
import {useNavigation} from '@react-navigation/native';
import {OnboardingNavigationProp} from '../../component/onboarding/Onboarding';

const ProfileSelectScreen = () => {
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
            What would you like to explore?
          </Text>
          <Text className=" text-base text-white/60 my-3">
            You’re a step away from what’s yours!!
          </Text>

          <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} className=" w-full py-10 relative rounded-2xl my-4 px-6 flex items-start justify-center">
            <Text className=" text-lg font-bold text-white z-30">
              Buy / rent property
            </Text>
            <View className=" rounded-2xl z-20 bg-black/40 absolute top-0 bottom-0 left-0 right-0" />
            <Image
              source={{uri: buyrentBanner}}
              resizeMode="cover"
              className=" z-10 rounded-2xl absolute top-0 bottom-0 left-0 right-0"
            />
          </TouchableOpacity>
          <View className=" w-full py-10 relative rounded-2xl my-4 px-6 flex items-start justify-center">
            <Text className=" text-lg font-bold text-gray-500 z-30">
              Home Services
            </Text>
            <View className=" rounded-2xl z-20 bg-black/60 absolute top-0 bottom-0 left-0 right-0" />
            <View className=" rounded-2xl z-50 bg-[#181A53]/40 absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
              <Text className=" text-lg font-bold text-white z-50">
                Coming soon...
              </Text>
            </View>
            <Image
              source={{uri: serviceBanner}}
              resizeMode="cover"
              className=" z-10 rounded-2xl absolute top-0 bottom-0 left-0 right-0"
            />
          </View>
          <View className=" w-full py-10 relative rounded-2xl my-4 px-6 flex items-start justify-center">
            <Text className=" text-lg font-bold text-gray-500 z-30">
              Event
            </Text>
            <View className=" rounded-2xl z-20 bg-black/60 absolute top-0 bottom-0 left-0 right-0" />
            <View className=" rounded-2xl z-50 bg-[#181A53]/40 absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
              <Text className=" text-lg font-bold text-white z-50">
                Coming soon...
              </Text>
            </View>
            <Image
              source={{uri: eventBanner}}
              resizeMode="cover"
              className=" z-10 rounded-2xl absolute top-0 bottom-0 left-0 right-0"
            />
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ProfileSelectScreen;
