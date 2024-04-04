import {Image, Text, View, useWindowDimensions} from 'react-native';
import {demoBuilding} from '../../constants/imgURL';
import LinearGradient from 'react-native-linear-gradient';
import {swipeItemInterface} from './data';

const SwipeItem: React.FC<swipeItemInterface> = ({
  imgURL,
  title,
  description,
}) => {
  const {width} = useWindowDimensions();
  return (
    <View style={{width: width}} className=" flex-1">
      <View className=" flex-1 relative">
        <Image
          source={{uri: imgURL}}
          resizeMode="cover"
          className=" w-full h-full"
        />
        <LinearGradient
          colors={['#181A53', '#181A5300']}
          start={{x: 1, y: 1}}
          end={{x: 1, y: 0}}
          className=" absolute bottom-0 top-0 right-0 left-0"
        />
      </View>

      <View className=" w-full bg-[#181A53] px-6 py-5">
        <Text className=" text-white font-bold text-2xl text-left">
          {title}
        </Text>
        <Text className=" text-white/60 text-base text-left mt-2">
          {description}
        </Text>
      </View>
    </View>
  );
};

export default SwipeItem;
