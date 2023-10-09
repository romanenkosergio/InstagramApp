import {FC} from 'react';
import {ActivityIndicator, FlatList} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useQuery} from '@apollo/client';

import ApiErrorMessage from '../../components/ApiErrorMessage';
import UserListItem from '../../components/UserListItem';

import {likesForPostByUser} from './queries';
import {
  LikesForPostByUserQuery,
  LikesForPostByUserQueryVariables,
} from '../../API';
import {PostLikesRouteProp} from '../../types/navigation';

const PostLikesScreen: FC = () => {
  const route = useRoute<PostLikesRouteProp>();
  const {id} = route.params;

  const {data, loading, error, refetch} = useQuery<
    LikesForPostByUserQuery,
    LikesForPostByUserQueryVariables
  >(likesForPostByUser, {variables: {postID: id}});

  if (error) {
    return (
      <ApiErrorMessage message={error.message} title={'Error fetching likes'} />
    );
  }

  if (loading) {
    return <ActivityIndicator />;
  }
  const likes = data?.likesForPostByUser?.items || [];

  return (
    <FlatList
      data={likes}
      renderItem={({item}) => item && <UserListItem user={item?.User} />}
      onRefresh={refetch}
      refreshing={loading}
    />
  );
};

export default PostLikesScreen;
