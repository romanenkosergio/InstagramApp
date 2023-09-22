import {Pressable} from 'react-native';
import {FC, PropsWithChildren} from 'react';

interface IDoublePressableProps {
  onDoublePress?: () => void;
}

const DoublePressable: FC<PropsWithChildren<IDoublePressableProps>> = ({
  onDoublePress = () => {},
  children,
}) => {
  let lastTap = 0;
  const handleDoublePress = () => {
    const now = Date.now();
    if (now - lastTap < 300) {
      onDoublePress();
    }
    lastTap = now;
  };
  return <Pressable onPress={handleDoublePress}>{children}</Pressable>;
};

export default DoublePressable;
