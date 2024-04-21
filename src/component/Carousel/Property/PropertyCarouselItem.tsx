import {Animated, View, useWindowDimensions} from 'react-native';
import {PropertyImgInterface} from '../../Card/CardSwiper';

interface Props {
  item: PropertyImgInterface;
  scrollX: Animated.Value;
  index: number;
  length: number;
}

const ProptertyCarouselItem: React.FC<Props> = ({scrollX, item, index , length}) => {
  const {width} = useWindowDimensions();
  const inputRange = [
    (index - 1) * width * 0.9 ,
    index * width * 0.9 ,
    (index + 1) * width * 0.9,
  ];
  // console.log(inputRange)
  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.9, 1, 0.9],
    extrapolate: 'clamp',
  });
  // console.log('scale:', scale);
  return (
    <Animated.Image
      key={item.id}
      style={[{
        width: width * 0.9,
        height: 220,
      }, {
        transform: [{scaleY: scale || 1}],
      }]}
      source={{uri: item.url}}
      className=" mx-1 rounded-xl"
    />
  );
};

export default ProptertyCarouselItem;
