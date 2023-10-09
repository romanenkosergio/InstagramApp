import {FC, useEffect, useState} from 'react';
import {ActivityIndicator, Alert, TextInput, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useMutation, useQuery} from '@apollo/client';

import Button from '../../components/Button';
import ApiErrorMessage from '../../components/ApiErrorMessage';

import IUpdatePostScreenProps from './types';
import {
  CreateNavigationProp,
  UpdatePostRouteProp,
} from '../../types/navigation';
import {getPost, updatePost} from './queries';
import {
  CreatePostMutation,
  CreatePostMutationVariables,
  GetPostQuery,
  GetPostQueryVariables,
} from '../../API';
import styles from './styles';

const UpdatePostScreen: FC<IUpdatePostScreenProps> = () => {
  const [description, setDescription] = useState<string>('');
  const [doUpdatePost, {data: updateData, error: updateError}] = useMutation<
    CreatePostMutation,
    CreatePostMutationVariables
  >(updatePost);

  const route = useRoute<UpdatePostRouteProp>();
  const navigation = useNavigation<CreateNavigationProp>();

  const {id} = route.params;

  const {data, loading, error} = useQuery<GetPostQuery, GetPostQueryVariables>(
    getPost,
    {variables: {id}},
  );

  const post = data?.getPost;

  useEffect(() => {
    if (post) {
      setDescription(post?.description || '');
    }
  }, [post]);

  useEffect(() => {
    if (updateData) {
      navigation.goBack();
    }
  }, [updateData, navigation]);

  const submit = async () => {
    if (!post) {
      return;
    }
    try {
      await doUpdatePost({
        variables: {
          input: {
            id,
            description,
            nofLikes: post?.nofLikes || 0,
            nofComments: post?.nofComments || 0,
            userID: post?.userID || '',
          },
        },
      });
    } catch (e) {
      Alert.alert('Error uploading the post', (e as Error).message);
    }
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error || updateError) {
    return (
      <ApiErrorMessage
        message={error?.message || updateError?.message}
        title={'Error fetching post'}
      />
    );
  }

  return (
    <View style={styles.root}>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Description..."
        style={styles.input}
        multiline
        numberOfLines={5}
      />
      <Button text="Submit" onPress={submit} />
    </View>
  );
};

export default UpdatePostScreen;
