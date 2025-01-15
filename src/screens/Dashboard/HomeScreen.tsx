import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Alert,
  Animated,
  BackHandler,
  Button,
  FlatList,
  Image,
  PermissionsAndroid,
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  Keyboard,
  Platform,
} from 'react-native';
import {
  bell,
  buyHouse,
  faqChatBot,
  greenDown,
  homeBanner,
  key,
  location,
  offerBanner,
  searchIcon,
  showcaseHome,
} from '../../constants/imgURL';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../routes/MainStack';
import {StackNavigationProp} from '@react-navigation/stack';
import Geolocation from 'react-native-geolocation-service';
import {useDispatch} from 'react-redux';
import {onGetLocation} from '../../redux/ducks/User/getLocation';
import {useAppSelector} from '../../constants';
import {onGetUserProfile} from '../../redux/ducks/User/viewProfile';
import Loader from '../../component/Loader/Loader';
import {errorMessage} from '../../utils';
import axios from 'axios';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import FlashMessage, {showMessage} from 'react-native-flash-message';
// import Modal from 'react-native-modal';

const MAX_LENGTH = 28;

const HomeScreen = ({route}) => {
  console.log('route', route);

  const insets = useSafeAreaInsets();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [currentLocation, setCurrentLocation] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [latitude, setLatitude] = useState(latitude);
  const [longitude, setLongitude] = useState(longitude);
  const [refreshing, setRefreshing] = useState(false);
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const dropdownHeight = useRef(new Animated.Value(0)).current;
  const dropdownOpacity = useRef(new Animated.Value(0)).current;

  const [address, setAddress] = useState('');

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

  const dispatch = useDispatch();
  const getLocation = useAppSelector(state => state.getLocation);
  const viewProfile = useAppSelector(state => state.viewProfile);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // Check if you're on the Home screen by checking the route name
        if (route.name === 'Home') {
          Alert.alert(
            'Exit App',
            'Are you sure you want to exit the onboarding process?',
            [
              {
                text: 'Cancel',
                onPress: () => null,
                style: 'cancel',
              },
              {
                text: 'Yes',
                onPress: () => BackHandler.exitApp(),
              },
            ],
          );
          return true; // Prevents default back action
        } else {
          // If not on Home, just go back
          navigation.goBack();
          return true; // Prevents default back action
        }
      };

      // Add the back button listener when the screen is focused
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      // Clean up the listener when the screen is unfocused
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [route.name]), // Depend on the route name so it updates on screen change
  );

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      try {
        // Request permission for iOS
        const status = await Geolocation.requestAuthorization('whenInUse');
        if (status === 'granted') {
          Geolocation.getCurrentPosition(
            position => {
              dispatch(
                onGetLocation(
                  position.coords.latitude,
                  position.coords.longitude,
                ),
              );
              setLatitude(position.coords.latitude);
              setLongitude(position.coords.longitude);
            },
            error => {
              console.log('Error:', error);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        } else {
          console.log('Location permission denied');
          Alert.alert(
            'Location permission denied',
            'You need to enable location services to use this feature.',
          );
        }
      } catch (error) {
        console.log('Authorization error:', error);
      }
    } else {
      // Handle Android permissions here if needed
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            dispatch(
              onGetLocation(
                position.coords.latitude,
                position.coords.longitude,
              ),
            );
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          error => {
            console.log('Error:', error);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      } else {
        console.log('You cannot use Geolocation');
      }
    }
  };

  // const requestLocationPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         title: 'Geolocation Permission',
  //         message: 'Can we access your location?',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       },
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       Geolocation.getCurrentPosition(
  //         position => {
  //           dispatch(
  //             onGetLocation(
  //               position.coords.latitude,
  //               position.coords.longitude,
  //             ),
  //           );
  //           setLatitude(position?.coords?.latitude);
  //           setLongitude(position?.coords?.longitude);
  //         },
  //         error => {
  //           console.log('Error:', error);
  //         },
  //         {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
  //       );
  //     } else {
  //       console.log('You cannot use Geolocation');
  //     }
  //   } catch (err) {
  //     return false;
  //   }
  // };

  const fetchData = async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        dispatch(onGetLocation(latitude, longitude)), // Refresh location
        dispatch(onGetUserProfile()), // Refresh user profile
      ]);
      setRefreshing(false);
    } catch (error) {
      console.error('Error refreshing data:', error);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    requestLocationPermission();
    fetchData();
  }, []);

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
    dispatch(onGetLocation(parseFloat(latitude), parseFloat(longitude)));
    setModalVisible(false);
  };

  useEffect(() => {
    if (getLocation.called) {
      const {data} = getLocation;
      setCurrentLocation(data?.display_name);
      console.log(currentLocation);
    }
    if (viewProfile.called) {
      const {data} = viewProfile?.data;
      setLoading(false);
      setUserData(data);
    }
  }, [viewProfile, getLocation, currentLocation]);

  const getGreeting = () => {
    const hours = new Date().getHours();
    console.log('"\\====================================');
    console.log('hots', hours);
    console.log('====================================');
    if (hours < 12) {
      return 'Good Morning';
    } else if (hours < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };
  const trimText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  const changeLocation = () => {
    setCurrentLocation(newLocation);
    setModalVisible(false);
  };

  const getLatLongFromAddress = async address => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address,
        )}`,
        {
          headers: {
            'User-Agent': 'axces/1.0 (axces.customercare@gmail.com)',
          },
        },
      );

      if (response.data.length > 0) {
        const location = response.data[0];
        const {lat, lon} = location;

        // Convert lat and lon to numbers and set in the state
        setLatitude(parseFloat(lat));
        setLongitude(parseFloat(lon));

        // Dispatch the location to onGetLocation function
        dispatch(onGetLocation(parseFloat(lat), parseFloat(lon)));
      } else {
        console.log('Address not found');
      }
    } catch (error) {
      console.log('Error fetching coordinates:', error);
    }
  };

  const [locationsuggestions, setlocationSuggestions] = useState([]);

  const getSuggestions = async text => {
    setAddress(text);
    if (text.length > 2) {
      // Fetch suggestions if text length is more than 2 characters
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            text,
          )}&countrycodes=IN`,
          {
            headers: {
              'User-Agent': 'axces/1.0 (axces.customercare@gmail.com)',
            },
          },
        );
        console.log('response', response);
        setlocationSuggestions(response.data);
      } catch (error) {
        console.log('Error fetching suggestions:', error);
      }
    } else {
      setlocationSuggestions([]); // Clear suggestions when input is less than 3 characters
    }
  };

  const handleSuggestionSelect = item => {
    const {display_name, lat, lon} = item;
    setAddress(display_name); // Update input with selected suggestion
    setLatitude(parseFloat(lat));
    setLongitude(parseFloat(lon));
    setlocationSuggestions([]); // Clear suggestions after selection
    setModalVisible(false);
    Keyboard.dismiss();
  };

  // Handle the user submitting the new address
  const handleNewLocation = () => {
    if (address) {
      getLatLongFromAddress(address);
      setLocationModalVisible(false);
      //  setAddress('')
    } else {
      console.log('Please enter an address or city');
    }
  };

  const handlePress = () => {
    showMessage({
      message: 'Please Select Current Location',
      //  description: 'Please Select Current Location',
      type: 'danger',
      statusBarHeight: 50,
      animated: true,
      duration: 2000,
      icon: 'danger',
      position: 'top',
      autoHide: true,
    });
  };

  return (
    <SafeAreaView
      edges={['left', 'right']}
      className="flex-1 bg-[#F2F8F6]"
      // style={{borderWidth: 1}}
    >
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'#181A53'}
        translucent
      />
      <Loader loading={loading} />
      <ScrollView
        className="z-10 flex-1 bg-[#F2F8F6]"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
        }>
        {/* Top Section */}
        <View
          style={{paddingTop: insets.top}}
          className="overflow-visible w-full relative h-[60vh] rounded-b-2xl pb-8">
          <View className="z-20 flex flex-row items-center justify-between px-6 pt-6">
            <View>
              <Text className="mb-2 text-lg font-medium text-white/60 ml-7">
                Current Location
              </Text>
              <TouchableOpacity
                onPress={() => setLocationModalVisible(true)}
                className="flex flex-row items-center justify-start">
                <Image
                  source={{uri: location}}
                  resizeMode="contain"
                  className="w-5 h-5"
                />
                <View style={{width: 255}} className="flex flex-row ml-2">
                  <Text className="text-base font-medium text-white">
                    {currentLocation
                      ? trimText(currentLocation, MAX_LENGTH)
                      : 'Fetching...'}
                  </Text>
                  {/* <Image source={{ uri: greenDown }} resizeMode="contain" className="w-3 ml-1 aspect-auto" /> */}
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10"
              onPress={() => navigation.navigate('Notifications')}>
              <Image
                source={{uri: bell}}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>
          </View>
          <View className="absolute bottom-0 left-0 right-0 z-20 px-6">
            <Text className="text-2xl font-medium text-white">
              {getGreeting()} {userData?.name} !
            </Text>
            {/* <View style={{flex: 1, padding: 16}}>
              <View
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: 25,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 8,
                }}>
                <Image
                  source={{uri: searchIcon}}
                  style={{width: 20, height: 20, marginRight: 8}}
                  resizeMode="contain"
                />
                <TextInput
                  placeholder="Search your dream home here"
                  placeholderTextColor="white"
                  style={{color: 'white', width: '90%'}}
                  value={input}
                  onChangeText={text => fetchSuggestions(text)}
                />
              </View>

              {modalVisible && suggestions.length > 0 && (
                <Animated.View
                  style={{
                    position: 'absolute',
                    top: 85,
                    left: 16,
                    right: 16,
                    backgroundColor: '#f3f9f6',
                    borderRadius: 10,
                    zIndex: 1000,
                    height: dropdownHeight,
                    opacity: dropdownOpacity,
                    overflow: 'hidden',
                    borderBottomLeftRadius: 5,
                    borderBottomRightRadius: 5,
                  }}>
                  {suggestions.map((item: any, index: number) => (
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
                  ))}
                </Animated.View>
              )}
            </View> */}
            <View className="p-3 mt-4 bg-white rounded-2xl">
              <Text className="text-[#0E0E0C] text-base font-bold mb-3">
                What are you looking for today?
              </Text>
              <View className="flex flex-row">
                <TouchableOpacity
                  onPress={() => {
                    currentLocation == null
                      ? handlePress()
                      : navigation.navigate('PropertyListing', {
                          latitude,
                          longitude,
                        });
                  }}
                  className="flex-1 flex flex-row items-center justify-center mr-2 rounded-full bg-[#BDEA09] p-3">
                  <Image
                    source={{uri: buyHouse}}
                    resizeMode="contain"
                    className="w-5 h-5 mr-3"
                  />
                  <Text className="text-[#181A53] font-medium text-base">
                    Buy
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    currentLocation == null
                      ? handlePress()
                      : navigation.navigate('RentPropertyListing', {
                          latitude,
                          longitude,
                        });
                  }}
                  className="flex-1 flex flex-row items-center justify-center rounded-full bg-[#BDEA09] p-3">
                  <Image
                    source={{uri: key}}
                    resizeMode="contain"
                    className="w-5 h-5 mr-3"
                  />
                  <Text className="text-[#181A53] font-medium text-base">
                    Rent
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Image
            source={{uri: homeBanner}}
            resizeMode="cover"
            className="absolute top-0 bottom-0 left-0 right-0 z-10 w-full h-full rounded-b-3xl"
          />
        </View>
        {/* Want to showcase */}
        <View className="px-6 my-6">
          <View className="flex flex-row w-full bg-white rounded-xl">
            <View className="flex justify-between flex-1 p-4">
              <Text className="text-xl text-[#181A53] font-bold">
                Want to showcase your property?
              </Text>
              <Text className="text-[#181A5399] text-sm">
                Boost your income by renting or selling your property
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ListPropertyScreen', {currentLocation})
                }
                className="p-3 rounded-full border border-[#BDEA09]">
                <Text className="text-[#BDEA09] text-base font-normal text-center">
                  List Here
                </Text>
              </TouchableOpacity>
            </View>
            <Image
              source={{uri: showcaseHome}}
              resizeMode="cover"
              className="w-[40%] h-[30vh] rounded-tr-xl rounded-br-xl"
            />
          </View>
        </View>
        {/* Offer */}
        {/* <View className="px-6 mb-6">
          <View className="relative w-full px-4 pb-4 rounded-xl">
            <View className="absolute top-0 left-0 right-0 z-20 flex items-center justify-center mx-auto">
              <View className="bg-white/40 w-[90%] flex flex-row justify-between items-center px-2 py-1 rounded-b-xl">
                <Text className="text-sm text-white">Use code</Text>
                <Text className="text-base font-bold text-white">FAB50</Text>
              </View>
            </View>
            <View className="z-20 flex flex-row items-center justify-between mt-10">
              <View>
                <Text className="text-4xl font-bold text-white">5% off</Text>
                <Text className="text-base text-white">on car wash</Text>
              </View>
              <TouchableOpacity className="rounded-full bg-white/30">
                <Text className="px-8 py-3 text-base text-white">Book now</Text>
              </TouchableOpacity>
            </View>
            <Image
              source={{uri: offerBanner}}
              resizeMode="cover"
              className="absolute top-0 bottom-0 left-0 right-0 z-10 rounded-xl"
            />
          </View>
        </View> */}
        {/* Check history */}
        {/* <View className="px-6 mb-6">
          <View className="flex flex-row w-full p-4 bg-white rounded-xl">
            <View className="flex-1">
              <Text className="text-base font-medium text-[#181A53]">
                Check your recent views
              </Text>
            </View>
            <TouchableOpacity className="flex-1 p-3 rounded-full border border-[#BDEA09]">
              <Text className="text-[#BDEA09] text-base font-medium text-center">
                Check history
              </Text>
            </TouchableOpacity>
          </View>
        </View> */}
        {/* FAQ */}
        <View className="px-6 mb-6">
          <View className="w-full bg-white rounded-xl">
            <View className="flex flex-row w-full">
              <View className="flex justify-between flex-1 p-4">
                <Text className="text-xl text-[#181A53] font-bold">
                  Got stuck? Check our FAQ
                </Text>
                <Text className="text-[#181A5399] text-sm">
                  Unlock insights with our user-friendly FAQ guide
                </Text>
              </View>
              <View className="w-[40%] flex items-center justify-center">
                <Image
                  source={{uri: faqChatBot}}
                  resizeMode="contain"
                  className="w-24 h-24 rounded-tr-xl rounded-br-xl"
                />
              </View>
            </View>
            <View className="px-4 pb-4">
              <TouchableOpacity
                onPress={() => navigation.navigate('FaqScreen')}
                className="p-3 rounded-full border border-[#BDEA09]">
                <Text className="text-[#BDEA09] text-base font-normal text-center">
                  View FAQ's
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* <TouchableOpacity
            onPress={() =>
              navigation.navigate('UserPropertyListedScren', {
                latitude,
                longitude,
              })
            }>
            <Text className="my-6 text-base font-bold text-black">
              Test mode: Propertylisted Screen Click
            </Text>
          </TouchableOpacity> */}
        </View>
        <Modal
          transparent={true}
          visible={locationModalVisible}
          style={{flex: 1}}>
          {Platform.OS === 'android' ? (
            <TouchableWithoutFeedback
              onPress={() => setLocationModalVisible(false)}>
              <View
                style={{
                  margin: 20,
                  backgroundColor: 'white',
                  borderRadius: 10,
                  padding: 10,
                  alignItems: 'center',
                  elevation: 5,
                  top: 80,
                  width: '80%',
                  left: 20,
                  // bottom: 80,
                }}>
                <View
                  style={{
                    borderWidth: 0.5,
                    borderRadius: 25,
                    width: '90%',
                    padding: Platform.OS == 'ios' ? 10 : null,
                  }}>
                  <TextInput
                    placeholder="Enter city or address"
                    value={address}
                    onChangeText={getSuggestions}
                    // multiline={true}
                    style={{color: 'black', marginHorizontal: 5}}
                    placeholderTextColor={'black'}
                  />
                </View>
                {locationsuggestions.length > 0 && (
                  <FlatList
                    data={locationsuggestions}
                    keyExtractor={item => item.place_id.toString()}
                    renderItem={({item}) => {
                      return (
                        <>
                          <TouchableOpacity
                            style={{
                              padding: 10,
                              borderBottomWidth: 1,
                              borderBottomColor: '#ccc',
                            }}
                            onPress={() => handleSuggestionSelect(item)}>
                            <Text style={{color: 'black'}}>
                              {item.display_name}
                            </Text>
                          </TouchableOpacity>
                        </>
                      );
                    }}
                  />
                )}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '90%',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={{
                      // borderWidth: 0.5,
                      borderRadius: 20,
                      padding: 12,
                      marginTop: 10,
                      backgroundColor: '#BDEA09',
                      width: '38%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    // title="Close"
                    onPress={() => setLocationModalVisible(false)}>
                    <Text style={{fontWeight: 'bold', color: 'black'}}>
                      {'Close'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      // borderWidth: 0.5,
                      borderRadius: 20,
                      padding: 12,
                      marginTop: 10,
                      backgroundColor: '#BDEA09',
                    }}
                    onPress={handleNewLocation}>
                    <Text style={{fontWeight: 'bold', color: 'black'}}>
                      {'Save Location'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          ) : (
            <View
              style={{
                margin: 20,
                backgroundColor: 'white',
                borderRadius: 10,
                padding: 10,
                alignItems: 'center',
                elevation: 5,
                top: 80,
                width: '80%',
                left: 20,
                // bottom: 80,
              }}>
              <View
                style={{
                  borderWidth: 0.5,
                  borderRadius: 25,
                  width: '90%',
                  padding: Platform.OS == 'ios' ? 10 : nullß,
                }}>
                <TextInput
                  placeholder="Enter city or address"
                  value={address}
                  onChangeText={getSuggestions}
                  // multiline={true}
                  style={{color: 'black', marginHorizontal: 5}}
                  placeholderTextColor={'black'}
                />
              </View>
              {locationsuggestions.length > 0 && (
                <FlatList
                  data={locationsuggestions}
                  keyExtractor={item => item.place_id.toString()}
                  renderItem={({item}) => {
                    return (
                      <>
                        <TouchableOpacity
                          style={{
                            padding: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: '#ccc',
                          }}
                          onPress={() => handleSuggestionSelect(item)}>
                          <Text style={{color: 'black'}}>
                            {item.display_name}
                          </Text>
                        </TouchableOpacity>
                      </>
                    );
                  }}
                />
              )}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '90%',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    // borderWidth: 0.5,
                    borderRadius: 20,
                    padding: 12,
                    marginTop: 10,
                    backgroundColor: '#BDEA09',
                    width: '38%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  // title="Close"
                  onPress={() => setLocationModalVisible(false)}>
                  <Text style={{fontWeight: 'bold', color: 'black'}}>
                    {'Close'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    // borderWidth: 0.5,
                    borderRadius: 20,
                    padding: 12,
                    marginTop: 10,
                    backgroundColor: '#BDEA09',
                  }}
                  onPress={handleNewLocation}>
                  <Text style={{fontWeight: 'bold', color: 'black'}}>
                    {'Save Location'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
