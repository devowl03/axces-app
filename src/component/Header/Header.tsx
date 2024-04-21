import {useNavigation, useRoute} from '@react-navigation/native';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {filterIcon, leftIcon, searchIcon} from '../../constants/imgURL';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../routes/MainStack';
import {useEffect, useRef} from 'react';
interface Props {
  showSearch?: boolean;
  title?: string;
  centerTile?: boolean;
  RightComp?: React.FC;
}
const Header: React.FC<Props> = ({
  showSearch,
  title,
  centerTile,
  RightComp,
}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const router = useRoute();

  return (
    <View
      className={`w-full relative flex flex-row items-center justify-between bg-[#181A53] px-6 pb-1 pt-3`}>
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
            {router.name === 'SearchPropertyScreen' ? (
              <TextInput
                className=" w-full text-base text-white"
                placeholder="Search hh"
                placeholderTextColor="white"
                autoFocus={true}
              />
            ) : (
              <TouchableOpacity
                onPress={() => navigation.navigate('SearchPropertyScreen')}>
                <TextInput
                  className=" w-full text-base"
                  placeholder="Search"
                  placeholderTextColor="white"
                  editable={false}
                />
              </TouchableOpacity>
            )}
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
      {centerTile && (
        <Text className="text-white text-2xl font-medium absolute left-[46%]">
          {title}
        </Text>
      )}
      {RightComp && (
        <View className=''>
          <RightComp />
        </View>
      )}
    </View>
  );
};

export default Header;
