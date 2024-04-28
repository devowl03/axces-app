import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CenterHeader from '../../component/Header/CenterHeader';

const ListPropertyDetailScreen = () => {
  return (
    <SafeAreaView className=" flex-1">
      <StatusBar backgroundColor={'#181A53'} />
      <CenterHeader title='List Property'/>
    </SafeAreaView>
  );
};

export default ListPropertyDetailScreen;