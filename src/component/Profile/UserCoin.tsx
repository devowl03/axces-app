import {Image, Text, View} from 'react-native';
import {whiteCoin} from '../../constants/imgURL';
import {RFValue} from 'react-native-responsive-fontsize';
import {scale, verticalScale} from 'react-native-size-matters';

const UserCoin = () => {
  return (
    <View className=" bg-[#F2F8F6]/20 rounded-full px-4 py-2 flex flex-row items-center">
      <Image
        style={{width: scale(20), height: verticalScale(20)}}
        source={{uri: whiteCoin}}
        className=" mr-2"
        resizeMode="contain"
      />
      <Text style={{fontSize: RFValue(12)}} className=" text-[#F2F8F6]">
        0 Coins
      </Text>
    </View>
  );
};

export default UserCoin;
