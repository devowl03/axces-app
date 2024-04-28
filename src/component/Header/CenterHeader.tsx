import {useNavigation, useRoute} from '@react-navigation/native';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {filterIcon, leftBlueIcon, leftIcon, searchIcon} from '../../constants/imgURL';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../routes/MainStack';
import {useEffect, useRef} from 'react';
interface Props {

  title: string;
  lightMode?: boolean;

}
const CenterHeader: React.FC<Props> = ({
  title,
  lightMode
}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const router = useRoute();

  return (
    <View
      className={`w-full relative flex flex-row items-center justify-center ${lightMode ? " bg-[#F2F8F6]" : "bg-[#181A53]"}  px-6 pb-1 pt-3`}>
        
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className=" w-6 h-6 flex items-start justify-center absolute left-6 top-4">
        <Image
          source={{uri: lightMode ? leftBlueIcon : leftIcon}}
          resizeMode="contain"
          className=" w-2 h-3"
        />
      </TouchableOpacity>
      
        <Text className={`${lightMode ? " text-[#0E0E0C]" : " text-white"}  text-xl font-medium `}>
          {title}
        </Text>
      {/* {RightComp && (
        <View className=''>
          <RightComp />
        </View>
      )} */}
    </View>
  );
};

export default CenterHeader;
