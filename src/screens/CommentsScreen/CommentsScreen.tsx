import {useQuery, useSubscription} from '@apollo/client';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from 'react-native';

import ApiErrorMessage from '../../components/ApiErrorMessage';
import {default as CustomComment} from '../../components/Comment';
import Input from './Input';

import {
  Comment,
  CommentsByPostQuery,
  CommentsByPostQueryVariables,
  ModelSortDirection,
  OnCreateCommentByPostIdSubscription,
  OnCreateCommentByPostIdSubscriptionVariables,
} from '../../API';
import {CommentsRouteProp} from '../../types/navigation';
import {commentsByPost, onCreateCommentByPostId} from './queries';

const CommentsScreen = () => {
  const route = useRoute<CommentsRouteProp>();
  const {postId} = route.params;
  const [newComments, setNewComments] = useState<Comment[]>([]);

  const {data, loading, error, refetch, fetchMore} = useQuery<
    CommentsByPostQuery,
    CommentsByPostQueryVariables
  >(commentsByPost, {
    errorPolicy: 'all',
    variables: {
      postID: postId,
      sortDirection: ModelSortDirection.DESC,
      limit: 20,
    },
  });

  const {data: newCommentsData} = useSubscription<
    OnCreateCommentByPostIdSubscription,
    OnCreateCommentByPostIdSubscriptionVariables
  >(onCreateCommentByPostId, {
    variables: {postID: postId},
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);

  const comments = data?.commentsByPost?.items || [];
  const nextToken = data?.commentsByPost?.nextToken;

  useEffect(() => {
    if (newCommentsData?.onCreateCommentByPostId) {
      setNewComments(existingNewComments => [
        newCommentsData.onCreateCommentByPostId as Comment,
        ...existingNewComments,
      ]);
    }
  }, [newCommentsData]);

  const loadMore = async () => {
    if (!nextToken || isFetchingMore) {
      return;
    }
    setIsFetchingMore(true);
    await fetchMore({variables: {nextToken}});
    setIsFetchingMore(false);
  };

  const isNewComment = (comment: Comment) => {
    return newComments.some(c => c.id === comment.id);
  };

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return (
      <ApiErrorMessage
        title="Error fetching comments"
        message={error.message}
      />
    );
  }

  const allComment = [...newComments, ...comments] as Comment[];

  return (
    <KeyboardAvoidingView
      style={{flex: 1, padding: 10}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>
      <View style={{flex: 1}}>
        <FlatList
          data={allComment}
          renderItem={({item}) =>
            item && (
              <CustomComment
                comment={item}
                includeDetails
                isNew={isNewComment(item)}
              />
            )
          }
          refreshing={loading}
          onRefresh={refetch}
          ListEmptyComponent={() => (
            <Text>No comments. Be the first to comment</Text>
          )}
          onEndReached={() => loadMore()}
          keyExtractor={(item: Comment) => item.id}
        />
      </View>

      <Input postId={postId} />
    </KeyboardAvoidingView>
  );
};

export default CommentsScreen;
