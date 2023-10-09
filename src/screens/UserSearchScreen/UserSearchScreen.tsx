import {FC} from 'react';
import {ActivityIndicator, FlatList} from 'react-native';
import {useQuery} from '@apollo/client';

import UserListItem from '../../components/UserListItem';
import ApiErrorMessage from '../../components/ApiErrorMessage';

import {listUsers} from './queries';
import {ListUsersQuery, ListUsersQueryVariables} from '../../API';

const UserSearchScreen: FC = () => {
  const {data, loading, error, refetch} = useQuery<
    ListUsersQuery,
    ListUsersQueryVariables
  >(listUsers);

  if (error) {
    return (
      <ApiErrorMessage message={error.message} title={'Error fetching users'} />
    );
  }

  if (loading) {
    return <ActivityIndicator />;
  }

  const users = data?.listUsers?.items || [];
  return (
    <FlatList
      data={users}
      renderItem={({item}) => item && <UserListItem user={item} />}
      onRefresh={refetch}
      refreshing={loading}
    />
  );
};

export default UserSearchScreen;
