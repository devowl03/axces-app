import {useRef} from 'react';
import {Animated, FlatList, View, useWindowDimensions} from 'react-native';
import {propertyImgData} from '../../Card/CardSwiper';
import ProptertyCarouselItem from './PropertyCarouselItem';

const PropertyCarousel = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const {width} = useWindowDimensions();

  return (
    <View className=" w-full h-full">
      <FlatList
        data={propertyImgData}
        renderItem={({item, index}) => (
          <ProptertyCarouselItem
            scrollX={scrollX}
            item={item}
            index={index}
            length={propertyImgData.length}
          />
        )}
        horizontal
        snapToAlignment="center"
        pagingEnabled
        keyExtractor={item => item.id}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        ListHeaderComponent={() => (
          <View style={{height: 200, width: 20}} />
        )}
        ListFooterComponent={() => (
          <View style={{height: 200, width: 20}} />
        )}
      />
    </View>
  );
};

export default PropertyCarousel;
