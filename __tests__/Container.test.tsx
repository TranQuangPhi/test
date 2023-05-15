/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import Container from '../src/Container/container';
import {render} from '@testing-library/react-native';

describe('Test asdsadsadsa', () => {
  test('renders correctly with default props', () => {
    const {getByTestId} = render(<Container />);
    const textInput = getByTestId('container');
    expect(textInput).toBeDefined();
  });
});
