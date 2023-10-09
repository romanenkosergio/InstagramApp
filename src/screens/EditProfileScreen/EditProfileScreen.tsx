import {FC, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  ScrollView,
  Text,
} from 'react-native';
import {useForm} from 'react-hook-form';
import {launchImageLibrary} from 'react-native-image-picker';
import {Asset} from 'react-native-image-picker/src/types';
import {useLazyQuery, useMutation, useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {Auth} from 'aws-amplify';

import ApiErrorMessage from '../../components/ApiErrorMessage';
import CustomInput from './CustomInput';

import {
  DeleteUserMutation,
  DeleteUserMutationVariables,
  GetUserQuery,
  GetUserQueryVariables,
  UpdateUserInput,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  UserByUsernameQuery,
  UserByUsernameQueryVariables,
} from '../../API';
import {getUser} from '../ProfileScreen/queries';
import {useAuthContext} from '../../context/AuthContext';
import {IEditableUser} from './types';
import {deleteUser, updateUser, userByUsername} from './queries';
import {URL_REGEX} from '../../config';
import useUploadService from '../../services/UploadServise';

import styles from './styles';
import UserImage from '../../components/UserImage/UserImage';

const EditProfile: FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Asset | null>(null);
  const {control, handleSubmit, setValue} = useForm<IEditableUser>();
  const navigation = useNavigation();
  const {userId, user: authUser} = useAuthContext();

  const {uploadMedia} = useUploadService(true);

  const {data, loading, error} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {variables: {id: userId}},
  );

  const [getUsetByUsername, {}] = useLazyQuery<
    UserByUsernameQuery,
    UserByUsernameQueryVariables
  >(userByUsername);

  const user = data?.getUser;

  const [doUpdateUser, {loading: updateLoading, error: updateError}] =
    useMutation<UpdateUserMutation, UpdateUserMutationVariables>(updateUser);

  const [doDelete, {loading: deleteLoading, error: deleteError}] = useMutation<
    DeleteUserMutation,
    DeleteUserMutationVariables
  >(deleteUser);

  useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('username', user.username);
      setValue('website', user.website);
      setValue('bio', user.bio);
    }
  }, [user, setValue]);

  const onSubmit = async (editData: IEditableUser) => {
    const input: UpdateUserInput = {...editData, id: userId};
    if (selectedPhoto?.uri) {
      input.image = await uploadMedia(selectedPhoto.uri);
    }
    Keyboard.dismiss();
    await doUpdateUser({
      variables: {input},
    });

    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const confirmDelete = () => {
    Alert.alert('Are you sure?', 'Deleting user profile is permanent ', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes, delete',
        style: 'destructive',
        onPress: startDeleting,
      },
    ]);
  };

  const startDeleting = async () => {
    if (!user) {
      return;
    }
    // Delete from DB
    await doDelete({
      variables: {input: {id: userId}},
    });
    // Delete from Cognito
    authUser?.deleteUser(err => {
      if (err) {
        console.log('Error deleting user from Cognito', err);
      }
      Auth.signOut();
    });
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

  const validateUsername = async (username: string) => {
    try {
      const response = await getUsetByUsername({variables: {username}});
      if (response.error) {
        Alert.alert('Failed to fetch user');
        return 'Failed to fetch user';
      }
      const users = response.data?.userByUsername?.items;
      if (users && users.length > 0 && users?.[0]?.id !== userId) {
        return 'Username already exists';
      }
    } catch (er) {
      Alert.alert('Failed to fetch user');
    }
    return true;
  };

  if (error || updateError || deleteError) {
    return (
      <ApiErrorMessage
        message={error?.message || updateError?.message || deleteError?.message}
        title={'Error fetching or updating user'}
      />
    );
  }

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView
      contentContainerStyle={styles.page}
      automaticallyAdjustKeyboardInsets={true}>
      <UserImage
        selectedUri={selectedPhoto?.uri}
        imageKey={user?.image || undefined}
        size="lg"
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
          validate: validateUsername,
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
            value: 2,
            message: 'Bio should be more than 200 characters',
          },
        }}
      />
      <Text style={styles.textButton} onPress={handleSubmit(onSubmit)}>
        {updateLoading ? 'Submitting...' : 'Submit'}
      </Text>
      <Text style={styles.textButtonDanger} onPress={confirmDelete}>
        {deleteLoading ? 'Deleting...' : 'DELETE USER'}
      </Text>
    </ScrollView>
  );
};

export default EditProfile;
