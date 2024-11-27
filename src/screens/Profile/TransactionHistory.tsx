import { FlatList, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CenterHeader from '../../component/Header/CenterHeader';
import { demoUser } from '../../constants/imgURL';
import { useAppSelector } from '../../constants';
const TransactionHistory = () => {


     const [transactions, setTransactions] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);

      const viewProfile = useAppSelector(state => state.viewProfile.data);
      console.log('viewProfile', viewProfile?.data?._id);
      

     const fetchTransactions = async () => {

        const userId = viewProfile?.data?._id
       try {
         const response = await fetch(`/api/transactions/${userId}`);
         if (!response.ok) {
           throw new Error('Failed to fetch transactions');
         }
         const data = await response.json();
         setTransactions(data);
       } catch (err) {
         setError(err.message);
       } finally {
         setLoading(false);
       }
     };

     useEffect(() => {
       fetchTransactions();
     }, []);


    const renderItem = () =>{
         return (
           <ScrollView
             contentContainerStyle={{
               flex: 1,
               justifyContent: 'center',
               alignSelf: 'center',
               width: '90%',
               backgroundColor: '#FFFFFF',
               // borderWidth:1,
             }}
             style={{marginBottom: 20}}>
             <TouchableOpacity
            //    onPress={handlePropertyPress}
               style={{width: '100%'}}>
               <View className="w-full bg-white rounded-xl">
                 <View className="w-full h-[129px] rounded-t-xl overflow-hidden relative">
                   {/* <CardSwiper images={item?.images} /> */}
                   <View className="p-2 rounded-full bg-black/25 absolute w-8 h-8 right-2 top-1/3">
                     {/* <Image
                       source={{uri: rightArrowWhite}}
                       resizeMode="contain"
                       className="w-4 h-4"
                     /> */}
                   </View>
                 </View>
                 <View className="p-3">
                   <View className="flex flex-row items-start">
                     <View className="flex-1">
                       <Text className="text-lg font-bold text-[#1A1E25]">
                         {/* {item?.building_name} */}
                       </Text>
                       <Text className="text-base text-[#2F4858]">
                         {/* {item?.address} */}
                       </Text>
                     </View>
                     <TouchableOpacity
                    //    onPress={() => handleWishlist()}
                       style={{
                         // borderWidth: 1,
                         height: 28,
                         width: 28, // Set width to be consistent
                         justifyContent: 'center', // Center the image vertically
                         alignItems: 'center', // Center the image horizontally
                       }}>
                       {/* <Image
                         source={{uri: isWishlisted ? setwishlist : wishlist}}
                         resizeMode="contain"
                         style={{
                           width: isWishlisted ? 34 : 22,
                           height: isWishlisted ? 34 : 22,
                         }}
                         // className="w-8 h-8"
                       /> */}
                     </TouchableOpacity>
                   </View>
                   <View className="flex flex-row items-center justify-start p-1 rounded-md bg-[#F2F8F6] mt-1 mb-3">
                     <Text className="text-sm text-[#738D9C]">
                       {/* {item?.bedrooms} BHK */}
                     </Text>
                     <View className="w-[6px] h-[6px] rounded-full bg-[#738D9C] mx-2" />
                     <Text className="text-sm text-[#738D9C]">
                       {/* {item?.area_sqft} Sq.ft */}
                     </Text>
                     <View className="w-[6px] h-[6px] rounded-full bg-[#738D9C] mx-2" />
                     <Text className="text-sm text-[#738D9C]">
                       {/* {item?.furnish_type} */}
                     </Text>
                     <View className="w-[6px] h-[6px] rounded-full bg-[#738D9C] mx-2" />
                     <Text className="text-sm text-[#738D9C]">
                       {/* {item?.owner_name} */}
                     </Text>
                   </View>
                   <View className="flex flex-row justify-between">
                     <View className="flex flex-row ">
                       <Text className="text-base font-bold text-[#BDEA09]">
                         {' '}
                         {/* ₹ {item?.monthly_rent}/- */}
                       </Text>
                       <Text
                         style={{color: '#000000'}}
                         className="text-base font-bold ml-1">
                         {' '}
                         Monthly
                       </Text>
                     </View>
                     <View>
                       <Text
                         style={{color: '#000000'}}
                         className="text-base font-bold ml-1">
                         {' '}
                         {/* {item?.listing_type} */}
                       </Text>
                     </View>
                   </View>
                 </View>
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
                     <View className="px-3 pb-3 mt-2 flex flex-row justify-between items-center">
                       <Text className="text-sm text-[#181A5399] font-medium">
                         Charges
                       </Text>
                       <Text className="text-[#181A53] text-base font-bold">
                         50 Coins
                       </Text>
                     </View>
                   </View>
               </View>
             </TouchableOpacity>
             {/* {showModal && contectdetailsmodal()}
             {modalVisiblecontact && contactusermodal()}
             {rechargemodal && addrechargemodal()}
             {postsucessshowModal && rechargesucessmodal()}
             <Modal transparent={true} visible={loaderVisible}>
               <View style={styles.loaderContainer}>
                 <ActivityIndicator size="large" color="#BDEA09" />
                 <Text style={styles.loaderText}>Processing...</Text>
               </View>
             </Modal> */}
           </ScrollView>
         );
    }
  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: '#181A53'}}>
        <StatusBar backgroundColor="#181A53" />
        <View
          style={{
            height: 80,
            marginTop: 24,
            backgroundColor: '#181A53',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <CenterHeader title="Transactions" />
          <View>
            <FlatList data={transactions} 
            renderItem={renderItem}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

export default TransactionHistory

const styles = StyleSheet.create({

})