import {IPost} from '../../types/models';
import * as React from 'react';

export interface IFeedGreedViewProps {
  data: IPost[];
  ListHeaderComponent?:
    | React.ComponentType<any>
    | React.ReactElement<unknown>
    | null
    | undefined;
}

export interface IFeedGreedItemProps {
  post: IPost;
}
