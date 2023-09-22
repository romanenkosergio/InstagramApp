import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import fonts from '../../theme/fonts';
import colors from '../../theme/colors';

interface ICommentStyles {
  avatar: ImageStyle;
  icon: ViewStyle;
  middleColumn: ViewStyle;
  text: TextStyle;
  bold: TextStyle;
  footer: ViewStyle;
  footerText: TextStyle;
  comment: ViewStyle;
  commentText: TextStyle;
}

const styles = StyleSheet.create<ICommentStyles>({
  avatar: {
    width: 40,
    aspectRatio: 1,
    borderRadius: 25,
    marginRight: 5,
  },
  middleColumn: {
    flex: 1,
  },
  icon: {
    marginHorizontal: 5,
  },
  text: {
    color: colors.black,
    lineHeight: 18,
  },
  bold: {
    fontWeight: fonts.weight.bold,
  },
  footer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  footerText: {
    marginRight: 10,
  },
  comment: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  commentText: {
    color: colors.black,
  },
});

export default styles;
