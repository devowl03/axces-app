import {Image, Text, TouchableOpacity, View} from 'react-native';
import {minus, plus} from '../../../constants/imgURL';

interface Props {
  checker: boolean; // Updated to use boolean
  id: number;
  title: string;
  description: string;
  faqClickHandler: () => void; // Simplified
}

const FaqTile: React.FC<Props> = ({
  checker,
  title,
  description,
  faqClickHandler,
}) => {
  return (
    <View className="w-full border-b border-b-[#292929]/10 py-3">
      <TouchableOpacity
        onPress={faqClickHandler}
        className="flex flex-row items-center justify-between">
        <View style={{width: '85%'}}>
          <Text className="text-[#292929] text-base font-medium">{title}</Text>
        </View>
        <Image
          source={{uri: checker ? minus : plus}}
          resizeMode="contain"
          className={`w-4 ${checker ? 'h-1' : 'h-4'}`}
        />
      </TouchableOpacity>
      {checker && (
        <Text className="text-[#292929]/60 text-sm mt-4">{description}</Text>
      )}
    </View>
  );
};

export default FaqTile;
