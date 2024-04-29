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
  import { whiteEmail, whitePhoneIc, whiteUser} from '../../constants/imgURL';
  import { useNavigation } from '@react-navigation/native';
  import { OnboardingNavigationProp } from '../../component/onboarding/Onboarding';
  
  const CreateAccScreen = () => {
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
            Create your account
            </Text>
            <Text className=" text-base text-white/60 my-3">
            When people call you by name, it says little about who you are
            </Text>
            <View className=" w-full p-3 bg-white/20 rounded-full flex flex-row items-center mt-3">
              <Image
                source={{uri: whiteUser}}
                resizeMode="contain"
                className=" w-4 h-4 mr-2"
              />
              <View className=" flex flex-row items-start">
                <TextInput
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
                source={{uri: whiteEmail}}
                resizeMode="contain"
                className=" w-4 h-4 mr-2"
              />
              <View className=" flex flex-row items-start">
                <TextInput
                  style={{
                    paddingVertical: 0,
                    padding: 0,
                    textAlignVertical: 'center',
                  }}
                  placeholder="E-mail"
                  placeholderTextColor="#FFFFFF99"
                  className=" text-base text-white/60 flex-1"
                  textContentType='telephoneNumber'
                />
              </View>
            </View>
          </View>
          <View className=' absolute bottom-0 left-0 right-0 px-6'>
          <TouchableOpacity
              onPress={() => navigation.navigate('ProfileSelectScreen') }
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
  