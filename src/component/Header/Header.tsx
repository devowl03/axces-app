import {useNavigation, useRoute} from '@react-navigation/native';
import {Image, Text, TextInput, TouchableOpacity, View,Animated} from 'react-native';
import {
  filterIcon,
  leftBlueIcon,
  leftIcon,
  searchIcon,
} from '../../constants/imgURL';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../routes/MainStack';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { scale, verticalScale } from 'react-native-size-matters';
import { useEffect, useRef, useState } from 'react';
import { onGetLocation } from '../../redux/ducks/User/getLocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface Props {
  showSearch?: boolean;
  title?: string;
  centerTile?: boolean;
  RightComp?: React.FC;
  lightHeader?: boolean;
  centerLeftPercen?: number;
  fetchSuggestions?: (query: string) => void;
  input?: string;
  setInput?: (input: string) => void;
}
const Header: React.FC<Props> = ({
  showSearch,
  title,
  centerTile,
  RightComp,
  lightHeader,
  fetchSuggestions, 
  input,
  setInput
  // centerLeftPercen,
}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const router = useRoute();

  const MAX_LENGTH = 26;

        const trimText = (text, maxLength) => {
          if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
          }
          return text;
        };


        const handleback = async() =>{
          await AsyncStorage.removeItem(
            'propertyFilters'
          );
          navigation.goBack()
        }

  return (
    <>
      <View
        className={`w-full relative flex flex-row items-center justify-between ${
          lightHeader ? 'bg-[#F2F8F6]' : 'bg-[#181A53]'
        }  px-6 pb-1 pt-3`}
        style={{height: !showSearch ? 60 : null}}>
        <TouchableOpacity
          style={{width: scale(12), height: verticalScale(14)}}
          onPress={() => handleback()}
          className="flex items-start justify-center">
          <Image
            style={{width: scale(12), height: verticalScale(14)}}
            source={{uri: lightHeader ? leftBlueIcon : leftIcon}}
            resizeMode="contain"
            className=" w-4 h-5"
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
              <View>
                <TextInput
                  className=" w-full text-base text-white"
                  placeholder="Search"
                  placeholderTextColor="white"
                  // autoFocus={true}
                  // {currentLocation
                  //         ? trimText(currentLocation, MAX_LENGTH)
                  //         : 'Fetching...'}
                  value={input ? trimText(input, MAX_LENGTH) : null}
                  onChangeText={text => fetchSuggestions(text)}
                />
              </View>
            </View>
            {/* {router.name === 'SearchPropertyScreen' ? (
            <View className=" bg-white/20 rounded-full mx-1 flex-1 px-3 flex flex-row items-center h-12">
              <Image
                source={{uri: searchIcon}}
                resizeMode="contain"
                className=" w-4 h-4 mr-2"
              />
              <TextInput
                className=" w-full text-base text-white"
                placeholder="Search"
                placeholderTextColor="white"
                autoFocus={true}
              />
            </View>
          ) : (
            <View className=" bg-white/20 rounded-full mx-1 flex-1 px-3 flex flex-row items-center h-12">
              <Image
                source={{uri: searchIcon}}
                resizeMode="contain"
                className=" w-4 h-4 mr-2"
              />
              <TouchableOpacity
                className="flex-1"
                onPress={() => navigation.navigate('SearchPropertyScreen')}
              >
                <Text className=' text-base text-white'>Search</Text>
              </TouchableOpacity>
            </View>
          )} */}
            <TouchableOpacity
              onPress={() => navigation.navigate('SearchPropertyScreen')}
              className=" bg-[#BDEA09] rounded-full flex items-center justify-center h-12 w-12">
              <Image
                source={{uri: filterIcon}}
                resizeMode="contain"
                className=" w-4 h-4"
              />
            </TouchableOpacity>
          </View>
        )}
        {centerTile && (
          <Text
            style={{fontSize: RFValue(18)}}
            className={`${
              lightHeader ? 'text-[#0E0E0C]' : 'text-white'
            }  font-medium absolute left-[46%] font-sans`}>
            {title}
          </Text>
        )}
        {RightComp && (
          <View style={{width: '40%',height:60}}>
            <RightComp />
          </View>
        )}
      </View>
    </>
  );
};

export default Header;
