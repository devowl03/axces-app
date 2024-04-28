import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
} from 'react-native';
import {View} from 'react-native';
import Header from '../../component/Header/Header';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../routes/MainStack';
import {SafeAreaView} from 'react-native-safe-area-context';
import PropertyCarousel from '../../component/Carousel/Property/PropertyCarousel';
import PropertyDscr from './component/PropertyDscr';
import PropertyDetail from './component/PropertyDetails';
import {demoUser} from '../../constants/imgURL';
import Facilities from './component/Facilities';
import {useRef} from 'react';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import ContactOwner from './component/ContactOwner';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

const PropertyScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const bottomSheetRef = useRef<BottomSheet>(null);
  return (
    <BottomSheetModalProvider>
      <SafeAreaView className="flex-1 bg-[#F2F8F6]">
        <StatusBar barStyle={'light-content'} backgroundColor={'#181A53'} />
        <Header />
        <ScrollView className="flex-1">
          <View className="w-full h-[35vh] pt-4 relative">
            <PropertyCarousel />
            <View className="bg-[#181A53] w-full h-[70%] z-10 absolute top-0" />
          </View>
          <View className="px-6 pt-2">
            <View className=" flex flex-row justify-between">
              <Text className=" text-base font-bold text-[#0E0E0C]">
                The Aston Villas
              </Text>
              <View className=" flex flex-row">
                <Text className=" text-base font-bold text-[#BDEA09]">
                  17000
                </Text>
                <Text className=" text-base font-bold ml-1 text-[#180E0E99]">
                  / Monthly
                </Text>
              </View>
            </View>
            <Text className=" text-[#0E0E0C99] text-sm">
              Sector 15 Laservali park, Gurgaon
            </Text>
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            className=" w-full my-4">
            <View className=" h-11 w-6" />
            <TouchableOpacity className="bg-white h-11 py-3 px-6 border-b-2 border-b-[#BDEA09]">
              <Text className="text-base text-black">All</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white h-11 py-3 px-6 border-b-2 border-b-[#BDEA09]">
              <Text className="text-base text-black">Description</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white h-11 py-3 px-6 border-b-2 border-b-[#BDEA09]">
              <Text className="text-base text-black">Details</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white h-11 py-3 px-6 border-b-2 border-b-[#BDEA09]">
              <Text className="text-base text-black">Facilities</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white h-11 py-3 px-6 border-b-2 border-b-[#BDEA09]">
              <Text className="text-base text-black">Owner</Text>
            </TouchableOpacity>
          </ScrollView>
          <View className=" px-6 mb-3">
            <PropertyDscr />
          </View>
          <View className=" px-6 mb-3">
            <PropertyDetail />
          </View>
          <View className=" px-6 mb-3">
            <Facilities />
          </View>
          <View className=" mx-6 mb-3">
            <ContactOwner />
          </View>
        </ScrollView>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

export default PropertyScreen;
