import {BottomTabBarButtonProps} from '@react-navigation/bottom-tabs';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {activeHome, inactiveHome} from '../../constants/imgURL';

interface Props {
  tabProps: BottomTabBarButtonProps;
  title: string;
}

interface tabIconsInterface {
  icon: string;
  iconSelected: string;
}

export type tabs = 'Home' | 'Saved' | 'Profile';

const tabIconsData: {[key in tabs]: tabIconsInterface} = {
  Home: {
    icon: inactiveHome,
    iconSelected: activeHome,
  },
  Saved: {
    icon: inactiveHome,
    iconSelected: activeHome,
  },
  Profile: {
    icon: inactiveHome,
    iconSelected: activeHome,
  },
};

const TabTile: React.FC<Props> = ({tabProps, title}) => {
  console.log(tabProps.accessibilityState?.selected);
  return (
    <View className="flex-1 flex items-center ">
      <TouchableOpacity
        onPress={tabProps.onPress}
        className={` rounded-3xl flex flex-row py-2 px-6  ${
          tabProps.accessibilityState?.selected ? 'bg-[#F2F8F6]' : 'bg-white'
        }`}>
        <Image
          source={{
            uri: tabProps.accessibilityState?.selected
              ? tabIconsData[title as tabs].iconSelected
              : tabIconsData[title as tabs].icon,
          }}
          className=" w-5 h-5 mr-2"
        />
        {tabProps.accessibilityState?.selected && (
          <Text
            className={`${
              tabProps.accessibilityState?.selected && 'text-[#BDEA09]'
            } font-semibold`}>
            {title}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default TabTile;
