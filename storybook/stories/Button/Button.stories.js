import {action} from '@storybook/addon-actions';
import React from 'react';
import {Text} from 'react-native';
import Button from '.';
import CenterView from '../CenterView';

export default {
  title: 'Button',
  decorators: [getStory => <CenterView>{getStory()}</CenterView>],
};

export const WithText = () => (
  <Button onPress={action('clicked-text')}>
  </Button>
);

WithText.story = {
  name: 'with text',
};

export const WithSomeEmoji = () => (
  <Button onPress={action('clicked-emoji')}>
    <Text>😀 😎 👍 💯</Text>
  </Button>
);

WithSomeEmoji.story = {
  name: 'with some emoji',
};
