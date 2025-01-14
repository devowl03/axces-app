import {Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const getFacilityIcon = (facilityName: string) => {
  switch (facilityName.toLowerCase().trim()) {
    case 'swimming pool':
      return <MaterialCommunityIcons name="pool" size={18} color="#0E0E0C" />;
    case 'parking':
      return <Ionicons name="car" size={18} color="#0E0E0C" />;
    case 'security':
      return (
        <MaterialCommunityIcons name="security" size={18} color="#0E0E0C" />
      );
    case 'lift':
      return (
        <MaterialCommunityIcons name="elevator" size={18} color="#0E0E0C" />
      );
    case 'balcony':
      return (
        <MaterialCommunityIcons name="balcony" size={18} color="#0E0E0C" />
      );
    case 'pet friendly':
      return <MaterialCommunityIcons name="paw" size={18} color="#0E0E0C" />;
    case 'power backup':
      return (
        <MaterialCommunityIcons name="power-plug" size={18} color="#0E0E0C" />
      );
    case 'gym':
      return (
        <MaterialCommunityIcons name="dumbbell" size={18} color="#0E0E0C" />
      );
    case 'club house':
      return <MaterialCommunityIcons name="home" size={18} color="#0E0E0C" />;
    case 'play area':
      return <MaterialCommunityIcons name="play" size={18} color="#0E0E0C" />;
    default:
      return (
        <MaterialCommunityIcons name="circle-small" size={18} color="#0E0E0C" />
      );
  }
};

const Facilities = ({item}: any) => {
  const processFacilities = (facilitiesArray: string[]) => {
    if (!facilitiesArray?.length) {
      return [];
    }

    return facilitiesArray
      .join(',')
      .split(',')
      .map(facility => facility.trim())
      .filter(facility => facility.length > 0);
  };

  const facilitiesList = processFacilities(item?.facilities);

  return (
    <View className="w-full">
      <Text className="text-[#0E0E0C] text-base font-bold mb-3">
        Facilities
      </Text>
      <View className="flex flex-row flex-wrap w-full">
        {facilitiesList.map((facility: string) => (
          <View
            key={facility}
            className={
              'flex flex-row items-center px-3 py-2 mb-2 mr-2 rounded-full bg-[#F5F5F5]'
            }>
            <View className="mr-2">{getFacilityIcon(facility)}</View>
            <Text className="text-sm font-medium text-[#0E0E0C]">
              {facility}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Facilities;
