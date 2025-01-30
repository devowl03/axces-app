import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Modal,
  Linking,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TextInput,
  Platform,
} from 'react-native';
import CardSwiper from './CardSwiper';
import {
  deleteIc,
  demoUser,
  editPen,
  ratingstar,
  rightArrowWhite,
  setwishlist,
  wishlist,
  phoneIc,
  coinStack,
  greyRightArrow,
} from '../../constants/imgURL';
import {StackNavigationProp} from '@react-navigation/stack';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../routes/MainStack';
import {useDispatch} from 'react-redux';
import {addToWishList} from '../../redux/ducks/WishList/addToList';
import {useCallback, useEffect, useState} from 'react';
import {useAppSelector} from '../../constants';
import {errorMessage, getAccessToken, successMessage} from '../../utils';
import {onGetProperty} from '../../redux/ducks/Properties/getSelectedProperty';
import {onGetOwnerDetails} from '../../redux/ducks/User/contactOwner';
import {onGetBalance} from '../../redux/ducks/Coins/getBalance';
import {onRecharge} from '../../redux/ducks/Coins/recharge';
import {viewWishList} from '../../redux/ducks/WishList/viewList';
import RazorpayCheckout from 'react-native-razorpay';
import {onGetUserProfile} from '../../redux/ducks/User/viewProfile';
import {
  initConnection,
  endConnection,
  getProducts,
  requestPurchase,
} from 'react-native-iap';
import axios from 'axios';

interface Props {
  editFlag?: boolean;
  item?: any;
  isWishlist?: boolean;
}

