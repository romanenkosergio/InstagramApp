import {FC} from 'react';
import {Alert, Text} from 'react-native';
import {useMutation} from '@apollo/client';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {Storage} from 'aws-amplify';

import {DeletePostMutation, DeletePostMutationVariables} from '../../API';
import {deletePost} from './queries';
import {useAuthContext} from '../../context/AuthContext';
import {FeedNavigationProp} from '../../types/navigation';
import {IPostMenuProps} from './types';

import styles from './styles';

const PostMenu: FC<IPostMenuProps> = ({post}) => {
  const [doDeletePost] = useMutation<
    DeletePostMutation,
    DeletePostMutationVariables
  >(deletePost, {
    variables: {input: {id: post.id}},
    errorPolicy: 'all',
  });
  const navigation = useNavigation<FeedNavigationProp>();

  const {userId} = useAuthContext();
  const isPostOwner = userId === post.userID;

  const startDeletingPost = async () => {
    try {
      if (post?.image) {
        await Storage.remove(post.image);
      }
      if (post?.video) {
        await Storage.remove(post.video);
      }
      if (post?.images) {
        await Promise.all(post.images.map(img => Storage.remove(img)));
      }
      await doDeletePost();
    } catch (error) {
      Alert.alert('Failed to delete post', (error as Error).message);
    }
  };
  const onDeleteOptionPressed = () => {
    Alert.alert('Are you sure?', 'Deleting a post is permanent.', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete post',
        style: 'destructive',
        onPress: startDeletingPost,
      },
    ]);
  };

  const onEditOptionPressed = () => {
    navigation.navigate('UpdatePost', {id: post.id});
  };

  return (
    <Menu renderer={renderers.SlideInMenu} style={styles.threeDots}>
      <MenuTrigger>
        <Entypo name="dots-three-horizontal" size={16} />
      </MenuTrigger>
      <MenuOptions>
        <MenuOption onSelect={() => Alert.alert('Reporting')}>
          <Text style={styles.optionText}>Report</Text>
        </MenuOption>
        {isPostOwner && (
          <>
            <MenuOption onSelect={onDeleteOptionPressed}>
              <Text style={[styles.optionText, {color: 'red'}]}>Delete</Text>
            </MenuOption>
            <MenuOption onSelect={onEditOptionPressed}>
              <Text style={styles.optionText}>Edit</Text>
            </MenuOption>
          </>
        )}
      </MenuOptions>
    </Menu>
  );
};

export default PostMenu;
