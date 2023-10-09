import {Comment} from '../../API';

interface ICommentProps {
  comment: Comment;
  includeDetails?: boolean;
  isNew?: boolean;
}

export default ICommentProps;
