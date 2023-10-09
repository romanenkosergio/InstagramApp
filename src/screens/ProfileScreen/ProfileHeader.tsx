import {FC, useEffect} from 'react';
import {Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Auth} from 'aws-amplify';

import UserImage from '../../components/UserImage/UserImage';
import Button from '../../components/Button';

import {IProfileHeaderProps} from './types';
import {ProfileNavigationProp} from '../../types/navigation';
import {useAuthContext} from '../../context/AuthContext';

import styles from './styles';

const ProfileHeader: FC<IProfileHeaderProps> = ({user}) => {
  const {userId} = useAuthContext();
  const navigation = useNavigation<ProfileNavigationProp>();

  useEffect(() => {
    navigation.setOptions({title: user?.username || 'Profile'});
  }, [navigation, user?.username]);

  return (
    <View style={styles.root}>
      <View style={styles.headerRow}>
        {/* Profile Image */}
        <UserImage imageKey={user?.image || undefined} size="md" />
        {/* Posts, followers, following number */}
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>{user.nofPosts}</Text>
          <Text>Posts</Text>
        </View>

        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>{user.nofFollowers}</Text>
          <Text>Followers</Text>
        </View>

        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>{user.nofFollowings}</Text>
          <Text>Following</Text>
        </View>
      </View>

      <Text style={styles.name}>{user.name}</Text>
      <Text>{user.bio}</Text>
      {userId === user.id && (
        <View style={{flexDirection: 'row'}}>
          <Button
            text="Edit Profile"
            onPress={() => navigation.navigate('Edit Profile')}
            inline
          />
          <Button text="Sign Out" onPress={() => Auth.signOut()} inline />
        </View>
      )}
    </View>
  );
};

export default ProfileHeader;
