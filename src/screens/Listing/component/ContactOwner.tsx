import {Image, Text, TouchableOpacity, View} from 'react-native';
import {coinStack, demoUser} from '../../../constants/imgURL';
import {useRef} from 'react';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

const ContactOwner = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const nocoinbottomSheetRef = useRef<BottomSheetModal>(null);
  return (
    <View className=" w-full p-3  rounded-lg bg-white">
      <View className=" flex flex-row items-center">
        <View>
          <Image
            source={{uri: demoUser}}
            resizeMode="contain"
            className=" w-10 h-10 rounded-full"
          />
        </View>
        <TouchableOpacity
          onPress={() => bottomSheetRef.current?.present()}
          className=" flex-1 rounded-full ml-3 bg-[#BDEA09] p-3">
          <Text className=" text-center text-base font-bold text-[#181A53]">
            Contact Owner
          </Text>
        </TouchableOpacity>
      </View>
      <View className="mt-2 flex flex-row justify-between items-center">
        <Text className=" text-sm text-[#181A5399] font-medium">Charges</Text>
        <Text className=" text-[#181A53] text-base font-bold">50 Coins</Text>
      </View>

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
        snapPoints={['50%']}
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
                  Do you want to contact the owner?
                </Text>
                <Text className="text-[#0E0E0C99] text-base">
                  You will require 50 coins to view contact details .
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
        snapPoints={['50%']}
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
              }}
              className="w-full p-3 bg-[#BDEA09] rounded-full mt-4">
              <Text className="text-[#181A53] text-base text-center font-medium">
                Recharge Now
              </Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};

export default ContactOwner;
