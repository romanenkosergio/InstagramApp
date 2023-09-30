import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {Image} from 'react-native';
import {HomeStackNavigatorParamList} from '../types/navigation';

const Stack = createNativeStackNavigator<HomeStackNavigatorParamList>();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        component={HomeScreen}
        options={{headerTitle: HeaderTitle}}
      />
      <Stack.Screen
        name="UserProfile"
        component={ProfileScreen}
        options={{title: 'Profile'}}
      />
    </Stack.Navigator>
  );
};

const HeaderTitle = () => {
  return (
    <Image
      source={require('../assets/images/logo.png')}
      resizeMode="contain"
      style={{width: 150, height: 40}}
    />
  );
};

export default HomeStackNavigator;
