import {useNavigation} from '@react-navigation/native';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {filterIcon, leftIcon, searchIcon} from '../../constants/imgURL';
interface Props {
  showSearch?: boolean;
}
const Header: React.FC<Props> = ({showSearch}) => {
  const navigation = useNavigation();
  return (
    <View
      className={`w-full flex flex-row items-center bg-[#181A53] px-6 pb-1 pt-3`}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className=" w-6 h-6 flex items-start justify-center">
        <Image
          source={{uri: leftIcon}}
          resizeMode="contain"
          className=" w-2 h-3"
        />
      </TouchableOpacity>
      {showSearch && (
        <View className="flex-1 flex flex-row">
          <View className=" bg-white/20 rounded-full mx-1 flex-1 px-3 flex flex-row items-center h-12">
            <Image
              source={{uri: searchIcon}}
              resizeMode="contain"
              className=" w-4 h-4 mr-2"
            />
            <TextInput
              className=" w-full text-base"
              placeholder="Search"
              placeholderTextColor="white"
            />
          </View>
          <TouchableOpacity className=" bg-[#BDEA09] rounded-full flex items-center justify-center h-12 w-12">
            <Image
              source={{uri: filterIcon}}
              resizeMode="contain"
              className=" w-4 h-4"
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Header;
