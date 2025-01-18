import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
  RefreshControl,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
  Platform,
} from 'react-native';
import {Linking} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../component/Header/Header';
import UserCoin from '../../component/Profile/UserCoin';
import {
  blueHeart,
  coinStack,
  defaultUserIc,
  Help,
  DeleteFilled,
  houseRound,
  Notification,
  Privacy,
  Report,
  whiteHome,
  whiteWallet,
} from '../../constants/imgURL';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../routes/MainStack';
import {s, scale, verticalScale} from 'react-native-size-matters';
import {RFValue} from 'react-native-responsive-fontsize';
import {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {onGetBalance} from '../../redux/ducks/Coins/getBalance';
import {useAppSelector} from '../../constants';
import {onRecharge} from '../../redux/ducks/Coins/recharge';
import {
  deleteAccessToken,
  errorMessage,
  getAccessToken,
  successMessage,
} from '../../utils';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import Loader from '../../component/Loader/Loader';
import {Alert} from 'react-native';
import {onGetUserProfile} from '../../redux/ducks/User/viewProfile';
import RazorpayCheckout from 'react-native-razorpay';
import {
  initConnection,
  endConnection,
  useIAP,
  getProducts,
  requestPurchase,
  isIosStorekit2,
} from 'react-native-iap';

export interface OthersDataInterface {
  title: string;
  iconurl: string;
  navigateTo?: string;
}

const ProfileScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const getBalance = useAppSelector(state => state.getBalance);
  const recharge = useAppSelector(state => state.recharge);
  // console.log('recharge+++++++', recharge.data.order.id);

  const viewProfile = useAppSelector(state => state.viewProfile);
  const dispatch = useDispatch();
  const nocoinbottomSheetRef = useRef<BottomSheetModal>(null);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [demo, setdemo] = useState('');
  const [userData, setUserData] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

  const getLocation = useAppSelector(state => state.getLocation);
  console.log('getLocation', getLocation?.data?.display_name);
  console.log('getLocationdata', getLocation?.data?.lat);

  const handleReportEmail = (subject: string) => {
    const email = 'axces.customercare@gmail.com';
    const encodedSubject = encodeURIComponent(
      subject || 'Subject fraud with property inside the app',
    );
    const encodedBody = encodeURIComponent('Hello, I need support with...');
    const url = `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;

    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          console.error('No email app available to handle this link');
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => {
        console.error('Failed to open email link: ', err);
      });
  };

  const handlehelpEmail = (subject: string) => {
    const email = 'axces.customercare@gmail.com';
    const encodedSubject = encodeURIComponent(
      subject || 'Subject #issue related to app',
    );
    const encodedBody = encodeURIComponent('Hello, I need support with...');
    const url = `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;

    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          console.error('No email app available to handle this link');
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => {
        console.error('Failed to open email link: ', err);
      });
  };

  const fetchData = async () => {
    setRefreshing(true);
    dispatch(onGetBalance());
    dispatch(onGetUserProfile());
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, []),
  );

  useEffect(() => {
    const displaybalance = () => {
      if (getBalance.called) {
        const {status, data} = getBalance;
        setdemo(getBalance);
        const coins = data.coins;
        setBalance(coins);
        setLoading(false);
      }
    };

    if (recharge.called) {
      const {status, message, data} = recharge;
      setLoading(false);
      if (status === 'fail') {
        errorMessage(message);
      } else {
        successMessage(message);
        if (data && data.coins !== undefined) {
          setBalance(data.coins);
          console.log('Coins after recharge: ', data.coins);
        }
      }
    }
    if (viewProfile.called) {
      const {message, code, data} = viewProfile?.data;
      setLoading(false);
      if (code === 200) {
        successMessage(message);
        setUserData(data);
      } else {
        errorMessage(message);
      }
    }
    displaybalance();
  }, [getBalance, recharge, demo, balance, setBalance, viewProfile]);

  console.log('userData>>>>', userData);

  const handleLogout = async () => {
    try {
      await deleteAccessToken();
      navigation.replace('Onboard');
    } catch (error) {
      console.error('Error during logout', error);
    }
  };

  const handlePress = () => {
    Linking.openURL('https://www.axces.in/privacy_policy.html').catch(err =>
      console.error('Failed to open URL:', err),
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
      console.log('Invoice Data Url', data);

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

  const [postsucessshowModal, setpostsucessShowModal] =
    useState<boolean>(false);

  const [products, setProducts] = useState([]);
  const [isIAPReady, setIsIAPReady] = useState(false);

  const {finishTransaction} = useIAP();

  const productIds = {
    '100_coins': 'com.axces.coins.100',
    '500_coins': 'com.axces.coins.500',
    '1000_coins': 'com.axces.coins.1000',
  };

  const skus = Platform.select({
    ios: ['com.axces.coins.100', 'com.axces.coins.500', 'com.axces.coins.1000'],
    android: [
      'com.axces.coins.100',
      'com.axces.coins.500',
      'com.axces.coins.1000',
    ],
  });

  const initializeIAP = async () => {
    try {
      if (Platform.OS === 'ios') {
        await initConnection();
        const iapProducts = await getProducts({skus});
        // console.log('IAP products:', iapProducts);
        setProducts(iapProducts);
        setIsIAPReady(true);
      }
    } catch (error) {
      console.error('Failed to initialize IAP:', error);
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

  const handleIOSPurchase = async () => {
    try {
      const productId = productIds[`${amount}_coins`];
      if (!productId) {
        Alert.alert('Error', 'Invalid amount selected');
        return;
      }

      console.log('Initiating purchase for product ID:', productId);

      // Request purchase for the identified product ID
      const purchase = await requestPurchase({sku: productId});

      console.log('Purchase result:', purchase);

      if (!purchase) {
        throw new Error('Purchase result is null or undefined');
      }

      // // Finish the transaction
      // await finishTransaction(purchase);

      // After successful purchase
      // const orderData = {
      //   data: {
      //     order: {
      //       id: purchase.transactionId,
      //     },
      //   },
      // };

      // checkPaymentStatus(purchase.transactionId);
      setpostsucessShowModal(true);
    } catch (error) {
      console.error('Purchase error:', error);
      Alert.alert('Purchase Failed', 'Failed to complete the purchase');
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
        dispatch(onRecharge(amount))
          .then(response => {
            console.log('Recharge successful:', response.data);
            managepayment(response.data);
          })
          .catch(error => {
            console.error('Recharge failed:', error);
            errorMessage('Recharge failed. Please try again.');
          })
          .finally(() => {
            nocoinbottomSheetRef.current?.close();
          });
      } else {
        if (!isIAPReady) {
          Alert.alert('Error', 'In-app purchases are not ready');
          return;
        }
        handleIOSPurchase();
      }
    } else {
      errorMessage('Please enter amount');
    }
  };

  const openInvoice = async () => {
    try {
      console.log('Invicedata', Invicedata);
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

  const [rechargemodal, setrechargemodal] = useState(false);

  const handlerechargeModalOpen = () => {
    setAmount('');
    //  setModalVisiblecontact(false);
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

  return (
    <BottomSheetModalProvider>
      <SafeAreaView className=" bg-[#181A53]">
        <StatusBar barStyle={'light-content'} backgroundColor={'#181A53'} />
        <Header centerTile={true} title="Profile" RightComp={UserCoin} />
        <Loader loading={loading} />
        <ScrollView
          // className="flex-1"
          style={{backgroundColor: '#fff'}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
          }>
          <View className="bg-[#181A53] px-6 pb-6 ">
            <View className="flex flex-row items-center justify-start w-full ">
              <View
                // style={{width: scale(80), height: verticalScale(80)}}
                className="w-24 h-24 mr-4 rounded-full ">
                <Image
                  source={{
                    uri: userData?.profilePicture
                      ? userData?.profilePicture
                      : defaultUserIc,
                  }}
                  resizeMode="cover"
                  className="w-full h-full"
                  style={{borderRadius: 50}}
                />
              </View>
              <View>
                <Text
                  style={{fontSize: RFValue(20)}}
                  className="text-white font-boldB">
                  {userData?.name}
                </Text>
                <Text
                  style={{fontSize: RFValue(16)}}
                  className="font-sans text-base text-white">
                  +91 {userData?.number}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ProfileEditScreen');
                    dispatch(onGetUserProfile());
                    setLoading(true);
                  }}
                  className=" px-6 py-2 rounded-full border border-[#BDEA09] mt-2">
                  <Text className=" text-[#BDEA09] text-base font-normal font-sans text-center">
                    Edit details
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className="flex flex-row mt-7">
              <View className=" flex-1 border-r border-r-[#F2F8F63D] pr-5 flex">
                <View className="flex flex-row items-start ">
                  <Image
                    style={{
                      width: scale(16),
                      height: verticalScale(16),
                    }}
                    source={{uri: whiteHome}}
                    resizeMode="contain"
                    className="mr-2"
                  />
                  <Text
                    style={{fontSize: RFValue(14)}}
                    className="font-sans text-white">
                    Property Listed
                  </Text>
                </View>
                <Text className="my-2 text-xl text-white font-boldB">
                  {viewProfile?.data?.owner_properties_count}
                </Text>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ListPropertyScreen', {
                      currentLocation: getLocation?.data?.display_name,
                    })
                  }
                  className="py-2 rounded-full border border-[#BDEA09] flex-row "
                  // className=" rounded-full border border-[#BDEA09] flex items-center flex-row"
                  style={{alignItems: 'center', padding: 10}}>
                  <Image
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/512/748/748113.png',
                    }}
                    style={{height: 15, width: 15, resizeMode: 'contain'}}
                    tintColor="#BDEA09"
                  />
                  <Text
                    style={{fontSize: RFValue(14), paddingHorizontal: 8}}
                    className=" text-[#BDEA09]  font-normal text-center font-sans">
                    List Property
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('UserPropertyListedScren')}
                  className="py-2 rounded-full border border-[#BDEA09] flex-row mt-2 "
                  // className=" rounded-full border border-[#BDEA09] flex items-center flex-row"
                  style={{alignItems: 'center', padding: 10}}>
                  {/* <Image
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/512/748/748113.png',
                    }}
                    style={{height: 15, width: 15, resizeMode: 'contain'}}
                    tintColor="#BDEA09"
                  /> */}
                  <Text
                    style={{fontSize: RFValue(14), paddingHorizontal: 8}}
                    className=" text-[#BDEA09]  font-normal text-center font-sans">
                    Own Property
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="flex-1 pl-5 ">
                <View className="flex flex-row items-start ">
                  <Image
                    style={{
                      width: scale(16),
                      height: verticalScale(16),
                    }}
                    source={{uri: whiteWallet}}
                    resizeMode="contain"
                    className="mr-2"
                  />
                  <Text
                    style={{fontSize: RFValue(14)}}
                    className="font-sans text-white">
                    Wallet Balance
                  </Text>
                </View>
                <Text
                  style={{fontSize: RFValue(14)}}
                  className="my-2 text-xl text-white font-boldB">
                  {balance}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    handlerechargeModalOpen();
                  }}
                  className="py-2 rounded-full border border-[#BDEA09] ">
                  <Text
                    style={{fontSize: RFValue(14)}}
                    className=" text-[#BDEA09] font-normal font-sans text-center">
                    Add coins
                  </Text>
                </TouchableOpacity>
                {/* <TouchableOpacity className="  py-2 rounded-full border border-[#BDEA09] mt-2 ">
                  <Text
                    style={{fontSize: RFValue(14)}}
                    className=" font-sans text-[#BDEA09] text-base font-normal text-center">
                    Withdraw coins
                  </Text>
                </TouchableOpacity> */}
              </View>
            </View>
          </View>
          <View className="relative px-6">
            <View className="z-20 w-full p-4 bg-white shadow-md rounded-2xl">
              <Text
                style={{fontSize: RFValue(14)}}
                className=" text-[#0E0E0C] font-mediumM">
                Select feature to use
              </Text>
              <View className=" flex flex-row justify-between items-center border border-[#0E0E0C14] rounded-lg p-2 mt-2">
                <TouchableOpacity
                  onPress={() => navigation.navigate('Home')}
                  className="flex flex-row items-center ">
                  <Image
                    source={{uri: houseRound}}
                    resizeMode="contain"
                    className="w-5 h-5 mr-2 "
                  />
                  <Text
                    style={{fontSize: RFValue(14)}}
                    className=" text-[#0E0E0C] font-mediumM">
                    Buy/ Sell Property
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className="z-10 absolute top-0 left-0 right-0 h-6 bg-[#181A53]" />
          </View>
          <View className="px-6 mt-5 " style={{height: 580}}>
            <Text
              style={{fontSize: RFValue(14)}}
              className=" text-[#0E0E0C99] mb-4">
              OTHERS
            </Text>

            {/* Wishlist */}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Wishlist');
              }}
              className=" w-full flex flex-row items-center justify-between py-3 border-b border-b-[#0E0E0C0F]">
              <View className="flex flex-row items-center justify-start ">
                <View
                  style={{width: scale(32), height: verticalScale(32)}}
                  className="flex items-center justify-center w-10 h-10 mr-3 bg-white rounded-lg ">
                  <Image
                    style={{width: scale(16), height: verticalScale(16)}}
                    source={{uri: blueHeart}}
                    resizeMode="contain"
                  />
                </View>
                <Text
                  style={{fontSize: RFValue(14)}}
                  className="text-[#181A53] font-mediumM">
                  My Wishlist
                </Text>
              </View>
              <View>
                <Image
                  style={{width: scale(12), height: verticalScale(12)}}
                  source={{
                    uri: 'https://res.cloudinary.com/krishanucloud/image/upload/v1713692204/Vector_yfj7en.png',
                  }}
                  resizeMode="contain"
                  className="-rotate-90"
                />
              </View>
            </TouchableOpacity>
            {/* Privacy */}
            <TouchableOpacity
              onPress={handlePress}
              className=" w-full flex flex-row items-center justify-between py-3 border-b border-b-[#0E0E0C0F]">
              <View className="flex flex-row items-center justify-start ">
                <View
                  style={{width: scale(32), height: verticalScale(32)}}
                  className="flex items-center justify-center w-10 h-10 mr-3 bg-white rounded-lg ">
                  <Image
                    style={{width: scale(16), height: verticalScale(16)}}
                    source={{uri: Privacy}}
                    resizeMode="contain"
                  />
                </View>
                <Text
                  style={{fontSize: RFValue(14)}}
                  className="text-[#181A53] font-mediumM">
                  Account & Privacy
                </Text>
              </View>
              <View>
                <Image
                  style={{width: scale(12), height: verticalScale(12)}}
                  source={{
                    uri: 'https://res.cloudinary.com/krishanucloud/image/upload/v1713692204/Vector_yfj7en.png',
                  }}
                  resizeMode="contain"
                  className="-rotate-90"
                />
              </View>
            </TouchableOpacity>
            {/* Notification */}
            <TouchableOpacity
              onPress={() => navigation.navigate('Notifications')}
              className=" w-full flex flex-row items-center justify-between py-3 border-b border-b-[#0E0E0C0F]">
              <View
                // onPress={() => {navigation.navigate(data?.navigateTo)}}
                className="flex flex-row items-center justify-start ">
                <View
                  style={{width: scale(32), height: verticalScale(32)}}
                  className="flex items-center justify-center w-10 h-10 mr-3 bg-white rounded-lg ">
                  <Image
                    style={{width: scale(16), height: verticalScale(16)}}
                    source={{uri: Notification}}
                    resizeMode="contain"
                  />
                </View>
                <Text
                  style={{fontSize: RFValue(14)}}
                  className="text-[#181A53] font-mediumM">
                  Notification
                </Text>
              </View>
              <View>
                <Image
                  style={{width: scale(12), height: verticalScale(12)}}
                  source={{
                    uri: 'https://res.cloudinary.com/krishanucloud/image/upload/v1713692204/Vector_yfj7en.png',
                  }}
                  resizeMode="contain"
                  className="-rotate-90"
                />
              </View>
            </TouchableOpacity>

            {/* Transactions */}
            <TouchableOpacity
              onPress={() => navigation.navigate('TransactionHistory')}
              className=" w-full flex flex-row items-center justify-between py-3 border-b border-b-[#0E0E0C0F]">
              <View className="flex flex-row items-center justify-start ">
                <View
                  style={{width: scale(32), height: verticalScale(32)}}
                  className="flex items-center justify-center w-10 h-10 mr-3 bg-white rounded-lg ">
                  <Image
                    style={{width: scale(16), height: verticalScale(16)}}
                    source={{uri: Help}}
                    resizeMode="contain"
                  />
                </View>
                <Text
                  style={{fontSize: RFValue(14)}}
                  className="text-[#181A53] font-mediumM">
                  Transactions
                </Text>
              </View>
              <View>
                <Image
                  style={{width: scale(12), height: verticalScale(12)}}
                  source={{
                    uri: 'https://res.cloudinary.com/krishanucloud/image/upload/v1713692204/Vector_yfj7en.png',
                  }}
                  resizeMode="contain"
                  className="-rotate-90"
                />
              </View>
            </TouchableOpacity>

            {/* Help & support */}
            <TouchableOpacity
              onPress={handlehelpEmail}
              className=" w-full flex flex-row items-center justify-between py-3 border-b border-b-[#0E0E0C0F]">
              <View className="flex flex-row items-center justify-start ">
                <View
                  style={{width: scale(32), height: verticalScale(32)}}
                  className="flex items-center justify-center w-10 h-10 mr-3 bg-white rounded-lg ">
                  <Image
                    style={{width: scale(16), height: verticalScale(16)}}
                    source={{uri: Help}}
                    resizeMode="contain"
                  />
                </View>
                <Text
                  style={{fontSize: RFValue(14)}}
                  className="text-[#181A53] font-mediumM">
                  Help & Support
                </Text>
              </View>
              <View>
                <Image
                  style={{width: scale(12), height: verticalScale(12)}}
                  source={{
                    uri: 'https://res.cloudinary.com/krishanucloud/image/upload/v1713692204/Vector_yfj7en.png',
                  }}
                  resizeMode="contain"
                  className="-rotate-90"
                />
              </View>
            </TouchableOpacity>

            {/* Report and fraud */}
            <TouchableOpacity
              onPress={handleReportEmail}
              className=" w-full flex flex-row items-center justify-between py-3 border-b border-b-[#0E0E0C0F]">
              <View className="flex flex-row items-center justify-start ">
                <View
                  style={{width: scale(32), height: verticalScale(32)}}
                  className="flex items-center justify-center w-10 h-10 mr-3 bg-white rounded-lg ">
                  <Image
                    style={{width: scale(16), height: verticalScale(16)}}
                    source={{uri: Report}}
                    resizeMode="contain"
                  />
                </View>
                <Text
                  style={{fontSize: RFValue(14)}}
                  className="text-[#181A53] font-mediumM">
                  Report & Fraud
                </Text>
              </View>
              <View>
                <Image
                  style={{width: scale(12), height: verticalScale(12)}}
                  source={{
                    uri: 'https://res.cloudinary.com/krishanucloud/image/upload/v1713692204/Vector_yfj7en.png',
                  }}
                  resizeMode="contain"
                  className="-rotate-90"
                />
              </View>
            </TouchableOpacity>

            {/* Delete an account */}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('DeleteAccount');
              }}
              className=" w-full flex flex-row items-center justify-between py-3 border-b border-b-[#0E0E0C0F]">
              <View className="flex flex-row items-center justify-start ">
                <View
                  style={{width: scale(32), height: verticalScale(32)}}
                  className="flex items-center justify-center w-10 h-10 mr-3 bg-white rounded-lg ">
                  <Image
                    style={{width: scale(16), height: verticalScale(16)}}
                    source={{uri: DeleteFilled}}
                    resizeMode="contain"
                  />
                </View>
                <Text
                  style={{fontSize: RFValue(14)}}
                  className="text-[#181A53] font-mediumM">
                  Delete an account
                </Text>
              </View>
              <View>
                <Image
                  style={{width: scale(12), height: verticalScale(12)}}
                  source={{
                    uri: 'https://res.cloudinary.com/krishanucloud/image/upload/v1713692204/Vector_yfj7en.png',
                  }}
                  resizeMode="contain"
                  className="-rotate-90"
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleLogout}
              className="w-full py-2 my-4 bg-white rounded-full shadow-lg ">
              <Text className=" text-[#181A53] text-base font-medium text-center">
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
          snapPoints={['58%']}
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
              <View className=" flex bg-[#F2F8F6] rounded-lg flex-row justify-between items-center px-3 py-2">
                <Text className="text-[#181A53] text-lg">Your coins</Text>
                <Text className="text-[#181A53] text-lg">{balance}</Text>
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
                  managerecharge();
                }}
                className="w-full p-3 bg-[#BDEA09] rounded-full mt-4">
                <Text className="text-[#181A53] text-base text-center font-medium">
                  Recharge Now
                </Text>
              </TouchableOpacity>
            </View>
          </BottomSheetView>
        </BottomSheetModal>
        {postsucessshowModal && rechargesucessmodal()}
        {rechargemodal && addrechargemodal()}
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

export default ProfileScreen;

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
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
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
