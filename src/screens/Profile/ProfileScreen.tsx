import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../component/Header/Header';
import UserCoin from '../../component/Profile/UserCoin';
import {
  blueHeart,
  defaultUserIc,
  downGrayArrow,
  houseRound,
  whiteHome,
} from '../../constants/imgURL';
import OtherTile from './component/OtherTile';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../routes/MainStack';

export interface OthersDataInterface {
  title: string;
  iconurl: string;
  navigateTo?: string;
}

const othersData: OthersDataInterface[] = [
  {
    title: 'My Wishlist',
    iconurl: blueHeart,
  },
  {
    title: 'Account Privacy',
    iconurl: blueHeart,
  },
  {
    title: 'My Wishlist',
    iconurl: blueHeart,
  },
  {
    title: 'Account Privacy',
    iconurl: blueHeart,
  },
];

const ProfileScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView className="flex-1 bg-[#F2F8F6]">
      <StatusBar barStyle={'light-content'} backgroundColor={'#181A53'} />
      <Header centerTile={true} title="Profile" RightComp={UserCoin} />
      <ScrollView className="flex-1">
        <View className="bg-[#181A53] px-6 pb-6 ">
          <View className=" w-full flex flex-row items-center justify-start">
            <View className=" w-24 h-24 rounded-full mr-4">
              <Image
                source={{uri: defaultUserIc}}
                resizeMode="contain"
                className=" w-full h-full"
              />
            </View>
            <View>
              <Text className="text-white font-bold text-2xl">User Gupta</Text>
              <Text className="text-white text-base my-1">+91 9****78</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('ProfileEditScreen')}
                className=" px-6 py-2 rounded-full border border-[#BDEA09]">
                <Text className=" text-[#BDEA09] text-base font-normal text-center">
                  Edit details
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className=" flex flex-row mt-7">
            <View className=" flex-1 border-r border-r-[#F2F8F63D] pr-5 flex">
              <View className=" flex flex-row items-center">
                <Image
                  source={{uri: whiteHome}}
                  resizeMode="contain"
                  className=" w-5 h-5 mr-2"
                />
                <Text className="text-white text-base">Property Listed</Text>
              </View>
              <Text className=" text-white text-xl font-bold my-2">0</Text>
              <TouchableOpacity className=" px-6 py-2 rounded-full border border-[#BDEA09] ">
                <Text className=" text-[#BDEA09] text-base font-normal text-center">
                  List Property
                </Text>
              </TouchableOpacity>
            </View>
            <View className=" flex-1 pl-5">
              <View className=" flex flex-row items-center">
                <Image
                  source={{uri: whiteHome}}
                  resizeMode="contain"
                  className=" w-5 h-5 mr-2"
                />
                <Text className="text-white text-base">Wallet Balance</Text>
              </View>
              <Text className=" text-white text-xl font-bold my-2">0</Text>
              <TouchableOpacity className=" px-6 py-2 rounded-full border border-[#BDEA09] ">
                <Text className=" text-[#BDEA09] text-base font-normal text-center">
                  Add coins
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="  py-2 rounded-full border border-[#BDEA09] mt-2 ">
                <Text className=" text-[#BDEA09] text-base font-normal text-center">
                  Wishdraw coins
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="px-6 relative">
          <View className="z-20 w-full rounded-2xl p-4 bg-white shadow-md">
            <Text className=" text-[#0E0E0C] text-base font-medium">
              Select feature to use
            </Text>
            <View className=" flex flex-row justify-between items-center border border-[#0E0E0C14] rounded-lg p-2 mt-2">
              <View className=" flex flex-row items-center">
                <Image
                  source={{uri: houseRound}}
                  resizeMode="contain"
                  className=" w-5 h-5 mr-2"
                />
                <Text className=" text-[#0E0E0C] text-base font-medium">
                  Buy/ Sell Property
                </Text>
              </View>
              <Image
                source={{uri: downGrayArrow}}
                resizeMode="contain"
                className=" w-2 h-3"
              />
            </View>
          </View>
          <View className="z-10 absolute top-0 left-0 right-0 h-6 bg-[#181A53]" />
        </View>
        <View className=" px-6 mt-5">
          <Text className=" text-[#0E0E0C99] text-base mb-4">OTHERS</Text>
          {othersData.map((item, idx) => (
            <OtherTile key={idx} data={item} />
          ))}
          <TouchableOpacity className=" w-full py-2 rounded-full bg-white shadow-lg my-4">
            <Text className=" text-[#181A53] text-base font-medium text-center">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
