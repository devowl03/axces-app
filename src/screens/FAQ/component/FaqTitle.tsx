import {Image, Text, TouchableOpacity, View} from 'react-native';
import {minus, plus} from '../../../constants/imgURL';

interface Props {
  checker: number | 'ALL' | 'NONE';
  id: number;
  title: string;
  description: string;
  faqClickHandler: (titleId: number) => void;
}

const FaqTile: React.FC<Props> = ({
  checker,
  id,
  title,
  description,
  faqClickHandler,
}) => {
  return (
    <View className=" w-full border-b border-b-[#292929]/10 py-3">
      <TouchableOpacity onPress={() => faqClickHandler(id)} className=" flex flex-row items-center justify-between">
        <Text className=" text-[#292929] text-base font-medium">{title}</Text>
        {/* <TouchableOpacity onPress={() => faqClickHandler(id)}> */}
          {(checker === 'ALL' || checker === id) ? (
            <Image
              source={{uri: plus}}
              resizeMode="contain"
              className=" w-4 h-4"
            />
          ) : (
            <Image
              source={{uri: minus}}
              resizeMode="contain"
              className=" w-4 h-1"
            />
          )}
        {/* </TouchableOpacity> */}
      </TouchableOpacity>
      {(checker === id || checker === 'ALL') && (
        <Text className=" text-[#292929]/60 text-sm mt-4">{description}</Text>
      )}
    </View>
  );
};

export default FaqTile;
