import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Text, View, Image } from 'react-native';
import BigList from '../lib/BigList';

describe('BigList - Placeholder Component', () => {
  test('renders with placeholder enabled', () => {
    const data = Array.from({ length: 50 }, (_, i) => ({
      id: `${i}`,
      name: `Item ${i}`,
    }));

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
        placeholder={true}
      />
    );

    expect(screen.getByTestId('item-0')).toBeTruthy();
  });

  test('renders with custom placeholderImage', () => {
    const data = Array.from({ length: 20 }, (_, i) => ({
      id: `${i}`,
      name: `Item ${i}`,
    }));

    const placeholderImage = { uri: 'https://example.com/placeholder.png' };

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
        placeholder={true}
        placeholderImage={placeholderImage}
      />
    );

    expect(screen.getByTestId('item-0')).toBeTruthy();
  });

  test('renders with custom placeholderComponent', () => {
    const data = Array.from({ length: 20 }, (_, i) => ({
      id: `${i}`,
      name: `Item ${i}`,
    }));

    const PlaceholderComponent = () => (
      <View testID="custom-placeholder">
        <Text>Loading...</Text>
      </View>
    );

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
        placeholder={true}
        placeholderComponent={<PlaceholderComponent />}
      />
    );

    expect(screen.getByTestId('item-0')).toBeTruthy();
  });

  test('placeholder works with sections', () => {
    const sections = [
      Array.from({ length: 10 }, (_, i) => ({ id: `1-${i}`, name: `Item ${i}` })),
      Array.from({ length: 10 }, (_, i) => ({ id: `2-${i}`, name: `Item ${i}` })),
    ];

    render(
      <BigList
        sections={sections}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
        placeholder={true}
      />
    );

    expect(screen.getByTestId('item-1-0')).toBeTruthy();
  });

  test('placeholder with horizontal list', () => {
    const data = Array.from({ length: 30 }, (_, i) => ({
      id: `${i}`,
      name: `Item ${i}`,
    }));

    render(
      <BigList
        horizontal={true}
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={150}
        placeholder={true}
      />
    );

    expect(screen.getByTestId('item-0')).toBeTruthy();
  });
});
