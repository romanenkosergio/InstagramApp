import {FC} from 'react';
import {ActivityIndicator} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useQuery} from '@apollo/client';

import ProfileHeader from './ProfileHeader';
import FeedGreedView from '../../components/FeedGridView';
import ApiErrorMessage from '../../components/ApiErrorMessage';

import {MyProfileRouteProp, UserProfileRouteProp} from '../../types/navigation';
import {getUser} from './queries';
import {GetUserQuery, GetUserQueryVariables} from '../../API';
import {useAuthContext} from '../../context/AuthContext';

const ProfileScreen: FC = () => {
  const route = useRoute<UserProfileRouteProp | MyProfileRouteProp>();
  const {userId: authUserId} = useAuthContext();

  const userId = route.params?.userId || authUserId;

  const {data, loading, error, refetch} = useQuery<
    GetUserQuery,
    GetUserQueryVariables
  >(getUser, {variables: {id: userId}, errorPolicy: 'all'});

  const user = data?.getUser;

  if (error || !user) {
    return (
      <ApiErrorMessage
        message={error?.message || 'User not found'}
        title={'Error fetching user'}
        onRetry={() => refetch()}
      />
    );
  }

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <FeedGreedView
      data={user?.Posts?.items || []}
      ListHeaderComponent={() => <ProfileHeader user={user} />}
      refetch={refetch}
      loading={loading}
    />
  );
};

export default ProfileScreen;
