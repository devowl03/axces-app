import {useNavigation} from '@react-navigation/native';
import {Text, TouchableOpacity, View} from 'react-native';

const Header = () => {
  const navigation = useNavigation();
  return (
    <View className="w-full bg-[#181A53] p-2">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text className=" text-white">Header</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;
