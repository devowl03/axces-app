import { Image, Text, TextInput, View } from 'react-native';

interface Props {
  title: string;
  onChangeHandler?: (text: string) => void;
  sideTitle?: string;
  placeholderText?: string;
  type?: string;
  subtitle?: string;
  value?: string;
}

const PropertyInput: React.FC<Props> = ({ title, sideTitle, placeholderText, subtitle, value, onChangeHandler, type }) => {
  console.log('value+++++', value);
  
  return (
    <View className=" px-6">
      <View className=" flex flex-row items-center">
        <Text className=" text-[#0E0E0C] text-base font-bold my-3 mr-1">
          {title}
        </Text>
        <Text className=" text-[#0E0E0C]/50 text-sm font-bold my-3">
          {subtitle}
        </Text>
      </View>

      <View className="py-2 px-4 flex flex-row items-center rounded-full bg-[#F2F8F6]">
        <TextInput
          placeholder={placeholderText || 'Optional'}
          placeholderTextColor="#181A53"
          className="text-[#181A53] text-base font-medium flex-1"
          value={value}
          keyboardType={type || 'default'}
          onChangeText={(text: string) => {
            if (onChangeHandler) {
              onChangeHandler(text);
            }
          }}
        />
        {sideTitle && (
          <Text className=" text-gray-700 text-sm">{sideTitle}</Text>
        )}
      </View>
    </View>
  );
};

export default PropertyInput
