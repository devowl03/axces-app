import {Image, Text, TouchableOpacity, View} from 'react-native';
import CardSwiper from './CardSwiper';
import {demoUser, rightArrowWhite, wishlist} from '../../constants/imgURL';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../routes/MainStack';

const PropertyCard = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View className=" w-full h-full bg-white rounded-b-xl">
      <View className=" w-full h-[35%] rounded-t-xl overflow-hidden relative">
        <CardSwiper />
        <TouchableOpacity
          onPress={() => navigation.navigate('PropertyScreen', {name: 'Hello'})}
          className="p-2 rounded-full bg-black/25 absolute w-8 h-8 right-2 top-1/3">
          <Image
            source={{uri: rightArrowWhite}}
            resizeMode="contain"
            className=" w-4 h-4"
          />
        </TouchableOpacity>
      </View>
      <View className="p-3">
        <View className=" flex flex-row items-start">
          <View className=" flex-1">
            <Text className="text-lg font-bold text-[#1A1E25]">
              The Aston Villa
            </Text>
            <Text className=" text-base text-[#2F4858]">
              Sector 15 Laservali park, Gurgaon
            </Text>
          </View>
          <TouchableOpacity>
            <Image
              source={{uri: wishlist}}
              resizeMode="contain"
              className="w-5 h-5"
            />
          </TouchableOpacity>
        </View>
        <View className=" flex flex-row items-center justify-start p-1 rounded-md bg-[#F2F8F6] mt-1 mb-3">
          <Text className="text-sm text-[#738D9C]">2BHK</Text>
          <View className="w-[6px] h-[6px] rounded-full bg-[#738D9C] mx-2" />
          <Text className="text-sm text-[#738D9C]">2345 Sq.ft</Text>
          <View className="w-[6px] h-[6px] rounded-full bg-[#738D9C] mx-2" />
          <Text className="text-sm text-[#738D9C]">Furnished</Text>
          <View className="w-[6px] h-[6px] rounded-full bg-[#738D9C] mx-2" />
          <Text className="text-sm text-[#738D9C]">Owner</Text>
        </View>
        <View className=" flex flex-row">
          <Text className=" text-base font-bold text-[#BDEA09]">17000</Text>
          <Text className=" text-base font-bold ml-1">/ Monthly</Text>
        </View>
      </View>
      <View className=" flex flex-row items-center px-3 pt-3 border-t border-t-gray-400">
        <View>
          <Image
            source={{uri: demoUser}}
            resizeMode="contain"
            className=" w-10 h-10 rounded-full"
          />
        </View>
        <TouchableOpacity className=" flex-1 rounded-full ml-3 bg-[#BDEA09] p-3">
          <Text className=" text-center text-base font-bold text-[#181A53]">
            Contact Owner
          </Text>
        </TouchableOpacity>
      </View>
      <View className=" px-3 pb-3 mt-2 flex flex-row justify-between items-center">
        <Text className=" text-sm text-[#181A5399] font-medium">Charges</Text>
        <Text className=" text-[#181A53] text-base font-bold">50 Coins</Text>
      </View>
    </View>
  );
};

export default PropertyCard;
