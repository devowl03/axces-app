import {Text, TextInput, View, Image, TouchableOpacity} from 'react-native';

import {
  editPen,
  lockIc,
  mailIc,
  phoneIc,
  userIc,
} from '../../../constants/imgURL';
import {useRef} from 'react';

interface Props {
  type: 'Your name' | 'E-mail' | 'Mobile Number';
  value: string;
  editable: boolean;
}

const EditTile: React.FC<Props> = ({type, value, editable}) => {
  const inputRef = useRef<TextInput>(null);
  return (
    <View className=" w-full my-4">
      <Text className=" text-[#0E0E0C99] text-base mb-4">{type}</Text>
      <View className=" w-full py-2 px-6 bg-white rounded-full flex flex-row items-center">
        <Image
          source={{
            uri:
              type === 'Your name'
                ? userIc
                : type === 'E-mail'
                ? mailIc
                : phoneIc,
          }}
          resizeMode="contain"
          className=" w-4 h-5 mr-2"
        />
        <TextInput
          ref={inputRef}
          value={value}
          editable={editable}
          placeholder={type}
          placeholderTextColor={'#181A53'}
          className=" text-[#181A53] text-base flex-1"
        />
        {editable ? (
          <TouchableOpacity onPress={() => inputRef.current?.focus()}>
            <Image
              source={{uri: editPen}}
              resizeMode={'contain'}
              className=" w-4 h-4"
            />
          </TouchableOpacity>
        ) : (
          <Image
            source={{uri: lockIc}}
            resizeMode={'contain'}
            className=" w-4 h-4"
          />
        )}
      </View>
    </View>
  );
};

export default EditTile;
