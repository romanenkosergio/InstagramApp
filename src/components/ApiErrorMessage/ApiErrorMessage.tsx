import React, {FC} from 'react';
import {Image, Text, View} from 'react-native';

import Button from '../Button';

import ApiErrorMessageProps from './types';

import styles from './styles';

const ApiErrorMessage: FC<ApiErrorMessageProps> = ({
  title = 'Error',
  message = 'Unknown Error',
  onRetry = () => {},
}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('./error.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      <Button text="Retry" onPress={onRetry} />
    </View>
  );
};

export default ApiErrorMessage;
