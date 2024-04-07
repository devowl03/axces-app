import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Onboarding from './src/component/onboarding/Onboarding';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './src/routes/MainStack';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <MainStack />
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

export default App;
