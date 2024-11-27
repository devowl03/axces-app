import { FlatList, Image, ScrollView, StatusBar, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import CenterHeader from "../../component/Header/CenterHeader"
import { tapIcon } from "../../constants/imgURL"
import PropertyCard from "../../component/Card/PropertyCard"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useRoute } from "@react-navigation/native"
import { getAccessToken } from "../../utils"
import Loader from "../../component/Loader/Loader"
import { useAppSelector } from "../../constants"

const UserPropertyListedScreen = () => {

   const [list, setList] = useState([]);

  const dispatch = useDispatch();
   const [loading, setLoading] = useState(false);

  const route = useRoute();

    const {appliedFilters} = route?.params || {};

    const [latitude, setLatitude] = useState<number>(route?.params?.latitude);
    const [longitude, setLongitude] = useState<number>(
      route?.params?.longitude,
    );

    console.log('latitude', route?.params?.longitude);
    

      const viewProfile = useAppSelector(state => state.viewProfile);
      console.log('viewProfile', viewProfile.data.data?._id);
      

   useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      const url = `https://backend.axces.in/api/property/list`;

      const token = await getAccessToken();

      console.log('latitude:', route?.params?.latitude);
      console.log('longitude:', route?.params?.longitude);
      console.log('appliedFilters:', appliedFilters);

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            owner_id:viewProfile.data.data?._id,
            // userLatitude: route?.params?.latitude,
            // userLongitude: route?.params?.longitude,
            // filters: appliedFilters || {},
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error response:', errorText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Fetched Data:', result);
        setList(result.data);

        // if (result.data !== null) {
        //   const filteredData = result.data.filter(
        //     property => property.listing_type === 'buy',
        //   );
        //   setList(filteredData);
        // }
      } catch (error) {
        console.error('Fetch Properties Error:', error);
        errorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [latitude, longitude]);


    return (
      <SafeAreaView className="flex-1 bg-[#F2F8F6]">
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={'transparent'}
          translucent
        />
        <CenterHeader title="Property Listed" lightMode={true} />
        <Loader loading={loading} />
        <ScrollView className="mt-2">
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
                Listed properties
              </Text>
              <View className=" rounded-full bg-[#BDEA09] w-6 h-6 flex items-center justify-center">
                <Text className=" text-[#181A53] text-sm font-medium">
                  {list?.length}
                </Text>
              </View>
            </View>
              <ScrollView className="mt-2">
                <View className="w-full mb-4">
                  <FlatList
                    contentContainerStyle={{gap: 20}}
                    data={list}
                    renderItem={({item}) => (
                      <PropertyCard item={item} editFlag={true} />
                    )}
                    ListEmptyComponent={() => (
                      <View style={{width: '100%', alignItems: 'center'}}>
                        {!loading && (
                          <Text
                            style={{
                              color: 'red',
                              fontSize: 20,
                              fontWeight: 'bold',
                            }}>
                            {'No records found'}
                          </Text>
                        )}
                      </View>
                    )}
                  />
                </View>
              </ScrollView>
              {/* <View className=" w-full h-[5vh]" /> */}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
    } 
  

export default UserPropertyListedScreen


