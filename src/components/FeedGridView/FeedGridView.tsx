import {FC} from 'react';
import {FlatList} from 'react-native';

import {IFeedGreedViewProps} from './types';

import FeedGreedItem from './FeedGreedItem';

const FeedGreedView: FC<IFeedGreedViewProps> = ({
  data,
  ListHeaderComponent,
  refetch,
  loading,
}) => {
  return (
    <FlatList
      data={data}
      renderItem={({item}) => item && <FeedGreedItem post={item} />}
      numColumns={3}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={ListHeaderComponent}
      style={{marginHorizontal: -1}}
      onRefresh={refetch}
      refreshing={loading}
    />
  );
};

export default FeedGreedView;
