import {FC} from 'react';
import {Pressable, Text} from 'react-native';

import IButtonProps from './types';

import styles from './styles';

const Button: FC<IButtonProps> = ({
  text = '',
  onPress = () => {},
  inline = false,
}) => {
  return (
    <Pressable
      style={[styles.container, inline ? {flex: 1} : {}]}
      onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default Button;
