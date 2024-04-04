import React from 'react';
import {StatusBar, Text, useColorScheme, View} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Onboarding from './src/component/onboarding/Onboarding';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <Onboarding />
    </SafeAreaProvider>
  );
}

export default App;
