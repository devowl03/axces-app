import {StatusBar, Text} from 'react-native';
import {View} from 'react-native';
import Header from '../../component/Header/Header';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../routes/MainStack';
import {SafeAreaView} from 'react-native-safe-area-context';
import PropertyCarousel from '../../component/Carousel/Property/PropertyCarousel';

const PropertyScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView className="flex-1 bg-[#F2F8F6]">
      <StatusBar barStyle={'light-content'} backgroundColor={'#181A53'} />
      <Header />
      <View className="flex-1">
        <View className=" w-full h-[30vh] my-4">
          <PropertyCarousel />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PropertyScreen;
