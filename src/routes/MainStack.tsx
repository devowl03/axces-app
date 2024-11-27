import { createStackNavigator } from '@react-navigation/stack';
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
import { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import ContactOwner from '../screens/Listing/component/ContactOwner';
import Splash from '../screens/Splash';
import RentPropertyListing from '../screens/Listing/RentPropertyListing';
import RentPropertyfilter from '../screens/Search/RentPropertyfilter';
import Notifications from '../screens/Notifications/Notifications';
import TransactionHistory from '../screens/Profile/TransactionHistory';

export type RootStackParamList = {
  Onboard: undefined;
  Dashboard: undefined;
  PropertyListing: undefined;
  PropertyScreen: {
    name: string;
    id: string;
  };
  FaqScreen: undefined;
  SearchPropertyScreen: undefined;
  ProfileEditScreen: undefined;
  ListPropertyScreen: undefined;
  ListPropertyDetailScreen: {
    selectedRole: string,
    lookingFor: string,
    propertyType: string,
    addPincode: string
  };
  UserPropertyListedScren: undefined;
  PhoneNumberScreen: undefined;
  OtpVerifyScreen: undefined;
  CreateAccScreen: undefined;
  ProfileSelectScreen: undefined;
  ContactOwner: undefined;
  // Make sure 'Dashboard' is spelled correctly
  // add other screens here
};

const Stack = createStackNavigator<RootStackParamList>();


const MainStack = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any>();

  function onAuthStateChanged(user: any) {
    console.log('user', user);
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Splash">
      {/* <Stack.Screen name="Dashboard" component={DashboardTabs} /> */}
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Onboard" component={OnboardScreen} />
      <Stack.Screen name="Dashboard" component={DashboardTabs} />
      <Stack.Screen name="PropertyListing" component={PropertyListingScreen} />
      <Stack.Screen name="FaqScreen" component={FaqScreen} />
      <Stack.Screen name="PropertyScreen" component={PropertyScreen} />
      <Stack.Screen name="TransactionHistory" component={TransactionHistory} />

      <Stack.Screen
        name="SearchPropertyScreen"
        component={SearchPropertyScreen}
      />
      <Stack.Screen name="ProfileEditScreen" component={ProfileEditScreen} />
      <Stack.Screen name="ListPropertyScreen" component={ListPropertyScreen} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen
        name="RentPropertyListing"
        component={RentPropertyListing}
      />
      <Stack.Screen
        name="ListPropertyDetailScreen"
        component={ListPropertyDetailScreen}
      />
      <Stack.Screen
        name="UserPropertyListedScren"
        component={UserPropertyListedScreen}
      />
      <Stack.Screen name="PhoneNumberScreen" component={PhoneNumberScreen} />
      <Stack.Screen name="OtpVerifyScreen" component={OtpVerifyScreen} />
      <Stack.Screen name="CreateAccScreen" component={CreateAccScreen} />
      <Stack.Screen
        name="ProfileSelectScreen"
        component={ProfileSelectScreen}
      />
      <Stack.Screen name="ContactOwner" component={ContactOwner} />
      <Stack.Screen name="RentPropertyfilter" component={RentPropertyfilter} />
    </Stack.Navigator>
  );
};

export default MainStack;
