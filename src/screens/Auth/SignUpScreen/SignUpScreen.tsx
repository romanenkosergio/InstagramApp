import {useState} from 'react';
import {Alert, ScrollView, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';

import FormInput from '../components/FormInput';
import CustomButton from '../components/CustomButton';
import SocialSignInButtons from '../components/SocialSignInButtons';

import SignUpData from './types';
import {SignUpNavigationProp} from '../../../types/navigation';

import styles from './styles';
import {Auth} from 'aws-amplify';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUpScreen = () => {
  const {control, handleSubmit, watch} = useForm<SignUpData>();
  const pwd = watch('password');
  const navigation = useNavigation<SignUpNavigationProp>();
  const [loading, setLoading] = useState(false);

  const onRegisterPressed = async ({
    name,
    username,
    password,
    email,
  }: SignUpData) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {email, name},
      });
      navigation.navigate('Confirm email', {username});
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const onSignInPress = () => {
    navigation.navigate('Sign in');
  };

  const onTermsOfUsePressed = () => {
    console.warn('onTermsOfUsePressed');
  };

  const onPrivacyPressed = () => {
    console.warn('onPrivacyPressed');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Create an account</Text>

        <FormInput
          name="name"
          control={control}
          placeholder="Full name"
          rules={{
            required: 'Name is required',
            minLength: {
              value: 3,
              message: 'Name should be at least 3 characters long',
            },
            maxLength: {
              value: 24,
              message: 'Name should be max 24 characters long',
            },
          }}
        />

        <FormInput
          name="username"
          control={control}
          placeholder="Username"
          rules={{
            required: 'username is required',
          }}
        />
        <FormInput
          name="email"
          control={control}
          placeholder="Email"
          rules={{
            required: 'Email is required',
            pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
          }}
        />
        <FormInput
          name="password"
          control={control}
          placeholder="Password"
          secureTextEntry
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password should be at least 8 characters long',
            },
          }}
        />
        <FormInput
          name="passwordRepeat"
          control={control}
          placeholder="Repeat Password"
          secureTextEntry
          rules={{
            validate: (value: string) =>
              value === pwd || 'Password do not match',
          }}
        />

        <CustomButton
          text={loading ? 'Loading...' : 'Register'}
          onPress={handleSubmit(onRegisterPressed)}
        />

        <Text style={styles.text}>
          By registering, you confirm that you accept our{' '}
          <Text style={styles.link} onPress={onTermsOfUsePressed}>
            Terms of Use
          </Text>{' '}
          and{' '}
          <Text style={styles.link} onPress={onPrivacyPressed}>
            Privacy Policy
          </Text>
        </Text>

        <SocialSignInButtons />

        <CustomButton
          text="Have an account? Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;
