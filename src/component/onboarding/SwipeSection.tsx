// import {FlatList, View, Animated, Image} from 'react-native';
// import SwipeItem from './SwipeItem';
// import {swiperData} from './data';
// import {useRef} from 'react';
// import SwipeIndicator from './SwipeIndicator';
// import {axcesLogoWhite} from '../../constants/imgURL';

// const SwipeSection = () => {
//   const scrollX = useRef(new Animated.Value(0)).current;

//   return (
//     <View className="flex-1 relative">
//       <FlatList
//         data={swiperData}
//         renderItem={({item}) => (
//           <SwipeItem
//             title={item.title}
//             imgURL={item.imgURL}
//             description={item.description}
//             id={item.id}
//           />
//         )}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         pagingEnabled
//         keyExtractor={item => item.id}
//         bounces={false}
//         onScroll={Animated.event(
//           [{nativeEvent: {contentOffset: {x: scrollX}}}],
//           {useNativeDriver: false},
//         )}
//       />
//       <View className="absolute bottom-36 right-0 left-0">
//         <SwipeIndicator data={swiperData} scrollX={scrollX} />
//       </View>
//       <View className="absolute top-14 left-0 right-0 flex items-center justify-center">
//         <Image
//           source={{uri: axcesLogoWhite}}
//           resizeMode="contain"
//           className="w-16 h-16"
//         />
//       </View>
//     </View>
//   );
// };

// export default SwipeSection;

import React, {useRef} from 'react';
import {
  FlatList,
  View,
  Animated,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import SwipeItem from './SwipeItem';
import {swiperData} from './data';
import SwipeIndicator from './SwipeIndicator';
import {axcesLogoWhite} from '../../constants/imgURL';

// Get screen dimensions
const {width, height} = Dimensions.get('window');

const SwipeSection = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <FlatList
        data={swiperData}
        renderItem={({item}) => (
          <SwipeItem
            title={item.title}
            imgURL={item.imgURL}
            description={item.description}
            id={item.id}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        keyExtractor={item => item.id}
        bounces={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
      />
      <View style={styles.swipeIndicatorContainer}>
        <SwipeIndicator data={swiperData} scrollX={scrollX} />
      </View>
      <View style={styles.logoContainer}>
        <Image
          source={{uri: axcesLogoWhite}}
          resizeMode="contain"
          style={styles.logo}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  swipeIndicatorContainer: {
    position: 'absolute',
    bottom: height * 0.2, // 10% from bottom, adjust as needed
    left: 0,
    right: 0,
  },
  logoContainer: {
    position: 'absolute',
    top: height * 0.07, // 7% from top
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: width * 0.16, // 16% of the screen width
    height: width * 0.16, // Maintain square aspect ratio
  },
});

export default SwipeSection;
