import {
  Image,
  Modal,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CenterHeader from '../../component/Header/CenterHeader';
import Tracker from '../../component/ListProperty/Tracker';
import PropertyInput from './component/PropertyInput';
import PropertySelect from './component/PropertySelect';
import SearchFilter from '../Search/SearchFilter';
import {useRef, useState} from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {cloudMoney, coinStack, pinIcon} from '../../constants/imgURL';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/MainStack';

const ListPropertyDetailScreen = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const nocoinbottomSheetRef = useRef<BottomSheetModal>(null);
  const [selected, setSelected] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <BottomSheetModalProvider>
      <SafeAreaView className=" flex-1 relative">
        <StatusBar backgroundColor={'#181A53'} />
        <CenterHeader title="List Property" />
        <ScrollView className=" flex-1 bg-white">
          <Tracker stage={2} />
          <PropertyInput title="Building/ Property/ Society Name" />
          <PropertySelect
            title="Bedrooms"
            data={['2BHK', '3BHK', '4BHK']}
            defaultValue="2BHK"
          />
          <PropertyInput
            title="Built up area"
            sideTitle="sqft"
            placeholderText="Area of property"
            type="number"
          />
          <PropertyInput
            title="Your floor"
            placeholderText="Enter your floor number"
          />
          <PropertyInput title="Facing" placeholderText="North, East, ..." />
          <PropertyInput
            title="Total flooor number"
            placeholderText="Enter your floor number"
          />
          <SearchFilter
            filterName="Furnish Type"
            options={['Fully Furnished', 'Semi Furnished']}
            value={'Fully Furnished'}
          />
          <View className=" flex items-start mx-6 mt-4">
            <Text className=" text-[#0E0E0C] text-base font-bold mb-3">
              Add Localities
            </Text>
            <TouchableOpacity className=" py-3 px-8 rounded-full bg-[#BDEA09]">
              <Text className=" text-[#181A53] text-base font-medium">
                Add locality
              </Text>
            </TouchableOpacity>
          </View>

          <PropertyInput title="Security Deposit" placeholderText="Amount" />

          <View className=" w-full h-[15vh]" />
        </ScrollView>
        <View className=" absolute bottom-0 left-0 right-0 px-6 py-3 bg-white">
          <View className=" flex flex-row items-center ">
            <TouchableOpacity
              onPress={() => setSelected(prev => !prev)}
              className={`w-4 h-4 ${
                selected
                  ? ' bg-black/10 border border-white/60'
                  : ' bg-[#BDEA09]'
              }  rounded-full  `}
            />
            <Text className=" text-base text-[#181A53] font-medium ml-2">
              Agree with{' '}
              <Text className=" text-[#0171FF]">TERMS & CONDITIONS</Text>
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => bottomSheetRef.current?.present()}
            className="w-full p-3 bg-[#BDEA09] rounded-full mt-2">
            <Text className="text-[#181A53] text-base text-center font-medium">
              Next
            </Text>
          </TouchableOpacity>
        </View>
        <Modal
          visible={showModal}
          transparent={true}
          statusBarTranslucent={true}
          animationType="fade">
          <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
            <View className=" flex-1  items-center justify-center bg-black/80">
              <TouchableWithoutFeedback>
                <View className="  rounded-lg p-4 bg-white w-[80%] relative pt-7">
                  <Text className=" text-black text-base font-bold">
                    Congratulations!!!
                  </Text>
                  <Text className=" text-[#34AF48]">
                    Property has been listed successfully
                  </Text>
                  <View className="py-2 px-4 mt-2 flex flex-row items-center rounded-full bg-[#F2F8F6]">
                    <Image
                      source={{uri: pinIcon}}
                      resizeMode="contain"
                      className="w-2 h-5 mr-2"
                    />
                    <Text className=" text-sm text-[#181A53]">
                      At- 122345, Indira nagar, New delhi
                    </Text>
                  </View>
                  <TouchableOpacity
                      onPress={() =>{
                        setShowModal(false);
                        navigation.navigate('Dashboard')
                      }}
                      className="w-full p-2 bg-[#BDEA09] rounded-full mt-6">
                      <Text className="text-[#181A53] text-base text-center font-medium">
                        Go home
                      </Text>
                    </TouchableOpacity>
                  <Image
                    source={{
                      uri: 'https://res.cloudinary.com/krishanucloud/image/upload/v1714417323/ZomatoSmile_ojmpkp.png',
                    }}
                    resizeMode="contain"
                    className=" w-12 h-12 absolute -top-6 left-4"
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </SafeAreaView>
      {/* ASK USER SHEET */}

      <BottomSheetModal
        backdropComponent={props => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            onPress={() => bottomSheetRef.current?.close()}
            opacity={0.2}
          />
        )}
        keyboardBehavior="interactive"
        ref={bottomSheetRef}
        snapPoints={['40%']}
        handleIndicatorStyle={{height: 0}}
        handleStyle={{
          backgroundColor: 'white',
          borderTopRightRadius: 24,
          borderTopLeftRadius: 24,
          height: 28,
        }}>
        <BottomSheetView style={{flex: 1}}>
          <View
            style={{
              flex: 1,
            }}
            className="px-7">
            <View className="w-full flex flex-row items-start border-b border-b-black/10 pb-4">
              <View className="mr-4">
                <Image
                  source={{uri: coinStack}}
                  resizeMode="contain"
                  className="w-10 h-10"
                />
              </View>
              <View className="flex-1 pr-6">
                <Text className="text-[#0E0E0C] text-lg font-bold">
                  Do you want to list your property?
                </Text>
                <Text className="text-[#0E0E0C99] text-base">
                  You will require 50 coins to list your property
                </Text>
              </View>
            </View>
            <View className="border-b border-b-black/10 py-4">
              <View className=" flex bg-[#F2F8F6] rounded-full flex-row justify-between items-center px-3 py-2">
                <Text className="text-[#181A53] text-lg">
                  Available coins: <Text className="font-bold">50</Text>
                </Text>
                <TouchableOpacity className=" bg-[#BDEA09] rounded-full px-3 py-1">
                  <Text className="text-[#181A53] text-base">+ Add coins</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className=" py-4 flex flex-row items-center">
              <TouchableOpacity
                onPress={() => bottomSheetRef.current?.close()}
                className="flex-1 bg-[#F2F8F6] rounded-full p-3 mr-5">
                <Text className="text-[#181A53] text-base text-center font-medium">
                  No take me back
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  bottomSheetRef.current?.close();
                  nocoinbottomSheetRef.current?.present();
                }}
                className="flex-1 bg-[#BDEA09] rounded-full p-3 ">
                <Text className="text-[#181A53] text-base text-center font-medium">
                  Yes, I agree
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>

      {/* NO COIN SHEET */}
      <BottomSheetModal
        backdropComponent={props => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            onPress={() => nocoinbottomSheetRef.current?.close()}
            opacity={0.2}
          />
        )}
        keyboardBehavior="interactive"
        ref={nocoinbottomSheetRef}
        snapPoints={['40%']}
        handleIndicatorStyle={{height: 0}}
        handleStyle={{
          backgroundColor: 'white',
          borderTopRightRadius: 24,
          borderTopLeftRadius: 24,
          height: 28,
        }}>
        <BottomSheetView style={{flex: 1}}>
          <View
            style={{
              flex: 1,
            }}
            className="px-7">
            <View className=" flex bg-[#F2F8F6] rounded-lg flex-row justify-between items-center px-3 py-2">
              <Text className="text-[#181A53] text-lg">Your coins</Text>
              <Text className="text-[#181A53] text-lg">0</Text>
              {/* <TouchableOpacity className=" bg-[#BDEA09] rounded-full px-3 py-1">
                <Text className="text-[#181A53] text-base">+ Add coins</Text>
              </TouchableOpacity> */}
            </View>
            <Text className="text-[#0E0E0C] text-2xl font-bold my-3">
              Recharge Now!!
            </Text>
            <Text className=" text-[#0E0E0CCC] text-base font-medium border-b border-b-black/10">
              Two simple steps
            </Text>
            <View className=" flex flex-row w-full items-center justify-start mt-3">
              <View className="mr-4">
                <Image
                  source={{uri: coinStack}}
                  resizeMode="contain"
                  className="w-5 h-5"
                />
              </View>
              <Text className=" text-[#0E0E0C99] text-base">
                Add AXCES coins to your wallet
              </Text>
            </View>
            <View className=" flex flex-row w-full items-center justify-start mt-3">
              <View className="mr-4">
                <Image
                  source={{uri: coinStack}}
                  resizeMode="contain"
                  className="w-5 h-5"
                />
              </View>
              <Text className=" text-[#0E0E0C99] text-base">
                Seamlessly access to our services
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                nocoinbottomSheetRef.current?.close();
                bottomSheetRef.current?.dismiss();
                setShowModal(true);
              }}
              className="w-full p-3 bg-[#BDEA09] rounded-full mt-4">
              <Text className="text-[#181A53] text-base text-center font-medium">
                Recharge Now
              </Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default ListPropertyDetailScreen;
