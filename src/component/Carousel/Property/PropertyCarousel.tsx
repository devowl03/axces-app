import {useRef} from 'react';
import {
  Animated,
  FlatList,
  Image,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {propertyImgData} from '../../Card/CardSwiper';
import ProptertyCarouselItem from './PropertyCarouselItem';
import {wishlist} from '../../../constants/imgURL';

const PropertyCarousel = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const {width} = useWindowDimensions();

  return (
    <View className=" w-full h-full z-20 relative">
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
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        keyExtractor={item => item.id}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        ListHeaderComponent={() => <View style={{height: 250, width: 20}} />}
        ListFooterComponent={() => <View style={{height: 250, width: 20}} />}
      />
      <TouchableOpacity className=" absolute right-8 top-4 w-8 h-8 flex items-center justify-center p-3 rounded-full bg-white">
        <Image
          source={{uri: wishlist}}
          resizeMode="contain"
          className=" w-5 h-5"
        />
      </TouchableOpacity>
    </View>
  );
};

export default PropertyCarousel;
