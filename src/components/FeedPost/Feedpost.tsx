import {FC, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import dayjs from 'dayjs';

import Comment from '../Comment';
import PostMenu from './PostMenu';
import Content from './Content';
import DoublePressable from '../DoublePressable';

import IFeedPostProps from './types';
import {FeedNavigationProp} from '../../types/navigation';
import useLikeService from '../../services/LikeService';

import colors from '../../theme/colors';
import styles from './styles';
import UserImage from '../UserImage/UserImage';

const FeedPost: FC<IFeedPostProps> = ({post, isVisible}) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const {toggleLike, isLiked} = useLikeService(post);

  const postLikes = post?.Likes?.items || [];

  const navigation = useNavigation<FeedNavigationProp>();

  const toggleDescriptionExpanded = () => {
    setIsDescriptionExpanded(prevState => !prevState);
  };

  const navigateToUser = () => {
    if (post.User) {
      navigation.navigate('UserProfile', {
        screen: 'Profile',
        params: {userId: post.User.id},
      });
    }
  };

  const navigateToComments = () => {
    navigation.navigate('Comments', {postId: post.id});
  };

  const navigateToLikes = () => {
    navigation.navigate('PostLikes', {id: post.id});
  };

  return (
    <View style={styles.post}>
      {/*Header*/}
      <View style={styles.header}>
        <UserImage imageKey={post.User?.image || undefined} />
        <Text onPress={navigateToUser} style={styles.userName}>
          {post.User?.username}
        </Text>
        <PostMenu post={post} />
      </View>
      {/*Content*/}
      <DoublePressable onDoublePress={toggleLike}>
        <Content {...{post, isVisible}} />
      </DoublePressable>

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
        {postLikes.length === 0 ? (
          <Text>Be the first to like the post</Text>
        ) : (
          <Text style={styles.text} onPress={navigateToLikes}>
            Liked by{' '}
            <Text style={styles.bold}>{postLikes[0]?.User?.username}</Text>
            {postLikes.length > 1 && (
              <>
                {' '}
                and <Text style={styles.bold}>{post.nofLikes - 1}</Text> others
              </>
            )}
          </Text>
        )}

        {/* Caption */}
        <Text style={styles.text} numberOfLines={isDescriptionExpanded ? 0 : 3}>
          <Text style={styles.bold}>{post.User?.username}</Text>{' '}
          {post.description}
        </Text>
        <Text onPress={toggleDescriptionExpanded}>
          {isDescriptionExpanded ? 'less' : 'more'}
        </Text>

        {/* Comments */}
        <Text onPress={navigateToComments}>
          View all {post.nofComments} comments
        </Text>
        {(post.Comments?.items || []).map(
          comment =>
            comment && (
              <Comment key={`comment-${comment.id}`} comment={comment} />
            ),
        )}
        {/* Posted Date */}
        <Text style={styles.text}>{dayjs(post.createdAt).fromNow()}</Text>
      </View>
    </View>
  );
};

export default FeedPost;
