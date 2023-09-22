import {FC} from 'react';

import ProfileHeader from './ProfileHeader';

import user from '../../assets/data/user.json';
import FeedGreedView from '../../components/FeedGridView';

const ProfileScreen: FC = () => {
  return (
    <FeedGreedView data={user.posts} ListHeaderComponent={ProfileHeader} />
  );
};

export default ProfileScreen;
