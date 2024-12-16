import { Alert, FlatList, Image, Linking, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CenterHeader from '../../component/Header/CenterHeader';
import { demoUser } from '../../constants/imgURL';
import { useAppSelector } from '../../constants';
import { getAccessToken } from '../../utils';
const TransactionHistory = () => {


     const [transactions, setTransactions] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);

      const viewProfile = useAppSelector(state => state.viewProfile.data);
      console.log('viewProfile', viewProfile?.data?._id);
      

   const fetchTransactions = async () => {

       const token = await getAccessToken();

     try {
       const response = await fetch(
         `https://backend.axces.in/api/transactions`,
         {
           method: 'GET', // Explicitly specify the GET method
           headers: {
             'Content-Type': 'application/json', // Optional: Include headers as needed
            //  Accept: 'application/json', // Optional: Accept JSON responses
             Authorization: `Bearer ${token}`,
           },
         },
       );

       if (!response.ok) {
         throw new Error('Failed to fetch transactions');
       }

       const data = await response.json();
       console.log('data+++++++transaction', data.userCoins.transactions);
       setTransactions(data.userCoins.transactions);
     } catch (err) {
       setError(err.message);
     } finally {
       setLoading(false);
     }
   };


     useEffect(() => {
       fetchTransactions();
     }, []);

      const openInvoice = async download_invoice_url => {
        console.log('download_invoice_url', download_invoice_url);
        
        try {
          const supported = await Linking.canOpenURL(download_invoice_url);
          if (supported) {
            await Linking.openURL(download_invoice_url);
            // dispatch(onGetBalance());
            // setcoinmodal(false);
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


    const renderItem = (item) =>{
      console.log('item', item);

      const date = new Date(item?.item?.timestamp);

      const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      const formattedTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true, // Use 12-hour format
      });
      
         return (
           <ScrollView
             contentContainerStyle={{
               flex: 1,
               justifyContent: 'center',
               alignSelf: 'center',
               width: '90%',
               backgroundColor: '#FFFFFF',
               borderTopLeftRadius: 10,
               borderTopRightRadius: 10,

               // borderWidth:1,
             }}
             style={{marginBottom: 20}}>
             <TouchableOpacity
               //    onPress={handlePropertyPress}
               style={{width: '100%'}}>
               <View className="w-full bg-white rounded-xl">
                 <View
                   //  className="p-3"
                   style={{
                     // borderWidth: 1,
                     flexDirection: 'row',
                     justifyContent: 'space-between',
                     width: '100%',
                   }}>
                   <View style={{width: '50%'}}>
                     <View>
                       <View style={styles.row}>
                         {item.item.transaction_id && (
                           <View style={styles.item}>
                             <Text style={styles.label}>Transaction ID:</Text>
                             <Text style={styles.value}>
                               {item.item.transaction_id}
                             </Text>
                           </View>
                         )}
                         {/* {item?.item?.amount && ( */}
                         <View style={styles.item}>
                           <Text style={styles.label}>Amount:</Text>
                           <Text style={styles.value}>
                             {item?.item?.amount}
                           </Text>
                         </View>
                         {/* )} */}
                         {/* {item.item.type && (
                           <View style={styles.item}>
                             <Text style={styles.label}>Type:</Text>
                             {item.item.type === 'credit' ? (
                               <Text
                                 style={{
                                   ...styles.value,
                                   color: 'green',
                                   fontWeight: 'bold',
                                 }}>
                                 {item.item.type}
                               </Text>
                             ) : (
                               <Text
                                 style={{
                                   ...styles.value,
                                   color: 'red',
                                   fontWeight: 'bold',
                                 }}>
                                 {item.item.type}
                               </Text>
                             )}
                           </View>
                         )} */}
                         {/* {item.item.balanceAfterDeduction && (
                           <View style={styles.item}>
                             <Text style={styles.label}>
                               balanceAfterDeduction
                             </Text>
                             <Text style={styles.value}>
                               {item.item.balanceAfterDeduction}
                             </Text>
                           </View>
                         )} */}
                         {/* <View style={styles.item}>
                           <Text style={styles.label}>
                             balanceAfterDeduction
                           </Text>
                           <Text style={styles.value}>
                             {item.item.transaction_id}
                           </Text>
                         </View> */}
                       </View>
                     </View>
                   </View>
                   <View style={{width: '50%'}}>
                     <View style={styles.row}>
                       {item.item.description && (
                         <View style={styles.item}>
                           <Text style={styles.label}>Description</Text>
                           <Text style={styles.value}>
                             {item.item.description}
                           </Text>
                         </View>
                       )}
                       {item.item.recharge_method && (
                         <View style={styles.item}>
                           <Text style={styles.label}>recharge_method:</Text>
                           <Text style={styles.value}>
                             {item.item.recharge_method}
                           </Text>
                         </View>
                       )}
                       {/* <View style={styles.item}>
                         <Text style={styles.label}>Date:</Text>
                         <Text style={styles.value}>{`${formattedDate}`}</Text>
                       </View> */}
                       {/* <View style={styles.item}>
                         <Text style={styles.label}>Time:</Text>
                         <Text style={styles.value}>{`${formattedTime}`}</Text>
                       </View> */}
                     </View>
                   </View>
                 </View>
                 {item?.item?.download_invoice_url && (
                   <View>
                     <View className="flex flex-row items-center px-3 pb-3 px-3 pt-3 border-t border-t-gray-400">
                       <View>
                         <Image
                           source={{uri: demoUser}}
                           resizeMode="contain"
                           className="w-10 h-10 rounded-full"
                         />
                       </View>
                       <TouchableOpacity
                         onPress={() =>
                           openInvoice(item?.item?.download_invoice_url)
                         }
                         className="flex-1 rounded-full ml-3 bg-[#BDEA09] p-3 ">
                         <Text className="text-center text-base font-bold text-[#181A53]">
                           Download Invoice
                         </Text>
                       </TouchableOpacity>
                     </View>
                   </View>
                 )}
               </View>
             </TouchableOpacity>
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
        </View>
        <View style={{marginBottom:120}}>
          <FlatList
            data={transactions}
            renderItem={renderItem}
            keyExtractor={item => item._id}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

export default TransactionHistory

const styles = StyleSheet.create({
  row: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  item: {
    flex: 1,
    marginHorizontal: 8,
    justifyContent:'center',
    marginVertical:10
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1E25',
  },
  value: {
    fontSize: 14,
    color: '#1A1E25',
    backgroundColor: '#F2F8F6',
    marginTop:5
  },
});