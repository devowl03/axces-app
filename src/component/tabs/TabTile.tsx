import {BottomTabBarButtonProps} from '@react-navigation/bottom-tabs';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {
  activeHome,
  activeProfileTabIc,
  activeWishlist,
  inactiveHome,
  profileTabIc,
  wishlist,
} from '../../constants/imgURL';
import { scale, verticalScale } from 'react-native-size-matters';
import { RFValue } from 'react-native-responsive-fontsize';

interface Props {
  tabProps: BottomTabBarButtonProps;
  title: string;
}

interface tabIconsInterface {
  icon: string;
  iconSelected: string;
}

export type tabs = 'Home' | 'Wishlist' | 'Profile';

const tabIconsData: {[key in tabs]: tabIconsInterface} = {
  Home: {
    icon: inactiveHome,
    iconSelected: activeHome,
  },
  Wishlist: {
    icon: wishlist,
    iconSelected: activeWishlist,
  },
  Profile: {
    icon: profileTabIc,
    iconSelected: activeProfileTabIc,
  },
};

const TabTile: React.FC<Props> = ({tabProps, title}) => {
  // console.log(tabProps.accessibilityState?.selected);
  return (
    <View className="flex-1 flex items-center ">
      <TouchableOpacity
        onPress={tabProps.onPress}
        className={` rounded-3xl flex flex-row items-center py-2 px-4 ${
          tabProps.accessibilityState?.selected ? 'bg-[#F2F8F6]' : 'bg-white'
        }`}>
        <Image
          source={{
            uri: tabProps.accessibilityState?.selected
              ? tabIconsData[title as tabs].iconSelected
              : tabIconsData[title as tabs].icon,
          }}
          style={{width: scale(16), height: verticalScale(16)}}
          resizeMode="contain"
        />
        {tabProps.accessibilityState?.selected && (
          <Text
          style={{fontSize: RFValue(12)}}
            className={`${
              tabProps.accessibilityState?.selected && 'text-[#BDEA09]'
            } font-semiboldS ml-2`}>
            {title}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default TabTile;
