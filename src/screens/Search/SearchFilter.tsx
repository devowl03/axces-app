import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {filterNameType} from './SearchPropertyScreen';

interface Props {
  filterName: filterNameType;
  value: string | null;
  options: string[];
  onSelectHandler?: (value: string) => void;
}

const SearchFilter: React.FC<Props> = ({
  filterName,
  value,
  options,
  onSelectHandler,
}) => {
  return (
    <View className=" flex items-start mt-4">
      <Text className=" text-[#0E0E0C] text-base mx-6 font-bold mb-3">
        {filterName}
      </Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className=" w-full pl-6">
        {options.map((item, idx) => {
          return (
            <TouchableOpacity
              onPress={() => {
                if (onSelectHandler) {
                  onSelectHandler(item);
                }
              }}
              key={idx}
              className={` py-3 px-8 rounded-full ${
                value === item ? 'bg-[#BDEA09]' : 'bg-[#F2F8F6]'
              }  mr-4`}>
              <Text className=" text-[#181A53] text-base font-medium">
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
        {/* <TouchableOpacity className=" py-3 px-8 mr-4 rounded-full bg-[#BDEA09]">
          <Text className=" text-[#181A53] text-base font-medium">
            Commercial
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className=" py-3 px-8 mr-4 rounded-full bg-[#BDEA09]">
          <Text className=" text-[#181A53] text-base font-medium">
            Commercial
          </Text>
        </TouchableOpacity> */}
      </ScrollView>
    </View>
  );
};

export default SearchFilter;
