import {FC, useState} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify';
import {CognitoUser} from 'amazon-cognito-identity-js';

import FormInput from '../components/FormInput';
import CustomButton from '../components/CustomButton';
import SocialSignInButtons from '../components/SocialSignInButtons';
import {useAuthContext} from '../../../context/AuthContext';

import {SignInNavigationProp} from '../../../types/navigation';
import SignInData from './types';

import styles from './styles';

const SignInScreen: FC = () => {
  const {height} = useWindowDimensions();
  const navigation = useNavigation<SignInNavigationProp>();
  const [loading, setLoading] = useState<boolean>(false);
  const {setUser} = useAuthContext();

  const {control, handleSubmit, reset} = useForm<SignInData>();

  const onSignInPressed = async ({username, password}: SignInData) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const cognitoUser: CognitoUser = await Auth.signIn(username, password);
      setUser(cognitoUser);
    } catch (error) {
      if ((error as Error).name === 'UserNotConfirmedException') {
        navigation.navigate('Confirm email', {username});
        return;
      }
      Alert.alert('Error', (error as Error).message);
    } finally {
      setLoading(false);
      reset();
    }
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate('Forgot password');
  };

  const onSignUpPress = () => {
    navigation.navigate('Sign up');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={[styles.logo, {height: height * 0.3}]}
          resizeMode="contain"
        />

        <FormInput
          name="username"
          placeholder="Username"
          control={control}
          rules={{required: 'Username is required'}}
        />

        <FormInput
          name="password"
          placeholder="Password"
          secureTextEntry
          control={control}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 3,
              message: 'Password should be minimum 3 characters long',
            },
          }}
        />

        <CustomButton
          text={loading ? 'Loading...' : 'Sign In'}
          onPress={handleSubmit(onSignInPressed)}
        />

        <CustomButton
          text="Forgot password?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />

        <SocialSignInButtons />

        <CustomButton
          text="Don't have an account? Create one"
          onPress={onSignUpPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

export default SignInScreen;
