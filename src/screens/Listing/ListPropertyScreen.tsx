import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CenterHeader from '../../component/Header/CenterHeader';
import Tracker from '../../component/ListProperty/Tracker';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../routes/MainStack';
import SearchFilter from '../Search/SearchFilter';
import {pinIcon} from '../../constants/imgURL';
import SelectDropdown from 'react-native-select-dropdown';

const ListPropertyScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView className=" flex-1 relative">
      <StatusBar backgroundColor={'#181A53'} />
      <CenterHeader title="List Property" />
      <ScrollView className=" flex-1 bg-white ">
        <Tracker stage={1} />
        <SearchFilter
          filterName="I'm"
          options={['Owner', 'Agent']}
          value={'Owner'}
        />
        <SearchFilter
          filterName="Looking to"
          options={['Sell', 'Rent']}
          value={'Sell'}
        />
        <SearchFilter
          filterName="Property Type"
          options={[
            'Apartment',
            'Independent House',
            'Builder floor',
            'Villa',
            'Studio',
            'Pent house',
          ]}
          value={'Studio'}
        />

        {/* <View className=" px-6 my-3">
          <SelectDropdown
            defaultValue={'Studio'}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            data={['Apartment', 'Studio']}
            renderButton={selectedItem => (
              <View className=" px-10">
                <View
                  className={`py-3 px-8 rounded-full  mr-4 bg-[#F2F8F6] w-full flex flex-row`}>
                  <View className=" flex-1">
                    <Text className=" text-base text-[#181A53] font-medium">
                      {selectedItem}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            renderItem={(selectedItem, index, isSelected) => (
              <View>
                <Text>{selectedItem}</Text>
              </View>
            )}
          />
        </View> */}

        <Text className=" text-[#0E0E0C] text-base mx-6 font-bold my-3">
          Add Pincode
        </Text>
        <View className="py-3 px-4 mx-6 flex flex-row items-center rounded-full bg-[#F2F8F6]">
          <Image
            source={{uri: pinIcon}}
            resizeMode="contain"
            className="w-2 h-5 mr-2"
          />
          <TextInput
            placeholder="Enter your pincode"
            placeholderTextColor="#181A53"
            className="text-[#181A53] text-base font-medium flex-1"
          />
        </View>
        <View className=" w-full h-[10vh]" />
      </ScrollView>
      <View className=" absolute bottom-0 left-0 right-0 px-6 py-3">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ListPropertyDetailScreen');
          }}
          className="w-full p-3 bg-[#BDEA09] rounded-full mt-4">
          <Text className="text-[#181A53] text-base text-center font-medium">
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ListPropertyScreen;
