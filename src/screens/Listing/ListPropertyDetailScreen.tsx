import React, {useState, useRef, useEffect} from 'react';
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
  Animated,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import Geolocation from '@react-native-community/geolocation';
import {useDispatch} from 'react-redux';
import CenterHeader from '../../component/Header/CenterHeader';
import PropertyCalendar from '../../component/Calender/Calendar';
import Tracker from '../../component/ListProperty/Tracker';
import PropertyInput from './component/PropertyInput';
import PropertySelect from './component/PropertySelect';
import SearchFilter from '../Search/SearchFilter';
import ImagePicker from '../../component/ImagePicker/ImagePicker';
import Loader from '../../component/Loader/Loader';
import {NamedStyles, scale, verticalScale} from 'react-native-size-matters';
import {cloudMoney, coinStack, pinIcon} from '../../constants/imgURL';
import {
  getUserId,
  successMessage,
  errorMessage,
  getAccessToken,
} from '../../utils';
import {onPostProperty} from '../../redux/ducks/Properties/addProperty';
import {useAppSelector} from '../../constants';
import {RootStackParamList} from '../../routes/MainStack';
import Facilities from '../Search/Facilities';
import {FlatList} from 'react-native';
import {Linking} from 'react-native';
import axios from 'axios';
import {onGetBalance} from '../../redux/ducks/Coins/getBalance';
import {onGetLocation} from '../../redux/ducks/User/getLocation';
import {showMessage} from 'react-native-flash-message';
import {onRecharge} from '../../redux/ducks/Coins/recharge';
import RazorpayCheckout from 'react-native-razorpay';
import {onGetUserProfile} from '../../redux/ducks/User/viewProfile';

