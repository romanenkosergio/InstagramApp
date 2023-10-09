import {FC} from 'react';
import {Image} from 'react-native';

import {DEFAULT_USER_IMAGE} from '../../config';
import useUserService from '../../services/UserService';
import IUserImageProps from './types';

import styles from './styles';

const UserImage: FC<IUserImageProps> = ({
  selectedUri,
  imageKey,
  size = 'xs',
  styles: customStyles = {},
}) => {
  const {imageUri} = useUserService(imageKey);
  if (customStyles.marginRight) {
    console.log(imageKey);
  }

  const styleName =
    size === 'xs'
      ? 'extraSmallImage'
      : size === 'sm'
      ? 'smallImage'
      : size === 'md'
      ? 'mediumImage'
      : 'largeImage';
  return (
    <Image
      source={{
        uri: selectedUri || imageUri || DEFAULT_USER_IMAGE,
      }}
      style={[styles[styleName], customStyles]}
    />
  );
};

export default UserImage;
