import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Onboarding from './src/component/onboarding/Onboarding';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './src/routes/MainStack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <SafeAreaProvider>
          <MainStack />
        </SafeAreaProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
