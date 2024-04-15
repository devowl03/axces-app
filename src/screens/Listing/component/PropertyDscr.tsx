import {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

const PropertyDscr = () => {
  const [showMore, setShowMore] = useState(false);
  return (
    <View className="w-full">
      <Text className="text-[#0E0E0C] text-base font-bold mb-3">
        Description
      </Text>
      <View className={`${showMore ? 'pb-6' : 'pb-0'} relative mb-3`}>
        <Text numberOfLines={showMore ? undefined : 3} className=" text-base text-[#0E0E0C]">
          Aston Hotel, Alice Springs NT 0870, Australia is a modern hotel.
          elegant 5 star hotel overlooking the sea. perfect for a romantic.
          Aston Hotel, Alice Springs NT 0870, Australia is a modern hotel.
          elegant 5 star hotel overlooking the sea. perfect for a romantic.
          Aston Hotel, Alice Springs NT 0870, Australia is a modern hotel.
          elegant 5 star hotel overlooking the sea. perfect for a romantic.
        </Text>
        <TouchableOpacity
          className={` absolute bottom-0 right-0 bg-[#F2F8F6]`}
          onPress={() => setShowMore(prev => !prev)}>
          <Text className=" text-base text-[#BDEA09] font-bold">
            {showMore ? 'Show less' : '...Read more'}
          </Text>
        </TouchableOpacity>
      </View>
      <View className=" flex flex-row items-center justify-between p-3 rounded-lg bg-white">
        <Text className=" text-base font-bold text-[#181A53]">Security Deposit:</Text>
        <Text className=" text-base font-bold text-[#181A53]">17000</Text>
      </View>
    </View>
  );
};

export default PropertyDscr;
