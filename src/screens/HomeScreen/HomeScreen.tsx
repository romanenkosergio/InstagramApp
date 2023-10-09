import {FC, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  View,
  ViewabilityConfig,
  ViewToken,
} from 'react-native';
import {useQuery} from '@apollo/client';

import FeedPost from '../../components/FeedPost';
import ApiErrorMessage from '../../components/ApiErrorMessage';

import {postsByDate} from './queries';
import {
  ModelSortDirection,
  Post,
  PostsByDateQuery,
  PostsByDateQueryVariables,
} from '../../API';

const HomeScreen: FC = () => {
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);

  const {error, data, loading, refetch, fetchMore} = useQuery<
    PostsByDateQuery,
    PostsByDateQueryVariables
  >(postsByDate, {
    errorPolicy: 'all',
    variables: {
      sortDirection: ModelSortDirection.DESC,
      type: 'POST',
      limit: 10,
    },
  });

  const viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 51,
  };

  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: Array<ViewToken>}) => {
      if (viewableItems.length > 0) {
        setActivePostId(viewableItems[0].item.id);
      }
    },
  );

  if (error) {
    return (
      <ApiErrorMessage message={error.message} title={'Error fetching posts'} />
    );
  }

  if (loading) {
    return <ActivityIndicator />;
  }

  const posts = (data?.postsByDate?.items || []) as Post[];

  const nextToken = data?.postsByDate?.nextToken;

  const loadMore = async () => {
    if (!nextToken || isFetchingMore) {
      return;
    }

    setIsFetchingMore(true);
    await fetchMore({variables: {nextToken}});
    setIsFetchingMore(false);
  };

  return (
    <View>
      <FlatList
        data={posts}
        renderItem={({item}) =>
          item && <FeedPost isVisible={item.id === activePostId} post={item} />
        }
        showsVerticalScrollIndicator={false}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged.current}
        onRefresh={() => refetch()}
        refreshing={loading}
        onEndReached={loadMore}
      />
    </View>
  );
};

export default HomeScreen;
