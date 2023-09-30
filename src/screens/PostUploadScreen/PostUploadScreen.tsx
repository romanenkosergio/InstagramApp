import {FC, useEffect, useRef, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {
  Camera,
  CameraPictureOptions,
  CameraRecordingOptions,
  FlashMode,
  VideoQuality,
} from 'expo-camera';
import styles from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../theme/colors';
import {CameraType} from 'expo-camera/src/Camera.types';

const flashModes: FlashMode[] = [
  FlashMode.off,
  FlashMode.on,
  FlashMode.auto,
  FlashMode.torch,
];

const flashModeToIcon: Record<FlashMode, string> = {
  [FlashMode.off]: 'flash-off',
  [FlashMode.on]: 'flash-on',
  [FlashMode.auto]: 'flash-auto',
  [FlashMode.torch]: 'highlight',
};

const PostUploadScreen: FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraType, setCameraType] = useState<CameraType>(CameraType.back);
  const [flash, setflash] = useState<FlashMode>(FlashMode.off);
  const [isCameraReady, setIsCameraReady] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);

  const camera = useRef<Camera>(null);

  const flipCamera = () => {
    setCameraType(prev =>
      prev === CameraType.back ? CameraType.front : CameraType.back,
    );
  };
  const flipFlash = () => {
    const currentIndex = flashModes.indexOf(flash);
    const newIndex = (currentIndex + 1) % flashModes.length;
    setflash(flashModes[newIndex]);
  };

  const takePicture = async () => {
    if (!camera.current) {
      return;
    }
    const cameraOptions: CameraPictureOptions = {
      quality: 0.7,
      base64: false,
      skipProcessing: true,
    };
    const result = await camera.current?.takePictureAsync(cameraOptions);
  };

  const startRecording = async () => {
    if (!camera.current || isRecording) {
      return;
    }
    const cameraOptions: CameraRecordingOptions = {
      quality: VideoQuality['720p'],
      maxDuration: 60,
      maxFileSize: 100 * 1024 * 1024,
      mute: false,
    };
    setIsRecording(true);
    try {
      const result = await camera.current?.recordAsync(cameraOptions);
    } catch (e) {
      console.log(e);
    }
    setIsRecording(false);
  };

  const stopRecording = async () => {
    if (!camera.current) {
      return;
    }
    if (isRecording) {
      camera.current.stopRecording();
      setIsRecording(false);
    }
  };

  useEffect(() => {
    const getPermission = async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const microphonePermission =
        await Camera.requestMicrophonePermissionsAsync();
      setHasPermission(
        cameraPermission.status === 'granted' &&
          microphonePermission.status === 'granted',
      );
    };
    getPermission();
  }, []);

  if (hasPermission === null) {
    return <Text>Loading...</Text>;
  }

  if (!hasPermission) {
    return <Text>No access to the camera</Text>;
  }

  return (
    <View style={styles.page}>
      <Camera
        ref={camera}
        style={styles.camera}
        type={cameraType}
        ratio="4:3"
        flashMode={flash}
        onCameraReady={() => setIsCameraReady(true)}
      />
      <View style={[styles.buttonsContainer, {top: 25}]}>
        <MaterialIcons name={'close'} size={30} color={colors.white} />
        <Pressable onPress={flipFlash}>
          <MaterialIcons
            name={flashModeToIcon[flash]}
            size={30}
            color={colors.white}
          />
        </Pressable>
        <MaterialIcons name={'settings'} size={30} color={colors.white} />
      </View>
      <View style={[styles.buttonsContainer, {bottom: 25}]}>
        <MaterialIcons name={'photo-library'} size={30} color={colors.white} />
        {isCameraReady && (
          <Pressable
            onPress={takePicture}
            onLongPress={startRecording}
            onPressOut={stopRecording}>
            <View
              style={[
                styles.circle,
                {backgroundColor: isRecording ? colors.accent : colors.white},
              ]}
            />
          </Pressable>
        )}
        <Pressable onPress={flipCamera}>
          <MaterialIcons
            name={'flip-camera-ios'}
            size={30}
            color={colors.white}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default PostUploadScreen;
