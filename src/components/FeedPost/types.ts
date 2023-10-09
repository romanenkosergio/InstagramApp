import {Post} from '../../API';

interface IFeedPostProps {
  post: Post;
  isVisible: boolean;
}

export interface IPostMenuProps {
  post: Post;
}

export interface IContentProps extends IFeedPostProps {}

export default IFeedPostProps;
