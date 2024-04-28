import {StatusBar, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CenterHeader from '../../component/Header/CenterHeader';
import Tracker from '../../component/ListProperty/Tracker';

const ListPropertyScreen = () => {
  return (
    <SafeAreaView className=" flex-1">
      <StatusBar backgroundColor={'#181A53'} />
      <CenterHeader title="List Property" />
      <View className=" flex-1">
        <Tracker stage={2} />
      </View>
    </SafeAreaView>
  );
};

export default ListPropertyScreen;
