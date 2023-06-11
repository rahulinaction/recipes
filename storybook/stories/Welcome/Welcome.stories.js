import React from 'react';
import {linkTo} from '@storybook/addon-links';
import Welcome from '.';

export default {
  title: 'Welcome',
};

export const ToStorybook = () => <Welcome showApp={linkTo('Button')} />;

ToStorybook.story = {
  name: 'to Storybook',
};
