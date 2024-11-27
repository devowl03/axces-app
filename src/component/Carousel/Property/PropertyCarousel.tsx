import {useCallback, useEffect, useRef, useState} from 'react';
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
import {setwishlist, wishlist} from '../../../constants/imgURL';
import { addToWishList } from '../../../redux/ducks/WishList/addToList';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../constants';
import { errorMessage, successMessage } from '../../../utils';
import { useFocusEffect } from '@react-navigation/native';
import { viewWishList } from '../../../redux/ducks/WishList/viewList';

interface Prop {
  images?: Array<string>;
  id: string;
  wishlistdata?: boolean;
}
const PropertyCarousel: React.FC<Prop> = ({id, images, wishlistdata}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  console.log('id?.isInWishlist', wishlistdata);

  // const [isWishlisted, setIsWishlisted] = useState(wishlist);
  const dispatch = useDispatch();
  const addToList = useAppSelector(state => state.addToList);
  
  
  const [isWishlisted, setIsWishlisted] = useState(id?.isInWishlist);
  const wishlistData = useAppSelector(state => state.viewList.data);

  console.log('isWishlisted', isWishlisted);

  // Fetch the wishlist when the component mounts or when `id` changes
  useEffect(() => {
    if (id?._id) {
      dispatch(viewWishList(id._id));
    }
  }, [id, dispatch]); // Depend on `id` and `dispatch`

  // Update `isWishlisted` whenever `wishlistData` changes
  useEffect(() => {
    if (wishlistData) {
      // Assuming wishlistData contains an array of items, check if the current id is in it
      const isInWishlist = wishlistData.some(item => item._id === id?._id);
      setIsWishlisted(isInWishlist);
    }
  }, [wishlistData, id]); // Depend on `wishlistData` and `id`

  console.log('wishlistData:', wishlistData);
  console.log('id:', id?.isInWishlist);


  useEffect(() => {
    if (addToList.called) {
      const {message, status} = addToList;
      if (status === 'fail') {
        errorMessage(message);
      } else {
        successMessage(message);
      }
    }
  }, [addToList]);

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    const actionData = isWishlisted ? -1 : 1;
    // Dispatch the action with the current property ID and actionData
    dispatch(addToWishList(id?._id, actionData));
    // Update the local state for this property
  };

  return (
    <View className=" w-full h-full z-20 relative">
      <FlatList
        data={images}
        renderItem={({item, index}) => (
          <ProptertyCarouselItem
            scrollX={scrollX}
            item={
              item?.startsWith('http://')
                ? item?.replace('http://', 'https://')
                : item
            }
            index={index}
            length={images?.length}
          />
        )}
        horizontal
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        keyExtractor={index => index.toString()}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        ListHeaderComponent={() => <View style={{height: 250, width: 20}} />}
        ListFooterComponent={() => <View style={{height: 250, width: 20}} />}
      />
      <TouchableOpacity
        style={{
          // borderWidth: 1,
          height: 28,
          width: 28, // Set width to be consistent
          justifyContent: 'center', // Center the image vertically
          alignItems: 'center', // Center the image horizontally
        }}
        onPress={() => handleWishlist()}
        className=" absolute right-8 top-4 w-8 h-8 flex items-center justify-center p-3 rounded-full bg-white">
        <Image
          source={{uri: isWishlisted ? setwishlist : wishlist}}
          resizeMode="contain"
          style={{
            width: isWishlisted ? 34 : 22,
            height: isWishlisted ? 34 : 22,
          }}
          // className=" w-5 h-5"
        />
      </TouchableOpacity>
    </View>
  );
};

export default PropertyCarousel;
