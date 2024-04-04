import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Onboarding from './src/component/onboarding/Onboarding';

function App(): React.JSX.Element {

  return (
    <SafeAreaProvider>
      <Onboarding />
    </SafeAreaProvider>
  );
}

export default App;
