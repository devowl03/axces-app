import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  bell,
  buyHouse,
  faqChatBot,
  greenDown,
  homeBanner,
  key,
  location,
  offerBanner,
  searchIcon,
  showcaseHome,
} from '../../constants/imgURL';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../routes/MainStack';
import {StackNavigationProp} from '@react-navigation/stack';

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView edges={[ 'left', 'right']} className="flex-1">
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'transparent'}
        translucent
      />
      <ScrollView className=" z-10 flex-1 bg-[#F2F8F6]">
        {/* Top Section */}
        


        <View
          style={{paddingTop: insets.top}}
          className=" overflow-visible w-full relative h-[60vh] rounded-b-2xl pb-8 ">
          <View className=" z-20 px-6 pt-6 flex flex-row justify-between">
            <View>
              <Text className=" text-white/60 font-medium text-sm">
                Current Location ahha
              </Text>
              <View className=" flex flex-row justify-start items-center">
                <Image
                  source={{uri: location}}
                  resizeMode="contain"
                  className=" w-5 h-5"
                />
                <View className=" flex flex-row ml-2">
                  <Text className=" text-base font-medium text-white">
                    Sector 15, gurgaon
                  </Text>
                  <Image
                    source={{uri: greenDown}}
                    resizeMode="contain"
                    className=" w-3 aspect-auto ml-1"
                  />
                </View>
              </View>
            </View>
            <TouchableOpacity className=" bg-white/10 rounded-full flex items-center justify-center w-10 h-10">
              <Image
                source={{uri: bell}}
                resizeMode="contain"
                className=" w-6 h-6"
              />
            </TouchableOpacity>
          </View>

          <View className=" z-20 px-6 absolute bottom-0 left-0 right-0">
            <Text className=" text-2xl text-white font-medium">
              Good Morning Vijay!
            </Text>
            <View className=" bg-white/20 rounded-full px-4 py-2 flex flex-row items-center mt-2">
              <Image
                source={{uri: searchIcon}}
                resizeMode="contain"
                className=" w-5 h-5 mr-2"
              />
              <TextInput
                className=" w-full text-base"
                placeholder="Search your dream home here"
                placeholderTextColor="white"
              />
            </View>
            <View className=" bg-white p-3 mt-4 rounded-2xl">
              <Text className="text-[#0E0E0C] text-base font-bold mb-3">
                What are you looking for today?
              </Text>
              <View className=" flex flex-row">
                <TouchableOpacity
                  onPress={() => navigation.navigate('PropertyListing')}
                  className=" flex-1 flex flex-row items-center justify-center mr-2 rounded-full bg-[#BDEA09] p-3">
                  <Image
                    source={{uri: buyHouse}}
                    resizeMode="contain"
                    className=" w-5 h-5 mr-3"
                  />
                  <Text className=" text-[#181A53] font-medium text-base">
                    Buy
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('PropertyListing')}
                  className=" flex-1  flex flex-row items-center justify-center rounded-full bg-[#BDEA09] p-3">
                  <Image
                    source={{uri: key}}
                    resizeMode="contain"
                    className=" w-5 h-5 mr-3"
                  />
                  <Text className=" text-[#181A53] font-medium text-base">
                    Rent
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Image
            source={{uri: homeBanner}}
            resizeMode="cover"
            className="w-full z-10 h-full absolute top-0 bottom-0 left-0 right-0 rounded-b-3xl"
          />
        </View>

        {/* Want to showcase */}

        <View className="px-6 my-6">
          <View className=" flex flex-row w-full bg-white rounded-xl">
            <View className=" flex-1 flex justify-between p-4">
              <Text className=" text-xl text-[#181A53] font-bold">
                Want to showcase your property?
              </Text>
              <Text className=" text-[#181A5399] text-sm">
                Boost your income by renting or selling your property
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('ListPropertyScreen')} className=" p-3 rounded-full border border-[#BDEA09]">
                <Text className=" text-[#BDEA09] text-base font-normal text-center">
                  List Here
                </Text>
              </TouchableOpacity>
            </View>
            <Image
              source={{uri: showcaseHome}}
              resizeMode="cover"
              className="w-[40%] h-[30vh] rounded-tr-xl rounded-br-xl"
            />
          </View>
        </View>

        {/* offer */}

        <View className="px-6 mb-6">
          <View className=" relative w-full px-4 pb-4 rounded-xl">
            <View className=" absolute top-0 left-0 right-0 flex items-center justify-center z-20  mx-auto">
              <View className=" bg-white/40 w-[90%] flex flex-row justify-between items-center px-2 py-1 rounded-b-xl">
                <Text className=" text-white text-sm">Use code</Text>
                <Text className=" text-base font-bold text-white"> FAB50</Text>
              </View>
            </View>
            <View className=" mt-10 z-20 flex flex-row justify-between items-center">
              <View>
                <Text className=" text-white text-4xl font-bold">5% off</Text>
                <Text className="text-white text-base ">on car wash</Text>
              </View>
              <TouchableOpacity className=" bg-white/30  rounded-full">
                <Text className=" text-white text-base py-3 px-8">
                  Book now
                </Text>
              </TouchableOpacity>
            </View>
            <Image
              source={{uri: offerBanner}}
              resizeMode="cover"
              className=" absolute top-0 left-0 right-0 bottom-0 rounded-xl z-10"
            />
          </View>
        </View>

        {/* check history */}

        <View className="px-6 mb-6">
          <View className=" flex flex-row w-full bg-white rounded-xl p-4">
            <View className=" flex-1">
              <Text className=" text-base font-medium text-[#181A53]">
                Check your recent views
              </Text>
            </View>
            <TouchableOpacity className=" flex-1 p-3 rounded-full border border-[#BDEA09]">
              <Text className=" text-[#BDEA09] text-base font-medium text-center">
                Check history
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Faq  */}

        <View className="px-6 mb-6">
          <View className=" w-full bg-white rounded-xl">
            <View className=" flex flex-row w-full">
              <View className=" flex-1 flex justify-between p-4">
                <Text className=" text-xl text-[#181A53] font-bold">
                  Got stuck? Check our FAQ
                </Text>
                <Text className=" text-[#181A5399] text-sm">
                  Unlock insights with our user-friendly FAQ guide
                </Text>
                {/* <TouchableOpacity className=" p-3 rounded-full border border-[#BDEA09]">
                <Text className=" text-[#BDEA09] text-base font-normal text-center">
                  List Here
                </Text>
              </TouchableOpacity> */}
              </View>
              <View className=" w-[40%] flex items-center justify-center">
                <Image
                  source={{uri: faqChatBot}}
                  resizeMode="contain"
                  className=" w-24 h-24  rounded-tr-xl rounded-br-xl"
                />
              </View>
            </View>
            <View className=" px-4 pb-4">
              <TouchableOpacity
                onPress={() => navigation.navigate('FaqScreen')}
                className=" p-3 rounded-full border border-[#BDEA09]">
                <Text className=" text-[#BDEA09] text-base font-normal text-center">
                  View FAQ's
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
