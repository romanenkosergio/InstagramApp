import {FC} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Amplify} from 'aws-amplify';

import Navigation from './src/navigation';
import AuthContextProvider from './src/context/AuthContext';

import awsExports from './src/aws-exports';

Amplify.configure(awsExports);

const App: FC = () => {
  return (
    <SafeAreaProvider>
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </SafeAreaProvider>
  );
};

export default App;
