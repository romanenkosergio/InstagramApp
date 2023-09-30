import {FC, useState} from 'react';
import {Image, Keyboard, ScrollView, Text, TextInput, View} from 'react-native';
import {Control, Controller, useForm} from 'react-hook-form';
import {launchImageLibrary} from 'react-native-image-picker';
import {Asset} from 'react-native-image-picker/src/types';

import user from '../../assets/data/user.json';

import styles from './styles';
import {IUser} from '../../types/models';
import colors from '../../theme/colors';

type IEditableUserField = 'name' | 'username' | 'website' | 'bio';
type IEditableUser = Pick<IUser, IEditableUserField>;

interface ICustomInput {
  control: Control<IEditableUser, object>;
  name: IEditableUserField;
  label: string;
  multiline?: boolean;
  rules: object;
}

const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

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
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={'Hello'}
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

const EditProfile: FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Asset | null>(null);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IEditableUser>({
    defaultValues: {
      name: user.name,
      username: user.username,
      website: user?.website,
      bio: user.bio,
    },
  });

  const onSubmit = (data: IEditableUser) => {
    console.warn('Submit', data);
    Keyboard.dismiss();
  };

  const onChangePhoto = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      ({didCancel, errorCode, assets}) => {
        if (!didCancel && !errorCode && assets && assets.length > 0) {
          setSelectedPhoto(assets[0]);
        }
      },
    );
  };

  return (
    <ScrollView
      contentContainerStyle={styles.page}
      automaticallyAdjustKeyboardInsets={true}>
      <Image
        style={styles.avatar}
        source={{
          uri: selectedPhoto?.uri || user.image,
        }}
      />
      <Text onPress={onChangePhoto} style={styles.textButton}>
        Change profile photo
      </Text>
      <CustomInput
        name="name"
        label="Name"
        control={control}
        rules={{required: 'Name is required'}}
      />
      <CustomInput
        name="username"
        label="Username"
        control={control}
        rules={{
          required: 'Username is required',
          minLength: {
            value: 3,
            message: 'Username should be more than 3 characters',
          },
        }}
      />
      <CustomInput
        name="website"
        label="Website"
        control={control}
        rules={{
          pattern: {
            value: URL_REGEX,
            message: 'Invalid URL',
          },
        }}
      />
      <CustomInput
        name="bio"
        label="Bio"
        multiline
        control={control}
        rules={{
          minLength: {
            value: 200,
            message: 'Bio should be more than 200 characters',
          },
        }}
      />
      <Text style={styles.textButton} onPress={handleSubmit(onSubmit)}>
        Submit
      </Text>
    </ScrollView>
  );
};

export default EditProfile;