const ListPropertyDetailScreen = () => {
  const getBalance = useAppSelector(state => state.getBalance);
  console.log('getBalance', getBalance);

  const recharge = useAppSelector(state => state.recharge);
  const viewProfile = useAppSelector(
    state => state.viewProfile.data.platformCharges,
  );

  const userData = useAppSelector(state => state?.viewProfile?.data?.data);

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const nocoinbottomSheetRef = useRef<BottomSheetModal>(null);
  const [selected, setSelected] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [calendarVisible, setCalendarVisible] = useState<boolean>(false);
  const [endDate, setEndDate] = useState<string | null>(null);
  // const [slideAnim] = useState(new Animated.Value(Dimensions.get('window').height));
  const route: any = useRoute();

  const {selectedRole, lookingFor, propertyType, addPincode, item, isediting} =
    route?.params;
  const location = route.params?.location;
  console.log('lication+++++++++++=', isediting);

  const [balance, setBalance] = useState('');
  const [amount, setAmount] = useState('');
  const [demo, setdemo] = useState('');

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [propertyName, setPropertyName] = useState<string>(item?.building_name);
  const [area, setArea] = useState<string>(
    JSON.stringify(item?.area_sqft) || '',
  );
  const [floor, setFloor] = useState<string>(
    JSON.stringify(item?.floor_number) || '',
  );
  const [facing, setFacing] = useState<string>(item?.facing || '');
  const [furnishingType, setFurnishingType] = useState<string>(
    item?.furnish_type,
  );
  const [rent, setRent] = useState<string>(
    JSON.stringify(item?.monthly_rent) || '',
  );
  const [deposit, setDeposit] = useState<string>(
    JSON.stringify(item?.security_deposit) || '',
  );
  const dateString = item?.available_from;
  const date = new Date(dateString);
  const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(
    date.getMonth() + 1,
  ).padStart(2, '0')}-${date.getFullYear()}`;
  console.log(formattedDate); // Output: 15-07-2024

  const [startDate, setStartDate] = useState<string | null>(
    (item?.available_from && formattedDate) || null,
  );

  console.log('item?.facilities', item?.facilities);

  const [tenant, setTenant] = useState<string>(item?.preferred_tenant || '');
  const [landMark, setLandMark] = useState<string>(item?.landmark || '');
  const [aboutProp, setAboutProp] = useState<string>(item?.description);
  const [facilities, setFacilities] = useState<string>(item?.facilities || '');
  const [totalFloor, setTotalFloor] = useState<string>(
    JSON.stringify(item?.total_floors) || '',
  );
  const [imagePickerModal, setImagePickerModal] = useState<boolean>(false);
  const [images, setImages] = useState<any>(item?.images || []);
  const [userId, setUserId] = useState<string>('');
  const [latitude, setLatitude] = useState<number>(item?.location?.latitude);
  const [longitude, setLongitude] = useState<number>(item?.location?.longitude);
  const [bedrooms, setBedrooms] = useState<string>(item?.bedrooms || '');
  const [Bathrooms, setBathrooms] = useState<string>(item?.bathrooms || '');
  const [propertysubtype, setproportysubtype] = useState<string>(
    item?.property_subtype || '',
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [Property, setProperty] = useState<boolean>(false);
  const [input, setInput] = useState(item?.localities[0] || '');
  const [suggestions, setSuggestions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState('');
  const [selectedLocalities, setSelectedLocalities] = useState([]);
  const [localities, setlocalites] = useState('');

  const dropdownHeight = useRef(new Animated.Value(0)).current;
  const dropdownOpacity = useRef(new Animated.Value(0)).current;

  const addProperty = useAppSelector(state => state.addProperty);

  const dispatch = useDispatch();
  console.log(location);
  const removeLocality = (index: any) => {
    const newLocalities = selectedLocalities.filter((_, i) => i !== index);
    setSelectedLocalities(newLocalities);
  };

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

  useEffect(() => {
    const displaybalance = () => {
      if (getBalance.called) {
        const {data} = getBalance;
        console.log('====================================');
        console.log('dispatch(onGetBalance());', data);
        console.log('====================================');
        setdemo(getBalance);
        const coins = data.coins;
        setBalance(coins);
        setLoading(false);
      }
    };

    displaybalance();
  }, [getBalance, recharge, demo, balance, viewProfile]);

  useEffect(() => {
    dispatch(onGetBalance());
    dispatch(onGetUserProfile());
  }, []);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await getUserId();
        const sanitizedId = id.replace(/'/g, ''); // Replace single quotes if needed
        console.log('Fetched and sanitized User ID:', sanitizedId); // Log the sanitized ID
        setUserId(sanitizedId);
      } catch (error) {
        console.error('Error fetching user ID:', error);
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
            },
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
    // requestLocationPermission();
    // getId();
  }, []);

  useEffect(() => {
    if (addProperty.called) {
      setLoading(false);
      const {data, message, code} = addProperty;
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
          // Assign a name to the image based on the current number of images
          const imageName = `${tempImages.length + i + 1}`;
          tempImages.push({
            ...image[i],
            name: imageName, // Assign name as 1, 2, 3, etc.
            default: i === 0,
          });
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
    if (!text || text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  };
  const trimmedLocation = trimText(location, 20);

  //  const getLatLongFromAddress = async () => {
  //    try {
  //      const response = await axios.get(
  //        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
  //          location,
  //        )}`,
  //      );

  //      if (response.data.length > 0) {
  //        const location = response.data[0];
  //        const {lat, lon} = location;
  //       console.log('location', location);

  //        // Convert lat and lon to numbers and set in the state
  //        setLatitude(lat);
  //        setLongitude(lon);

  //        // Dispatch the location to onGetLocation function
  //      } else {
  //        console.log('Address not found');
  //      }
  //    } catch (error) {
  //      console.log('Error fetching coordinates:', error);
  //    }
  //  };

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
    console.log('item', item);

    // setl(latitude);
    setLatitude(latitude);
    setLongitude(longitude);
    setlocalites(item?.place_name);
    // getLatLongFromAddress();
    // dispatch(onGetLocation(parseFloat(latitude), parseFloat(longitude)));
    setModalVisible(false);
  };

  // const handleSelectSuggestion = (item: any) => {
  //   setSelectedLocalities([...selectedLocalities, item]);
  //   setModalVisible(false);
  //   setInput('');
  // };

  const handleButtonPress = () => {
    setModalVisible(!modalVisible);
    setSelectedSuggestion('');
  };

  const handlePress = () => {
    Linking.openURL('https://www.axces.in/Terms_of_use.html').catch(err =>
      console.error('Failed to open URL:', err),
    );
  };

  // useEffect(()=>{
  //    getLatLongFromAddress();
  // },[latitude,longitude])

  const [errors, setErrors] = useState({
    propertyType: false,
    propertyName: false,
    area: false,
    bedroomsNumber: false,
    bathroomsNumber: false,
    facing: false,
    floor: false,
    totalFloor: false,
    furnishingType: false,
    availableFrom: false,
    rent: false,
    deposit: false,
    landMark: false,
    aboutProp: false,
    images: false,
  });

  const validateForm = () => {
    const normalizedPropertyType = propertyType?.toLowerCase();

    const newErrors = {
      propertyType: !propertyType,
      propertyName: !propertyName,
      bedroomsNumber: normalizedPropertyType !== 'commercial' && !bedrooms,
      bathroomsNumber: normalizedPropertyType !== 'commercial' && !Bathrooms,
      area: !area,
      facing: !facing,
      floor: !floor,
      totalFloor: !totalFloor,
      furnishingType:
        normalizedPropertyType !== 'commercial' && !furnishingType,
      availableFrom: !startDate,
      rent: !rent,
      deposit: !deposit,
      landMark: !landMark,
      aboutProp: !aboutProp,
      images: images.length === 0,
    };

    console.log('newErrors', newErrors);

    setErrors(newErrors);

    return !Object.values(newErrors).includes(true); // Returns true if no errors
  };

  // const submitPropertyForm = async () => {
  //   console.log('latitude', latitude);
  //   console.log('longitude', longitude);
  //   console.log('propertyType', propertyType === 'Commercial');

  //   try {
  //     if (!latitude || !longitude) {
  //       errorMessage("Location coordinates are not set. Please try again.")
  //       return;
  //     }

  //     if (!userId) {
  //       console.error("User ID is undefined!");
  //       // Alert.alert("User ID is not set. Please try again.");
  //       errorMessage("User ID is not set. Please try again");
  //       return;
  //     }

  //     const bedroomsNumber = parseInt(bedrooms); // Correcting the bedrooms field
  //     const bathroomsNumber = parseInt(Bathrooms); // Correcting the bathrooms field

  //     const availableFrom = new Date(startDate); // Example ISO format
  //     console.log('availableFrom', availableFrom);

  //     const location = {
  //       latitude: Number(latitude),
  //       longitude: Number(longitude),
  //     };

  //     console.log('locationapi', location);

  //     // Ensure localities is not empty
  //     if (!input || input.length === 0) {
  //       // alert("Please select at least one locality.");
  //       errorMessage("Please select at least one locality");
  //       return;
  //     }

  //       const checkfacility =
  //         propertyType !== 'Commercial'
  //           ? Array.isArray(facilities)
  //             ? facilities.map(facility => facility.trim()).join(',')
  //             : ''
  //           : null;

  //     console.log("User ID:", userId);
  //     setLoading(true);
  //     console.log(`https://backend.axces.in/api/property/post/${userId}`);
  //     const formData = new FormData();
  //     formData.append("property_type", propertyType); // Assuming fixed value
  //     formData.append("_id", userId); // Assuming fixed value
  //     formData.append("title", propertyName);
  //     formData.append("description", aboutProp);
  //     formData.append("address", landMark);
  //     formData.append("pincode", addPincode); // Assuming fixed value, replace if needed
  //     formData.append("location", JSON.stringify(location));
  //     formData.append("building_name", propertyName); // Assuming fixed value, replace if needed
  //     formData.append("bedrooms", bedroomsNumber);
  //     formData.append("bathrooms", bathroomsNumber);
  //     formData.append("area_sqft", area);
  //     formData.append("property_age", "5 years"); // Assuming fixed value, replace if needed
  //     formData.append("facing", facing);
  //     formData.append("floor_number", floor);
  //     formData.append("total_floors", totalFloor);
  //     formData.append("furnish_type", furnishingType);
  //     formData.append("available_from", availableFrom.toISOString()); // Assuming fixed value, replace if needed
  //     formData.append("monthly_rent", rent);
  //     formData.append("security_deposit", deposit);
  //     formData.append("preferred_tenant", tenant);
  //     formData.append('localities', localities); // Assuming selectedLocalities is an array of strings
  //     formData.append("landmark", landMark);
  //     formData.append("facilities", checkfacility);
  //     formData.append("listing_type", "rent"); // Assuming fixed value, replace if needed

  //     console.log('formData', formData);

  //     // Append images
  //     if (images.length > 0) {
  //       images.forEach((image, index) => {
  //         formData.append("images", {
  //           uri: image.uri,
  //           name: `photo_${index}.jpg`,
  //           type: 'image/jpeg',
  //         });
  //       });
  //     }

  //     const requestOptions = {
  //       method: "POST",
  //       body: formData,
  //       redirect: "follow"
  //     };

  //     const response = await fetch(`https://backend.axces.in/api/property/post/${userId}`, requestOptions);
  //     const result = await response.json();

  //     console.log(result);

  //     // Handle the response accordingly
  //     if (response.ok) {
  //       console.log(response.status);
  //       successMessage("Property listed successfully!");
  //       navigation.navigate('Dashboard');
  //     } else {
  //       console.log(response.status);
  //       // Alert.alert("Failed to list property. Please try again.");
  //       errorMessage(result.message);
  //     }
  //   } catch (error) {
  //     console.error("Error posting property:", error);
  //     // Alert.alert("An error occurred. Please try again.");
  //     errorMessage("An error occurred. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const submitPropertyForm = async () => {
    const location = {
      latitude: Number(item?.location?.latitude),
      longitude: Number(item?.location?.longitude),
    };

    const newdata = {
      location: location,
      propertyType: propertyType,
      propertyName: propertyName,
      bedroomsNumber: bedrooms,
      bathroomsNumber: Bathrooms,
      area: area,
      facing: facing,
      floor: floor,
      totalFloor: totalFloor,
      furnishingType: furnishingType,
      availableFrom: startDate,
      rent: rent,
      deposit: deposit,
      landMark: landMark,
      aboutProp: aboutProp,
      images: images.length === 0,
    };

    console.log('newdata', newdata);

    console.log('propertyType', propertyType === 'Commercial');

    try {
      // Validate latitude and longitude
      if (!latitude || !longitude) {
        errorMessage('Location coordinates are not set. Please try again.');
        return;
      }

      // Validate userId
      if (!userId) {
        console.error('User ID is undefined!');
        errorMessage('User ID is not set. Please try again.');
        return;
      }

      // Validate form fields
      if (!validateForm()) {
        errorMessage('Please fill in all required fields.');
        return;
      }

      // Parse bedrooms and bathrooms
      const bedroomsNumber = parseInt(bedrooms);
      const bathroomsNumber = parseInt(Bathrooms);

      // Create availableFrom date object
      const availableFrom = new Date(startDate);
      console.log('availableFrom', availableFrom);

      // Prepare location object
      const location = {
        latitude: Number(latitude),
        longitude: Number(longitude),
      };

      console.log('locationapi', location);

      // Validate localities
      if (!input || input.length === 0) {
        errorMessage('Please select at least one locality.');
        return;
      }

      // Prepare facilities if not Commercial
      const checkfacility =
        propertyType?.toLowerCase() !== 'commercial'
          ? Array.isArray(facilities)
            ? [...new Set(facilities.map(facility => facility.trim()))].join(
                ',',
              )
            : ''
          : null;

      console.log('User ID:', userId);
      setLoading(true);

      console.log('location+++++++++++++++++++++++++++', location);

      const checklistingtype =
        lookingFor == 'Sell'
          ? 'buy'
          : lookingFor || 'Rent'
          ? 'rent'
          : lookingFor;
      console.log('checklistingtype', checklistingtype);

      // Check if editing an existing property
      if (isediting) {
        console.log('locationeidt', location);

        const editlocation = {
          latitude: Number(item?.location?.latitude),
          longitude: Number(item?.location?.longitude),
        };

        const availableFromupdate = new Date(startDate);
        console.log('availableFromupdate', availableFromupdate);

        const updatedPropertyDetails = {
          owner_id: userId,
          property_posted_by: selectedRole.toLowerCase(),
          property_subtype: propertysubtype.toLowerCase(),
          property_type: propertyType.toLowerCase(),
          title: propertyName,
          bedrooms: bedroomsNumber || 0,
          bathrooms: bathroomsNumber || 0,
          area_sqft: area,
          facing: facing,
          floor_number: floor,
          total_floors: totalFloor,
          furnish_type: furnishingType,
          available_from: availableFromupdate.toISOString(),
          monthly_rent: rent,
          security_deposit: deposit,
          preferred_tenant:
            propertyType?.toLowerCase() === 'commercial'
              ? null
              : tenant.toLowerCase(),
          localities: localities[0],
          landmark: landMark,
          description: aboutProp,
          facilities: checkfacility,
          building_name: propertyName,
        };

        console.log('updatedPropertyDetails', updatedPropertyDetails);
        const token = await getAccessToken();

        const editResponse = await fetch(
          'https://backend.axces.in/api/property/edit',
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              propertyId: item?._id, // Provide the propertyId here
              updatedPropertyDetails: updatedPropertyDetails,
            }),
          },
        );

        const editResult = await editResponse.json();

        if (editResponse.ok) {
          successMessage('Property updated successfully!');
          sucesspostdetailsmodal();
          navigation.navigate('Home');
        } else {
          errorMessage(editResult.message || 'Error updating property');
        }
      } else {
        // Prepare FormData for new property submission
        const formData = new FormData();

        // Check if the property type is not commercial
        if (propertyType?.toLowerCase() !== 'commercial') {
          formData.append('bedrooms', bedroomsNumber || 0); // Use default if undefined
          formData.append('bathrooms', bathroomsNumber || 0); // Use default if undefined
          formData.append('furnish_type', furnishingType || ''); // Use default if undefined
          formData.append('preferred_tenant', tenant.toLowerCase() || ''); // Use default if undefined
          formData.append('facilities', checkfacility || ''); // Use default if undefined
        }

        // Append fields common to all property types
        formData.append('property_posted_by', selectedRole.toLowerCase());
        formData.append('property_type', propertyType.toLowerCase());
        formData.append('property_subtype', propertysubtype.toLowerCase());
        formData.append('owner_id', userId);
        formData.append('title', propertyName);
        formData.append('description', aboutProp);
        formData.append('address', landMark);
        formData.append('pincode', addPincode);
        formData.append('location', JSON.stringify(location));
        formData.append('building_name', propertyName);

        formData.append('area_sqft', area || 0); // Use default if undefined
        formData.append('property_age', '5 years');
        formData.append('facing', facing || ''); // Use default if undefined
        formData.append('floor_number', floor || 0); // Use default if undefined
        formData.append('total_floors', totalFloor || 0); // Use default if undefined
        formData.append(
          'available_from',
          availableFrom
            ? availableFrom.toISOString()
            : new Date().toISOString(),
        ); // Default to now if undefined
        formData.append('monthly_rent', rent || 0); // Use default if undefined
        formData.append('security_deposit', deposit || 0); // Use default if undefined
        formData.append('localities', input || ''); // Use default if undefined
        formData.append('landmark', landMark || ''); // Use default if undefined
        formData.append('listing_type', checklistingtype || ''); // Use default if undefined

        console.log('formData', formData);

        // Append images if available
        if (images.length > 0) {
          images.forEach((image, index) => {
            formData.append('images', {
              uri: image.uri,
              name: `photo_${index}.jpg`,
              type: 'image/jpeg',
            });
          });
        }
        console.log('formDataimages', formData._parts);

        // Iterate through the formData and access the image key
        for (let [key, value] of formData._parts) {
          console.log(`Key: ${key}, Value:`, value);

          // if (key === 'images') {
          //   // Assuming images is an array of image objects
          //   value.forEach((image, index) => {
          //     console.log(`Image ${index + 1}:`);
          //     console.log('Name:', image.name);
          //     console.log('Type:', image.type);
          //     console.log('URI:', image.uri);
          //   });
          // }
        }

        const token = await getAccessToken();

        // Submit the form
        const response = await fetch(
          `https://backend.axces.in/api/property/post/${userId}`,
          {
            method: 'POST',
            body: formData,
            headers: {
              Authorization: `Bearer ${token}`, // Add the token here
              'Content-Type': 'multipart/form-data', // You need this for form data submission
            },
          },
        );

        const result = await response.json();
        console.log('====================================');
        console.log('result++++++++', result);
        console.log('====================================');

        // Handle the response
        if (response.ok) {
          successMessage('Property listed successfully!');
          sucesspostdetailsmodal();
          navigation.navigate('Home');
        } else {
          failedpostdetailsmodal();
          errorMessage(result.message);
        }
      }
    } catch (error) {
      console.error('Error posting property:', error);
      errorMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // const submitPropertyForm = async () => {
  //   console.log('latitude', latitude);
  //   console.log('longitude', longitude);
  //   console.log('propertyType', propertyType === 'Commercial');

  //   try {
  //     // Validate latitude and longitude
  //     if (!latitude || !longitude) {
  //       errorMessage('Location coordinates are not set. Please try again.');
  //       return;
  //     }

  //     // Validate userId
  //     if (!userId) {
  //       console.error('User ID is undefined!');
  //       errorMessage('User ID is not set. Please try again.');
  //       return;
  //     }

  //     // Validate form fields
  //     if (!validateForm()) {
  //       errorMessage('Please fill in all required fields.');
  //       return;
  //     }

  //     // Parse bedrooms and bathrooms
  //     const bedroomsNumber = parseInt(bedrooms);
  //     const bathroomsNumber = parseInt(Bathrooms);

  //     // Create availableFrom date object
  //     const availableFrom = new Date(startDate);
  //     console.log('availableFrom', availableFrom);

  //     // Prepare location object
  //     const location = {
  //       latitude: Number(latitude),
  //       longitude: Number(longitude),
  //     };

  //     console.log('locationapi', location);

  //     // Validate localities
  //     if (!input || input.length === 0) {
  //       errorMessage('Please select at least one locality.');
  //       return;
  //     }

  //     // Prepare facilities if not Commercial
  //     const checkfacility =
  //       propertyType !== 'Commercial'
  //         ? Array.isArray(facilities)
  //           ? facilities.map(facility => facility.trim()).join(',')
  //           : ''
  //         : null;

  //     console.log('User ID:', userId);
  //     setLoading(true);

  //     // Prepare FormData
  //     const formData = new FormData();
  //     formData.append('property_type', propertyType);
  //     formData.append('_id', userId);
  //     formData.append('title', propertyName);
  //     formData.append('description', aboutProp);
  //     formData.append('address', landMark);
  //     formData.append('pincode', addPincode);
  //     formData.append('location', JSON.stringify(location));
  //     formData.append('building_name', propertyName);
  //     formData.append('bedrooms', bedroomsNumber);
  //     formData.append('bathrooms', bathroomsNumber);
  //     formData.append('area_sqft', area);
  //     formData.append('property_age', '5 years');
  //     formData.append('facing', facing);
  //     formData.append('floor_number', floor);
  //     formData.append('total_floors', totalFloor);
  //     formData.append('furnish_type', furnishingType);
  //     formData.append('available_from', availableFrom.toISOString());
  //     formData.append('monthly_rent', rent);
  //     formData.append('security_deposit', deposit);
  //     formData.append('preferred_tenant', tenant);
  //     formData.append('localities', localities);
  //     formData.append('landmark', landMark);
  //     formData.append('facilities', checkfacility);
  //     formData.append('listing_type', 'rent');

  //     // Append images if available
  //     if (images.length > 0) {
  //       images.forEach((image, index) => {
  //         formData.append('images', {
  //           uri: image.uri,
  //           name: `photo_${index}.jpg`,
  //           type: 'image/jpeg',
  //         });
  //       });
  //     }

  //     // Submit the form
  //     const response = await fetch(
  //       `https://backend.axces.in/api/property/post/${userId}`,
  //       {
  //         method: 'POST',
  //         body: formData,
  //       },
  //     );

  //     const result = await response.json();

  //     console.log(result);

  //     // Handle the response
  //     if (response.ok) {
  //       console.log(response.status);
  //       successMessage('Property listed successfully!');
  //       navigation.navigate('Dashboard');
  //     } else {
  //       console.log(response.status);
  //       errorMessage(result.message);
  //     }
  //   } catch (error) {
  //     console.error('Error posting property:', error);
  //     errorMessage('An error occurred. Please try again.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Example usage
  // submitPropertyForm("66bfc8e822403a58a715b02b", document.querySelector('input[type="file"]'));

  const [expanded, setExpanded] = useState(selectedLocalities.map(() => false));

  // Function to toggle text expansion
  const toggleExpansion = index => {
    let newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
  };

  const [postsucessshowModal, setpostsucessShowModal] =
    useState<boolean>(false);

  const sucesspostdetailsmodal = () => {
    setpostsucessShowModal(true);
  };

  const contectdetailsmodal = () => {
    return (
      <Modal
        visible={postsucessshowModal}
        transparent={true}
        statusBarTranslucent={true}
        animationType="fade">
        <TouchableWithoutFeedback onPress={() => setpostsucessShowModal(false)}>
          <View
            style={{
              ...styles.modalOverlay,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableWithoutFeedback>
              <View className="rounded-lg p-4 bg-white w-[90%]">
                <View
                  style={{
                    top: -15,
                    position: 'absolute',
                    left: 14,
                    // right: 0,
                    zIndex: 999,
                  }}>
                  <Image
                    source={require('../../../assets/cemoji.png')}
                    style={{height: 28, width: 28, resizeMode: 'contain'}}
                  />
                </View>
                <Text className="text-base font-bold text-black">
                  Congratulations!!!
                </Text>
                <Text className="text-[#34AF48]">
                  {isediting
                    ? 'Property has been update successfully'
                    : 'Property has been listed successfully'}
                </Text>
                <TouchableOpacity
                  // onPress={handleCallPress}
                  className="py-3 px-4 flex flex-row items-center rounded-full bg-[#F2F8F6]">
                  <View className="flex flex-row items-center flex-1">
                    <Image
                      source={{
                        uri: 'https://cdn-icons-png.flaticon.com/512/149/149983.png',
                      }}
                      style={{height: 26, width: 22, resizeMode: 'contain'}}
                    />
                    <Text className="text-[#181A53] font-medium text-lg">
                      {localities}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setpostsucessShowModal(false)}
                  className="w-full p-3 bg-[#BDEA09] rounded-full mt-2">
                  <Text className="text-[#181A53] text-base text-center font-medium">
                    Go Home
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  const [postfailedModal, setpostfailedShowModal] = useState<boolean>(false);

  const failedpostdetailsmodal = () => {
    setpostfailedShowModal(true);
  };

  const postfailedsmodal = () => {
    return (
      <Modal
        visible={postfailedModal}
        transparent={true}
        statusBarTranslucent={true}
        animationType="fade">
        <TouchableWithoutFeedback onPress={() => setpostfailedShowModal(false)}>
          <View
            style={{
              ...styles.modalOverlay,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableWithoutFeedback>
              <View className="rounded-lg p-4 bg-white w-[90%]">
                {/* <View
                    style={{
                      top: -15,
                      position: 'absolute',
                      left: 14,
                      // right: 0,
                      zIndex: 999,
                    }}>
                    <Image
                      source={require('../../../assets/cemoji.png')}
                      style={{height: 28, width: 28, resizeMode: 'contain'}}
                    />
                  </View> */}
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text className="text-[#FF0000] text-base font-bold">
                    Oops!
                  </Text>
                  <Text className="text-base font-bold text-black">
                    {' '}
                    Something went wrong
                  </Text>
                </View>
                <Text className="text-base text-[#0E0E0C99] pt-2 pb-2">
                  Unable to list your property any deductions made will be
                  refunded
                </Text>
                {/* <TouchableOpacity
                    // onPress={handleCallPress}
                    className="py-3 px-4 flex flex-row items-center rounded-full bg-[#F2F8F6]">
                    <View className="flex flex-row items-center flex-1">
                      <Image
                        source={{
                          uri: 'https://cdn-icons-png.flaticon.com/512/149/149983.png',
                        }}
                        style={{height: 26, width: 22, resizeMode: 'contain'}}
                      />
                      <Text className="text-[#181A53] font-medium text-lg">
                        {localities}
                      </Text>
                    </View>
                  </TouchableOpacity> */}
                <TouchableOpacity
                  onPress={() => setpostfailedShowModal(false)}
                  className="w-full p-3 bg-[#BDEA09] rounded-full mt-2">
                  <Text className="text-[#181A53] text-base text-center font-medium">
                    Try again
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setpostfailedShowModal(false)}
                  className="w-full p-3 mt-2 rounded-full"
                  style={{borderWidth: 1, borderColor: '#BDEA09'}}>
                  <Text className="text-[#BDEA09] text-base text-center font-medium">
                    Back
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  const [Invicedata, SetInvoicedata] = useState('');

  const checkPaymentStatus = async orderId => {
    console.log('orderId', orderId);

    const token = await getAccessToken();

    const raw = JSON.stringify({
      orderId: orderId,
    });

    try {
      const response = await fetch(
        'https://backend.axces.in/api/payment/status',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', // Keep this if the server expects JSON
          },
          body: raw, // Send raw data in string format
        },
      );

      const data = await response.json();
      console.log('data++++++++++', data);
      dispatch(onRecharge(amount));
      if (response.ok) {
        SetInvoicedata(data?.invoice_download_url);
        // Alert.alert('Payment Status', `Status: ${data.message}`);
        // }
      } else {
        Alert.alert('Error', `Error: ${data.message}`);
      }
    } catch (error) {
      Alert.alert('Network Error', 'Failed to connect to the server');
      console.error(error);
    }
  };

  const managepayment = orderdata => {
    const ordernumber = orderdata?.data?.order?.id;
    console.log('ordernumber', ordernumber);

    const amountInPaise = parseInt(amount) * 100;
    const options = {
      description: 'Purchase Product',
      image: 'https://your-logo-url.com/logo.png',
      currency: 'INR',
      key: 'rzp_live_1oXCdVHL2cgMKY', // Replace with your Razorpay key ID
      amount: amountInPaise.toString(), // Amount in paise (5000 paise = 50 INR)
      name: 'AXCES',
      order_id: ordernumber,
      theme: {color: '#BDEA09'},
      prefill: {
        name: userData?.name,
        email: userData?.email,
        contact: userData?.number,
      },
    };
    console.log('options', options);

    RazorpayCheckout.open(options)
      .then(data => {
        // Payment successful
        // Alert.alert('Payment Success', `Payment ID: ${data}`);
        checkPaymentStatus(ordernumber); //
        setcoinmodal(true);
      })
      .catch(error => {
        // Payment failed
        // Alert.alert(
        //   'Payment Failure',
        //   `Error: ${error.code} | ${error.description}`,
        // );
        errorMessage('Payment failed. Please try again.');
      });
  };

  const managerecharge = () => {
    if (amount.length > 0) {
      //  setpostsucessShowModal(true); // Show success modal
      dispatch(onRecharge(amount))
        .then(response => {
          // Handle success
          console.log('Recharge successful:', response.data);
          //  const orderdata = response?.data?.data?.order?.id;
          managepayment(response.data); // Continue with payment management
        })
        .catch(error => {
          // Handle error
          console.error('Recharge failed:', error);
          errorMessage('Recharge failed. Please try again.');
        })
        .finally(() => {
          // Close bottom sheet regardless of success or failure
          nocoinbottomSheetRef.current?.close();
        });
    } else {
      errorMessage('Please enter amount'); // Prompt user to enter amount
    }
  };

  const [rechargemodal, setrechargemodal] = useState(false);

  const handlerechargeModalOpen = () => {
    setAmount('');
    bottomSheetRef.current?.close();
    // setModalVisiblecontact(false);
    setrechargemodal(true);
  };

  const addrechargemodal = () => {
    return (
      <Modal
        transparent={true}
        visible={rechargemodal}
        animationType="slide"
        onRequestClose={() => setrechargemodal(false)}>
        <TouchableWithoutFeedback onPress={() => setrechargemodal(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View style={styles.bottomSheetContainer}>
          <View style={styles.handleBar} />

          {/* Bottom Sheet Content */}
          <View
            style={{
              flex: 1,
            }}
            className="px-7">
            <View className=" flex bg-[#F2F8F6] rounded-lg flex-row justify-between items-center px-3 py-2">
              <Text className="text-[#181A53] text-lg">Your coins</Text>
              <Text className="text-[#181A53] text-lg">
                {getBalance?.data?.coins}
              </Text>
            </View>
            <Text className="text-[#0E0E0C] text-2xl font-bold my-3">
              Recharge Now!!
            </Text>
            <Text className="text-[#0E0E0C] text-xl font-bold my-3">
              Amount
            </Text>
            <TextInput
              placeholder="Enter Amount"
              maxLength={5}
              keyboardType="numeric"
              value={amount}
              returnKeyType="done"
              placeholderTextColor={'black'}
              style={{
                width: '100%',
                height: 50,
                borderRadius: 5,
                backgroundColor: '#F2F8F6',
                paddingHorizontal: 10,
                fontSize: 14,
                color: '#181A53',
              }}
              onChangeText={text => setAmount(text)}
            />
            <View style={{height: 30}} />
            <Text className=" text-[#0E0E0CCC] text-base font-medium border-b border-b-black/10">
              Two simple steps
            </Text>
            <View className="flex flex-row items-center justify-start w-full mt-3 ">
              <View className="mr-4">
                <Image
                  source={{uri: coinStack}}
                  resizeMode="contain"
                  className="w-5 h-5"
                />
              </View>
              <Text className=" text-[#0E0E0C99] text-base">
                Add AXCES coins to your wallet
              </Text>
            </View>
            <View className="flex flex-row items-center justify-start w-full mt-3 ">
              <View className="mr-4">
                <Image
                  source={{uri: coinStack}}
                  resizeMode="contain"
                  className="w-5 h-5"
                />
              </View>
              <Text className=" text-[#0E0E0C99] text-base">
                Seamlessly access to our services
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setrechargemodal(false);
                setTimeout(() => {
                  managerecharge();
                }, 1000);
              }}
              className="w-full p-3 bg-[#BDEA09] rounded-full mt-4">
              <Text className="text-[#181A53] text-base text-center font-medium">
                Recharge Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };
  const [coinmodal, setcoinmodal] = useState(false);

  const openInvoice = async () => {
    try {
      const supported = await Linking.canOpenURL(Invicedata);
      if (supported) {
        await Linking.openURL(Invicedata);
        dispatch(onGetBalance());
        setcoinmodal(false);
      } else {
        Alert.alert('Error', 'Unable to open this URL.');
      }
    } catch (error) {
      console.error('Error opening URL:', error);
      Alert.alert(
        'Error',
        'An error occurred while trying to open the invoice.',
      );
    }
  };

  const rechargesucessmodal = () => {
    return (
      <Modal
        visible={coinmodal}
        transparent={true}
        statusBarTranslucent={true}
        animationType="fade">
        <TouchableWithoutFeedback onPress={() => setcoinmodal(false)}>
          <View
            style={{
              ...styles.modalOverlay,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableWithoutFeedback>
              <View className="rounded-lg p-4 bg-white w-[90%]">
                <View
                  style={{
                    top: -15,
                    position: 'absolute',
                    left: 14,
                    // right: 0,
                    zIndex: 999,
                  }}>
                  <Image
                    source={require('../../../assets/coin.png')}
                    style={{height: 34, width: 34, resizeMode: 'contain'}}
                  />
                </View>
                <Text className="text-base font-bold text-black">
                  Congratulations!!!
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '90%',
                    paddingVertical: 5,
                  }}>
                  <Text className="text-base font-bold text-black">
                    {amount} +coins
                  </Text>
                  <Text className="text-[#0E0E0C99] text-base ml-2">
                    have been added to your wallet successfully
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => setcoinmodal(false)}
                  className="w-full p-3 bg-[#BDEA09] rounded-full mt-2">
                  <Text className="text-[#181A53] text-base text-center font-medium">
                    Go Home
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => openInvoice()}
                  className="w-full p-3 bg-[#BDEA09] rounded-full mt-2">
                  <Text className="text-[#181A53] text-base text-center font-medium">
                    Download Invoice
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  return (
    <BottomSheetModalProvider>
      <SafeAreaView
        style={{flex: 1, position: 'relative', backgroundColor: '#181A53'}}>
        <StatusBar backgroundColor={'#181A53'} />
        <CenterHeader title="List Property" />
        <Loader loading={loading} />
        <ScrollView
          style={{flex: 1, backgroundColor: 'white', marginBottom: 80}}>
          <Tracker stage={2} />
          <View
            style={{
              width: '100%',
              backgroundColor: '#F2F8F6',
              height: 46,
              justifyContent: 'center',
            }}>
            <View style={{marginLeft: 15, marginRight: 15}}>
              <View
                // onPress={() => seteditlocation(true)}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/512/149/149983.png',
                  }}
                  style={{height: 26, width: 22, resizeMode: 'contain'}}
                />

                <Text
                  style={{
                    color: '#000000',
                    fontWeight: '500',
                    fontSize: 16,
                    width: 280,
                    textAlign: 'center',
                  }}>
                  {addPincode}
                  {/* {trimmedLocation} */}
                </Text>
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/512/1659/1659764.png',
                  }}
                  style={{height: 26, width: 22, resizeMode: 'contain'}}
                  tintColor="#BDEA09"
                />
              </View>
            </View>
          </View>
          <PropertySelect
            title="Property Sub Type"
            data={
              propertyType?.toLowerCase() === 'commercial'
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
            defaultValue={propertysubtype}
            // defaultValue="Please Select an Option"
            onChangeHandler={text => setproportysubtype(text)}
          />
          {/* <PropertySelect
            title="Property Type"
            data={['Office', 'Shop', 'Plot', 'Others']}
            defaultValue="Please Select an Option"
            onChangeHandler={text => setProperty(text)}
          /> */}
          <View style={{marginTop: 12}}>
            <PropertyInput
              placeholderText="Enter your building name"
              title="Building/ Property/ Society Name *"
              value={propertyName}
              onChangeHandler={text => setPropertyName(text)}
              error={errors.propertyName ? 'This field is required' : null}
            />
          </View>

          {propertyType?.toLowerCase() !== 'commercial' && (
            <PropertySelect
              title="Bedrooms"
              data={['1BHK', '2BHK', '3BHK', '4BHK', '5BHK']}
              onChangeHandler={text => setBedrooms(text)}
              defaultValue={bedrooms}
            />
          )}
          {propertyType?.toLowerCase() !== 'commercial' && (
            <PropertySelect
              title="Bathrooms"
              data={[
                '1 Bathroom',
                '2 Bathrooms',
                '3 Bathrooms',
                '4 Bathrooms',
                '5 Bathrooms',
              ]}
              defaultValue={Bathrooms}
              onChangeHandler={text => setBathrooms(text)}
            />
          )}
          <PropertyInput
            title="Built up area *"
            sideTitle="sqft"
            placeholderText="Area of property"
            type="number-pad"
            value={area}
            onChangeHandler={text => setArea(text)}
          />
          <PropertyInput
            title="Facing *"
            placeholderText="North, East, ..."
            value={facing}
            onChangeHandler={text => setFacing(text)}
          />

          <PropertyInput
            title="Total Number of Floor *"
            type="number-pad"
            placeholderText="Enter the total number of floors"
            value={totalFloor}
            onChangeHandler={text => {
              setTotalFloor(text);

              // Convert the input to an integer
              const totalFloors = parseInt(text, 10);
              const enteredFloor = parseInt(floor, 10);

              // Only validate when more than one character is entered
              if (text.length > 0 && !isNaN(totalFloors)) {
                if (!isNaN(enteredFloor) && enteredFloor > totalFloors) {
                  showMessage({
                    message:
                      'Floor number cannot be greater than the total number of floors!',
                    type: 'danger',
                    statusBarHeight: 50,
                    animated: true,
                    duration: 2000,
                    icon: 'danger',
                    position: 'top',
                    autoHide: true,
                  });
                  setFloor(''); // Optionally reset the floor value
                }
              }
            }}
          />
          <PropertyInput
            title="Your Floor *"
            placeholderText="Enter your floor number"
            value={floor}
            type="number-pad"
            onChangeHandler={text => {
              setFloor(text);

              // Convert the input to an integer
              const enteredFloor = parseInt(text, 10);
              const totalFloors = parseInt(totalFloor, 10);

              // Only validate when more than one character is entered
              if (
                text.length > 0 &&
                !isNaN(enteredFloor) &&
                !isNaN(totalFloors)
              ) {
                if (enteredFloor > totalFloors) {
                  showMessage({
                    message:
                      'Floor number cannot be greater than the total number of floors!',
                    type: 'danger',
                    statusBarHeight: 50,
                    animated: true,
                    duration: 2000,
                    icon: 'danger',
                    position: 'top',
                    autoHide: true,
                  });
                  setFloor(''); // Optionally reset the floor value
                }
              }
            }}
          />

          {propertyType?.toLowerCase() !== 'commercial' && (
            <SearchFilter
              filterName="Furnish Type *"
              options={['Fully Furnished', 'Semi Furnished', 'Un-Furnished']}
              value={furnishingType}
              onSelectHandler={setFurnishingType}
            />
          )}
          <View style={{marginHorizontal: 24, marginTop: 16, height: 120}}>
            <Text
              style={{
                color: '#0E0E0C',
                fontSize: 16,
                fontWeight: 'bold',
                marginBottom: 12,
              }}>
              Availability *
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
              <Text style={{color: '#181A53', fontSize: 16, fontWeight: '500'}}>
                {/* {startDate ? `Selected Date: ${startDate}` : 'Select Date'} */}
                Availability
              </Text>
            </TouchableOpacity>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  color: '#000000',
                  fontWeight: '600',
                  paddingLeft: 10,
                }}>
                {startDate}
              </Text>
            </View>
          </View>

          <PropertyInput
            subtitle="(including all extra charges)"
            title="Monthly Rent *"
            type="number-pad"
            placeholderText="Amount"
            value={rent}
            onChangeHandler={text => setRent(text)}
          />

          <PropertyInput
            title="Security Deposit *"
            type="number-pad"
            placeholderText="Amount"
            value={deposit}
            onChangeHandler={text => setDeposit(text)}
          />

          {propertyType?.toLowerCase() !== 'commercial' && (
            <SearchFilter
              filterName="Preferred Tenant *"
              type="number-pad"
              options={
                ['Any', 'Family', 'Bachelor']
                // .map(option =>
                //   option.toUpperCase(),
                // )
              } // Convert options to lowercase
              value={
                tenant == 'any'
                  ? 'Any'
                  : tenant == 'family'
                  ? 'Family'
                  : tenant == 'bachelor'
                  ? 'Bachelor'
                  : tenant || ''
              } // Convert selected value to lowercase for comparison
              onSelectHandler={selectedTenant => setTenant(selectedTenant)} // You can still store the original casing
            />
          )}
          <View
            style={{
              // flex: 1,
              alignItems: 'flex-start',
              marginHorizontal: 24,
              marginTop: 16,
            }}>
            <Text
              style={{
                color: '#0E0E0C',
                fontSize: 16,
                fontWeight: 'bold',
                marginBottom: 12,
              }}>
              Add Localities *
            </Text>
            {/* <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{
                paddingVertical: 12,
                paddingHorizontal: 32,
                borderRadius: 50,
                backgroundColor: '#BDEA09',
                marginBottom: 16,
              }}>
              <Text style={{color: '#181A53', fontSize: 16, fontWeight: '500'}}>
                {input || 'Add locality'}
              </Text>
            </TouchableOpacity> */}
          </View>
          <View className="px-6 ">
            {/* {modalVisible && ( */}
            <View
              style={{
                marginTop: 10,
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.1,
                shadowRadius: 8,
              }}>
              <TextInput
                placeholder="Search your locality"
                placeholderTextColor="#181A53"
                className="text-[#181A53] text-base font-medium"
                style={{
                  color: 'black',
                  padding: 8,
                  backgroundColor: '#f2f9f7',
                  borderRadius: 50,
                }}
                multiline={false}
                value={input}
                onChangeText={text => fetchSuggestions(text)}
              />
            </View>
            {/* )} */}
            <View>
              {suggestions.length > 0 && (
                <Animated.View
                  style={{
                    // position: 'absolute',
                    // top: 85,
                    // left: 16,
                    // right: 16,
                    backgroundColor: '#f3f9f6',
                    borderRadius: 10,
                    zIndex: 1000,
                    height: dropdownHeight,
                    opacity: dropdownOpacity,
                    overflow: 'hidden',
                    borderBottomLeftRadius: 5,
                    borderBottomRightRadius: 5,
                    marginTop: 10,
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
            </View>
          </View>

          {/* <View className="px-6 ">
            {selectedLocalities.map((locality, index) => {
              const isExpanded = expanded[index];
              const maxLength = 20;

              return (
                <View
                  key={index}
                  style={{
                    backgroundColor: '#f2f9f7',
                    borderRadius: 50,

                    padding: 2,
                    marginTop: 5,

                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: '#f2f9f7',
                      borderRadius: 50,
                      padding: 14,
                      marginTop: 5,
                      gap: 20,
                    }}>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: 16,
                        fontWeight: '500',
                        flex: 1,
                      }}>
                      {isExpanded
                        ? locality.place_name
                        : locality.place_name.length > maxLength
                        ? locality.place_name.substring(0, maxLength) + '...'
                        : locality.place_name}
                    </Text>
                    {locality.place_name.length > maxLength && (
                      <TouchableOpacity
                        onPress={() => toggleExpansion(index)}
                        style={{marginLeft: 10}}>
                        <Text style={{color: 'blue'}}>
                          {isExpanded ? 'Show less' : 'Show more'}
                        </Text>
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity
                      onPress={() => removeLocality(index)}
                      style={{marginLeft: 10}}>
                      <Image
                        source={{
                          uri: 'https://cdn-icons-png.flaticon.com/512/1828/1828666.png',
                        }}
                        style={{height: 15, width: 15}}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View> */}

          <PropertyInput
            title="Landmark *"
            placeholderText="Enter your landmark"
            value={landMark}
            onChangeHandler={text => setLandMark(text)}
          />
          <PropertyInput
            title="About property *"
            placeholderText="Enter about property"
            value={aboutProp}
            onChangeHandler={text => setAboutProp(text)}
          />
          {console.log('facilities', facilities)}
          {propertyType?.toLowerCase() !== 'commercial' && (
            <Facilities
              filterName="Property Facilities *"
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
          )}

          <View
            style={{
              marginTop: 16,
              alignItems: 'flex-start',
              marginHorizontal: 24,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  color: '#0E0E0C',
                  fontSize: 16,
                  fontWeight: 'bold',
                  marginVertical: 12,
                  marginRight: 4,
                }}>
                Upload Images *
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
                gap: 12,
              }}
              onPress={() => setImagePickerModal(true)}>
              <Image
                style={{marginRight: 8}}
                source={{
                  uri: 'https://res.cloudinary.com/krishanucloud/image/upload/v1715767072/Vector_rfssto.png',
                }}
                resizeMode="contain"
                style={{
                  width: scale(10),
                  height: verticalScale(10),
                }}
              />
              <Text style={{color: '#181A53', fontSize: 16, fontWeight: '500'}}>
                Attach images
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
                padding: 10,
              }}>
              {images.map(
                (image: any, index: any) => (
                  console.log('image', image.name),
                  (
                    <View
                      key={index}
                      style={{
                        position: 'relative',
                        marginRight: 10,
                        marginBottom: 10,
                        shadowColor: '#000',
                        shadowOffset: {width: 0, height: 2},
                        shadowOpacity: 0.2,
                        shadowRadius: 5,
                        elevation: 3,
                      }}>
                      <Image
                        source={{uri: image.uri ? image.uri : image}}
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: 12,
                        }}
                      />
                      <TouchableOpacity
                        onPress={() => removeImage(index)}
                        style={{
                          position: 'absolute',
                          top: -10,
                          right: -10,
                          backgroundColor: 'red',
                          padding: 5,
                          width: 30,
                          height: 30,
                          borderRadius: 15,
                          justifyContent: 'center',
                          alignItems: 'center',
                          shadowColor: '#000',
                          shadowOffset: {width: 0, height: 2},
                          shadowOpacity: 0.3,
                          shadowRadius: 5,
                          elevation: 4,
                        }}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>
                          X
                        </Text>
                      </TouchableOpacity>
                      <View style={{width: '100%'}}>
                        <Text style={{color: 'black', fontWeight: 'bold'}}>
                          {image.name}
                        </Text>
                      </View>
                    </View>
                  )
                ),
              )}
            </View>
          </View>
          <View
            style={{
              paddingBottom: 34,
              // marginTop: 16,
              marginHorizontal: 24,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={{
                  uri: 'https://res.cloudinary.com/krishanucloud/image/upload/v1715767454/Wallet_qx36qn.png',
                }}
                resizeMode="contain"
                style={{
                  width: scale(16),
                  height: verticalScale(16),
                  marginRight: 8,
                }}
              />
              <Text style={{fontSize: 14, color: '#181A53', fontWeight: '500'}}>
                Charges
              </Text>
            </View>

            <Text style={{color: '#181A53', fontSize: 16, fontWeight: 'bold'}}>
              {viewProfile?.propertyPostCost} Coins
            </Text>
          </View>
          <View
            style={{
              // borderWidth: 1,
              // width: '95%',
              marginHorizontal: 24,
              // height: 25,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center', // Ensures vertical alignment
              }}>
              <View
                style={{
                  width: '8%',
                  // borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center', // Center checkbox vertically
                }}>
                <TouchableOpacity
                  onPress={() => setSelected(prev => !prev)}
                  style={{
                    width: 25,
                    height: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{
                      uri: selected
                        ? 'https://cdn-icons-png.flaticon.com/512/9426/9426997.png'
                        : 'https://cdn-icons-png.flaticon.com/512/481/481078.png',
                    }}
                    style={{height: 20, width: 20, resizeMode: 'contain'}}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  // borderWidth: 1,
                  borderColor: 'red',
                  width: '88%',
                  flexDirection: 'row',
                  alignItems: 'center', // Aligns text and button vertically
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#181A53',
                    fontWeight: '500',
                    marginRight: 4, // Adds spacing between text and button
                  }}>
                  Agree with
                </Text>
                <TouchableOpacity onPress={handlePress}>
                  <Text
                    style={{
                      color: '#0171FF',
                      fontSize: 16,
                      fontWeight: '500', // Match text weight with "Agree with"
                    }}>
                    TERMS & CONDITIONS
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* <View style={{width: '100%', height: '45vh'}} /> */}
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            bottom: 40,
            left: 0,
            right: 0,
            paddingHorizontal: 24,
            paddingVertical: 12,
            backgroundColor: 'white',
          }}>
          <TouchableOpacity
            onPress={() => {
              // sucesspostdetailsmodal();
              // failedpostdetailsmodal()
              dispatch(onGetBalance());
              bottomSheetRef.current?.present();
            }}
            style={{
              width: '100%',
              padding: 12,
              backgroundColor: '#BDEA09',
              borderRadius: 50,
              marginTop: 8,
            }}>
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
                    style={{
                      color: 'black',
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>
                    Congratulations!!!
                  </Text>
                  <Text style={{color: '#34AF48'}}>
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
                      source={{uri: pinIcon}}
                      resizeMode="contain"
                      style={{width: 8, height: 20, marginRight: 8}}
                    />
                    <Text style={{fontSize: 14, color: '#181A53'}}>
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
                style={{marginTop: 16, alignItems: 'center'}}>
                <Text style={{color: '#007BFF', fontSize: 16}}>Close</Text>
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
          handleIndicatorStyle={{height: 0}}
          handleStyle={{
            backgroundColor: 'white',
            borderTopRightRadius: 24,
            borderTopLeftRadius: 24,
            height: 28,
          }}>
          <BottomSheetView style={{flex: 1}}>
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
                <View style={{marginRight: 16}}>
                  <Image
                    source={{uri: coinStack}}
                    resizeMode="contain"
                    style={{width: 40, height: 40}}
                  />
                </View>
                <View style={{flex: 1, paddingRight: 24}}>
                  <Text
                    style={{
                      color: '#0E0E0C',
                      fontSize: 18,
                      fontWeight: 'bold',
                    }}>
                    Do you want to list your property?
                  </Text>
                  <Text style={{color: '#0E0E0C99', fontSize: 16}}>
                    You will require {viewProfile?.propertyPostCost} coins to
                    list your property
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
                    padding: 10,
                    // paddingVertical: 8,
                    // paddingHorizontal: 16,
                    backgroundColor: '#F2F8F6',
                    borderRadius: 50,
                  }}>
                  <Text style={{color: '#181A53', fontSize: 18}}>
                    Available coins:{getBalance?.data?.coins}
                  </Text>
                  {console.log(
                    'getBalance?.data?.coins',
                    getBalance?.data?.coins,
                  )}
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#BDEA09',
                      borderRadius: 50,
                      paddingHorizontal: 12,
                      paddingVertical: 4,
                    }}
                    onPress={() => handlerechargeModalOpen()}>
                    <Text style={{color: '#181A53', fontSize: 16}}>
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
                  onPress={() => {
                    submitPropertyForm();
                  }}
                  style={{
                    flex: 1,
                    backgroundColor: '#BDEA09',
                    borderRadius: 50,
                    padding: 12,
                  }}>
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
        {/* <BottomSheetModal
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
          handleIndicatorStyle={{height: 0}}
          handleStyle={{
            backgroundColor: 'white',
            borderTopRightRadius: 24,
            borderTopLeftRadius: 24,
            height: 28,
          }}>
          <BottomSheetView style={{flex: 1}}>
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
                <Text style={{color: '#181A53', fontSize: 18}}>Your coins</Text>
                <Text style={{color: '#181A53', fontSize: 18}}>0</Text>
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
                <View style={{marginRight: 16}}>
                  <Image
                    source={{uri: coinStack}}
                    resizeMode="contain"
                    style={{width: 20, height: 20}}
                  />
                </View>
                <Text style={{color: '#0E0E0C99', fontSize: 16}}>
                  Add AXCES coins to your wallet
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 12,
                }}>
                <View style={{marginRight: 16}}>
                  <Image
                    source={{uri: coinStack}}
                    resizeMode="contain"
                    style={{width: 20, height: 20}}
                  />
                </View>
                <Text style={{color: '#0E0E0C99', fontSize: 16}}>
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
        </BottomSheetModal> */}
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
        {postsucessshowModal && contectdetailsmodal()}
        {postfailedModal && postfailedsmodal()}
        {rechargemodal && addrechargemodal()}
        {coinmodal && rechargesucessmodal()}
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

export default ListPropertyDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  openButton: {
    backgroundColor: '#181A53',
    padding: 10,
    borderRadius: 5,
  },
  openButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent background
  },
  bottomSheetContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },
  handleBar: {
    width: 60,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 10,
  },
  sheetContent: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  coinImage: {
    width: 40,
    height: 40,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  sheetTitle: {
    color: '#0E0E0C',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sheetSubtitle: {
    color: '#0E0E0C99',
    fontSize: 14,
  },
  coinInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F2F8F6',
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  coinText: {
    color: '#181A53',
    fontSize: 16,
  },
  coinAmount: {
    fontWeight: 'bold',
  },
  addCoinButton: {
    backgroundColor: '#BDEA09',
    borderRadius: 50,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  addCoinText: {
    color: '#181A53',
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F2F8F6',
    borderRadius: 50,
    padding: 12,
    marginRight: 10,
  },
  cancelButtonText: {
    color: '#181A53',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#BDEA09',
    borderRadius: 50,
    padding: 12,
  },
  confirmButtonText: {
    color: '#181A53',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loaderText: {
    marginTop: 10,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
