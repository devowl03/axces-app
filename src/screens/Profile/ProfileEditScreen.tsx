import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import UserCoin from '../../component/Profile/UserCoin';
import Header from '../../component/Header/Header';
import {SafeAreaView} from 'react-native-safe-area-context';
import {defaultUserIc, whiteHome} from '../../constants/imgURL';
import EditTile from './component/EditTile';

const ProfileEditScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#F2F8F6] relative">
      <StatusBar barStyle={'light-content'} backgroundColor={'#181A53'} />
      <Header centerTile={true} title="Profile" RightComp={UserCoin} />
      <ScrollView className="flex-1">
        <View className="bg-[#181A53] px-6 py-6 ">
          <View className=" w-full flex  items-center justify-center">
            <View className=" w-24 h-24 rounded-full">
              <Image
                source={{uri: defaultUserIc}}
                resizeMode="contain"
                className=" w-full h-full"
              />
            </View>
            <View className=" flex items-center justify-center mt-1">
              <Text className="text-white font-bold text-2xl">User Gupta</Text>
              <Text className="text-white text-base my-1">+91 9****78</Text>
            </View>
          </View>
        </View>
        <View className=" flex-1 px-6">
          <EditTile type="Your name" value="User gupta" editable={true} />
          <EditTile
            type="E-mail"
            value="Usergupta@gmail.com"
            editable={false}
          />
          <EditTile type="Mobile Number" value="9756743294" editable={true} />
        </View>

        {/* bottom placeholder */}
        <View className="w-full h-[10vh]" />
      </ScrollView>
      <View className="bottom-0 left-0 right-0 px-6 py-3 bg-white shadow-lg">
          <TouchableOpacity
            className={`py-3 px-8 rounded-full bg-[#BDEA09] mr-4`}>
            <Text className="text-[#181A53] text-base font-medium text-center">
              Save
            </Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

export default ProfileEditScreen;
