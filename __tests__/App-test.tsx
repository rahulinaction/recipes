

/**
 * @format
 */

 import 'react-native';
 import React from 'react';
 import App from '../App';
 import renderer from 'react-test-renderer';

 // Note: import explicitly to use the types shiped with jest.


//jest.mock('react-native-gesture-handler', () => {});
/*jest.mock('react-native-webview', () => ({
  default: () => jest.fn() // or any mocked component instead of native view,
}));*/
 
 // Note: test renderer must be required after react-native.
 
 it('renders correctly', () => {
  renderer.create(<App />);
 });
 
 