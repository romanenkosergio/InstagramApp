import {FC} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

import ProfileHeader from './ProfileHeader';
import FeedGreedView from '../../components/FeedGridView';

import user from '../../assets/data/user.json';
import {
  MyProfileRouteProp,
  MyUserProfileNavigationProp,
  ProfileNavigationProp,
  UserProfileRouteProp,
} from '../../types/navigation';

const ProfileScreen: FC = () => {
  const route = useRoute<UserProfileRouteProp | MyProfileRouteProp>();
  const navigation = useNavigation<
    ProfileNavigationProp | MyUserProfileNavigationProp
  >();
  const userId = route.params?.userId;

  navigation.setOptions({title: user.username});
  return (
    <FeedGreedView data={user.posts} ListHeaderComponent={ProfileHeader} />
  );
};

export default ProfileScreen;
