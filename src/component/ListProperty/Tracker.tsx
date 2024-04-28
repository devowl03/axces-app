import {Text, View} from 'react-native';

interface Props {
  stage: 1 | 2;
}

const Tracker: React.FC<Props> = ({stage}) => {
  return (
    <View className=" w-full bg-[#181A53] px-6 pt-6 flex flex-row items-start">
      <View
        className={` ${
          stage === 1 && 'border-b-4 border-b-[#BDEA09]'
        } flex-1 flex flex-row items-center justify-between pb-3 px-2`}>
        <View className=" flex-row flex items-center">
          <View className=" bg-[#BDEA09] w-8 h-8 rounded-full flex items-center justify-center mr-2">
            <Text className=" text-sm text-[#181A53] font-medium">01</Text>
          </View>
          <Text
            className={` text-sm font-medium ${
              stage === 2 ? 'text-[#BDEA09]' : ' text-white'
            } `}>
            Basic details
          </Text>
        </View>

        <View className=" bg-[#BDEA09] w-8 h-[2px]" />
      </View>
      <View
        className={` ${
          stage === 2 && 'border-b-4 border-b-[#BDEA09]'
        } flex-1 flex flex-row items-center px-2 pb-3`}>
        <View
          className={`${
            stage === 2 ? 'bg-[#BDEA09] ' : ' bg-white/25'
          } w-8 h-8 rounded-full flex items-center justify-center mr-2`}>
          <Text
            className={` ${
              stage === 2 ? 'text-[#181A53]' : ' text-white'
            } text-sm  font-medium`}>
            02
          </Text>
        </View>
        <Text className={` text-sm font-medium  text-white `}>
          Property details
        </Text>
        {/* <View className=' bg-[#BDEA09] w-8 h-[2px]' /> */}
      </View>
    </View>
  );
};

export default Tracker;
