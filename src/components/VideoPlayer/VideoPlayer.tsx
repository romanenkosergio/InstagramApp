import {FC, useState} from 'react';
import Video from 'react-native-video';

import IVideoPLayerProps from './types';

import styles from './styles';
import {Pressable, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const VideoPlayer: FC<IVideoPLayerProps> = ({uri, paused}) => {
  const [muted, setMuted] = useState(true);
  return (
    <View>
      <Video
        source={{uri}}
        style={styles.video}
        resizeMode={'cover'}
        repeat
        muted={muted}
        paused={paused}
      />
      <Pressable onPress={() => setMuted(v => !v)} style={styles.muteButton}>
        <Ionicons
          name={muted ? 'volume-mute' : 'volume-medium'}
          size={14}
          color={'white'}
        />
      </Pressable>
    </View>
  );
};

export default VideoPlayer;
