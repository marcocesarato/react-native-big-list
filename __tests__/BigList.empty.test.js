import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Text, View } from 'react-native';
import BigList from '../lib/BigList';

describe('BigList - Empty State', () => {
  test('renders ListEmptyComponent when data is empty', () => {
    const EmptyComponent = () => <Text testID="empty-message">No items</Text>;

    render(
      <BigList
        data={[]}
        renderItem={() => null}
        itemHeight={50}
        ListEmptyComponent={EmptyComponent}
      />
    );

    expect(screen.getByTestId('empty-message')).toBeTruthy();
    expect(screen.getByText('No items')).toBeTruthy();
  });

  test('isEmpty() returns true when data is empty', () => {
    const listRef = React.createRef();

    render(
      <BigList
        ref={listRef}
        data={[]}
        renderItem={() => null}
        itemHeight={50}
      />
    );

    expect(listRef.current.isEmpty()).toBe(true);
  });

  test('isEmpty() returns false when data has items', () => {
    const listRef = React.createRef();
    const data = [{ id: '1', name: 'Item 1' }];

    render(
      <BigList
        ref={listRef}
        data={data}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        itemHeight={50}
      />
    );

    expect(listRef.current.isEmpty()).toBe(false);
  });

  test('does not render empty component when data has items', () => {
    const data = [{ id: '1', name: 'Item 1' }];
    const EmptyComponent = () => <Text testID="empty-message">No items</Text>;

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID="item-1">{item.name}</Text>}
        itemHeight={50}
        ListEmptyComponent={EmptyComponent}
      />
    );

    expect(screen.queryByTestId('empty-message')).toBeNull();
    expect(screen.getByTestId('item-1')).toBeTruthy();
  });

  test('renders custom empty component', () => {
    const CustomEmpty = () => (
      <View testID="custom-empty">
        <Text>Custom Empty State</Text>
        <Text>No data available</Text>
      </View>
    );

    render(
      <BigList
        data={[]}
        renderItem={() => null}
        itemHeight={50}
        ListEmptyComponent={CustomEmpty}
      />
    );

    expect(screen.getByTestId('custom-empty')).toBeTruthy();
    expect(screen.getByText('Custom Empty State')).toBeTruthy();
  });
});
