import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CenterHeader from '../../component/Header/CenterHeader';
import Tracker from '../../component/ListProperty/Tracker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/MainStack';
import SearchFilter from '../Search/SearchFilter';
import { pinIcon } from '../../constants/imgURL';
import SelectDropdown from 'react-native-select-dropdown';
import { useEffect, useState } from 'react';
import Loader from '../../component/Loader/Loader';
import { errorMessage } from '../../utils';

const ListPropertyScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  console.log('location', location);
  
  const route = useRoute();
  const {latitude, longitude, item, isediting} = route.params || {};

  console.log('item+++=', item?.property_type);
  
   const [selectedRole, setSelectedRole] = useState<string>(
     item?.property_posted_by || '',
   );
   const [lookingFor, setLookingFor] = useState<string>(item?.listing_type || '');
   const [propertyType, setPropertyType] = useState<string>(item?.property_type || '');
   const [addPincode, setAddPincode] = useState<string>(item?.pincode);
   const [location, setlocation] = useState('');

  useEffect(() => {
    // Console log the values when the component mounts
    console.log("Latitude:", latitude);
    console.log("Longitude:", longitude);
  }, [latitude, longitude]);

  const handleSubmit = () => {
    if (!addPincode) {
      errorMessage('Please add pincode');
      return;
    } 
    else if (addPincode.length !== 6) {
      errorMessage('Pincode should be 6 digits');
      return;
    } else if (!selectedRole) {
      errorMessage('Please select role');
      return;
    } else if (!lookingFor) {
      errorMessage('Please select looking to');
      return;
    } else if (!propertyType) {
      errorMessage('Please select proprty type');
      return;
    } else {
      navigation.navigate('ListPropertyDetailScreen', {
        selectedRole,
        lookingFor,
        propertyType,
        addPincode,
        location,
        latitude,
        longitude,
        item,
        isediting,
      });
    }
  };

  console.log('Current Location>>>', propertyType);

  useEffect(() => {
    if (route?.params?.currentLocation) {
      setlocation(route.params.currentLocation);
    }
  }, [route.params?.currentLocation]);

  return (
    <SafeAreaView className="bg-[#181A53] flex-1 relative">
      <StatusBar backgroundColor={'#181A53'} />
      <CenterHeader title="List Property" />
      <ScrollView className=" flex-1 bg-white">
        <Tracker stage={1} />
        <SearchFilter
          onSelectHandler={setSelectedRole}
          filterName="I'm *"
          options={['Owner', 'Agent']}
          value={
            (selectedRole === 'owner' ? 'Owner' : selectedRole) ||
            (selectedRole === 'agent' ? 'Agent' : selectedRole)
          }
        />
        <SearchFilter
          onSelectHandler={setLookingFor}
          filterName="Looking to *"
          options={['Sell', 'Rent']}
          value={
            (lookingFor === 'buy' ? 'Sell' : lookingFor) ||
            (lookingFor === 'rent' ? 'Rent' : lookingFor)
          }
        />
        <SearchFilter
          onSelectHandler={setPropertyType}
          filterName="Property Type *"
          options={['Residential', 'Commercial']}
          value={
            (propertyType.toLowerCase() === 'residential' && 'Residential') ||
            (propertyType.toLowerCase() === 'commercial' && 'Commercial')
          }
        />
        <Text className=" text-[#0E0E0C] text-base mx-6 font-bold my-3">
          Add Pincode
        </Text>
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
            value={addPincode}
            onChangeText={(value: string) => setAddPincode(value)}
            keyboardType="numeric"
            maxLength={6}
          />
        </View>
        <View className=" w-full h-[10vh]" />
      </ScrollView>
      <View className=" absolute bottom-20 left-0 right-0 px-6 py-3">
        <TouchableOpacity
          onPress={() => {
            handleSubmit();
          }}
          className="w-full p-3 bg-[#BDEA09] rounded-full mt-4">
          <Text className="text-[#181A53] text-base text-center font-medium">
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ListPropertyScreen;
