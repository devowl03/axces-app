import {Image, Text, View} from 'react-native';
import {bedIcon} from '../../../constants/imgURL';

const PropertyDetail = ({item}: any) => {
  console.log('item?.bedrooms', item?.bedrooms);
  return (
    <View className="w-full">
      <Text className="text-[#0E0E0C] text-base font-bold mb-3">Details</Text>
      <View className=" w-full flex flex-row flex-wrap">
        <View className=" mr-2 mb-2 px-3 py-2 rounded-lg bg-white flex flex-row items-center">
          <Image
            source={{uri: bedIcon}}
            resizeMode="contain"
            className=" w-3 h-3 mr-2"
          />
          
          <Text className="text-sm font-medium text-[#0E0E0C]">
            {item?.bedrooms}BHK
          </Text>
        </View>
        <View className="mr-2 mb-2 px-3 py-2 rounded-lg bg-white flex flex-row items-center">
          <Image
            source={{uri: bedIcon}}
            resizeMode="contain"
            className=" w-3 h-3 mr-2"
          />
          <Text className=" text-sm font-medium text-[#0E0E0C]">
            {item?.area_sqft} Sq.ft
          </Text>
        </View>
        {/* <View className=" mr-2 mb-2 px-3 py-2 rounded-lg bg-white flex flex-row items-center">
          <Image
            source={{uri: bedIcon}}
            resizeMode="contain"
            className=" w-3 h-3 mr-2"
          />
          <Text className=" text-sm font-medium text-[#0E0E0C]">2BHK</Text>
        </View> */}
        <View className="mr-2 mb-2 px-3 py-2 rounded-lg bg-white flex flex-row items-center">
          <Image
            source={{uri: bedIcon}}
            resizeMode="contain"
            className=" w-3 h-3 mr-2"
          />
          <Text className=" text-sm font-medium text-[#0E0E0C]">
            {item?.facing} face
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PropertyDetail;
