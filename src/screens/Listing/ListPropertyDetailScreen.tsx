import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CenterHeader from '../../component/Header/CenterHeader';
import Tracker from '../../component/ListProperty/Tracker';
import PropertyInput from './component/PropertyInput';
import PropertySelect from './component/PropertySelect';
import SearchFilter from '../Search/SearchFilter';
import {useRef, useState} from 'react';
import {BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView} from '@gorhom/bottom-sheet';
import { coinStack } from '../../constants/imgURL';

const ListPropertyDetailScreen = () => {
  // const bottomSheetRef = useRef<BottomSheetModal>(null);
  // const nocoinbottomSheetRef = useRef<BottomSheetModal>(null);
  const [selected, setSelected] = useState<boolean>(false);
  return (
      <SafeAreaView className=" flex-1 relative">
        <StatusBar backgroundColor={'#181A53'} />
        <CenterHeader title="List Property" />
        <ScrollView className=" flex-1 bg-white">
          <Tracker stage={2} />
          <PropertyInput title="Building/ Property/ Society Name" />
          <PropertySelect
            title="Bedrooms"
            data={['2BHK', '3BHK', '4BHK']}
            defaultValue="2BHK"
          />
          <PropertyInput
            title="Built up area"
            sideTitle="sqft"
            placeholderText="Area of property"
            type="number"
          />
          <PropertyInput
            title="Your floor"
            placeholderText="Enter your floor number"
          />
          <PropertyInput title="Facing" placeholderText="North, East, ..." />
          <PropertyInput
            title="Total flooor number"
            placeholderText="Enter your floor number"
          />
          <SearchFilter
            filterName="Furnish Type"
            options={['Fully Furnished', 'Semi Furnished']}
            value={'Fully Furnished'}
          />
          <View className=" flex items-start mx-6 mt-4">
            <Text className=" text-[#0E0E0C] text-base font-bold mb-3">
              Add Localities
            </Text>
            <TouchableOpacity className=" py-3 px-8 rounded-full bg-[#BDEA09]">
              <Text className=" text-[#181A53] text-base font-medium">
                Add locality
              </Text>
            </TouchableOpacity>
          </View>

          <PropertyInput title="Security Deposit" placeholderText="Amount" />

          <View className=" w-full h-[15vh]" />
        </ScrollView>
        <View className=" absolute bottom-0 left-0 right-0 px-6 py-3 bg-white">
          <View className=" flex flex-row items-center ">
            <TouchableOpacity
              onPress={() => setSelected(prev => !prev)}
              className={`w-4 h-4 ${
                selected
                  ? ' bg-black/10 border border-white/60'
                  : ' bg-[#BDEA09]'
              }  rounded-full  `}
            />
            <Text className=" text-base text-[#181A53] font-medium ml-2">
              Agree with{' '}
              <Text className=" text-[#0171FF]">TERMS & CONDITIONS</Text>
            </Text>
          </View>
          <TouchableOpacity
            // onPress={() => bottomSheetRef.current?.present()}
            className="w-full p-3 bg-[#BDEA09] rounded-full mt-2">
            <Text className="text-[#181A53] text-base text-center font-medium">
              Next
            </Text>
          </TouchableOpacity>
        </View>
       
      </SafeAreaView>
  );
};

export default ListPropertyDetailScreen;
