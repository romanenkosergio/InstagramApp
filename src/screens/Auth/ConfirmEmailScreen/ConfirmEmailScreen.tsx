import React, {FC, useState} from 'react';
import {Alert, ScrollView, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import {useRoute} from '@react-navigation/native';
import {Auth} from 'aws-amplify';

import FormInput from '../components/FormInput';
import CustomButton from '../components/CustomButton';
import {
  ConfirmEmailNavigationProp,
  ConfirmEmailRouteProp,
} from '../../../types/navigation';
import ConfirmEmailData from './types';

import styles from './styles';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const ConfirmEmailScreen: FC = () => {
  const route = useRoute<ConfirmEmailRouteProp>();
  const {control, handleSubmit, watch} = useForm<ConfirmEmailData>({
    defaultValues: {username: route.params.username},
  });
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<ConfirmEmailNavigationProp>();

  const usr = watch('username');

  const onConfirmPressed = async ({username, code}: ConfirmEmailData) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      await Auth.confirmSignUp(username, code);
      navigation.navigate('Sign in');
    } catch (e) {
      Alert.alert('Oops', (e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const onSignInPress = () => {
    navigation.navigate('Sign in');
  };

  const onResendPress = async () => {
    try {
      await Auth.resendSignUp(usr);
    } catch (e) {
      Alert.alert('Oops', (e as Error).message);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Confirm your email</Text>

        <FormInput
          name="username"
          control={control}
          placeholder="username"
          rules={{
            required: 'Username is required',
          }}
        />

        <FormInput
          name="code"
          control={control}
          placeholder="Enter your confirmation code"
          rules={{
            required: 'Confirmation code is required',
          }}
        />

        <CustomButton
          text={loading ? 'Loading...' : 'Confirm'}
          onPress={handleSubmit(onConfirmPressed)}
        />

        <CustomButton
          text="Resend code"
          onPress={onResendPress}
          type="SECONDARY"
        />

        <CustomButton
          text="Back to Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

export default ConfirmEmailScreen;
