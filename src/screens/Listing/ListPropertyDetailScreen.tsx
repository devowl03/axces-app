import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StatusBar,
  Image,
  PermissionsAndroid,
  TouchableWithoutFeedback,
  TextInput,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import Geolocation from '@react-native-community/geolocation';
import { useDispatch } from 'react-redux';
import CenterHeader from '../../component/Header/CenterHeader';
import PropertyCalendar from '../../component/Calender/Calendar';
import Tracker from '../../component/ListProperty/Tracker';
import PropertyInput from './component/PropertyInput';
import PropertySelect from './component/PropertySelect';
import SearchFilter from '../Search/SearchFilter';
import ImagePicker from '../../component/ImagePicker/ImagePicker';
import Loader from '../../component/Loader/Loader';
import { NamedStyles, scale, verticalScale } from 'react-native-size-matters';
import { cloudMoney, coinStack, pinIcon } from '../../constants/imgURL';
import { getUserId, successMessage, errorMessage } from '../../utils';
import { onPostProperty } from '../../redux/ducks/Properties/addProperty';
import { useAppSelector } from '../../constants';
import { RootStackParamList } from '../../routes/MainStack';
import Facilities from '../Search/Facilities';
import { FlatList } from 'react-native';
import Animated from 'react-native-reanimated';
import { Linking } from 'react-native';



