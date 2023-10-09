import {FC} from 'react';
import {Controller} from 'react-hook-form';
import {Text, TextInput, View} from 'react-native';

import {ICustomInput} from './types';

import styles from './styles';
import colors from '../../theme/colors';

const CustomInput: FC<ICustomInput> = ({
  label,
  multiline = false,
  control,
  name,
  rules = {},
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{label}</Text>
          <View style={{flex: 1}}>
            <TextInput
              value={value || ''}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={'Hello'}
              autoCapitalize="none"
              style={[
                styles.input,
                {borderColor: error ? colors.error : colors.border},
              ]}
              multiline={multiline}
            />
            {error && (
              <Text style={{color: colors.error}}>
                {error.message || 'Error'}
              </Text>
            )}
          </View>
        </View>
      )}
    />
  );
};

export default CustomInput;
