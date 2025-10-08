import React from 'react';
import { render } from '@testing-library/react-native';
import { View, Text } from 'react-native';
import BigListPlaceholder from '../lib/BigListPlaceholder';

describe('BigListPlaceholder', () => {
  test('renders with custom component', () => {
    const CustomComponent = () => (
      <View testID="custom-placeholder">
        <Text>Custom Placeholder</Text>
      </View>
    );

    const { getByTestId } = render(
      <BigListPlaceholder height={100} component={<CustomComponent />} />
    );

    expect(getByTestId('custom-placeholder')).toBeTruthy();
  });

  test('renders as function component', () => {
    const ComponentAsFunction = () => (
      <View testID="function-component">
        <Text>Function Component</Text>
      </View>
    );

    const { getByTestId } = render(
      <BigListPlaceholder height={100} component={ComponentAsFunction} />
    );

    expect(getByTestId('function-component')).toBeTruthy();
  });

  test('renders with custom width', () => {
    const CustomComponent = () => (
      <View testID="custom-width-placeholder">
        <Text>Custom Width</Text>
      </View>
    );

    const { getByTestId } = render(
      <BigListPlaceholder height={100} width={200} component={<CustomComponent />} />
    );
    expect(getByTestId('custom-width-placeholder')).toBeTruthy();
  });

  test('renders with custom style', () => {
    const CustomComponent = () => (
      <View testID="custom-style-placeholder">
        <Text>Custom Style</Text>
      </View>
    );

    const customStyle = { backgroundColor: 'blue' };
    const { getByTestId } = render(
      <BigListPlaceholder height={100} style={customStyle} component={<CustomComponent />} />
    );
    expect(getByTestId('custom-style-placeholder')).toBeTruthy();
  });

  test('renders with string height and width', () => {
    const CustomComponent = () => (
      <View testID="string-dimensions-placeholder">
        <Text>String Dimensions</Text>
      </View>
    );

    const { getByTestId } = render(
      <BigListPlaceholder height="100px" width="200px" component={<CustomComponent />} />
    );
    expect(getByTestId('string-dimensions-placeholder')).toBeTruthy();
  });
});