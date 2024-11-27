// import {Text, View} from 'react-native';
// import SelectDropdown from 'react-native-select-dropdown';

// interface Props {
//   title: string;
//   data: string[];
//   defaultValue: string;
//   defaultText?: string;
//   onChangeHandler?: (value: string) => void;
// }

// const PropertySelect: React.FC<Props> = ({
//   title,
//   data,
//   defaultValue,
//   onChangeHandler,
//   defaultText = "Select Property"
// }) => {
//   return (
//     <View className=" px-6 mt-3">
//       <Text className=" text-[#0E0E0C] text-base font-bold my-3">{title}</Text>
//       <SelectDropdown
//         defaultValue={defaultValue}
//         onSelect={(selectedItem, index) => {
//           console.log(selectedItem, index);
//           if (onChangeHandler) {
//             onChangeHandler(selectedItem)
//           }
//         }}
//         data={data}
//         renderButton={selectedItem => (
//           <View className=" px-10">
//             <View
//               className={`py-3 px-8 rounded-full  mr-4 bg-[#F2F8F6] w-full flex flex-row`}>
//               <View className=" flex-1">
//                 <Text className=" text-base text-[#181A53] font-medium">
//                   {selectedItem}
//                 </Text>
//               </View>
//             </View>
//           </View>
//         )}
//         renderItem={(selectedItem, index, isSelected) => (
//           <View style={{margin: 20, justifyContent: 'center'}}>
//             <Text>{selectedItem}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// export default PropertySelect;

import {Image, Text, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

interface Props {
  title: string;
  data: string[];
  defaultValue?: string; // defaultValue should be optional
  defaultText?: string;
  onChangeHandler?: (value: string) => void;
}

const PropertySelect: React.FC<Props> = ({
  title,
  data,
  defaultValue,
  onChangeHandler,
  defaultText = 'Please select an option',
}) => {
  console.log('defaultValue',defaultValue);
  
  return (
    <View style={{borderRadius: 20}} className="px-6 mt-3">
      <Text className="text-[#0E0E0C] text-base font-bold my-3">{title} *</Text>
      <SelectDropdown
        defaultValue={defaultValue}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
          if (onChangeHandler) {
            onChangeHandler(selectedItem);
          }
        }}
        data={data}
        renderButton={selectedItem => (
          <View className="px-10">
            <View
              style={{borderRadius: 20}}
              className={`py-3 px-8 rounded-full mr-4 bg-[#F2F8F6] w-full flex flex-row`}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}
                className="flex-1">
                <Text className="text-base text-[#181A53] font-medium">
                  {defaultValue || defaultText}
                </Text>
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/512/60/60995.png',
                  }}
                  style={{height: 12, width: 12, margin: 8}}
                />
              </View>
            </View>
          </View>
        )}
        renderItem={(selectedItem, index, isSelected) => (
          <View style={{padding: 14, justifyContent: 'center'}}>
            <Text style={{color: '#000000', fontWeight: '600', fontSize: 15}}>
              {selectedItem}
            </Text>
          </View>
        )}
        dropdownStyle={{backgroundColor: '#E9ECEF', borderRadius: 20}}
      />
    </View>
  );
};

export default PropertySelect;
