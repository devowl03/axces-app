import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CenterHeader from '../../component/Header/CenterHeader';
import Tracker from '../../component/ListProperty/Tracker';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../routes/MainStack';
import SearchFilter from '../Search/SearchFilter';
import {pinIcon} from '../../constants/imgURL';
import {useEffect, useState} from 'react';
import Loader from '../../component/Loader/Loader';
import {errorMessage} from '../../utils';

const ListPropertyScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const {latitude, longitude, item, isediting} = route.params || {};

  const [selectedRole, setSelectedRole] = useState<string>(
    item?.property_posted_by || '',
  );
  const [lookingFor, setLookingFor] = useState<string>(
    item?.listing_type || '',
  );
  const [propertyType, setPropertyType] = useState<string>(
    item?.property_type || '',
  );
  const [addPincode, setAddPincode] = useState<string>(item?.pincode);
  const [location, setLocation] = useState('');

  useEffect(() => {
    if (route?.params?.currentLocation) {
      setLocation(route.params.currentLocation);
    }
  }, [route.params?.currentLocation]);

  const handleSubmit = () => {
    if (!addPincode) {
      errorMessage('Please add pincode');
      return;
    } else if (addPincode.length !== 6) {
      errorMessage('Pincode should be 6 digits');
      return;
    } else if (!selectedRole) {
      errorMessage('Please select role');
      return;
    } else if (!lookingFor) {
      errorMessage('Please select looking to');
      return;
    } else if (!propertyType) {
      errorMessage('Please select property type');
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

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#181A53'}}>
      <StatusBar backgroundColor={'#181A53'} />
      <CenterHeader title="List Property" />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flexGrow: 1, backgroundColor: 'white'}}>
          <Tracker stage={1} />
          <SearchFilter
            onSelectHandler={setSelectedRole}
            filterName="I'm *"
            options={['Owner', 'Agent']}
            value={
              selectedRole === 'owner'
                ? 'Owner'
                : selectedRole === 'agent'
                ? 'Agent'
                : selectedRole || ''
            }
          />
          <SearchFilter
            onSelectHandler={setLookingFor}
            filterName="Looking to *"
            options={['Sell', 'Rent']}
            value={
              lookingFor === 'buy'
                ? 'Sell'
                : lookingFor === 'rent'
                ? 'Rent'
                : lookingFor || ''
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
          <Text
            style={{marginHorizontal: 16, fontWeight: 'bold', marginTop: 12}}>
            Add Pincode
          </Text>
          <View
            style={{
              paddingVertical: 12,
              paddingHorizontal: 16,
              marginHorizontal: 16,
              marginTop: 8,
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 25,
              backgroundColor: '#F2F8F6',
            }}>
            <Image
              source={{uri: pinIcon}}
              resizeMode="contain"
              style={{width: 10, height: 20, marginRight: 8}}
            />
            <TextInput
              placeholder="Enter your pincode"
              placeholderTextColor="#181A53"
              style={{
                color: '#181A53',
                fontWeight: '500',
                fontFamily: 'Poppins-Regular',
                fontSize: 16,
                flex: 1,
              }}
              value={addPincode}
              onChangeText={setAddPincode}
              keyboardType="numeric"
              maxLength={6}
            />
          </View>
        </ScrollView>
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 12,
            backgroundColor: 'white',
          }}>
          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              width: '100%',
              paddingVertical: 12,
              backgroundColor: '#BDEA09',
              borderRadius: 25,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#181A53',
              }}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ListPropertyScreen;
