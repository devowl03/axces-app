import {useNavigation, useRoute} from '@react-navigation/native';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {
  filterIcon,
  leftBlueIcon,
  leftIcon,
  searchIcon,
} from '../../constants/imgURL';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../routes/MainStack';
import {useEffect, useRef} from 'react';
interface Props {
  HeaderIc?: string;
  title?: string;
  lightMode?: boolean;
  back?: boolean;
}
const CenterHeader: React.FC<Props> = ({
  title,
  lightMode,
  HeaderIc,
  back = true,
}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const router = useRoute();

  return (
    <View
      className={`w-full relative flex flex-row items-center justify-center ${
        lightMode ? ' bg-[#F2F8F6]' : 'bg-[#181A53]'
      }  px-6 pb-1 pt-3 pb-4`}>
      {back && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute flex items-start justify-center w-6 h-6 left-6 top-4">
          <Image
            source={{uri: lightMode ? leftBlueIcon : leftIcon}}
            resizeMode="contain"
            className="w-2 h-3 "
          />
        </TouchableOpacity>
      )}

      {HeaderIc ? (
        <Image
          source={{uri: HeaderIc}}
          resizeMode="contain"
          className="w-8 h-8 "
        />
      ) : (
        <Text
          className={`${
            lightMode ? ' text-[#0E0E0C]' : ' text-white'
          }  text-xl font-medium `}>
          {title}
        </Text>
      )}
      {/* {RightComp && (
        <View className=''>
          <RightComp />
        </View>
      )} */}
    </View>
  );
};

export default CenterHeader;
