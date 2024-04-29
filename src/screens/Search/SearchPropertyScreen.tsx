import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../component/Header/Header';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useEffect} from 'react';
import {pinIcon} from '../../constants/imgURL';
import SearchFilter from './SearchFilter';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/MainStack';

export type filterNameType =
  | 'Pincode'
  | 'Add Localities'
  | 'Looking for'
  | 'Purpose'
  | 'Property Type'
  | 'Listed by'
  | 'Size'
  | 'Prize'
  | 'Built Up Area'
  | 'Furnish Type'
  | 'Preferred Tenant'
  | 'Looking to'
  | "I'm";

interface filterInterface {
  filterName: filterNameType;
  filterVariant: 'Select' | 'Range' | 'String';
  values?: string[];
}

const filters: filterInterface[] = [
  {
    filterName: 'Add Localities',
    filterVariant: 'Select',
  },
];

const SearchPropertyScreen = () => {
  const router = useRoute();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {}, []);
  return (
    <SafeAreaView className="flex-1 bg-[#F2F8F6] relative">
      <StatusBar barStyle={'light-content'} backgroundColor={'#181A53'} />
      <Header showSearch={true} />

      <ScrollView className="flex-1 py-6 bg-white">
        <View className="py-3 px-4 mx-6 flex flex-row items-center rounded-full bg-[#F2F8F6]">
          <Image
            source={{uri: pinIcon}}
            resizeMode="contain"
            className="w-2 h-5 mr-2"
          />
          <TextInput
            placeholder="Enter your pincode"
            placeholderTextColor="#181A53"
            className="text-[#181A53] text-base font-medium flex-1"
          />
        </View>

        {/* <SearchFilter filterName='' /> */}
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

        <SearchFilter
          filterName="Looking for"
          options={['Buy', 'Rent']}
          value={'Buy'}
        />
        <SearchFilter
          filterName="Purpose"
          options={['Residential', 'Commercial']}
          value={'Commercial'}
        />
        <SearchFilter
          filterName="Property Type"
          options={[
            'Apartment',
            'Independent House',
            'Builder floor',
            'Villa',
            'Studio',
            'Pent house',
          ]}
          value={'Studio'}
        />
        <SearchFilter
          filterName="Listed by"
          options={['Agent', 'Owner']}
          value={'Commercial'}
        />
        <SearchFilter
          filterName="Size"
          options={['1 BHK', '2BHK', '3 BHK', '4 BHK', 'Commercial']}
          value={'Commercial'}
        />
        {/* bottom placeholder */}
        <View className="w-full h-[10vh]" />
      </ScrollView>
      <View className="bottom-0 left-0 right-0 px-6 py-3 bg-white shadow-lg">
        <TouchableOpacity
        onPress={() => navigation.goBack()}
          className={`py-3 px-8 rounded-full bg-[#BDEA09] mr-4`}>
          <Text className="text-[#181A53] text-base font-medium text-center">
            View Propterty
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SearchPropertyScreen;
