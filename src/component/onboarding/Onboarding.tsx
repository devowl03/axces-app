import {Image, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SwipeSection from './SwipeSection';
import {rightArrow} from '../../constants/imgURL';

const Onboarding = () => {
  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} className="flex-1">
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'transparent'}
        translucent
      />
      <View className="flex-1">
        <SwipeSection />
      </View>

      <View className="w-full  bg-[#181A53] flex items-center flex-row justify-between px-6 py-9">
        <TouchableOpacity>
          <Text className="text-[#BDEA09] text-base font-bold">Skip</Text>
        </TouchableOpacity>

        <TouchableOpacity className=" w-12 h-12 rounded-full bg-[#BDEA09] flex items-center justify-center">
          <Image
            source={{uri: rightArrow}}
            resizeMode="contain"
            className="w-4 h-4"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;
