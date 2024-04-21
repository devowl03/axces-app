import {Text, View} from 'react-native';
import {OthersDataInterface} from '../ProfileScreen';
import {Image} from 'react-native';
import {downGrayArrow, houseRound} from '../../../constants/imgURL';

const OtherTile: React.FC<{data: OthersDataInterface}> = ({data}) => {
  return (
    <View className=" w-full flex flex-row items-center justify-between py-3 border-b border-b-[#0E0E0C0F]">
      <View className=" flex flex-row items-center justify-start">
        <View className=" bg-white mr-3 rounded-lg flex items-center justify-center h-10 w-10">
          <Image
            source={{uri: data.iconurl}}
            resizeMode="contain"
            className=" w-5 h-5"
          />
        </View>
        <Text className=" text-base text-[#181A53] font-medium">
          {data.title}
        </Text>
      </View>
      <View>
        <Image
          source={{uri: downGrayArrow}}
          resizeMode="contain"
          className="-rotate-90 w-4 h-6"
        />
      </View>
    </View>
  );
};

export default OtherTile;
