import {FC, useState} from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from 'react-native';
import styles from './styles';

const Input: FC = () => {
  const [newComment, setNewComment] = useState<string>('');

  const onPost = () => {
    console.warn('New comment', newComment);
    setNewComment('');
    Keyboard.dismiss();
  };
  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={70}>
      <Image
        source={{
          uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/2.jpg',
        }}
        style={styles.image}
      />
      <View style={styles.middleColumn}>
        <TextInput
          style={styles.input}
          placeholder="Add a comment..."
          value={newComment}
          onChangeText={setNewComment}
          multiline
        />
        {newComment !== '' && (
          <Text style={styles.button} onPress={onPost}>
            POST
          </Text>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default Input;
