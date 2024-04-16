import {createStackNavigator} from '@react-navigation/stack';
import OnboardScreen from '../screens/onboard/OnboardScreen';
import DashboardTabs from './DashboardTabs';
import PropertyListingScreen from '../screens/Listing/PropertyListingScreen';
import PropertyScreen from '../screens/Listing/PropertyScreen';
import FaqScreen from '../screens/FAQ/FaqScreen';

export type RootStackParamList = {
  Onboard: undefined;
  Dashboard: undefined;
  PropertyListing: undefined;
  PropertyScreen: {
    name: string
  };
  FaqScreen: undefined;
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
      <Stack.Screen name="PropertyScreen" component={PropertyScreen} />
      <Stack.Screen name="FaqScreen" component={FaqScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
