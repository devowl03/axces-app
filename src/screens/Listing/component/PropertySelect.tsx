import {Text, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

interface Props {
  title: string;
  data: string[];
  defaultValue: string;
  onChangeHandler?: () => void;
}

const PropertySelect: React.FC<Props> = ({
  title,
  data,
  defaultValue,
  onChangeHandler,
}) => {
  return (
    <View className=" px-6 mt-3">
      <Text className=" text-[#0E0E0C] text-base font-bold my-3">{title}</Text>
      <SelectDropdown
        defaultValue={defaultValue}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        data={data}
        renderButton={selectedItem => (
          <View className=" px-10">
            <View
              className={`py-3 px-8 rounded-full  mr-4 bg-[#F2F8F6] w-full flex flex-row`}>
              <View className=" flex-1">
                <Text className=" text-base text-[#181A53] font-medium">
                  {selectedItem}
                </Text>
              </View>
            </View>
          </View>
        )}
        renderItem={(selectedItem, index, isSelected) => (
          <View>
            <Text>{selectedItem}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default PropertySelect;
