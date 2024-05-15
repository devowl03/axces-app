import {ScrollView, StatusBar, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../component/Header/Header';
import SwipeSection from '../../component/onboarding/SwipeSection';
import PropertyCard from '../../component/Card/PropertyCard';

const PropertyListingScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#F2F8F6]">
      <StatusBar barStyle={'light-content'} backgroundColor={'#181A53'} />
      <Header showSearch={true} />
      <ScrollView className=" flex-1 px-6 pt-6">
        <View className=" w-full mb-4">
          <PropertyCard />
        </View>
        <View className=" w-full mb-4">
          <PropertyCard />
        </View>
        <View className=" w-full mb-4">
          <PropertyCard />
        </View>

        <Text>Property Listing Screen</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PropertyListingScreen;
