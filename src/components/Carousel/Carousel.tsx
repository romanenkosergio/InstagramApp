import {FC, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  useWindowDimensions,
  View,
  ViewabilityConfig,
  ViewToken,
} from 'react-native';

import ICarouselProps from './types';
import colors from '../../theme/colors';
import DoublePressable from '../DoublePressable';

const Carousel: FC<ICarouselProps> = ({
  images,
  onDoublePress = () => {},
  imageWidth,
}) => {
  const {width} = useWindowDimensions();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 51,
  };

  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: Array<ViewToken>}) => {
      if (viewableItems.length > 0) {
        setActiveImageIndex(viewableItems[0].index || 0);
      }
    },
  );

  return (
    <View>
      <FlatList
        data={images}
        renderItem={({item}) => (
          <DoublePressable onDoublePress={onDoublePress}>
            <Image
              source={{uri: item}}
              style={{width: imageWidth || width, aspectRatio: 1}}
            />
          </DoublePressable>
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}>
        {images.map((_, idx) => (
          <View
            key={`image-${idx}`}
            style={{
              width: 10,
              aspectRatio: 1,
              borderRadius: 5,
              margin: 10,
              marginHorizontal: 5,
              backgroundColor:
                activeImageIndex === idx ? colors.primary : 'white',
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default Carousel;
