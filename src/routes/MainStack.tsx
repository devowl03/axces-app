import {createStackNavigator} from '@react-navigation/stack';
import OnboardScreen from '../screens/onboard/OnboardScreen';
import DashboardTabs from './DashboardTabs';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false }}>
      <Stack.Screen name="dashboard" component={DashboardTabs} />
      <Stack.Screen name="onboard" component={OnboardScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
