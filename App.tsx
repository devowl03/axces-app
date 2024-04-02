import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView className=" flex-1">
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View className=" flex-1 bg-[#181A53] flex items-center justify-center">
        <Text className=" text-black text-xl "> Axces App</Text>
      </View>
    </SafeAreaView>
  );
}

export default App;
