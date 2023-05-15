/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import Content from '../src/Content/content';
import {render} from '@testing-library/react-native';

describe('Content', () => {
  test('renders correctly with default props', () => {
    const {getByTestId} = render(<Content />);
    const textInput = getByTestId('content');
    expect(textInput).toBeDefined();
  });
});
