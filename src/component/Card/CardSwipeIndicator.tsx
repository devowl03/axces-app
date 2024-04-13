import {Animated, View, useWindowDimensions} from 'react-native';
import {PropertyImgInterface} from './CardSwiper';

interface CardSwipeIndicatorInterface {
  data: PropertyImgInterface[];
  scrollX: Animated.Value;
}

const CardSwipeIndicator: React.FC<CardSwipeIndicatorInterface> = ({
  data,
  scrollX,
}) => {
  const {width} = useWindowDimensions();
  return (
    <View className=" w-full flex flex-row items-center justify-center gap-1">
      {data.map((item, i) => {
        const inputRange = [
          (i - 1) * width - 48,
          i * width - 48,
          (i + 1) * width - 48,
        ];
        const indicatorWidth = scrollX.interpolate({
          inputRange,
          outputRange: [8, 32, 8],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={item.id}
            style={{
              width: indicatorWidth,
              height: 8,
              opacity,
            }}
            className=" bg-[#BDEA09] rounded-full"
          />
        );
      })}
    </View>
  );
};

export default CardSwipeIndicator;