const ListPropertyDetailScreen = () => {

  const getBalance = useAppSelector((state) => state.getBalance);
  const recharge = useAppSelector((state) => state.recharge)
  const viewProfile = useAppSelector((state) => state.viewProfile)

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const nocoinbottomSheetRef = useRef<BottomSheetModal>(null);
  const [selected, setSelected] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [calendarVisible, setCalendarVisible] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  // const [slideAnim] = useState(new Animated.Value(Dimensions.get('window').height));
  const route: any = useRoute();

  const { selectedRole, lookingFor, propertyType, addPincode, } = route?.params;
  const location = route.params?.location;
  const [balance, setBalance] = useState(0)
  const [amount, setAmount] = useState('')
  const [demo, setdemo] = useState('')

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [propertyName, setPropertyName] = useState<string>('');
  const [area, setArea] = useState<string>('');
  const [floor, setFloor] = useState<string>('');
  const [facing, setFacing] = useState<string>('');
  const [furnishingType, setFurnishingType] = useState<string>('');
  const [rent, setRent] = useState<string>('');
  const [deposit, setDeposit] = useState<string>('');
  const [tenant, setTenant] = useState<string>('');
  const [landMark, setLandMark] = useState<string>('');
  const [aboutProp, setAboutProp] = useState<string>('');
  const [facilities, setFacilities] = useState<string>('');
  const [totalFloor, setTotalFloor] = useState<string>('');
  const [imagePickerModal, setImagePickerModal] = useState<boolean>(false);
  const [images, setImages] = useState<any>([]);
  const [userId, setUserId] = useState<string>('');
  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();
  const [bedrooms, setBedrooms] = useState<string>('');
  const [Bathrooms, setBathrooms] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [Property, setProperty] = useState<boolean>(false);
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState('');
  const [selectedLocalities, setSelectedLocalities] = useState([]);

  const addProperty = useAppSelector(state => state.addProperty);

  const dispatch = useDispatch();
  console.log(location);
  const removeLocality = (index: any) => {
    const newLocalities = selectedLocalities.filter((_, i) => i !== index);
    setSelectedLocalities(newLocalities);
  };

  useEffect(() => {
    const displaybalance = () => {
      if (getBalance.called) {
        const { data } = getBalance;
        setdemo(getBalance);
        const coins = data.coins;
        setBalance(coins);
        setLoading(false);
      }
    }


    displaybalance();
  }, [getBalance, recharge, demo, balance, setBalance, viewProfile]);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await getUserId();
        const sanitizedId = id.replace(/'/g, ''); // Replace single quotes if needed
        console.log("Fetched and sanitized User ID:", sanitizedId); // Log the sanitized ID
        setUserId(sanitizedId);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };
  
    fetchUserId();
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
            }
            
            ,
            
            error => {
              console.log('ERRor>>>', error);
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
    // getId();
  }, []);

  useEffect(() => {
    if (addProperty.called) {
      setLoading(false);
      const { data, message, code } = addProperty;
      console.log('data>>>', data);
      if (code === 201) {
        successMessage(message);
        navigation.navigate('Dashboard');
      } else {
        errorMessage(message);
      }
    }
  }, [addProperty]);

  const handleDateSelect = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
    setCalendarVisible(false);
  };

  async function onSaveImage(image: Image[] | null) {
    if (image) {
      setLoading(true);
      const tempImages = [...images];
      let error = '';

      for (let i = 0; i < image.length; i++) {
        if (image[i].size > 5000000) {
          error = 'Document size cannot be more than 5MB';
        } else {
          tempImages.push({ ...image[i], default: i === 0 });
        }
      }
      setImages([...tempImages]);
      setLoading(false); // Stop the loader
    }
  }

  console.log('images', images);

  const removeImage = (index: number) => {
    setLoading(true);
    setImages(images.filter((_, i) => i !== index));
    setLoading(false);
  };

  const validateFields = () => {
    if (
      !selectedRole ||
      !lookingFor ||
      !propertyType ||
      !addPincode ||
      !propertyName ||
      !area ||
      !floor ||
      !facing ||
      !furnishingType ||
      !rent ||
      !deposit ||
      !tenant ||
      !facilities ||
      !totalFloor ||
      !images?.length ||
      !bedrooms ||
      !Bathrooms ||
      !startDate
    ) {
      errorMessage('Validate Error.....Please fill all the fields correctly');
      return false;
    }
    if (!selected) {
      errorMessage('Please accept our terms and conditions');
      return false;
    }
    if (Number(totalFloor) < Number(floor)) {
      errorMessage('Total floors should be greater than your floor');
      return false;
    }
  };

  const trimText = (text: any, maxLength: any) => {
    if (!text || text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };
  const trimmedLocation = trimText(location, 20);

  const fetchSuggestions = async query => {
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
      const { data } = responseData;
      setSuggestions(data);
      setModalVisible(true);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
      setModalVisible(false);
    }
  };

  const handleSelectSuggestion = (item: any) => {
    setSelectedLocalities([...selectedLocalities, item]);
    setModalVisible(false);
    setInput('');
  };

  const handleButtonPress = () => {
    setModalVisible(!modalVisible);
    setSelectedSuggestion('');
  };

  const handlePress = () => {
    Linking.openURL('https://www.axces.in/privacy_policy.html').catch(err =>
      console.error('Failed to open URL:', err)
    );
  };

  const submitPropertyForm = async () => {
    try {
      if (!latitude || !longitude) {
        errorMessage("Location coordinates are not set. Please try again.")
        return;
      }

      if (!userId) {
        console.error("User ID is undefined!");
        // Alert.alert("User ID is not set. Please try again.");
        errorMessage("User ID is not set. Please try again");
        return;
      }

      const bedroomsNumber = parseInt(bedrooms); // Correcting the bedrooms field
      const bathroomsNumber = parseInt(Bathrooms); // Correcting the bathrooms field
    
      const availableFrom = new Date("2024-09-30T00:00:00Z"); // Example ISO format
    
      const location = {
        latitude: Number(latitude), 
        longitude: Number(longitude) 
      };
    
      // Ensure localities is not empty
      if (!selectedLocalities || selectedLocalities.length === 0) {
        // alert("Please select at least one locality.");
        errorMessage("Please select at least one locality");
        return;
      }

      console.log("User ID:", userId);
      setLoading(true);
      console.log(`https://backend.axces.in/api/property/post/${userId}`);
      const formData = new FormData();
      formData.append("property_type", propertyType); // Assuming fixed value
      formData.append("_id", userId); // Assuming fixed value
      formData.append("title", propertyName);
      formData.append("description", aboutProp);
      formData.append("address", landMark);
      formData.append("pincode", addPincode); // Assuming fixed value, replace if needed
      formData.append("location", JSON.stringify(location));
      formData.append("building_name", propertyName); // Assuming fixed value, replace if needed
      formData.append("bedrooms", bedroomsNumber);
      formData.append("bathrooms", bathroomsNumber);
      formData.append("area_sqft", area);
      formData.append("property_age", "5 years"); // Assuming fixed value, replace if needed
      formData.append("facing", facing);
      formData.append("floor_number", floor);
      formData.append("total_floors", totalFloor);
      formData.append("furnish_type", furnishingType);
      formData.append("available_from", availableFrom.toISOString()); // Assuming fixed value, replace if needed
      formData.append("monthly_rent", rent);
      formData.append("security_deposit", deposit);
      formData.append("preferred_tenant", tenant);
      formData.append("localities", selectedLocalities.join(',')); // Assuming selectedLocalities is an array of strings
      formData.append("landmark", landMark);
      formData.append("facilities", facilities.map(facility => facility.trim()).join(','));
      formData.append("listing_type", "rent"); // Assuming fixed value, replace if needed

      // Append images
      if (images.length > 0) {
        images.forEach((image, index) => {
          formData.append("images", {
            uri: image.uri,
            name: `photo_${index}.jpg`,
            type: 'image/jpeg',
          });
        });
      }

      const requestOptions = {
        method: "POST",
        body: formData,
        redirect: "follow"
      };

      const response = await fetch(`https://backend.axces.in/api/property/post/${userId}`, requestOptions);
      const result = await response.json();

      console.log(result);

      // Handle the response accordingly
      if (response.ok) {
        console.log(response.status);
        successMessage("Property listed successfully!");
        navigation.navigate('Dashboard');
      } else {
        console.log(response.status);
        // Alert.alert("Failed to list property. Please try again.");
        errorMessage("Property listed successfully");
      }
    } catch (error) {
      console.error("Error posting property:", error);
      // Alert.alert("An error occurred. Please try again.");
      errorMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Example usage
  // submitPropertyForm("66bfc8e822403a58a715b02b", document.querySelector('input[type="file"]'));




  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={{ flex: 1, position: 'relative' }}>
        <StatusBar backgroundColor={'#181A53'} />
        <CenterHeader title="List Property" />
        <Loader loading={loading} />
        <ScrollView
          style={{ flex: 1, backgroundColor: 'white', marginBottom: 65 }}>
          <Tracker stage={2} />
          <View
            style={{
              width: '100%',
              backgroundColor: '#F2F8F6',
              height: 46,
              justifyContent: 'center',
            }}>
            <View style={{ marginLeft: 15, marginRight: 15 }}>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/512/149/149983.png',
                  }}
                  style={{ height: 26, width: 22, resizeMode: 'contain' }}
                />

                <Text
                  style={{
                    color: '#000000',
                    fontWeight: '500',
                    fontSize: 16,
                    width: 280,
                    textAlign: 'center',
                  }}>
                  {trimmedLocation}
                </Text>
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/512/1659/1659764.png',
                  }}
                  style={{ height: 26, width: 22, resizeMode: 'contain' }}
                  tintColor="#BDEA09"
                />
              </View>
            </View>
          </View>
          <PropertySelect
            title="Property Type"
            data={['Office', 'Shop', 'Plot', 'Others']}
            defaultValue="Please Select an Option"
            onChangeHandler={text => setProperty(text)}
          />
          <View style={{ marginTop: 12 }}>
            <PropertyInput
              placeholderText="Enter your building name"
              title="Building/ Property/ Society Name"
              value={propertyName}
              onChangeHandler={text => setPropertyName(text)}
            />
          </View>

          <PropertySelect
            title="Bedrooms"
            data={['1BHK', '2BHK', '3BHK', '4BHK', '5BHK']}
            onChangeHandler={text => setBedrooms(text)}
          />
          <PropertySelect
            title="Bathrooms"
            data={['1 Bathroom', '2 Bathrooms', '3 Bathrooms', '4 Bathrooms', '5 Bathrooms']}
            onChangeHandler={text => setBathrooms(text)}
          />
          <PropertyInput
            title="Built up area"
            sideTitle="sqft"
            placeholderText="Area of property"
            type="number-pad"
            value={area}
            onChangeHandler={text => setArea(text)}
          />
          <PropertyInput
            title="Facing"
            placeholderText="North, East, ..."
            value={facing}
            onChangeHandler={text => setFacing(text)}
          />
          <PropertyInput
            title="Your Floor"
            placeholderText="Enter your floor number"
            value={floor}
            type="number-pad"
            onChangeHandler={text => setFloor(text)}
          />

          <PropertyInput
            title="Total Number of Floor"
            type="number-pad"
            placeholderText="Enter your floor number"
            value={totalFloor}
            onChangeHandler={text => setTotalFloor(text)}
          />
          <SearchFilter
            filterName="Furnish Type"
            options={['Fully Furnished', 'Semi Furnished', 'Un-Furnished']}
            value={furnishingType}
            onSelectHandler={setFurnishingType}
          />
          <View style={{ marginHorizontal: 24, marginTop: 16 }}>
            <Text
              style={{
                color: '#0E0E0C',
                fontSize: 16,
                fontWeight: 'bold',
                marginBottom: 12,
              }}>
              Availability
            </Text>
            <TouchableOpacity
              onPress={() => setCalendarVisible(true)}
              style={{
                paddingVertical: 12,
                paddingHorizontal: 32,
                borderRadius: 50,
                backgroundColor: '#BDEA09',
                marginBottom: 16,
              }}>
              <Text style={{ color: '#181A53', fontSize: 16, fontWeight: '500' }}>
                {/* {startDate ? `Selected Date: ${startDate}` : 'Select Date'} */}
                Availability
              </Text>
            </TouchableOpacity>
            <View >
              <Text style={{ fontSize: 16, color: '#000000', fontWeight: '600', paddingLeft: 10 }}>{startDate}</Text>
            </View>
          </View>

          <PropertyInput
            subtitle="(including all extra charges)"
            title="Monthly Rent"
            type="number-pad"
            placeholderText="Amount"
            value={rent}
            onChangeHandler={text => setRent(text)}
          />

          <PropertyInput
            title="Security Deposit"
            type="number-pad"
            placeholderText="Amount"
            value={deposit}
            onChangeHandler={text => setDeposit(text)}
          />

          <SearchFilter
            filterName="Preferred Tenant"
            type="number-pad"
            options={['Any', 'Family', 'Bachelor']}
            value={tenant}
            onSelectHandler={setTenant}
          />
          <View style={{ flex: 1, alignItems: 'flex-start', marginHorizontal: 24, marginTop: 16 }}>
            <Text style={{ color: '#0E0E0C', fontSize: 16, fontWeight: 'bold', marginBottom: 12 }}>
              Add Localities
            </Text>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{
                paddingVertical: 12,
                paddingHorizontal: 32,
                borderRadius: 50,
                backgroundColor: '#BDEA09',
                marginBottom: 16,
              }}
            >
              <Text style={{ color: '#181A53', fontSize: 16, fontWeight: '500' }}>
                {input || 'Add locality'}
              </Text>
            </TouchableOpacity>

            <View>
              {modalVisible && (
                <View
                  style={{
                    marginTop: 10,
                    backgroundColor: '#f2f9f7',
                    borderRadius: 10,
                    padding: 10,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    width: 350,
                  }}
                >
                  <TextInput
                    placeholder="Search your dream home here"
                    placeholderTextColor="gray"
                    style={{
                      color: 'black',
                      width: '100%',
                      padding: 10,
                      backgroundColor: '#f2f9f7',
                      borderRadius: 8,
                    }}
                    value={input}
                    onChangeText={(text) => {
                      setInput(text);
                      fetchSuggestions(text);
                    }}
                  />
                  <FlatList
                    data={suggestions}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => handleSelectSuggestion(item)}
                        style={{
                          paddingVertical: 8,
                          borderBottomWidth: 1,
                          borderBottomColor: '#ccc',
                        }}
                      >
                        <Text style={{ color: '#000000', fontSize: 16, fontWeight: '500', }}>
                          {item.place_name}
                        </Text>
                      </TouchableOpacity>
                    )}
                    style={{ maxHeight: 200, marginTop: 10 }}
                  />
                </View>
              )}
            </View>

            <View>
              {selectedLocalities.map((locality, index) => (
                <View style={{
                  backgroundColor: '#f2f9f7', borderRadius: 20,
                  padding: 10,
                  marginTop: 5,
                  width: '100%'
                }}>
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: '#f2f9f7',
                      borderRadius: 20,
                      padding: 10,
                      marginTop: 5,
                      width: 350,
                      gap: 20
                    }}
                  >
                    <Text style={{ color: '#000', fontSize: 16, fontWeight: '500' }}>
                      {locality.place_name}
                    </Text>
                    <TouchableOpacity onPress={() => removeLocality(index)} style={{ marginLeft: 10 }}>
                      <Image
                        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1828/1828666.png' }}
                        style={{ height: 15, width: 15 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <PropertyInput
            title="Landmark"
            placeholderText="Enter your landmark"
            value={landMark}
            onChangeHandler={text => setLandMark(text)}
          />
          <PropertyInput
            title="About property"
            placeholderText="Enter about property"
            value={aboutProp}
            onChangeHandler={text => setAboutProp(text)}
          />

          <Facilities
            filterName="Property Facilities"
            options={[
              'Swimming pool',
              'Parking',
              'Lift',
              'Gym',
              'Play area',
              'Club house',
              'Security',
              'Balcony',
              'Pet Friendly',
              'Power Backup',
            ]}
            value={facilities}
            onSelectHandler={setFacilities}
            wrap={true}
          />

          <View
            style={{
              marginTop: 16,
              alignItems: 'flex-start',
              marginHorizontal: 24,
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{
                  color: '#0E0E0C',
                  fontSize: 16,
                  fontWeight: 'bold',
                  marginVertical: 12,
                  marginRight: 4,
                }}>
                Upload Images
              </Text>
              <Text
                style={{
                  color: '#0E0E0C80',
                  fontSize: 14,
                  fontWeight: 'bold',
                  marginVertical: 12,
                }}>
                (Maximum size 5MB)
              </Text>
            </View>
            <TouchableOpacity
              style={{
                paddingVertical: 12,
                paddingHorizontal: 32,
                borderRadius: 50,
                backgroundColor: '#F2F8F6',
                marginRight: 16,
                marginVertical: 8,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: 12
              }}
              onPress={() => setImagePickerModal(true)}>
              <Image
                style={{ marginRight: 8 }}
                source={{
                  uri: 'https://res.cloudinary.com/krishanucloud/image/upload/v1715767072/Vector_rfssto.png',
                }}
                resizeMode="contain"
                style={{
                  width: scale(10),
                  height: verticalScale(10),
                }}
              />
              <Text style={{ color: '#181A53', fontSize: 16, fontWeight: '500' }}>
                Attach images
              </Text>
            </TouchableOpacity>
            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
              {images.map((image: any, index: any) => (
                <View
                  key={index}
                  style={{ position: 'relative', marginRight: 10 }}>
                  <Image
                    source={{ uri: image.uri }}
                    style={{ width: 100, height: 100, borderRadius: 8 }}
                  />
                  <TouchableOpacity
                    onPress={() => removeImage(index)}
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      backgroundColor: 'red',
                      padding: 5,
                      width: 25,
                      alignItems: 'center',
                    }}>
                    <Text style={{ color: 'white' }}>X</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          <View
            style={{
              paddingBottom: 12,
              marginTop: 16,
              marginHorizontal: 24,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                style={{ marginRight: 8 }}
                source={{
                  uri: 'https://res.cloudinary.com/krishanucloud/image/upload/v1715767454/Wallet_qx36qn.png',
                }}
                resizeMode="contain"
                style={{
                  width: scale(16),
                  height: verticalScale(16),
                }}
              />
              <Text style={{ fontSize: 14, color: '#181A53', fontWeight: '500' }}>
                Charges
              </Text>
            </View>

            <Text style={{ color: '#181A53', fontSize: 16, fontWeight: 'bold' }}>
              50 Coins
            </Text>
          </View>

          <View style={{ width: '100%', height: '15vh' }} />
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            paddingHorizontal: 24,
            paddingVertical: 12,
            backgroundColor: 'white',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              marginBottom: 5,
            }}>
            <TouchableOpacity
              onPress={() => setSelected(prev => !prev)}
              style={{
                width: 16,
                height: 16,
              }}>
              <Image
                source={{
                  uri: selected
                    ? 'https://cdn-icons-png.flaticon.com/512/9426/9426997.png'
                    : 'https://cdn-icons-png.flaticon.com/512/481/481078.png',
                }}
                style={{ height: 20, width: 25, resizeMode: 'contain' }}
              />
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 16,
                color: '#181A53',
                fontWeight: '500',
                marginLeft: 8,
              }}>
              Agree with{' '}
              <TouchableOpacity
                onPress={handlePress}
                style={{ justifyContent: 'center', flex: 1, alignItems: 'center', }}>
                <Text style={{ color: '#0171FF' }}>TERMS & CONDITIONS</Text>
              </TouchableOpacity>
            </Text>

          </View>
          <TouchableOpacity
            onPress={() => bottomSheetRef.current?.present()}
            style={{
              width: '100%',
              padding: 12,
              backgroundColor: '#BDEA09',
              borderRadius: 50,
              marginTop: 8,
            }}
          >
            <Text
              style={{
                color: '#181A53',
                fontSize: 16,
                textAlign: 'center',
                fontWeight: '500',
              }}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
        <Modal
          visible={showModal}
          transparent={true}
          statusBarTranslucent={true}
          animationType="fade">
          <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
              }}>
              <TouchableWithoutFeedback>
                <View
                  style={{
                    borderRadius: 10,
                    padding: 16,
                    backgroundColor: 'white',
                    width: '80%',
                    position: 'relative',
                    paddingTop: 28,
                  }}>
                  <Text
                    style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>
                    Congratulations!!!
                  </Text>
                  <Text style={{ color: '#34AF48' }}>
                    Property has been listed successfully
                  </Text>
                  <View
                    style={{
                      paddingVertical: 8,
                      paddingHorizontal: 16,
                      marginTop: 8,
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderRadius: 50,
                      backgroundColor: '#F2F8F6',
                    }}>
                    <Image
                      source={{ uri: pinIcon }}
                      resizeMode="contain"
                      style={{ width: 8, height: 20, marginRight: 8 }}
                    />
                    <Text style={{ fontSize: 14, color: '#181A53' }}>
                      At- 122345, Indira nagar, New delhi
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setShowModal(false);
                      navigation.navigate('Dashboard');
                    }}
                    style={{
                      width: '100%',
                      padding: 8,
                      backgroundColor: '#BDEA09',
                      borderRadius: 50,
                      marginTop: 24,
                    }}>
                    <Text
                      style={{
                        color: '#181A53',
                        fontSize: 16,
                        textAlign: 'center',
                        fontWeight: '500',
                      }}>
                      Go home
                    </Text>
                  </TouchableOpacity>
                  <Image
                    source={{
                      uri: 'https://res.cloudinary.com/krishanucloud/image/upload/v1714417323/ZomatoSmile_ojmpkp.png',
                    }}
                    resizeMode="contain"
                    style={{
                      width: 48,
                      height: 48,
                      position: 'absolute',
                      top: -24,
                      left: 16,
                    }}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <Modal visible={calendarVisible} transparent={true}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
            <View
              style={{
                width: '90%',
                padding: 16,
                backgroundColor: 'white',
                borderRadius: 10,
                height: '70%',
              }}>
              <PropertyCalendar onDateSelect={handleDateSelect} />
              <TouchableOpacity
                onPress={() => setCalendarVisible(false)}
                style={{ marginTop: 16, alignItems: 'center' }}>
                <Text style={{ color: '#007BFF', fontSize: 16 }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <BottomSheetModal
          backdropComponent={props => (
            <BottomSheetBackdrop
              {...props}
              disappearsOnIndex={-1}
              appearsOnIndex={0}
              onPress={() => bottomSheetRef.current?.close()}
              opacity={0.2}
            />
          )}
          keyboardBehavior="interactive"
          ref={bottomSheetRef}
          snapPoints={['40%']}
          handleIndicatorStyle={{ height: 0 }}
          handleStyle={{
            backgroundColor: 'white',
            borderTopRightRadius: 24,
            borderTopLeftRadius: 24,
            height: 28,
          }}>
          <BottomSheetView style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
              }}
              className="px-7">
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  borderBottomWidth: 1,
                  borderBottomColor: 'rgba(0, 0, 0, 0.1)',
                  paddingBottom: 16,
                }}>
                <View style={{ marginRight: 16 }}>
                  <Image
                    source={{ uri: coinStack }}
                    resizeMode="contain"
                    style={{ width: 40, height: 40 }}
                  />
                </View>
                <View style={{ flex: 1, paddingRight: 24 }}>
                  <Text
                    style={{
                      color: '#0E0E0C',
                      fontSize: 18,
                      fontWeight: 'bold',
                    }}>
                    Do you want to list your property?
                  </Text>
                  <Text style={{ color: '#0E0E0C99', fontSize: 16 }}>
                    You will require 50 coins to list your property
                  </Text>
                </View>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: 'rgba(0, 0, 0, 0.1)',
                  paddingVertical: 16,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    backgroundColor: '#F2F8F6',
                    borderRadius: 50,
                  }}>
                  <Text style={{ color: '#181A53', fontSize: 18 }}>
                    Available coins:{balance}
                  </Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#BDEA09',
                      borderRadius: 50,
                      paddingHorizontal: 12,
                      paddingVertical: 4,
                    }}>
                    <Text style={{ color: '#181A53', fontSize: 16 }}>
                      + Add coins
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 16,
                }}>
                <TouchableOpacity
                  onPress={() => bottomSheetRef.current?.close()}
                  style={{
                    flex: 1,
                    backgroundColor: '#F2F8F6',
                    borderRadius: 50,
                    padding: 12,
                    marginRight: 20,
                  }}>
                  <Text
                    style={{
                      color: '#181A53',
                      fontSize: 16,
                      textAlign: 'center',
                      fontWeight: '500',
                    }}>
                    No take me back
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => { submitPropertyForm() }}
                  style={{
                    flex: 1,
                    backgroundColor: '#BDEA09',
                    borderRadius: 50,
                    padding: 12,
                  }}


                >
                  <Text
                    style={{
                      color: '#181A53',
                      fontSize: 16,
                      textAlign: 'center',
                      fontWeight: '500',
                    }}>
                    Yes, I agree
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </BottomSheetView>
        </BottomSheetModal>

        {/* NO COIN SHEET */}
        <BottomSheetModal
          backdropComponent={props => (
            <BottomSheetBackdrop
              {...props}
              disappearsOnIndex={-1}
              appearsOnIndex={0}
              onPress={() => nocoinbottomSheetRef.current?.close()}
              opacity={0.2}
            />
          )}
          keyboardBehavior="interactive"
          ref={nocoinbottomSheetRef}
          snapPoints={['40%']}
          handleIndicatorStyle={{ height: 0 }}
          handleStyle={{
            backgroundColor: 'white',
            borderTopRightRadius: 24,
            borderTopLeftRadius: 24,
            height: 28,
          }}>
          <BottomSheetView style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
              }}
              className="px-7">
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  backgroundColor: '#F2F8F6',
                  borderRadius: 10,
                }}>
                <Text style={{ color: '#181A53', fontSize: 18 }}>Your coins</Text>
                <Text style={{ color: '#181A53', fontSize: 18 }}>0</Text>
              </View>
              <Text
                style={{
                  color: '#0E0E0C',
                  fontSize: 24,
                  fontWeight: 'bold',
                  marginVertical: 12,
                }}>
                Recharge Now!!
              </Text>
              <Text
                style={{
                  color: '#0E0E0CCC',
                  fontSize: 16,
                  fontWeight: '500',
                  borderBottomWidth: 1,
                  borderBottomColor: 'rgba(0, 0, 0, 0.1)',
                  paddingBottom: 8,
                }}>
                Two simple steps
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 12,
                }}>
                <View style={{ marginRight: 16 }}>
                  <Image
                    source={{ uri: coinStack }}
                    resizeMode="contain"
                    style={{ width: 20, height: 20 }}
                  />
                </View>
                <Text style={{ color: '#0E0E0C99', fontSize: 16 }}>
                  Add AXCES coins to your wallet
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 12,
                }}>
                <View style={{ marginRight: 16 }}>
                  <Image
                    source={{ uri: coinStack }}
                    resizeMode="contain"
                    style={{ width: 20, height: 20 }}
                  />
                </View>
                <Text style={{ color: '#0E0E0C99', fontSize: 16 }}>
                  Seamlessly access to our services
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  nocoinbottomSheetRef.current?.close();
                  bottomSheetRef.current?.dismiss();
                  setShowModal(true);
                }}
                style={{
                  width: '100%',
                  padding: 12,
                  backgroundColor: '#BDEA09',
                  borderRadius: 50,
                  marginTop: 16,
                }}>
                <Text
                  style={{
                    color: '#181A53',
                    fontSize: 16,
                    textAlign: 'center',
                    fontWeight: '500',
                  }}>
                  Recharge Now
                </Text>
              </TouchableOpacity>
            </View>
          </BottomSheetView>
        </BottomSheetModal>
        {imagePickerModal && (
          <ImagePicker
            multiple={false}
            isOpen={imagePickerModal}
            onClose={() => {
              setImagePickerModal(false);
            }}
            onSaveImage={onSaveImage}
          />
        )}
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

export default ListPropertyDetailScreen;
