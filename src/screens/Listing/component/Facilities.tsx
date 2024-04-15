import { Image, Text, View } from "react-native"
import { bedIcon } from "../../../constants/imgURL"

const Facilities = () => {
    return <View className="w-full">
    <Text className="text-[#0E0E0C] text-base font-bold mb-3">Facilities</Text>
    <View className=" w-full flex flex-row flex-wrap">
      <View className=" mr-2 mb-2 px-3 py-2 rounded-lg bg-white flex flex-row items-center">
        <Image
          source={{uri: bedIcon}}
          resizeMode="contain"
          className=" w-3 h-3 mr-2"
        />
        <Text className=" text-sm font-medium text-[#0E0E0C]">Free Breakfast</Text>
      </View>
      <View className="mr-2 mb-2 px-3 py-2 rounded-lg bg-white flex flex-row items-center">
        <Image
          source={{uri: bedIcon}}
          resizeMode="contain"
          className=" w-3 h-3 mr-2"
        />
        <Text className=" text-sm font-medium text-[#0E0E0C]">Free Wifi</Text>
      </View>
      <View className=" mr-2 mb-2 px-3 py-2 rounded-lg bg-white flex flex-row items-center">
        <Image
          source={{uri: bedIcon}}
          resizeMode="contain"
          className=" w-3 h-3 mr-2"
        />
        <Text className=" text-sm font-medium text-[#0E0E0C]">Fully Furnished</Text>
      </View>
      <View className="mr-2 mb-2 px-3 py-2 rounded-lg bg-white flex flex-row items-center">
        <Image
          source={{uri: bedIcon}}
          resizeMode="contain"
          className=" w-3 h-3 mr-2"
        />
        <Text className=" text-sm font-medium text-[#0E0E0C]">Full AC</Text>
      </View>
    </View>
  </View>
}
export default Facilities