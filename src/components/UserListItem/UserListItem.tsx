import {FC} from 'react';
import {Image, Pressable, Text, View} from 'react-native';

import IUserListItemProps from './types';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

const UserListItem: FC<IUserListItemProps> = ({user}) => {
  const navigation = useNavigation();
  const goToUserScreen = () => {
    navigation.navigate('UserProfile', {userId: user.id});
  };

  return (
    <Pressable style={styles.root} onPress={goToUserScreen}>
      <Image source={{uri: user.image}} style={styles.image} />
      <View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>{user.username}</Text>
      </View>
    </Pressable>
  );
};

export default UserListItem;
