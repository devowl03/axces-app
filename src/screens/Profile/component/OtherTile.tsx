import {Text, View} from 'react-native';
import {OthersDataInterface} from '../ProfileScreen';
import {Image} from 'react-native';
import {downGrayArrow, houseRound} from '../../../constants/imgURL';
import {RFValue} from 'react-native-responsive-fontsize';
import {scale, verticalScale} from 'react-native-size-matters';

const OtherTile: React.FC<{data: OthersDataInterface}> = ({data}) => {
  return (
    <View className=" w-full flex flex-row items-center justify-between py-3 border-b border-b-[#0E0E0C0F]">
      <View className=" flex flex-row items-center justify-start">
        <View
          style={{width: scale(32), height: verticalScale(32)}}
          className=" bg-white mr-3 rounded-lg flex items-center justify-center h-10 w-10">
          <Image
            style={{width: scale(16), height: verticalScale(16)}}
            source={{uri: data.iconurl}}
            resizeMode="contain"
          />
        </View>
        <Text
          style={{fontSize: RFValue(14)}}
          className="text-[#181A53] font-mediumM">
          {data.title}
        </Text>
      </View>
      <View>
        <Image
        style={{width: scale(12), height: verticalScale(12)}}
          source={{uri: downGrayArrow}}
          resizeMode="contain"
          className="-rotate-90"
        />
      </View>
    </View>
  );
};

export default OtherTile;
