import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  View,
  Platform,
  Alert,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../component/Header/Header';
import {tapIcon} from '../../constants/imgURL';
import PropertyCard from '../../component/Card/PropertyCard';
import CenterHeader from '../../component/Header/CenterHeader';
import {FlatList} from 'react-native';
import {useCallback, useEffect, useState} from 'react';
import {TypedUseSelectorHook, useDispatch} from 'react-redux';
import {viewWishList} from '../../redux/ducks/WishList/viewList';
import {useAppSelector} from '../../constants';
import {errorMessage, getAccessToken, successMessage} from '../../utils';
import {RootState} from '../../redux/store';
import Loader from '../../component/Loader/Loader';
import {useFocusEffect} from '@react-navigation/native';

const SavedScreen = () => {
  const [list, setList] = useState([]);
  const dispatch = useDispatch();
  const getWishlist = useAppSelector(state => state.viewList);
  const [loading, setLoading] = useState(false);

  const fetchWishlist = async () => {
    const token = await getAccessToken();
    try {
      setLoading(true);
      const response = await fetch(
        `https://backend.axces.in/api/property/viewWishlist`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Pass the token here
          },
        },
      );

      const data = await response.json();
      if (response.ok) {
        setList(data.data); // Assuming the API returns the wishlist directly
      } else {
        console.error(data.message || 'Failed to fetch wishlist');
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const [products, setProducts] = useState([]);

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
      fetchWishlist(); // Call the fetch function when component is focused
    }, []),
  );

  return (
    <SafeAreaView className="flex-1 bg-[#181A53]">
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'transparent'}
        translucent
      />
      <CenterHeader title="My Wishlist" />
      <Loader loading={loading} />
      <ScrollView
        className="mt-2"
        style={{
          backgroundColor: '#F2F8F6',
          flex: 1,
          minHeight: Dimensions.get('window').height,
        }}>
        <View className="w-full mb-4">
          <View
            style={{
              width: '90%',
              marginHorizontal: 18,
              padding: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text className=" text-[#0E0E0C] text-lg font-bold mr-2">
              Saved properties
            </Text>
            <View className=" rounded-full bg-[#BDEA09] w-6 h-6 flex items-center justify-center">
              <Text className=" text-[#181A53] text-sm font-medium">
                {list?.length}
              </Text>
            </View>
          </View>
          <FlatList
            contentContainerStyle={{gap: 20, marginTop: 10}}
            data={list}
            keyExtractor={item => item?._id}
            renderItem={({item}) => <PropertyCard item={item} />}
            ListEmptyComponent={() => (
              <View style={{width: '100%', alignItems: 'center'}}>
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
        {/* <View className=" w-full h-[5vh]" /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SavedScreen;
