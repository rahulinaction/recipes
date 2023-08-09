

/**
 * @format
 */

import 'react-native';
import React from 'react';
import {it} from '@jest/globals';
import App from '../App';
//import AppTest from '../Apptest';
import renderer from 'react-test-renderer';
import { Animated } from 'react-native';


 // Note: import explicitly to use the types shiped with jest.
//jest.useFakeTimers();


jest.mock('react-native-webview', () => ({
  default: () => jest.fn() // or any mocked component instead of native view,
}))
//jest.mock('react-native-gesture-handler', () => {});
/*jest.mock('react-native-webview', () => ({
  default: () => jest.fn() // or any mocked component instead of native view,
}));*/
 
 // Note: test renderer must be required after react-native.
 
 it('renders correctly', () => {
  renderer.create(<App />);
 });