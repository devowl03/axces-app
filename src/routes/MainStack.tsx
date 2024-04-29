import {createStackNavigator} from '@react-navigation/stack';
import OnboardScreen from '../screens/onboard/OnboardScreen';
import DashboardTabs from './DashboardTabs';
import PropertyListingScreen from '../screens/Listing/PropertyListingScreen';
import PropertyScreen from '../screens/Listing/PropertyScreen';
import FaqScreen from '../screens/FAQ/FaqScreen';
import SearchPropertyScreen from '../screens/Search/SearchPropertyScreen';
import ProfileEditScreen from '../screens/Profile/ProfileEditScreen';
import ListPropertyScreen from '../screens/Listing/ListPropertyScreen';
import ListPropertyDetailScreen from '../screens/Listing/ListPropertyDetailScreen';
import UserPropertyListedScreen from '../screens/Listing/UserPropertyListedScreen';
import PhoneNumberScreen from '../screens/onboard/PhoneNumberScreen';
import OtpVerifyScreen from '../screens/onboard/OtpVerifyScreen';
import CreateAccScreen from '../screens/onboard/CreateAccScreen';
import ProfileSelectScreen from '../screens/onboard/ProfileSelectScreen';

export type RootStackParamList = {
  Onboard: undefined;
  Dashboard: undefined;
  PropertyListing: undefined;
  PropertyScreen: {
    name: string;
  };
  FaqScreen: undefined;
  SearchPropertyScreen: undefined;
  ProfileEditScreen: undefined;
  ListPropertyScreen: undefined;
  ListPropertyDetailScreen: undefined;
  UserPropertyListedScren: undefined;
  PhoneNumberScreen: undefined;
  OtpVerifyScreen: undefined;
  CreateAccScreen:undefined;
  ProfileSelectScreen:undefined;
  // Make sure 'Dashboard' is spelled correctly
  // add other screens here
};

const Stack = createStackNavigator<RootStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Onboard" component={OnboardScreen} />
      <Stack.Screen name="Dashboard" component={DashboardTabs} />
      <Stack.Screen name="PropertyListing" component={PropertyListingScreen} />
      <Stack.Screen name="FaqScreen" component={FaqScreen} />
      <Stack.Screen name="PropertyScreen" component={PropertyScreen} />
      <Stack.Screen
        name="SearchPropertyScreen"
        component={SearchPropertyScreen}
      />
      <Stack.Screen name="ProfileEditScreen" component={ProfileEditScreen} />
      <Stack.Screen name="ListPropertyScreen" component={ListPropertyScreen} />
      <Stack.Screen name="ListPropertyDetailScreen" component={ListPropertyDetailScreen} />
      <Stack.Screen name="UserPropertyListedScren" component={UserPropertyListedScreen} />
      <Stack.Screen name="PhoneNumberScreen" component={PhoneNumberScreen} />
      <Stack.Screen name="OtpVerifyScreen" component={OtpVerifyScreen} />
       <Stack.Screen name="CreateAccScreen" component={CreateAccScreen} />
       <Stack.Screen name="ProfileSelectScreen" component={ProfileSelectScreen} />
      
    </Stack.Navigator>
  );
};

export default MainStack;
