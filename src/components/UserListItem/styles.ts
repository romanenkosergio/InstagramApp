import {StyleSheet} from 'react-native';
import fonts from '../../theme/fonts';
import colors from '../../theme/colors';

export default StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontWeight: fonts.weight.bold,
    marginBottom: 5,
  },
  username: {
    color: colors.grey,
  },
});
