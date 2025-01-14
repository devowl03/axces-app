import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {filterNameType} from './SearchPropertyScreen';

interface Props {
  filterName: filterNameType;
  options: string[];
  value?: string[]; // Assuming value is still expected as an array
  onSelectHandler?: (value: string[]) => void; // Updated handler to accept an array of values
  wrap?: boolean;
}

const Facilities: React.FC<Props> = ({
  filterName,
  value = [],
  options,
  onSelectHandler,
  wrap,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  // Update selectedValues when value prop changes
  useEffect(() => {
    // Convert comma-separated string into an array and trim whitespace
    if (Array.isArray(value) && value.length > 0) {
      setSelectedValues(value[0].split(',').map(item => item.trim()));
    } else {
      setSelectedValues([]);
    }
  }, [value]);

  const handleSelect = (item: string) => {
    let newSelectedValues: string[];

    if (selectedValues.includes(item)) {
      newSelectedValues = selectedValues.filter(val => val !== item);
    } else {
      newSelectedValues = [...selectedValues, item];
    }

    setSelectedValues(newSelectedValues);

    if (onSelectHandler) {
      // Pass the selected values as a comma-separated string
      onSelectHandler([newSelectedValues.join(',')]);
    }
  };

  return (
    <View className="flex items-start mt-4">
      <Text className="text-[#0E0E0C] text-base mx-6 font-bold mb-3">
        {filterName}
      </Text>
      {wrap ? (
        <View className="flex flex-row flex-wrap w-full pl-6">
          {options.map((item, idx) => (
            <TouchableOpacity
              onPress={() => handleSelect(item)}
              key={idx}
              className={`py-3 px-8 rounded-full ${
                selectedValues.includes(item) ? 'bg-[#BDEA09]' : 'bg-[#F2F8F6]'
              } mr-4 my-2`}>
              <Text className="text-[#181A53] text-base font-medium">
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          className="w-full pl-6">
          {options.map((item, idx) => (
            <TouchableOpacity
              onPress={() => handleSelect(item)}
              key={idx}
              className={`py-3 px-8 rounded-full ${
                selectedValues.includes(item) ? 'bg-[#BDEA09]' : 'bg-[#F2F8F6]'
              } mr-4`}>
              <Text className="text-[#181A53] text-base font-medium">
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Facilities;
