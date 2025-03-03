import {Image, Text, View} from 'react-native';
import {bedIcon, nortFaceIcon} from '../../../constants/imgURL';

const PropertyDetail = ({item}: any) => {
  return (
    <View className="w-full">
      <Text className="text-[#0E0E0C] text-base font-bold mb-3">Details</Text>
      <View className="flex flex-row flex-wrap w-full ">
        {item?.property_type !== 'commercial' && (
          <View className="flex flex-row items-center px-3 py-2 mb-2 mr-2 bg-white rounded-lg ">
            <Image
              source={{uri: bedIcon}}
              resizeMode="contain"
              className="w-3 h-3 mr-2 "
            />

            <Text className="text-sm font-medium text-[#0E0E0C]">
              {item?.bedrooms}BHK
            </Text>
          </View>
        )}
        <View className="flex flex-row items-center px-3 py-2 mb-2 mr-2 bg-white rounded-lg">
          <Image
            source={require('../../../Assets/icons/box.png')}
            resizeMode="contain"
            className="w-3.5 h-3.5 mr-2"
          />
          <Text className=" text-sm font-medium text-[#0E0E0C]">
            {item?.area_sqft} Sq.ft
          </Text>
        </View>
        {/* <View className="flex flex-row items-center px-3 py-2 mb-2 mr-2 bg-white rounded-lg ">
          <Image
            source={{uri: bedIcon}}
            resizeMode="contain"
            className="w-3 h-3 mr-2 "
          />
          <Text className=" text-sm font-medium text-[#0E0E0C]">2BHK</Text>
        </View> */}
        <View className="flex flex-row items-center px-3 py-2 mb-2 mr-2 bg-white rounded-lg">
          <Image
            source={{uri: nortFaceIcon}}
            resizeMode="contain"
            className="w-3 h-3 mr-2 "
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
