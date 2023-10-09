import * as React from 'react';
import {Post} from '../../API';

export interface IFeedGreedViewProps {
  data: (Post | null)[];
  ListHeaderComponent?:
    | React.ComponentType<any>
    | React.ReactElement<unknown>
    | null
    | undefined;
  refetch: () => void;
  loading: boolean;
}

export interface IFeedGreedItemProps {
  post: Post;
}