const PropertyCard: React.FC<Props> = ({
  editFlag,
  item,
  iapProducts,
  isWishlist = false,
}) => {
  console.log('itemwishlist', item);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const addToList = useAppSelector(state => state.addToList);
  const contactOwner = useAppSelector(state => state.contactOwner);
  console.log('contactOwner', contactOwner);

  const getBalance = useAppSelector(state => state.getBalance);

  // const [isWishlisted, setIsWishlisted] = useState(item?.isInWishlist);
  const [checkshowModal, setcheckShowModal] = useState<boolean>(false);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [amount, setAmount] = useState('');

  const [isWishlisted, setIsWishlisted] = useState(item?.isInWishlist);
  const wishlistData = useAppSelector(state => state.viewList.data);

  console.log('isWishlisted', isWishlisted);

  // Fetch the wishlist when the component mounts or when `id` changes
  useFocusEffect(
    useCallback(() => {
      if (item?._id) {
        dispatch(viewWishList(item._id));
      }
    }, [item, dispatch]),
  );

  // Update `isWishlisted` whenever `wishlistData` changes
  useEffect(() => {
    if (wishlistData) {
      // Assuming wishlistData contains an array of items, check if the current id is in it
      const isInWishlist = wishlistData.some(items => items._id === item?._id);
      setIsWishlisted(isInWishlist);
    }
  }, [wishlistData, item]); // Depend on `wishlistData` and `id`

  console.log('wishlistData:', wishlistData);
  console.log('id:', item?.isInWishlist);

  // const {called, data, status, message} = addToList;
  // console.log('called', status);

  const handleContactOwnerPress = () => {
    setloading(true);
    handleModalClose();
    if (item?._id) {
      dispatch(onGetOwnerDetails(item._id));
      setTimeout(() => {
        checkdata();
        setloading(false);
      }, 3000);
    }
  };

  const handleAgree = () => {
    console.log('getBalance', getBalance);

    if (getBalance.data.coins < viewProfile?.propertyContactCost) {
      Alert.alert('please recharge');
    } else {
      setLoaderVisible(true);
      setTimeout(() => {
        setLoaderVisible(false); // Hide loader after 3 seconds
        checkdata();
        setModalVisiblecontact(false);
        // setShowModal(true);
      }, 3000);
    }
  };

  const checkdata = () => {
    console.log('checkdata', checkshowModal);
    setShowModal(true);
    dispatch(onGetOwnerDetails(item._id));

    //  dispatch(onGetOwnerDetails(item._id));

    //  if (getBalance.data.coins !== 0) {
    //    setShowModal(true);
    //     dispatch(onGetOwnerDetails(item._id));
    //  } else {
    //    setShowModal(false);
    //  }
  };

  const viewProfile = useAppSelector(
    state => state.viewProfile.data.platformCharges,
  );
  const userData = useAppSelector(state => state?.viewProfile?.data?.data);

  useEffect(() => {
    dispatch(onGetBalance());
  }, []);

  useEffect(() => {
    if (addToList.called) {
      const {message, status} = addToList;
      if (status === 'fail') {
        errorMessage(message);
      } else {
        successMessage(message);
        // Update the local state only for the current property
        // setIsWishlisted(!isWishlisted);
      }
    }
    // if (contactOwner.code == 200) {
    // const {message, status} = contactOwner;
    // if (contactOwner.code == 200) {
    //   successMessage(contactOwner.message);
    //   setcheckShowModal(true);
    // } else if (contactOwner.code == 402) {
    //   setShowModal(false);
    //   setcheckShowModal(false);
    //   errorMessage(contactOwner.message);
    // }
    // setShowModal(false);
    // }
  }, [addToList, isWishlisted]);

  const handlePropertyPress = () => {
    if (!editFlag) {
      navigation.push('PropertyScreen', {data: item});
      dispatch(onGetProperty(item?._id));
    } else {
      navigation.navigate('ListPropertyScreen', {
        item: item,
        isediting: true,
      });
    }
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    const actionData = isWishlisted ? -1 : 1;
    // Dispatch the action with the current property ID and actionData
    dispatch(addToWishList(item?._id, actionData));
    // Update the local state for this property
  };

  const handleCallPress = () => {
    const phoneNumber = contactOwner?.data?.owner_details?.contact_phone;
    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`);
    }
  };

  const [modalVisiblecontact, setModalVisiblecontact] = useState(false);

  handleopencontactddetails = () => {
    dispatch(onGetUserProfile());
    dispatch(onGetBalance());
    setModalVisiblecontact(true);
  };

  const contactusermodal = () => {
    return (
      <Modal
        transparent={true}
        visible={modalVisiblecontact}
        animationType="slide"
        onRequestClose={() => setModalVisiblecontact(false)}>
        <TouchableWithoutFeedback onPress={() => setModalVisiblecontact(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View style={styles.bottomSheetContainer}>
          <View style={styles.handleBar} />

          {/* Bottom Sheet Content */}
          <View
            style={{
              flex: 1,
              // backgroundColor: 'red',
            }}
            className="px-7">
            <View className="flex flex-row items-start w-full pb-4 border-b border-b-black/10">
              <View className="mr-4">
                <Image
                  source={{uri: coinStack}}
                  resizeMode="contain"
                  className="w-10 h-10"
                />
              </View>
              <View className="flex-1 pr-6">
                <Text className="text-[#0E0E0C] text-lg font-bold">
                  Do you want to contact the owner?
                </Text>
                <Text className="text-[#0E0E0C99] text-base">
                  You will require {viewProfile?.propertyContactCost} coins to
                  view contact details .
                </Text>
              </View>
            </View>
            <View className="py-4 border-b border-b-black/10">
              <View className=" flex bg-[#F2F8F6] rounded-full flex-row justify-between items-center px-3 py-2">
                <View style={{width: '60%'}}>
                  <Text className="text-[#181A53] text-lg">
                    Available coins:{' '}
                    <Text className="font-bold">{getBalance?.data?.coins}</Text>
                  </Text>
                </View>
                <TouchableOpacity
                  className=" bg-[#BDEA09] rounded-full px-3 py-1"
                  onPress={() => handlerechargeModalOpen()}>
                  <Text className="text-[#181A53] text-base">+ Add coins</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className="flex flex-row items-center py-4 ">
              <TouchableOpacity
                onPress={() => setModalVisiblecontact(false)}
                // onPress={() => bottomSheetRef.current?.close()}
                className="flex-1 bg-[#F2F8F6] rounded-full p-3 mr-5">
                <Text className="text-[#181A53] text-base text-center font-medium">
                  No take me back
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleAgree()}
                className="flex-1 bg-[#BDEA09] rounded-full p-3 ">
                <Text className="text-[#181A53] text-base text-center font-medium">
                  Yes, I agree
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const [rechargemodal, setrechargemodal] = useState(false);

  const handlerechargeModalOpen = () => {
    setAmount('');
    setModalVisiblecontact(false);
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
            {Platform.OS === 'ios' ? (
              <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 10}}>
                {products.map((product, index) => {
                  const fixedAmount = parseInt(
                    product.productId.replace('com.axces.coins.', ''),
                  );
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => setAmount(fixedAmount)}
                      style={{
                        padding: 10,
                        borderRadius: 5,
                        backgroundColor:
                          amount === fixedAmount ? '#BDEA09' : '#F2F8F6',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#181A53',
                        }}>
                        ₹{fixedAmount}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : (
              <TextInput
                placeholder="Enter Amount"
                maxLength={5}
                keyboardType="numeric"
                returnKeyType="done"
                value={amount}
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
            )}
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

  const [showModal, setShowModal] = useState<boolean>(false);

  const contectdetailsmodal = () => {
    return (
      <Modal
        visible={showModal}
        transparent={true}
        statusBarTranslucent={true}
        animationType="fade">
        <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
          <View
            style={{
              ...styles.modalOverlay,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableWithoutFeedback>
              <View className="rounded-lg p-4 bg-white w-[90%]">
                <Text className="text-base font-bold text-black">
                  Congratulations!!!
                </Text>
                <Text className="text-[#34AF48]">Contact the owner now</Text>
                <View className="p-3 my-3 border rounded-lg border-black/10">
                  <View className="flex flex-row">
                    <Image
                      source={{uri: demoUser}}
                      resizeMode="contain"
                      className="w-10 h-10 rounded-full"
                    />
                    <View className="ml-3">
                      <Text className="text-[#7D7F88] text-sm font-medium">
                        Property Owner
                      </Text>
                      <Text className="text-[#1A1E25] text-base font-bold">
                        {contactOwner?.data?.owner_details?.owner_name}
                      </Text>
                    </View>
                  </View>
                  <Text className="text-[#0E0E0C] text-sm my-2">
                    Tap to call
                  </Text>
                  <TouchableOpacity
                    onPress={handleCallPress}
                    className="py-3 px-4 flex flex-row items-center rounded-full bg-[#F2F8F6]">
                    <View className="flex flex-row items-center flex-1">
                      <Image
                        source={{uri: phoneIc}}
                        resizeMode="contain"
                        className="w-4 h-4 mr-2"
                      />
                      <Text className="text-[#181A53] font-medium text-lg">
                        {contactOwner?.data?.owner_details?.contact_phone}
                      </Text>
                    </View>
                    <Image
                      source={{uri: greyRightArrow}}
                      resizeMode="contain"
                      className="w-2 h-5 mr-2"
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => setShowModal(false)}
                  className="w-full p-2 bg-[#BDEA09] rounded-full mt-2">
                  <Text className="text-[#181A53] text-base text-center font-medium">
                    Okay
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  const [postsucessshowModal, setpostsucessShowModal] =
    useState<boolean>(false);

  const sucesspostdetailsmodal = () => {
    setpostsucessShowModal(true);
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

      if (response.ok) {
        SetInvoicedata(data?.invoice_url);
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

  const products = iapProducts;
  const isIAPReady = iapProducts?.length > 0;

  const productIds = {
    '50_coins': 'com.axces.coins.50',
    '100_coins': 'com.axces.coins.100',
    '200_coins': 'com.axces.coins.200',
    '500_coins': 'com.axces.coins.500',
    '1000_coins': 'com.axces.coins.1000',
  };

  const checkINAppPurchase = async purchaseItem => {
    const token = await getAccessToken();

    const data = {
      ...purchaseItem,
    };

    try {
      const response = await axios.post(
        'https://backend.axces.in/api/validate-purchase',
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.status === 200) {
        SetInvoicedata(response.data?.invoice_url);
      } else {
        Alert.alert('Error', `Error: ${response.data.message}`);
      }
    } catch (error) {
      Alert.alert('Network Error', 'Failed to connect to the server');
    }
  };

  const handleIOSPurchase = async () => {
    try {
      const productId = productIds[`${amount}_coins`];
      if (!productId) {
        Alert.alert('Error', 'Invalid amount selected');
        return;
      }

      const purchase = await requestPurchase({sku: productId});

      if (!purchase) {
        throw new Error('Purchase result is null or undefined');
      }

      // Finish the transaction
      // await finishTransaction(purchase);

      await checkINAppPurchase(purchase);
      setpostsucessShowModal(true);
    } catch (error) {
      Alert.alert('Purchase Failed', 'Failed to complete the purchase');
    }
  };

  const managepayment = orderdata => {
    const ordernumber = orderdata?.data?.order?.id;

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

    RazorpayCheckout.open(options)
      .then(data => {
        // Payment successful
        // Alert.alert('Payment Success', `Payment ID: ${data}`);
        checkPaymentStatus(ordernumber); //
        setpostsucessShowModal(true);
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
    if (amount > 0 && amount !== '') {
      if (Platform.OS === 'android') {
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
          });
      } else {
        if (!isIAPReady) {
          Alert.alert('Error', 'In-app purchases are not ready');
          return;
        }
        handleIOSPurchase();
      }
    } else {
      errorMessage('Please enter amount'); // Prompt user to enter amount
    }
  };
  //  const managerecharge = () => {
  //    if (amount.length > 0) {
  //      setrechargemodal(false);
  //      dispatch(onRecharge(JSON.parse(amount)));
  //      sucesspostdetailsmodal();
  //    } else {
  //      errorMessage('please enter amount');
  //    }
  //   //  setrechargemodal(false);
  //   //  dispatch(onRecharge(amount));
  //   //  sucesspostdetailsmodal();

  //    // setLoaderVisible(true);
  //  };

  const openInvoice = async () => {
    try {
      const supported = await Linking.canOpenURL(Invicedata);
      if (supported) {
        await Linking.openURL(Invicedata);
        dispatch(onGetBalance());
        setpostsucessShowModal(false);
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
                  onPress={() => setpostsucessShowModal(false)}
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

  const deleteProperty = async () => {
    const server = 'https://backend.axces.in'; // Replace with actual server URL
    const propertyId = item?._id;

    const token = await getAccessToken();

    try {
      const response = await fetch(`${server}/api/property/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({propertyId}),
      });

      const data = await response.json();

      console.log('response', response);
      console.log('data', data);

      if (response.ok) {
        successMessage(data.message);
        navigation.goBack();
      } else {
        errorMessage(data.message);
        // Alert.alert('Error', data.message || 'Something went wrong.');
      }
    } catch (error) {
      errorMessage(error);
      // console.error('Error:', error);
      Alert.alert('Error', 'An error occurred while deleting the property.');
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        width: '85%',
        backgroundColor: '#FFFFFF',
        // borderWidth:1,
      }}
      style={{marginBottom: 20}}>
      <TouchableOpacity onPress={handlePropertyPress} style={{width: '100%'}}>
        <View className="w-full bg-white rounded-xl">
          <View className="w-full h-[129px] rounded-t-xl overflow-hidden relative">
            <CardSwiper images={item?.images} />
            <View className="absolute w-8 h-8 p-2 rounded-full bg-black/25 right-2 top-1/3">
              <Image
                source={{uri: rightArrowWhite}}
                resizeMode="contain"
                className="w-4 h-4"
              />
            </View>
          </View>
          <View className="p-3">
            {editFlag && (
              <View className="flex flex-row items-center">
                <Image
                  source={{uri: ratingstar}}
                  resizeMode="contain"
                  className="w-3 h-3 mr-1"
                />
                <Text className="mr-1 text-sm font-medium text-black">4.5</Text>
                <Text className="text-sm font-medium text-gray-700">
                  {'(73)'}
                </Text>
              </View>
            )}
            <View className="flex flex-row items-start">
              <View className="flex-1">
                <Text className="text-lg font-bold text-[#1A1E25]">
                  {item?.building_name}
                </Text>
                <Text className="text-base text-[#2F4858]">
                  {item?.address}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => handleWishlist()}
                style={{
                  // borderWidth: 1,
                  height: 28,
                  width: 28, // Set width to be consistent
                  justifyContent: 'center', // Center the image vertically
                  alignItems: 'center', // Center the image horizontally
                }}>
                <Image
                  source={{uri: isWishlisted ? setwishlist : wishlist}}
                  resizeMode="contain"
                  style={{
                    width: isWishlisted ? 34 : 22,
                    height: isWishlisted ? 34 : 22,
                  }}
                  // className="w-8 h-8"
                />
              </TouchableOpacity>
            </View>
            <View className="flex flex-row items-center justify-start p-1 rounded-md bg-[#F2F8F6] mt-1 mb-3">
              <Text className="text-sm text-[#738D9C]">
                {item?.bedrooms} BHK
              </Text>
              <View className="w-[6px] h-[6px] rounded-full bg-[#738D9C] mx-2" />
              <Text className="text-sm text-[#738D9C]">
                {item?.area_sqft} Sq.ft
              </Text>
              <View className="w-[6px] h-[6px] rounded-full bg-[#738D9C] mx-2" />
              <Text className="text-sm text-[#738D9C]">
                {item?.furnish_type}
              </Text>
              <View className="w-[6px] h-[6px] rounded-full bg-[#738D9C] mx-2" />
              <Text className="text-sm text-[#738D9C]">{item?.owner_name}</Text>
            </View>
            <View className="flex flex-row justify-between">
              <View className="flex flex-row ">
                <Text className="text-base font-bold text-[#BDEA09]">
                  {' '}
                  ₹ {item?.monthly_rent}/-
                </Text>
                <Text
                  style={{color: '#000000'}}
                  className="ml-1 text-base font-bold">
                  {' '}
                  Monthly
                </Text>
              </View>
              <View>
                <Text
                  style={{color: '#000000'}}
                  className="ml-1 text-base font-bold">
                  {' '}
                  {item?.listing_type}
                </Text>
              </View>
            </View>
          </View>
          {editFlag ? (
            <View className="flex flex-row px-3 pb-3">
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ListPropertyScreen', {
                    item: item,
                    isediting: true,
                  })
                }
                className="flex-1 p-3 mr-2 border border-[#BDEA09] rounded-full flex flex-row items-center justify-center">
                <Text className="text-[#BDEA09] text-base text-center font-medium mr-2">
                  Edit Details
                </Text>
                <Image
                  source={{uri: editPen}}
                  resizeMode="contain"
                  className="w-4 h-4"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => deleteProperty()}
                className="p-4 rounded-full bg-[#EA0909]/10 flex items-center justify-center">
                <Image
                  source={{uri: deleteIc}}
                  resizeMode="contain"
                  className="w-4 h-5"
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <View className="flex flex-row items-center px-3 pt-3 border-t border-t-gray-400">
                <View>
                  <Image
                    source={{uri: demoUser}}
                    resizeMode="contain"
                    className="w-10 h-10 rounded-full"
                  />
                </View>
                <TouchableOpacity
                  onPress={() => handleopencontactddetails()}
                  className="flex-1 rounded-full ml-3 bg-[#BDEA09] p-3">
                  <Text className="text-center text-base font-bold text-[#181A53]">
                    Contact Owner
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="flex flex-row items-center justify-between px-3 pb-3 mt-2">
                <Text className="text-sm text-[#181A5399] font-medium">
                  Charges
                </Text>
                <Text className="text-[#181A53] text-base font-bold">
                  {viewProfile?.propertyContactCost} Coins
                </Text>
              </View>
            </View>
          )}
        </View>
      </TouchableOpacity>
      {showModal && contectdetailsmodal()}
      {modalVisiblecontact && contactusermodal()}
      {rechargemodal && addrechargemodal()}
      {postsucessshowModal && rechargesucessmodal()}
      <Modal transparent={true} visible={loaderVisible}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#BDEA09" />
          <Text style={styles.loaderText}>Processing...</Text>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default PropertyCard;

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
