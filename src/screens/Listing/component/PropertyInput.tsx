import {Image, Text, TextInput, View} from 'react-native';

interface Props {
    title: string;
    onChangeHandler?: () => void;
    sideTitle?:string;
    placeholderText?: string;
    type?: string;
}

const PropertyInput:React.FC<Props> = ({title, sideTitle,placeholderText}) => {
  return (
    <View className=' px-6'>
      <Text className=" text-[#0E0E0C] text-base font-bold my-3">
        {title}
      </Text>
      <View className="py-2 px-4 flex flex-1 flex-row items-center rounded-full bg-[#F2F8F6]">
        <TextInput
          placeholder={placeholderText || "Optional"}
          placeholderTextColor="#181A53"
          className="text-[#181A53] text-base font-medium flex-1"
        />
        {sideTitle && <Text className=' text-gray-700 text-sm'>{sideTitle}</Text>}
      </View>
    </View>
  );
};

export default PropertyInput
