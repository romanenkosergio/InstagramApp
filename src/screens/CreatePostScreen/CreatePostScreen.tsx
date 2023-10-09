import {FC, useState} from 'react';
import {Alert, Image, Text, TextInput, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useMutation} from '@apollo/client';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Button from '../../components/Button';
import Carousel from '../../components/Carousel';
import VideoPlayer from '../../components/VideoPlayer';

import ICreatePostScreenProps from './types';
import {CreateNavigationProp, CreateRouteProp} from '../../types/navigation';
import {createPost} from './queries';
import {
  CreatePostInput,
  CreatePostMutation,
  CreatePostMutationVariables,
} from '../../API';
import {useAuthContext} from '../../context/AuthContext';

import styles from './styles';
import useUploadService from '../../services/UploadServise';

const CreatePostScreen: FC<ICreatePostScreenProps> = () => {
  const [description, setDescription] = useState<string>('');
  const route = useRoute<CreateRouteProp>();
  const {image, video, images} = route.params;
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {progress, uploadMedia} = useUploadService();

  const [doCreatePost] = useMutation<
    CreatePostMutation,
    CreatePostMutationVariables
  >(createPost, {refetchQueries: ['PostsByDate']});

  const {userId: userID} = useAuthContext();

  const navigation = useNavigation<CreateNavigationProp>();

  const submit = async () => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    const input: CreatePostInput = {
      type: 'POST',
      description,
      image: undefined,
      images: undefined,
      video: undefined,
      nofComments: 0,
      nofLikes: 0,
      userID,
    };
    // upload to s3
    if (image) {
      input.image = await uploadMedia(image);
    } else if (images) {
      const imageKeys = await Promise.all(images.map(img => uploadMedia(img)));
      input.images = imageKeys.filter(key => key) as string[];
    } else if (video) {
      input.video = await uploadMedia(video);
    }

    try {
      await doCreatePost({
        variables: {
          input,
        },
      });
      setIsSubmitting(false);
      navigation.popToTop();
      navigation.navigate('HomeStack');
    } catch (e) {
      Alert.alert('Error uploading the post', (e as Error).message);
      setIsSubmitting(false);
    }
  };

  let content = null;
  if (image) {
    content = (
      <Image
        source={{
          uri: image,
        }}
        style={styles.image}
        resizeMode={'contain'}
      />
    );
  } else if (images) {
    content = <Carousel images={images} />;
  } else if (video) {
    content = <VideoPlayer uri={video} />;
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.root}>
      <View style={styles.content}>{content}</View>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Description..."
        style={styles.input}
        multiline
        numberOfLines={5}
      />
      <Button
        text={isSubmitting ? 'Submitting...' : 'Submit'}
        onPress={submit}
      />
      {isSubmitting && (
        <View style={styles.progressContainer}>
          <View style={[styles.progress, {width: `${progress * 100}%`}]} />
          <Text>Uploading {Math.floor(progress * 100)}%</Text>
        </View>
      )}
    </KeyboardAwareScrollView>
  );
};

export default CreatePostScreen;
