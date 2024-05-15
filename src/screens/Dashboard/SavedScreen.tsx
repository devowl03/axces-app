import {Image, ScrollView, StatusBar, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../component/Header/Header';
import {tapIcon} from '../../constants/imgURL';
import PropertyCard from '../../component/Card/PropertyCard';
import CenterHeader from '../../component/Header/CenterHeader';

const SavedScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#F2F8F6]">
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
        translucent
      />
      <CenterHeader title="My Wishlist" lightMode={true} />
      {/* <Header
        centerLeftPercen={40}
        lightHeader={true}
        centerTile={true}
        title="My Wishlist"
      /> */}
      <ScrollView className="flex-1 bg-[#F2F8F6] px-6 pt-6">
        <View className=" flex flex-row items-center justify-start">
          <Text className=" text-[#0E0E0C] text-lg font-bold mr-2">
            Saved properties
          </Text>
          <View className=" rounded-full bg-[#BDEA09] w-6 h-6 flex items-center justify-center">
            <Text className=" text-[#181A53] text-sm font-medium">5</Text>
          </View>
        </View>
        <View className=" flex flex-row items-end justify-start my-4">
          <Image
            source={{uri: tapIcon}}
            resizeMode="contain"
            className=" w-5 h-5 mr-2"
          />
          <Text className=" text-[#0E0E0C99] text-sm">
            Tap on heart button to remove property
          </Text>
        </View>
        <View className=" w-full  mb-4">
          <PropertyCard />
        </View>
        <View className=" w-full mb-4">
          <PropertyCard />
        </View>
        <View className=" w-full mb-4">
          <PropertyCard />
        </View>
        <View className=' w-full h-[5vh]' />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SavedScreen;
