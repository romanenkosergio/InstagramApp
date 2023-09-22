import React, {FC} from 'react';
import {FlatList, View} from 'react-native';

import Comment from '../../components/Comment';
import Input from './Input';

import comments from '../../assets/data/comments.json';

const CommentsScreen: FC = () => {
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={comments}
        renderItem={({item}) => <Comment comment={item} includeDetails />}
        style={{padding: 10}}
      />
      <Input />
    </View>
  );
};

export default CommentsScreen;
