import {
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Keyboard,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../component/Header/Header';
import PropertyCard from '../../component/Card/PropertyCard';
import {useCallback, useEffect, useRef, useState} from 'react';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import Loader from '../../component/Loader/Loader';
import {errorMessage, getAccessToken} from '../../utils';
import colors from '../../utils/colors';
import {useAppSelector} from '../../constants';
import {Image} from 'react-native-reanimated/lib/typescript/Animated';
import {TextInput} from 'react-native-gesture-handler';
import {onGetLocation} from '../../redux/ducks/User/getLocation';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionic from 'react-native-vector-icons/Ionicons';
import {initConnection, endConnection, getProducts} from 'react-native-iap';

const PropertyListingScreen = () => {
  const [list, setList] = useState([]);
  // const [latitude, setLatitude] = useState<number>('');
  // const [longitude, setLongitude] = useState<number>('');
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const getProperties = useAppSelector(state => state.getProperties.data);
  console.log('getProperties', getProperties);

  const route = useRoute();
  const {appliedFilters} = route?.params || {};

  const [latitude, setLatitude] = useState<number>(route?.params?.latitude);
  const [longitude, setLongitude] = useState<number>(route?.params?.longitude);

  console.log('route?.params?.longitude', latitude);
  console.log('route?.params?.lattitude', longitude);

  const [products, setProducts] = useState([]);

  const productIds = {
    '50_coins': 'com.axces.coins.50',
    '100_coins': 'com.axces.coins.100',
    '200_coins': 'com.axces.coins.200',
    '500_coins': 'com.axces.coins.500',
    '1000_coins': 'com.axces.coins.1000',
  };

  const initializeIAP = async () => {
    try {
      if (Platform.OS === 'ios') {
        await initConnection();
        const iapProducts = await getProducts({
          skus: Object.values(productIds),
        });
        const sortedProducts = iapProducts.sort(
          (a, b) =>
            parseInt(a.productId.replace('com.axces.coins.', '')) -
            parseInt(b.productId.replace('com.axces.coins.', '')),
        );
        setProducts(sortedProducts);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to initialize in-app purchases proper');
    }
  };

  useEffect(() => {
    if (Platform.OS === 'ios') {
      initializeIAP();
    }

    return () => {
      if (Platform.OS === 'ios') {
        endConnection();
      }
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (
        route?.params?.latitude !== undefined &&
        route?.params?.longitude !== undefined
      ) {
        setLatitude(route?.params?.latitude);
        setLongitude(route?.params?.longitude);
      }
    }, [route]),
  );

  useEffect(() => {
    if (Array.isArray(appliedFilters)) {
      setFilteredData(appliedFilters);
    } else {
      setFilteredData([]);
    }
  }, [appliedFilters]);

  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const dropdownHeight = useRef(new Animated.Value(0)).current;
  const dropdownOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (modalVisible) {
      Animated.parallel([
        Animated.timing(dropdownHeight, {
          toValue: 200, // Adjust as needed
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(dropdownOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(dropdownHeight, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(dropdownOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [modalVisible]);

  const fetchSuggestions = async (query: string) => {
    setInput(query);
    if (query.trim().length === 0) {
      setSuggestions([]);
      setModalVisible(false);
      return;
    }

    try {
      const response = await fetch(
        `https://backend.axces.in/api/auto?query=${query}`,
        {
          method: 'GET',
        },
      );
      const responseData = await response.json();
      const {data} = responseData;
      setSuggestions(data);
      setModalVisible(true);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
      setModalVisible(false);
    }
  };

  const handleSelectSuggestion = (item: any) => {
    console.log('====================================');
    console.log('item', item);
    console.log('====================================');
    setInput(item?.place_name);
    const {latitude, longitude} = item?.coordinates;
    setLatitude(latitude);
    setLongitude(longitude);
    setModalVisible(false);
    Keyboard.dismiss();
    // fetchProperties();
    dispatch(onGetLocation(parseFloat(latitude), parseFloat(longitude)));
    // setModalVisible(false);
  };

  const [addPincode, setAddPincode] = useState<string>('');
  const [lookingFor, setLookingFor] = useState<string>('');
  const [purpose, setPurpose] = useState<string>('');
  const [propType, setPropType] = useState<string>('');
  const [listedFor, setListedFor] = useState<string>('');
  const [size, setSize] = useState<string>('');
  // const [latitude, setLatitude] = useState<number>();
  // const [longitude, setLongitude] = useState<number>();
  // const [loading, setLoading] = useState<boolean>(false);
  const [price, setPrice] = useState(0);
  const [Rentprice, setRentPrice] = useState(0);
  const [area, setArea] = useState(0);
  const [furnish, setFurnish] = useState('');
  const [preferred, setPreferred] = useState('');

  const loadFilters = async () => {
    const filters = await AsyncStorage.getItem('propertyFilters');
    console.log('applyfilter', filters);

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

  useEffect(() => {
    loadFilters();
  }, []);

  const saveFilters = async updatedFilters => {
    await AsyncStorage.setItem(
      'propertyFilters',
      JSON.stringify(updatedFilters),
    );
  };

  const clearFilter = async (filterKey, setterFunction) => {
    const storedFilters = await AsyncStorage.getItem('propertyFilters');
    const filters = storedFilters ? JSON.parse(storedFilters) : {};

    // Remove the filter key
    delete filters[filterKey];

    // Clear the related state
    setterFunction('');

    // Save the updated filters
    await saveFilters(filters);
  };

  // Example usage for clearing each filter
  const clearPincode = () => {
    clearFilter('addPincode', setAddPincode);
    // setAppliedFilters(prev => ({...prev, addPincode: undefined})); // Update applied filters
  };

  const clearLookingFor = () => {
    clearFilter('lookingFor', setLookingFor);
    setLoading(true);
    fetchProperties();
    setLoading(false);
    // setAppliedFilters(prev => ({...prev, lookingFor: undefined}));
  };

  const clearPurpose = () => {
    clearFilter('purpose', setPurpose);
    setLoading(true);
    fetchProperties();
    setLoading(false);
    // setAppliedFilters(prev => ({...prev, purpose: undefined}));
  };

  const clearPropType = () => {
    clearFilter('propType', setPropType);
    setLoading(true);
    fetchProperties();
    setLoading(false);
    // setAppliedFilters(prev => ({...prev, propType: undefined}));
  };

  const clearListedFor = () => {
    clearFilter('listedFor', setListedFor);
    setLoading(true);
    fetchProperties();
    setLoading(false);
    // setAppliedFilters(prev => ({...prev, listedFor: undefined}));
  };

  const clearSize = () => {
    clearFilter('size', setSize);
    setLoading(true);
    fetchProperties();
    setLoading(false);
    // setAppliedFilters(prev => ({...prev, size: undefined}));
  };

  const clearFurnish = () => {
    clearFilter('furnish', setFurnish);
    setLoading(true);
    fetchProperties();
    setLoading(false);
    // setAppliedFilters(prev => ({...prev, furnish: undefined}));
  };

  const clearPreferred = () => {
    clearFilter('preferred', setPreferred);
    setLoading(true);
    fetchProperties();
    setLoading(false);
    // setAppliedFilters(prev => ({...prev, preferred: undefined}));
  };

  const fetchProperties = async () => {
    setLoading(true);
    const url = 'https://backend.axces.in/api/property/list';

    const token = await getAccessToken();

    console.log('latitude:', latitude);
    console.log('longitude:', longitude);
    console.log('appliedFilters:', appliedFilters);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userLatitude: latitude,
          userLongitude: longitude,
          filters: appliedFilters || {},
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Fetched Data:', result);

      if (result.data !== null) {
        const filteredData = result.data.filter(
          property => property.listing_type === 'buy',
        );
        setList(filteredData);
        loadFilters();
      }
    } catch (error) {
      console.error('Fetch Properties Error:', error);
      errorMessage(error.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [latitude, longitude, appliedFilters]); // Add appliedFilters to the dependency array

  //    const fetchProperties = async () => {
  //      setLoading(true);
  //      const url = `https://backend.axces.in/api/property/list`;

  //      console.log('route?.params?.latitude', route?.params?.latitude);
  //      console.log('route?.params?.longitude', route?.params?.longitude);

  //      const token = await getAccessToken();
  //      console.log('userId', token);

  //      console.log('latitude++++++', latitude);
  //      console.log('longitude+++++', longitude);

  //      try {
  //        const response = await fetch(url, {
  //          method: 'POST',
  //          headers: {
  //            'Content-Type': 'application/json',
  //            Authorization: `Bearer ${token} `,
  //            // Include other necessary headers here
  //          },
  //          body: JSON.stringify({
  //            userLatitude: latitude,
  //            userLongitude: longitude,
  //            filters: appliedFilters || {},
  //          }),
  //        });

  //        if (!response.ok) {
  //          const errorText = await response.text();
  //          console.error('Error response:', errorText);
  //          throw new Error(`HTTP error! status: ${response.status}`);
  //        }

  //        const result = await response.json();

  //        // Log the fetched data
  //        console.log('Fetched Data:', result);

  //        if (result.data !== null) {
  //          const filteredData = result.data.filter(
  //            property => property.listing_type === 'buy',
  //          );
  //          console.log('filteredData+++', filteredData);
  //          setList(filteredData);
  //        }
  //      } catch (error) {
  //        errorMessage(error.message);
  //      } finally {
  //        setLoading(false);
  //      }
  //    };
  //   fetchProperties();
  // }, [appliedFilters]);

  useEffect(() => {
    // Update the list with filtered getProperties data
    if (Array.isArray(getProperties)) {
      const filteredData = getProperties;
      setList(filteredData);
      loadFilters();
    } else {
      setList([]);
    }
  }, [getProperties]);

  console.log('====================================');
  console.log('lookingFor', purpose);
  console.log('====================================');

  return (
    <SafeAreaView className="bg-[#181A53]">
      <StatusBar barStyle={'light-content'} backgroundColor={'#181A53'} />
      <Header
        showSearch={true}
        input={input}
        setInput={() => setInput}
        fetchSuggestions={fetchSuggestions}
      />
      {modalVisible && suggestions.length > 0 && (
        <Animated.View
          style={{
            position: 'absolute',
            top: 90,
            left: 24,
            right: 16,
            backgroundColor: '#f3f9f6',
            borderRadius: 10,
            zIndex: 1000,
            height: dropdownHeight,
            opacity: dropdownOpacity,
            overflow: 'hidden',
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            // borderWidth:1,
            width: '90%',
          }}>
          {suggestions.map(
            (item: any, index: number) => (
              console.log('item', item),
              (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleSelectSuggestion(item)}
                  style={{
                    padding: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#181A53',
                      paddingBottom: 10,
                    }}>
                    {item.place_name}
                  </Text>
                </TouchableOpacity>
              )
            ),
          )}
        </Animated.View>
      )}
      <Loader loading={loading} />
      <View
        // style={{
        //   width: '100%',
        //   // marginLeft:20,
        //   flexDirection: 'row',
        //   alignItems: 'center',
        //   flexWrap: 'wrap',
        //   // marginTop:10,
        //   backgroundColor: '#181A53',
        // }}
        style={{
          width: '100%',
          flexDirection: 'column',
          alignItems: 'flex-start',
          backgroundColor: '#181A53',
        }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{paddingVertical: 10}}>
          {/* <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 10}}>
          Selected Filters:
        </Text> */}
          {addPincode && (
            <View style={styles.filterContainer}>
              <Text
                style={{
                  ...styles.filtertext,
                }}>{`Pincode: ${addPincode}`}</Text>
              <TouchableOpacity
                onPress={clearPincode}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 14,
                  height: 14,
                  marginLeft: 8,
                }}>
                <Ionic name="close" size={16} color={'white'} />
                {/* <Text style={styles.clearButton}>X</Text> */}
              </TouchableOpacity>
            </View>
          )}
          {lookingFor && (
            <View style={styles.filterContainer}>
              <Text
                style={{
                  ...styles.filtertext,
                }}>{`Looking For: ${lookingFor}`}</Text>
              <TouchableOpacity
                onPress={clearLookingFor}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 14,
                  height: 14,
                  marginLeft: 8,
                }}>
                <Ionic name="close" size={16} color={'white'} />
                {/* <Text style={styles.clearButton}>X</Text> */}
              </TouchableOpacity>
            </View>
          )}
          {purpose && (
            <View style={styles.filterContainer}>
              <Text
                style={{...styles.filtertext}}>{`Purpose: ${purpose}`}</Text>
              <TouchableOpacity
                onPress={clearPurpose}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 14,
                  height: 14,
                  marginLeft: 8,
                }}>
                <Ionic name="close" size={16} color={'white'} />
                {/* <Text style={styles.clearButton}>X</Text> */}
              </TouchableOpacity>
            </View>
          )}
          {propType && (
            <View style={styles.filterContainer}>
              <Text
                style={{
                  ...styles.filtertext,
                }}>{`Property Type: ${propType}`}</Text>
              <TouchableOpacity
                onPress={clearPropType}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 14,
                  height: 14,
                  marginLeft: 8,
                }}>
                <Ionic name="close" size={16} color={'white'} />
                {/* <Text style={styles.clearButton}>X</Text> */}
              </TouchableOpacity>
            </View>
          )}
          {listedFor && (
            <View style={styles.filterContainer}>
              <Text
                style={{
                  ...styles.filtertext,
                }}>{`Listed By: ${listedFor}`}</Text>
              <TouchableOpacity
                onPress={clearListedFor}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 14,
                  height: 14,
                  marginLeft: 8,
                }}>
                <Ionic name="close" size={16} color={'white'} />
                {/* <Text style={styles.clearButton}>X</Text> */}
              </TouchableOpacity>
            </View>
          )}
          {size && (
            <View style={styles.filterContainer}>
              <Text style={{...styles.filtertext}}>{`Bedrooms: ${size}`}</Text>
              <TouchableOpacity
                onPress={clearSize}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 14,
                  height: 14,
                  marginLeft: 8,
                }}>
                <Ionic name="close" size={16} color={'white'} />
                {/* <Text style={styles.clearButton}>X</Text> */}
              </TouchableOpacity>
            </View>
          )}
          {furnish && (
            <View style={styles.filterContainer}>
              <Text
                style={{
                  ...styles.filtertext,
                }}>{`Furnished Type: ${furnish}`}</Text>
              <TouchableOpacity
                onPress={clearFurnish}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 14,
                  height: 14,
                  marginLeft: 8,
                }}>
                <Ionic name="close" size={16} color={'white'} />
                {/* <Text style={styles.clearButton}>X</Text> */}
              </TouchableOpacity>
            </View>
          )}
          {preferred && (
            <View style={styles.filterContainer}>
              <Text
                style={{
                  ...styles.filtertext,
                }}>{`Preferred Tenant: ${preferred}`}</Text>
              <TouchableOpacity
                onPress={clearPreferred}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 14,
                  height: 14,
                  marginLeft: 8,
                }}>
                <Ionic name="close" size={16} color={'white'} />
                {/* <Text style={styles.clearButton}>X</Text> */}
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
      <ScrollView
        className="mt-2"
        style={{
          backgroundColor: '#FFFFFF',
          minHeight: Dimensions.get('window').height,
        }}>
        <View className="w-full mb-4">
          <View style={{width: '90%', marginHorizontal: 18, padding: 10}}>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 18,
              }}>{`Found ${list.length}+ places`}</Text>
          </View>
          <FlatList
            contentContainerStyle={{gap: 20}}
            data={list}
            renderItem={({item}) => (
              <PropertyCard item={item} iapProducts={products} />
            )}
            ListEmptyComponent={() => (
              <View
                style={{width: '100%', alignItems: 'center', paddingTop: 20}}>
                {!loading && (
                  <Text
                    style={{color: 'red', fontSize: 20, fontWeight: 'bold'}}>
                    {'No records found'}
                  </Text>
                )}
              </View>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PropertyListingScreen;

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

// Old code

// import { FlatList, ScrollView, StatusBar, Text, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Header from '../../component/Header/Header';
// import PropertyCard from '../../component/Card/PropertyCard';
// import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { getPropertiesList } from '../../redux/ducks/Properties/getProperties';
// import { useAppSelector } from '../../constants';
// import Loader from '../../component/Loader/Loader';
// import { errorMessage } from '../../utils';

// const PropertyListingScreen = () => {

//   const [list, setList] = useState([]);
//   const [latitude, setLatitude] = useState<number>(45);
//   const [longitude, setLongitude] = useState<number>(38);
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();
//   const propertiesList = useAppSelector((state) => state.getProperties);

//   useEffect(() => {
//     dispatch(getPropertiesList(latitude, longitude, '', '', ''))
//     setLoading(true)
//   }, [])

//   useEffect(() => {
//     if (propertiesList.called) {
//       setLoading(false)
//       const { data, message, status } = propertiesList
//       if (status === 'fail') {
//         errorMessage(message)
//       }
//       setList(data)
//     }
//   }, [propertiesList])

//   return (
//     <SafeAreaView className="flex-1 bg-[#F2F8F6]">
//       <StatusBar barStyle={'light-content'} backgroundColor={'#181A53'} />
//       <Header showSearch={true} />
//       <Loader loading={loading} />
//       <ScrollView className="flex-1 px-6 pt-6 ">
//         <View className="w-full mb-4 ">
//           <FlatList
//             contentContainerStyle={{ gap: 20 }}
//             data={list}
//             renderItem={({ item }) =>
//               <PropertyCard item={item} />} />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default PropertyListingScreen;
