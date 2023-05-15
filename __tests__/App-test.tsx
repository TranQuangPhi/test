/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import {render} from '@testing-library/react-native';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('TextInput component', () => {
  it('renders correctly', () => {
    renderer.create(<App />);
  });

  it('renders correctly with default props', () => {
    const {getByTestId} = render(<App isShow={true} />);
    const textInput = getByTestId('label');
    expect(textInput).toBeDefined();
  });
});
