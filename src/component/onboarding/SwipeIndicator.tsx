import {Animated, View, useWindowDimensions} from 'react-native';
import {swipeItemInterface} from './data';

export interface swiperIndicatorInterface {
  data: swipeItemInterface[];
  scrollX: Animated.Value;
}

const SwipeIndicator: React.FC<swiperIndicatorInterface> = ({
  data,
  scrollX,
}) => {
  const {width} = useWindowDimensions();
  return (
    <View className=" w-full flex flex-row items-center justify-center gap-1">
      {data.map((item, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
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
              opacity
            }}
            className=" bg-[#BDEA09] rounded-full"
          />
        );
      })}
    </View>
  );
};

export default SwipeIndicator;
