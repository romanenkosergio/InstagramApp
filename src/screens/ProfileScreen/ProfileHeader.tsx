import {FC} from 'react';
import {Image, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Button from '../../components/Button';

import user from '../../assets/data/user.json';

import styles from './styles';
import {ProfileNavigationProp} from '../../navigation/types';

const ProfileHeader: FC = () => {
  const navigation = useNavigation<ProfileNavigationProp>();
  return (
    <View style={styles.root}>
      <View style={styles.headerRow}>
        {/* Profile Image */}
        <Image source={{uri: user.image}} style={styles.avatar} />
        {/* Posts, followers, following number */}
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>98</Text>
          <Text>Posts</Text>
        </View>

        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>198</Text>
          <Text>Followers</Text>
        </View>

        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>298</Text>
          <Text>Following</Text>
        </View>
        {/*  */}
      </View>

      <Text style={styles.name}>{user.name}</Text>
      <Text>{user.bio}</Text>
      <View style={{flexDirection: 'row'}}>
        <Button
          text="Edit Profile"
          onPress={() => navigation.navigate('Edit Profile')}
        />
        <Button text="Another Button" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

export default ProfileHeader;
