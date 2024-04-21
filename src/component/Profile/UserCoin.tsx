import {Image, Text, View} from 'react-native';
import {whiteCoin} from '../../constants/imgURL';

const UserCoin = () => {
  return (
    <View className=" bg-[#F2F8F6]/20 rounded-full px-4 py-3 flex flex-row items-center">
      <Image
        source={{uri: whiteCoin}}
        className=" w-6 h-4 mr-2"
        resizeMode="contain"
      />
      <Text className=" text-base text-[#F2F8F6]">0 Coins</Text>
    </View>
  );
};

export default UserCoin;
