import {FC, useEffect, useState} from 'react';
import {ActivityIndicator, Image, View} from 'react-native';
import {Storage} from 'aws-amplify';

import Carousel from '../Carousel';
import VideoPlayer from '../VideoPlayer';

import IContentProps from './types';

import styles from './styles';

const Content: FC<IContentProps> = ({post, isVisible}) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imagesUri, setImagesUri] = useState<string[] | null>(null);
  const [videoUri, setVideoUri] = useState<string | null>(null);

  useEffect(() => {
    downloadMedia();
  }, []);

  const downloadMedia = async () => {
    if (post.image) {
      const uri = await Storage.get(post.image);
      setImageUri(uri);
    } else if (post.video) {
      const videoUri = await Storage.get(post.video);
      setVideoUri(videoUri);
    } else if (post.images) {
      const uris = await Promise.all(post.images.map(img => Storage.get(img)));
      setImagesUri(uris);
    }
  };

  if (imageUri) {
    return (
      <Image
        source={{
          uri: post?.image?.startsWith('http') ? post?.image : imageUri,
        }}
        style={styles.image}
      />
    );
  } else if (imagesUri) {
    return <Carousel images={imagesUri} />;
  } else if (videoUri) {
    return <VideoPlayer uri={videoUri} paused={!isVisible} />;
  }

  return (
    <View>
      <ActivityIndicator />
    </View>
  );
};

export default Content;
