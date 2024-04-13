import {Image, View, useWindowDimensions} from 'react-native';
import {demoBuilding} from '../../constants/imgURL';

const CardSwipeItem = () => {
  const {width} = useWindowDimensions();
  return (
    <View style={{width: width - 48}} className="flex-1">
      <Image
        source={{uri: demoBuilding}}
        resizeMode="cover"
        className=" w-full h-full"
      />
    </View>
  );
};

export default CardSwipeItem;
