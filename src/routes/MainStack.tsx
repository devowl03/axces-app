import {createStackNavigator} from '@react-navigation/stack';
import OnboardScreen from '../screens/onboard/OnboardScreen';
import DashboardTabs from './DashboardTabs';

export type RootStackParamList = {
  Onboard: undefined;
  Dashboard: undefined; // Make sure 'Dashboard' is spelled correctly
  // add other screens here
};

const Stack = createStackNavigator<RootStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false }}>
      <Stack.Screen name="Onboard" component={OnboardScreen} />
      <Stack.Screen name="Dashboard" component={DashboardTabs} />
    </Stack.Navigator>
  );
};

export default MainStack;
