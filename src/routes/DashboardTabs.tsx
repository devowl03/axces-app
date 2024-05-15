import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Dashboard/HomeScreen';
import SavedScreen from '../screens/Dashboard/SavedScreen';
import TabTile from '../component/tabs/TabTile';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const Tab = createBottomTabNavigator();

const DashboardTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          paddingHorizontal: 24,
          height: 72,
          paddingBottom: 24,
          paddingTop: 16,
        },
      }}>
      <Tab.Screen
    
        options={({route}) => ({
          tabBarButton: props => {
            return <TabTile tabProps={props} title={route.name} />;
          },
        })}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={({route}) => ({
          tabBarButton: props => {
            return <TabTile tabProps={props} title={route.name} />;
          },
        })}
        name="Wishlist"
        component={SavedScreen}
      />
      <Tab.Screen
        options={({route}) => ({
          tabBarButton: props => {
            return <TabTile tabProps={props} title={route.name} />;
          },
        })}
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default DashboardTabs;
