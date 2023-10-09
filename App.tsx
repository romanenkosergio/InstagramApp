import 'react-native-get-random-values';
import {FC} from 'react';
import {Linking} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Amplify} from 'aws-amplify';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {MenuProvider} from 'react-native-popup-menu';
import relativeTime from 'dayjs/plugin/relativeTime';
import * as dayjs from 'dayjs';

import AuthContextProvider from './src/context/AuthContext';
import Client from './src/apollo/Client';
import Navigation from './src/navigation';

import config from './src/aws-exports';

dayjs.extend(relativeTime);

const urlOpener = async (url: string, redirectUrl: string): Promise<void> => {
  await InAppBrowser.isAvailable();
  const authSessionResult = await InAppBrowser.openAuth(url, redirectUrl, {
    showTitle: false,
    enableUrlBarHiding: true,
    enableDefaultShare: false,
    ephemeralWebSession: false,
  });

  if (authSessionResult.type === 'success') {
    Linking.openURL(authSessionResult.url);
  }
};

Amplify.configure({...config, oauth: {...config.oauth, urlOpener}});

const App: FC = () => {
  return (
    <SafeAreaProvider>
      <MenuProvider>
        <AuthContextProvider>
          <Client>
            <Navigation />
          </Client>
        </AuthContextProvider>
      </MenuProvider>
    </SafeAreaProvider>
  );
};

export default App;
