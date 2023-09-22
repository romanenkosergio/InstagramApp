import {FC} from 'react';
import {FlatList} from 'react-native';

import {IFeedGreedViewProps} from './types';

import FeedGreedItem from './FeedGreedItem';

const FeedGreedView: FC<IFeedGreedViewProps> = ({
  data,
  ListHeaderComponent,
}) => {
  return (
    <FlatList
      data={data}
      renderItem={({item}) => <FeedGreedItem post={item} />}
      numColumns={3}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={ListHeaderComponent}
      style={{marginHorizontal: -1}}
    />
  );
};

export default FeedGreedView;
