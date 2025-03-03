import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Linking,
  Dimensions,
} from 'react-native';
import {View} from 'react-native';
import Header from '../../component/Header/Header';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../routes/MainStack';
import {SafeAreaView} from 'react-native-safe-area-context';
import PropertyCarousel from '../../component/Carousel/Property/PropertyCarousel';
import PropertyDscr from './component/PropertyDscr';
import PropertyDetail from './component/PropertyDetails';
import {
  demoUser,
  coinStack,
  phoneIc,
  greyRightArrow,
} from '../../constants/imgURL';
import Facilities from './component/Facilities';
import {useEffect, useRef, useState} from 'react';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import ContactOwner from './component/ContactOwner';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {useAppSelector} from '../../constants';
import {errorMessage, getAccessToken} from '../../utils';
import {onGetOwnerDetails} from '../../redux/ducks/User/contactOwner';
import {useDispatch} from 'react-redux';
import {onRecharge} from '../../redux/ducks/Coins/recharge';
import {TextInput} from 'react-native-gesture-handler';
import {onGetBalance} from '../../redux/ducks/Coins/getBalance';
import RazorpayCheckout from 'react-native-razorpay';
import {onGetUserProfile} from '../../redux/ducks/User/viewProfile';

const PropertyScreen = ({route}: any) => {
  const dispatch = useDispatch();

  const getSelectedProperty = useAppSelector(
    state => state.getSelectedProperty,
  );

  const [user, setUser] = useState<any>();
  // const route = useRoute();
  const {data}: any = route?.params;

  const contactOwner = useAppSelector(state => state.contactOwner);
  const getBalance = useAppSelector(state => state.getBalance);

  const [activeSection, setActiveSection] = useState('All');
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (getSelectedProperty.called) {
      const {data, message, status} = getSelectedProperty;
      setUser(data);
    }
  }, [getSelectedProperty]);

  const handleAgree = () => {
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
    setShowModal(true);
    dispatch(onGetOwnerDetails(data._id));

    //  dispatch(onGetOwnerDetails(item._id));

    //  if (getBalance.data.coins !== 0) {
    //    setShowModal(true);
    //     dispatch(onGetOwnerDetails(item._id));
    //  } else {
    //    setShowModal(false);
    //  }
  };

  const handleCallPress = () => {
    const phoneNumber = contactOwner?.data?.owner_details?.contact_phone;
    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`);
    }
  };

  const [modalVisiblecontact, setModalVisiblecontact] = useState(false);

  const viewProfile = useAppSelector(
    state => state.viewProfile.data.platformCharges,
  );

  const userData = useAppSelector(state => state?.viewProfile?.data?.data);

  handleopencontactddetails = () => {
    dispatch(onGetBalance());
    dispatch(onGetUserProfile());
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
            <TextInput
              placeholder="Enter Amount"
              maxLength={5}
              keyboardType="numeric"
              value={amount}
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

  const [showModal, setShowModal] = useState<boolean>(false);

  const contectdetailsmodal = () => {
    return (
      <Modal
        visible={showModal}
        transparent={true}
        statusBarTranslucent={true}
        animationType="fade">
        <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
          <View className="items-center justify-center flex-1 bg-black/80">
            <TouchableWithoutFeedback>
              <View className="rounded-lg p-4 bg-white w-[80%]">
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

  const [Invicedata, SetInvoicedata] = useState('');

  const checkPaymentStatus = async orderId => {
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

  const {finishTransaction} = useIAP();
  const [products, setProducts] = useState([]);
  const [isIAPReady, setIsIAPReady] = useState(false);

  const productIds = {
    '30_coins': 'com.axces.coins.30',
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
        setIsIAPReady(true);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to initialize in-app purchases');
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
      await finishTransaction({purchase, isConsumable: true});

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
          // nocoinbottomSheetRef.current?.close();
        });
    } else {
      errorMessage('Please enter amount'); // Prompt user to enter amount
    }
  };

  const [postsucessshowModal, setpostsucessShowModal] =
    useState<boolean>(false);

  const sucesspostdetailsmodal = () => {
    setpostsucessShowModal(true);
  };

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

  const {width} = Dimensions.get('window');

  const {height: windowHeight} = Dimensions.get('window');

  const renderActiveSection = () => {
    return (
      <ScrollView
        contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 12}}>
        {(activeSection === 'All' || activeSection === 'Description') && (
          <View style={{marginBottom: 12}}>
            <PropertyDscr item={data} />
          </View>
        )}

        {(activeSection === 'All' || activeSection === 'Details') && (
          <View style={{marginBottom: 12}}>
            <PropertyDetail item={data} />
          </View>
        )}

        {(activeSection === 'All' || activeSection === 'Facilities') &&
          data?.property_type !== 'commercial' && (
            <View style={{marginBottom: 12}}>
              <Facilities item={data} />
            </View>
          )}

        {(activeSection === 'All' || activeSection === 'Owner') && (
          <View
            style={{
              width: width * 0.9, // Responsive width
              marginBottom: 12,
              backgroundColor: '#fff',
              alignItems: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
              borderRadius: 25,
              paddingVertical: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '80%',
              }}>
              <View style={{alignItems: 'center'}}>
                <Image
                  source={{uri: demoUser}}
                  style={{width: 62, height: 62, borderRadius: 31}}
                  resizeMode="cover"
                />
                {/* <Text
                style={{
                  color: '#181A53',
                  fontWeight: '500',
                  fontSize: 16,
                  paddingTop: 5,
                }}>
                Charges
              </Text> */}
              </View>
              <View style={{alignItems: 'center'}}>
                {/* <Text style={{fontSize: 17, color: '#000000', fontWeight: '500'}}>
                +91-9999955555
              </Text> */}
                <TouchableOpacity
                  onPress={() => handleopencontactddetails()}
                  style={{
                    width: width * 0.45, // Responsive button width
                    backgroundColor: '#BDEA09',
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 30,
                    marginTop: 8,
                  }}>
                  <Text style={{color: '#000000', fontWeight: '600'}}>
                    Contact Owner
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    );
  };

  return (
    <View style={{backgroundColor: '#181A53'}}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#181A53'} />
      <View style={{backgroundColor: '#181A53', marginTop: 60}}>
        <Header />
      </View>
      <ScrollView className="bg-[#ffffff]">
        <View className="w-full h-[35vh] pt-4 relative">
          <PropertyCarousel
            id={data}
            images={data?.images}
            // wishlistdata={wishlist}
          />
          <View className="bg-[#181A53] w-full h-[70%] z-10 absolute top-0" />
        </View>
        <View className="px-6 pt-2">
          <View className="flex flex-row justify-between ">
            <Text className=" text-base font-bold text-[#0E0E0C]">
              {data?.building_name}
            </Text>
            <View className="flex flex-row ">
              <Text className=" text-base font-bold text-[#BDEA09]">
                ₹ {data?.monthly_rent}
              </Text>
              <Text className=" text-base font-bold ml-1 text-[#180E0E99]">
                / Monthly
              </Text>
            </View>
          </View>
          <Text className=" text-[#0E0E0C99] text-sm">
            {data?.address}, {data?.landmark}
          </Text>
          <Text className=" text-[#0E0E0C99] text-sm capitalize">
            {data?.property_type}
          </Text>
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{width: '100%', marginTop: 4, marginBottom: 14}}>
          <View style={{width: 24}} />
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              paddingVertical: 12,
              paddingHorizontal: 24,
              borderBottomWidth: 2,
              borderBottomColor:
                activeSection === 'All' ? '#BDEA09' : 'transparent',
            }}
            onPress={() => setActiveSection('All')}>
            <Text style={{fontSize: 16, color: 'black'}}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              paddingVertical: 12,
              paddingHorizontal: 24,
              borderBottomWidth: 2,
              borderBottomColor:
                activeSection === 'Description' ? '#BDEA09' : 'transparent',
            }}
            onPress={() => setActiveSection('Description')}>
            <Text style={{fontSize: 16, color: 'black'}}>Description</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              paddingVertical: 12,
              paddingHorizontal: 24,
              borderBottomWidth: 2,
              borderBottomColor:
                activeSection === 'Details' ? '#BDEA09' : 'transparent',
            }}
            onPress={() => setActiveSection('Details')}>
            <Text style={{fontSize: 16, color: 'black'}}>Details</Text>
          </TouchableOpacity>
          {data?.property_type !== 'commercial' && (
            <TouchableOpacity
              style={{
                backgroundColor: 'white',
                paddingVertical: 12,
                paddingHorizontal: 24,
                borderBottomWidth: 2,
                borderBottomColor:
                  activeSection === 'Facilities' ? '#BDEA09' : 'transparent',
              }}
              onPress={() => setActiveSection('Facilities')}>
              <Text style={{fontSize: 16, color: 'black'}}>Facilities</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              paddingVertical: 12,
              paddingHorizontal: 24,
              borderBottomWidth: 2,
              borderBottomColor:
                activeSection === 'Owner' ? '#BDEA09' : 'transparent',
            }}
            onPress={() => setActiveSection('Owner')}>
            <Text style={{fontSize: 16, color: 'black'}}>Owner</Text>
          </TouchableOpacity>
        </ScrollView>
        <View style={{backgroundColor: '#ffff', minHeight: windowHeight * 0.8}}>
          {renderActiveSection()}
        </View>
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
    </View>
  );
};

export default PropertyScreen;

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
