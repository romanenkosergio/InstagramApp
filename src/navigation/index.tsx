import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import CommentsScreen from '../screens/CommentsScreen';
import {RootNavigator} from './types';

const Stack = createNativeStackNavigator<RootNavigator>();

const Navigation = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{headerShown: true}}>
          <Stack.Screen
            name="Home"
            component={BottomTabNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Comments"
            component={CommentsScreen}
            options={{title: 'Profile'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default Navigation;
