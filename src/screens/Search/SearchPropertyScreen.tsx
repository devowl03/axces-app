import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Dimensions,
  Image,
  PermissionsAndroid,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../component/Header/Header';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Geolocation from '@react-native-community/geolocation';
import Loader from '../../component/Loader/Loader';
import {getPropertiesList} from '../../redux/ducks/Properties/getProperties';
import Slider from '@react-native-community/slider';
import SearchFilter from './SearchFilter';
import {RootStackParamList} from '../../routes/MainStack';
import {pinIcon} from '../../constants/imgURL';
import { useAppSelector } from '../../constants';
import { getAccessToken } from '../../utils';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  | 'Property Facilities'
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

const screenWidth = Dimensions.get('window').width;

const SearchPropertyScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [addPincode, setAddPincode] = useState<string>('');
  const [lookingFor, setLookingFor] = useState<string>('');
  const [purpose, setPurpose] = useState<string>('');
  const [propType, setPropType] = useState<string>('');
  const [listedFor, setListedFor] = useState<string>('');
  const [size, setSize] = useState<string>('');
  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const [price, setPrice] = useState(0);
  const [Rentprice, setRentPrice] = useState(0);
  const [area, setArea] = useState(0);
  const [furnish, setFurnish] = useState('');
  const [preferred, setPreferred] = useState('');
  const dispatch = useDispatch();

  const getLocation = useAppSelector(state => state.getLocation);
  console.log('getLocation', getLocation.data.lat);
  console.log('getLocation', getLocation.data.lon);

  // Function to format values in lakhs
  // const formatValue = value => (value / 100000).toFixed(2);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Geolocation Permission',
            message: 'Can we access your location?',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        console.log('granted', granted);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use Geolocation');
          Geolocation.getCurrentPosition(
            position => {
              setLatitude(position.coords.latitude);
              setLongitude(position.coords.longitude);
            },
            error => {
              console.log('Error>>>', error);
            },
            {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
          );
        } else {
          console.log('You cannot use Geolocation');
        }
      } catch (err) {
        return false;
      }
    };
    requestLocationPermission();
    loadFilters();
  }, []);

  const saveFilters = async () => {
    const filters = {
      addPincode,
      lookingFor,
      purpose,
      propType,
      listedFor,
      size,
      price,
      area,
      furnish,
      preferred,
    };
    await AsyncStorage.setItem('propertyFilters', JSON.stringify(filters));
  };

  console.log('lookingForaync', lookingFor);
  

   const loadFilters = async () => {
     const filters = await AsyncStorage.getItem('propertyFilters');
     console.log('filtersaync', filters);
     
     if (filters) {
       const parsedFilters = JSON.parse(filters);
       setAddPincode(parsedFilters.addPincode);
       setLookingFor(parsedFilters.lookingFor);
       setPurpose(parsedFilters.purpose);
       setPropType(parsedFilters.propType);
       setListedFor(parsedFilters.listedFor);
       setSize(parsedFilters.size);
       setPrice(parsedFilters.price);
       setArea(parsedFilters.area);
       setFurnish(parsedFilters.furnish);
       setPreferred(parsedFilters.preferred);
     }
   };

  // console.log('====================================');
  // console.log('lookingFor', lookingFor);
  // console.log('====================================');

  const updateFiltersArray = async () => {

      await saveFilters();

    let appliedFilters = [];

    if (addPincode)
      appliedFilters.push({filterName: 'Pincode', value: addPincode});
    if (lookingFor)
      appliedFilters.push({filterName: 'Looking for', value: lookingFor});
    if (purpose) appliedFilters.push({filterName: 'Purpose', value: purpose});
    if (propType)
      appliedFilters.push({filterName: 'Property Type', value: propType});
    if (listedFor)
      appliedFilters.push({filterName: 'Listed by', value: listedFor});
    if (size) appliedFilters.push({filterName: 'Size', value: size});
    if (price) appliedFilters.push({filterName: 'Prize', value: price});
    if (area) appliedFilters.push({filterName: 'Built Up Area', value: area});
    if (furnish)
      appliedFilters.push({filterName: 'Furnish Type', value: furnish});
    if (preferred)
      appliedFilters.push({filterName: 'Preferred Tenant', value: preferred});

    console.log('latitude+++', latitude);
    console.log('longitude+++', longitude);

    const token = await getAccessToken();

    dispatch(
      getPropertiesList(
        token,
        getLocation.data.lat,
        getLocation.data.lon,
        addPincode,
        lookingFor,
        purpose,
        propType,
        listedFor,
        size[0],
        price,
        area,
        furnish,
        preferred,
        // 'buy',
      ),
    );

    navigation.goBack();
    console.log('appliedFilters', appliedFilters);

    // navigation.navigate('PropertyListing', {appliedFilters});
  };

  const formatPrice = value => {
    if (value >= 10000000) {
      return `₹ ${(value / 10000000).toFixed(2)} Cr`;
    } else {
      return `₹ ${(value / 1000).toFixed(2)} L`;
    }
  };

  // const formatRentPrice = value => {
  //   if (value >= 100000) {
  //     return `₹ ${(value / 100000).toFixed(2)} L`;
  //   } else {
  //     return `₹ ${(value / 1000).toFixed(2)} K`;
  //   }
  // };
  const formatRentPrice = (value: any) => {
    if (value >= 10000000) {
      // 1 Crore and above
      return `₹ ${(value / 10000000).toFixed(0)} Cr`;
    } else if (value >= 100000) {
      // 1 Lakh and above
      return `₹ ${(value / 100000).toFixed(0)} L`;
    } else if (value >= 1000) {
      // 1 Thousand and above
      return `₹ ${(value / 1000).toFixed(0)} K`;
    } else {
      // Less than 1 Thousand
      return `₹ ${value}`;
    }
  };

  const MAX_VALUE = lookingFor === 'Buy' ? 50000000 : 100000 ; // 3 crores
  const MIN_VALUE = 0; // 0

  // State to hold the range values
  const [sliderValues, setSliderValues] = useState([
    0,
    lookingFor === 'Buy' ? 50000000 : 100000,
  ]); // Initial range: 80 lakhs to 90 lakhs


  const formatValue = value => {
    if (value >= 10000000) {
      // 1 Crore and above
      return `₹ ${(value / 10000000).toFixed(2)} Cr`;
    } else if (value >= 100000) {
      // 1 Lakh and above
      return `₹ ${(value / 100000).toFixed(2)} L`;
    } else if (value >= 1000) {
      // Below 1 Lakh, show in thousands (K)
      return `₹ ${(value / 1000).toFixed(0)} K`;
    } else {
      // Show as is for small values
      return `₹ ${value}`;
    }
  };


    const clearPincode = async () => {
      await AsyncStorage.removeItem('addPincode');
      setAddPincode('');
      await saveFilters();
    };

    const clearLookingFor = async () => {
      await AsyncStorage.removeItem('lookingFor');
      setLookingFor('');
      await saveFilters();
    };

    const clearPurpose = async () => {
      await AsyncStorage.removeItem('purpose');
      setPurpose('');
      await saveFilters();
    };

    const clearPropType = async () => {
      await AsyncStorage.removeItem('propType');
      setPropType('');
      await saveFilters();
    };

    const clearListedFor = async () => {
      await AsyncStorage.removeItem('listedFor');
      setListedFor('');
      await saveFilters();
    };

    const clearSize = async () => {
      await AsyncStorage.removeItem('size');
      setSize('');
      await saveFilters();
    };

    const clearFurnish = async () => {
      await AsyncStorage.removeItem('furnish');
      setFurnish('');
      await saveFilters();
    };

    const clearPreferred = async () => {
      await AsyncStorage.removeItem('preferred');
      setPreferred('');
      await saveFilters();
    };


  return (
    <SafeAreaView className="flex-1 bg-[#181A53] relative">
      <StatusBar barStyle={'light-content'} backgroundColor={'#181A53'} />
      <Header showSearch={false} />
      <Loader loading={loading} />
      {/* <View
        style={{
          width: '100%',
          
          flexDirection: 'row',
          alignItems: 'center',
          flexWrap: 'wrap',
        
          backgroundColor:'#181A53'
        }}>
        <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 10}}>
          Selected Filters:
        </Text>
        {addPincode && (
          <View style={styles.filterContainer}>
            <Text
              style={{...styles.filtertext}}>{`Pincode: ${addPincode}`}</Text>
            <TouchableOpacity onPress={clearPincode}>
              <Text style={styles.clearButton}>X</Text>
            </TouchableOpacity>
          </View>
        )}
        {lookingFor && (
          <View style={styles.filterContainer}>
            <Text
              style={{
                ...styles.filtertext,
              }}>{`Looking For: ${lookingFor}`}</Text>
            <TouchableOpacity onPress={clearLookingFor}>
              <Text style={styles.clearButton}>X</Text>
            </TouchableOpacity>
          </View>
        )}
        {purpose && (
          <View style={styles.filterContainer}>
            <Text style={{...styles.filtertext}}>{`Purpose: ${purpose}`}</Text>
            <TouchableOpacity onPress={clearPurpose}>
              <Text style={styles.clearButton}>X</Text>
            </TouchableOpacity>
          </View>
        )}
        {propType && (
          <View style={styles.filterContainer}>
            <Text
              style={{
                ...styles.filtertext,
              }}>{`Property Type: ${propType}`}</Text>
            <TouchableOpacity onPress={clearPropType}>
              <Text style={styles.clearButton}>X</Text>
            </TouchableOpacity>
          </View>
        )}
        {listedFor && (
          <View style={styles.filterContainer}>
            <Text
              style={{...styles.filtertext}}>{`Listed By: ${listedFor}`}</Text>
            <TouchableOpacity onPress={clearListedFor}>
              <Text style={styles.clearButton}>X</Text>
            </TouchableOpacity>
          </View>
        )}
        {size && (
          <View style={styles.filterContainer}>
            <Text style={{...styles.filtertext}}>{`Bedrooms: ${size}`}</Text>
            <TouchableOpacity onPress={clearSize}>
              <Text style={styles.clearButton}>X</Text>
            </TouchableOpacity>
          </View>
        )}
        {furnish && (
          <View style={styles.filterContainer}>
            <Text
              style={{
                ...styles.filtertext,
              }}>{`Furnished Type: ${furnish}`}</Text>
            <TouchableOpacity onPress={clearFurnish}>
              <Text style={styles.clearButton}>X</Text>
            </TouchableOpacity>
          </View>
        )}
        {preferred && (
          <View style={styles.filterContainer}>
            <Text
              style={{
                ...styles.filtertext,
              }}>{`Preferred Tenant: ${preferred}`}</Text>
            <TouchableOpacity onPress={clearPreferred}>
              <Text style={styles.clearButton}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      </View> */}
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
            value={addPincode}
            onChangeText={(value: string) => setAddPincode(value)}
            keyboardType="numeric"
          />
        </View>

        {/* <View className=" flex items-start mx-6 mt-4">
          <Text className=" text-[#0E0E0C] text-base font-bold mb-3">
            Add Localities
          </Text>
          <TouchableOpacity className=" py-3 px-8 rounded-full bg-[#BDEA09]">
            <Text className=" text-[#181A53] text-base font-medium">
              Add locality
            </Text>
          </TouchableOpacity>
        </View> */}

        <SearchFilter
          filterName="Looking for"
          options={['Buy', 'Rent']}
          value={lookingFor}
          onSelectHandler={setLookingFor}
        />
        <SearchFilter
          filterName="Purpose"
          options={['Residential', 'Commercial']}
          value={purpose}
          onSelectHandler={setPurpose}
        />
        <SearchFilter
          filterName="Property Type"
          options={
            purpose == 'Commercial'
              ? ['Office', 'Shop', 'Plot', 'Others']
              : [
                  'Apartment',
                  'Independent House',
                  'Builder floor',
                  'Villa',
                  'Studio',
                  'Pent house',
                ]
          }
          value={propType}
          onSelectHandler={setPropType}
        />
        <SearchFilter
          filterName="Listed by"
          options={['Agent', 'Owner']}
          value={listedFor}
          onSelectHandler={setListedFor}
        />
        {purpose !== 'Commercial' && (
          <SearchFilter
            filterName="Bedrooms"
            options={['1 BHK', '2 BHK', '3 BHK', '4 BHK']}
            value={size}
            onSelectHandler={setSize}
          />
        )}

        <View style={{padding: 16, backgroundColor: '#FFF'}}>
          {/* Buy Property */}
          {/* <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 8,
              }}>
              <Text
                style={{fontSize: 16, color: '#0E0E0C', fontWeight: 'bold'}}>
                Buy Range
              </Text>
              <Text
                style={{fontSize: 16, color: '#BDEA09', fontWeight: 'bold'}}>
                {formatPrice(price)}
              </Text>
            </View>
            <Slider
              style={{width: '100%', height: 40}}
              minimumValue={0}
              maximumValue={40000000}
              step={100000}
              value={price}
              onValueChange={setPrice}
              minimumTrackTintColor="#BDEA09"
              maximumTrackTintColor="#E5E5E5"
              thumbTintColor="#BDEA09"
            />
          </View> */}

          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 8,
              }}>
              <Text
                style={{fontSize: 16, color: '#0E0E0C', fontWeight: 'bold'}}>
                Price Range
              </Text>
              <Text
                style={{fontSize: 16, color: '#BDEA09', fontWeight: 'bold'}}>
                {formatValue(sliderValues[0])} to {formatValue(sliderValues[1])}
              </Text>
            </View>
            {/* <View style={{width:'100%',borderWidth:1,}}> */}
            <MultiSlider
              values={sliderValues}
              onValuesChange={setSliderValues}
              min={MIN_VALUE}
              max={MAX_VALUE}
              step={lookingFor === 'Buy' ? 1000 : 500} // 5 lakhs step
              allowOverlap
              snapped
              containerStyle={styles.sliderContainer}
              trackStyle={styles.track}
              selectedStyle={styles.selectedTrack}
              unselectedStyle={styles.unselectedTrack}
              markerStyle={styles.marker}
              sliderLength={screenWidth * 0.84}
              pressedMarkerStyle={styles.pressedMarker}
            />
            {/* </View> */}
            {/* <Slider
              style={{width: '100%', height: 40}}
              minimumValue={0}
              maximumValue={50000000}
              step={100000}
              value={Rentprice}
              onValueChange={setRentPrice}
              minimumTrackTintColor="#BDEA09"
              maximumTrackTintColor="#E5E5E5"
              thumbTintColor="#BDEA09"
            /> */}
          </View>
          {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 12, color: '#0E0E0C'}}>₹ 0</Text>
            <Text style={{fontSize: 12, color: '#0E0E0C'}}>₹ 4L</Text>
          </View> */}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 8,
            }}>
            <Text style={{fontSize: 16, color: '#0E0E0C', fontWeight: 'bold'}}>
              Built Up Area
            </Text>
            <Text style={{fontSize: 16, color: '#BDEA09', fontWeight: 'bold'}}>
              {area} Sq.ft.
            </Text>
          </View>
          <Slider
            style={{width: '100%', height: 40}}
            minimumValue={0}
            maximumValue={3000}
            step={50}
            value={area}
            onValueChange={setArea}
            minimumTrackTintColor="#BDEA09"
            maximumTrackTintColor="#E5E5E5"
            thumbTintColor="#BDEA09"
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 12, color: '#0E0E0C'}}>0 Sq.ft.</Text>
            <Text style={{fontSize: 12, color: '#0E0E0C'}}>3000 Sq.ft.</Text>
          </View>
        </View>

        {purpose !== 'Commercial' && (
          <SearchFilter
            filterName="Furnished Type"
            options={['Fully furnished', 'Semi Furnished', 'Un Furnished']}
            value={furnish}
            onSelectHandler={setFurnish}
          />
        )}

        {purpose !== 'Commercial' && (
          <SearchFilter
            filterName="Preferred Tenant"
            options={['Any', 'Family', 'Bachelors']}
            value={preferred}
            onSelectHandler={setPreferred}
          />
        )}

        {/* bottom placeholder */}
        <View className="w-full h-[10vh]" />
      </ScrollView>
      <View className="bottom-0 left-0 right-0 px-6 py-3 bg-white shadow-lg">
        <TouchableOpacity
          onPress={() => {
            updateFiltersArray();
          }}
          className={`py-3 px-8 rounded-full bg-[#BDEA09] mr-4`}>
          <Text className="text-[#181A53] text-base font-medium text-center">
            View Property
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SearchPropertyScreen;


const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rangeText: {
    fontSize: 18,
    marginVertical: 10,
  },
  sliderContainer: {
    height: 40,
    marginLeft: 20,
  },
  track: {
    height: 2,
  },
  selectedTrack: {
    backgroundColor: '#BDEA09',
  },
  unselectedTrack: {
    backgroundColor: '#E5E5E5',
  },
  marker: {
    backgroundColor: '#BDEA09',
    height: 15,
    width: 15,
  },
  pressedMarker: {
    backgroundColor: '#BDEA09',
  },
  filterContainer: {
    marginLeft: 20,
    // borderWidth:1,
    borderRadius: 25,
    // borderColor:'red',
    flexDirection: 'row',
    backgroundColor: '#F2F8F629',
    // width:'0%',
    padding: 10,
    // justifyContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  filtertext: {
    fontSize: 12,
    fontWeight: '400',
    color: 'white',
  },
  clearButton: {
    marginLeft: 10,
    color: '#FF0000', // Red color for clear button
    fontWeight: 'bold',
  },
});
