import {ImageStyle, StyleProp} from 'react-native';

interface IUserImageProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  imageKey?: string;
  selectedUri?: string;
  styles?: StyleProp<ImageStyle> | undefined;
}

export default IUserImageProps;
