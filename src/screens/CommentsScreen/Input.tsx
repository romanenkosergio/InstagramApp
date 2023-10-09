import {FC, useState} from 'react';
import {Keyboard, Text, TextInput, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useQuery} from '@apollo/client';

import UserImage from '../../components/UserImage';

import useCommentsService from '../../services/CommentsService';
import {useAuthContext} from '../../context/AuthContext';
import {IInputProps} from './types';
import {getUser} from '../ProfileScreen/queries';
import {GetUserQuery, GetUserQueryVariables} from '../../API';

import styles from './styles';

const Input: FC<IInputProps> = ({postId}) => {
  const [newComment, setNewComment] = useState<string>('');
  const {userId} = useAuthContext();

  const {data} = useQuery<GetUserQuery, GetUserQueryVariables>(getUser, {
    variables: {id: userId},
  });

  const {onCreateComment} = useCommentsService(postId);

  const insets = useSafeAreaInsets();

  const onPost = async () => {
    await onCreateComment(newComment);
    Keyboard.dismiss();
    setNewComment('');
  };

  return (
    <View style={[styles.root, {paddingBottom: insets.bottom}]}>
      <UserImage size={'xs'} imageKey={data?.getUser?.image || undefined} />
      <View style={styles.middleColumn}>
        <TextInput
          style={styles.input}
          placeholder="Add a comment..."
          value={newComment}
          onChangeText={setNewComment}
          multiline
        />
        {newComment !== '' && (
          <Text style={[styles.button, {bottom: 7}]} onPress={onPost}>
            POST
          </Text>
        )}
      </View>
    </View>
  );
};

export default Input;
