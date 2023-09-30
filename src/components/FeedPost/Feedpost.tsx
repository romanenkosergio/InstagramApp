import {FC, useState} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

import DoublePressable from '../DoublePressable';
import Carousel from '../Carousel';
import VideoPlayer from '../VideoPlayer';
import Comment from '../Comment';

import colors from '../../theme/colors';
import IFeedPostProps from './types';
import {FeedNavigationProp} from '../../navigation/types';

import styles from './styles';

const FeedPost: FC<IFeedPostProps> = ({post, isVisible}) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const navigation = useNavigation<FeedNavigationProp>();

  const toggleDescriptionExpanded = () => {
    setIsDescriptionExpanded(prevState => !prevState);
  };

  const toggleLike = () => {
    setIsLiked(prevState => !prevState);
  };

  const navigateUser = () => {
    navigation.navigate('UserProfile', {userId: post.user.id});
  };

  const navigateToComments = () => {
    navigation.navigate('Comments', {postId: post.id});
  };

  let content = null;
  if (post.image) {
    content = (
      <DoublePressable onDoublePress={toggleLike}>
        <Image
          source={{
            uri: post.image,
          }}
          style={styles.image}
        />
      </DoublePressable>
    );
  } else if (post.images) {
    content = <Carousel images={post.images} onDoublePress={toggleLike} />;
  } else if (post.video) {
    content = (
      <DoublePressable onDoublePress={toggleLike}>
        <VideoPlayer uri={post.video} paused={!isVisible} />
      </DoublePressable>
    );
  }
  return (
    <View style={styles.post}>
      {/*Header*/}
      <View style={styles.header}>
        <Image
          source={{
            uri: post.user.image,
          }}
          style={styles.userAvatar}
        />
        <Text onPress={navigateUser} style={styles.userName}>
          {post.user.username}
        </Text>
        <Entypo
          name="dots-three-horizontal"
          size={16}
          style={styles.threeDots}
        />
      </View>
      {/*Content*/}
      {content}

      {/*Footer*/}

      <View style={styles.footer}>
        <View style={styles.iconContainer}>
          <Pressable onPress={toggleLike}>
            <AntDesign
              name={isLiked ? 'heart' : 'hearto'}
              size={24}
              style={styles.icon}
              color={isLiked ? colors.accent : colors.black}
            />
          </Pressable>
          <Ionicons name="chatbubble-outline" size={24} style={styles.icon} />
          <Feather name="send" size={24} style={styles.icon} />

          <Feather name="bookmark" size={24} style={{marginLeft: 'auto'}} />
        </View>

        {/* Likes */}
        <Text style={styles.text}>
          Liked by <Text style={styles.bold}>romanenkokatrin</Text> and{' '}
          <Text style={styles.bold}>{post.nofLikes}</Text> others
        </Text>

        {/* Caption */}
        <Text style={styles.text} numberOfLines={isDescriptionExpanded ? 0 : 3}>
          <Text style={styles.bold}>{post.user.username}</Text>{' '}
          {post.description}
        </Text>
        <Text onPress={toggleDescriptionExpanded}>
          {isDescriptionExpanded ? 'less' : 'more'}
        </Text>

        {/* Comments */}
        <Text onPress={navigateToComments}>
          View all {post.nofComments} comments
        </Text>
        {post.comments.map(comment => (
          <Comment key={`comment-${comment.id}`} comment={comment} />
        ))}
        {/* Posted Date */}
        <Text style={styles.text}>{post.createdAt}</Text>
      </View>
    </View>
  );
};

export default FeedPost;
