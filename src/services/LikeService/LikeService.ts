import {useMutation, useQuery} from '@apollo/client';

import {
  CreateLikeMutation,
  CreateLikeMutationVariables,
  DeleteLikeMutation,
  DeleteLikeMutationVariables,
  LikesForPostByUserQuery,
  LikesForPostByUserQueryVariables,
  Post,
  UpdatePostMutation,
  UpdatePostMutationVariables,
} from '../../API';
import {updatePost} from './queries';
import {
  createLike,
  deleteLike,
  likesForPostByUser,
} from '../../components/FeedPost/queries';
import {useAuthContext} from '../../context/AuthContext';

const useLikeService = (post: Post) => {
  const {userId: userID} = useAuthContext();

  const {data: userLikeData} = useQuery<
    LikesForPostByUserQuery,
    LikesForPostByUserQueryVariables
  >(likesForPostByUser, {variables: {postID: post.id, userID: {eq: userID}}});

  const userLike = userLikeData?.likesForPostByUser?.items?.[0];

  const [doCreateLike] = useMutation<
    CreateLikeMutation,
    CreateLikeMutationVariables
  >(createLike, {
    variables: {input: {postID: post.id, userID}},
    refetchQueries: ['LikesForPostByUser'],
  });
  const [doDeleteLike] = useMutation<
    DeleteLikeMutation,
    DeleteLikeMutationVariables
  >(deleteLike, {
    refetchQueries: ['LikesForPostByUser'],
  });

  const [doUpdatePost] = useMutation<
    UpdatePostMutation,
    UpdatePostMutationVariables
  >(updatePost, {refetchQueries: ['PostsByDate']});
  const incrementNofLikes = async (amount: 1 | -1) => {
    try {
      await doUpdatePost({
        variables: {
          input: {
            id: post.id,
            nofLikes: post.nofLikes + amount,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onAddLike = async () => {
    await doCreateLike();
  };

  const onRemoveLike = async () => {
    if (!userLike) {
      return;
    }
    await doDeleteLike({variables: {input: {id: userLike.id}}});
  };

  const toggleLike = async () => {
    try {
      if (userLike) {
        await onRemoveLike();
      } else {
        await onAddLike();
      }
      await incrementNofLikes(userLike ? -1 : 1);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    isLiked: !!userLike,
    toggleLike,
  };
};

export default useLikeService;
