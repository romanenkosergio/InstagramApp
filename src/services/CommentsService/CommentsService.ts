import {useMutation, useQuery} from '@apollo/client';
import {Alert} from 'react-native';

import {
  CreateCommentMutation,
  CreateCommentMutationVariables,
  GetPostQuery,
  GetPostQueryVariables,
  UpdatePostMutation,
  UpdatePostMutationVariables,
} from '../../API';
import {createComment, getPost, updatePost} from './queries';
import {useAuthContext} from '../../context/AuthContext';

const useCommentsService = (postId: string) => {
  const {userId} = useAuthContext();

  const {data: postData} = useQuery<GetPostQuery, GetPostQueryVariables>(
    getPost,
    {variables: {id: postId}, errorPolicy: 'all'},
  );
  const post = postData?.getPost;

  const [doUpdatePost] = useMutation<
    UpdatePostMutation,
    UpdatePostMutationVariables
  >(updatePost, {errorPolicy: 'all', refetchQueries: ['PostsByDate']});

  const [doCreateComment] = useMutation<
    CreateCommentMutation,
    CreateCommentMutationVariables
  >(createComment, {errorPolicy: 'all'});

  const incrementNofComments = async (amount: 1 | -1) => {
    if (!post) {
      Alert.alert('Failed to load post. Try again later');
      return;
    }
    await doUpdatePost({
      variables: {
        input: {
          id: post.id,
          nofComments: post.nofComments + amount,
        },
      },
    });
  };

  const onCreateComment = async (newComment: string) => {
    if (!post) {
      Alert.alert('Failed to load post. Try again later');
      return;
    }
    try {
      await doCreateComment({
        variables: {
          input: {
            postID: post.id,
            userID: userId,
            comment: newComment,
          },
        },
      });
      await incrementNofComments(1);
    } catch (e) {
      Alert.alert('Error submitting the comment', (e as Error).message);
    }
  };

  return {
    onCreateComment,
  };
};

export default useCommentsService;
