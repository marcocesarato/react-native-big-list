import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Text, View } from 'react-native';
import BigList from '../lib/BigList';

describe('BigList - Basic Rendering', () => {
  test('renders items correctly with data prop', () => {
    const data = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
      { id: '3', name: 'Item 3' },
    ];

    const renderItem = ({ item }) => (
      <View testID={`item-${item.id}`}>
        <Text>{item.name}</Text>
      </View>
    );

    render(<BigList data={data} renderItem={renderItem} itemHeight={50} />);

    // Verify items are rendered
    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('item-2')).toBeTruthy();
    expect(screen.getByTestId('item-3')).toBeTruthy();
  });

  test('renders with text content verification', () => {
    const data = [
      { id: '1', text: 'First' },
      { id: '2', text: 'Second' },
    ];

    const renderItem = ({ item }) => (
      <Text testID={`item-${item.id}`}>{item.text}</Text>
    );

    render(<BigList data={data} renderItem={renderItem} itemHeight={50} />);

    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('item-2')).toBeTruthy();
    expect(screen.getByText('First')).toBeTruthy();
    expect(screen.getByText('Second')).toBeTruthy();
  });

  test('renders with custom keyExtractor', () => {
    const data = [
      { customId: 'a', name: 'Alpha' },
      { customId: 'b', name: 'Beta' },
    ];

    const renderItem = ({ item }) => (
      <Text testID={`item-${item.customId}`}>{item.name}</Text>
    );

    const keyExtractor = (item) => item.customId;

    render(
      <BigList
        data={data}
        renderItem={renderItem}
        itemHeight={50}
        keyExtractor={keyExtractor}
      />
    );

    expect(screen.getByTestId('item-a')).toBeTruthy();
    expect(screen.getByTestId('item-b')).toBeTruthy();
  });

  test('renders large dataset', () => {
    const data = Array.from({ length: 100 }, (_, i) => ({
      id: `${i}`,
      name: `Item ${i}`,
    }));

    const renderItem = ({ item }) => (
      <View testID={`item-${item.id}`}>
        <Text>{item.name}</Text>
      </View>
    );

    const { getByTestId } = render(
      <BigList data={data} renderItem={renderItem} itemHeight={50} />
    );

    // In test environment, BigList should render items even without layout
    // Verify at least first few items are rendered
    expect(getByTestId('item-0')).toBeTruthy();
    expect(getByTestId('item-1')).toBeTruthy();
    expect(getByTestId('item-2')).toBeTruthy();
  });

  test('renders with numColumns', () => {
    const data = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
      { id: '3', name: 'Item 3' },
      { id: '4', name: 'Item 4' },
    ];

    const renderItem = ({ item }) => (
      <View testID={`item-${item.id}`}>
        <Text>{item.name}</Text>
      </View>
    );

    render(
      <BigList data={data} renderItem={renderItem} itemHeight={50} numColumns={2} />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('item-2')).toBeTruthy();
    expect(screen.getByTestId('item-3')).toBeTruthy();
    expect(screen.getByTestId('item-4')).toBeTruthy();
  });
});
