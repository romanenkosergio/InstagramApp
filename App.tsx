import {FC} from 'react';
import {SafeAreaView} from 'react-native';

import PostUploadScreen from './src/screens/PostUploadScreen';

const App: FC = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <PostUploadScreen />
    </SafeAreaView>
  );
};

export default App;
