// import {useState} from 'react';
// import {Text, TouchableOpacity, View} from 'react-native';

// const PropertyDscr = ({item}: any) => {
//   const [showMore, setShowMore] = useState(false);
//   return (
//     <View className="w-full">
//       <Text className="text-[#0E0E0C] text-base font-bold mb-3">
//         Description
//       </Text>
//       <View className={`${showMore ? 'pb-6' : 'pb-0'} relative mb-3`}>
//         <Text numberOfLines={showMore ? undefined : 3} className=" text-base text-[#0E0E0C]">
//           {item?.description}
//         </Text>
//         <TouchableOpacity
//           className={` absolute bottom-0 right-0 bg-[#F2F8F6]`}
//           onPress={() => setShowMore(prev => !prev)}>
//           <Text className=" text-base text-[#BDEA09] font-bold">
//             {showMore ? 'Show less' : '...Read more'}
//           </Text>
//         </TouchableOpacity>
//       </View>
//       <View className=" flex flex-row items-center justify-between p-3 rounded-lg bg-white">
//         <Text className=" text-base font-bold text-[#181A53]">Security Deposit:</Text>
//         <Text className=" text-base font-bold text-[#181A53]">{item?.security_deposit}</Text>
//       </View>
//     </View>
//   );
// };

// export default PropertyDscr;

import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface PropertyDscrProps {
  item: {
    description: string;
    security_deposit: number;
  };
}

const PropertyDscr: React.FC<PropertyDscrProps> = ({ item }) => {
  const [showMore, setShowMore] = useState(false);
  const [data , setdata] = useState(item);

  useEffect(() => {
    console.log('PropertyDscr Item:', item);
  }, [data]);


  return (
    <View style={{ width: '100%' }}>
      <Text style={{ color: '#0E0E0C', fontSize: 16, fontWeight: 'bold', marginBottom: 12 }}>
        Description
      </Text>
      <View style={{ paddingBottom: showMore ? 24 : 0, position: 'relative', marginBottom: 12 }}>
        <Text numberOfLines={showMore ? undefined : 3} style={{ fontSize: 16, color: '#0E0E0C' }}>
          {item?.description}
        </Text>
        <TouchableOpacity
          style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: '#F2F8F6' }}
          onPress={() => setShowMore((prev) => !prev)}
        >
          <Text style={{ fontSize: 16, color: '#BDEA09', fontWeight: 'bold' }}>
            {showMore ? 'Show less' : '...Read more'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 12, borderRadius: 8, backgroundColor: 'white' }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#181A53' }}>Security Deposit:</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#181A53' }}>₹ {item?.security_deposit}/-</Text>
      </View>
    </View>
  );
};

export default PropertyDscr;

