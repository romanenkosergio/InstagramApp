import {FC, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import dayjs from 'dayjs';

import UserImage from '../UserImage';

import ICommentProps from './types';

import styles from './styles';
import colors from '../../theme/colors';

const Comment: FC<ICommentProps> = ({
  comment,
  includeDetails,
  isNew = false,
}) => {
  const [liked, setLiked] = useState<boolean>(false);
  const toggleLike = () => setLiked(v => !v);
  console.log(comment.User?.image);
  return (
    <View style={styles.comment}>
      {includeDetails && (
        <UserImage
          size={'xs'}
          imageKey={comment.User?.image || undefined}
          styles={{marginRight: 5}}
        />
      )}
      <View style={styles.middleColumn}>
        <Text style={styles.commentText}>
          <Text style={styles.bold}>{comment.User?.username}</Text>{' '}
          {comment.comment}
        </Text>
        {includeDetails && (
          <View style={styles.footer}>
            {isNew && <Text style={styles.new}>new</Text>}
            <Text style={styles.footerText}>
              {dayjs(comment.createdAt).fromNow()}
            </Text>
            <Text style={styles.footerText}>5 likes</Text>
            <Text style={styles.footerText}>Reply</Text>
          </View>
        )}
      </View>
      <Pressable onPress={toggleLike} hitSlop={5}>
        <AntDesign
          name={liked ? 'heart' : 'hearto'}
          style={styles.icon}
          color={liked ? colors.accent : colors.black}
        />
      </Pressable>
    </View>
  );
};

export default Comment;
