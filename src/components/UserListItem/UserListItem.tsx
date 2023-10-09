import {FC} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import IUserListItemProps from './types';
import {DEFAULT_USER_IMAGE} from '../../config';
import {FeedNavigationProp} from '../../types/navigation';

import styles from './styles';

const UserListItem: FC<IUserListItemProps> = ({user}) => {
  const navigation = useNavigation<FeedNavigationProp>();
  const goToUserScreen = () => {
    navigation.navigate('UserProfile', {
      screen: 'Profile',
      params: {userId: user.id},
    });
  };

  return (
    <Pressable style={styles.root} onPress={goToUserScreen}>
      <Image
        source={{uri: user.image || DEFAULT_USER_IMAGE}}
        style={styles.image}
      />
      <View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>{user.username}</Text>
      </View>
    </Pressable>
  );
};

export default UserListItem;
