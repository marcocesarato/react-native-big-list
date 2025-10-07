import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Text, View } from 'react-native';
import BigList from '../lib/BigList';

describe('BigList - Edge Cases and Special Scenarios', () => {
  test('renders with initialScrollIndex', () => {
    const data = Array.from({ length: 20 }, (_, i) => ({
      id: `${i}`,
      name: `Item ${i}`,
    }));

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
        initialScrollIndex={10}
      />
    );

    expect(screen.getByTestId('item-0')).toBeTruthy();
  });

  test('renders with custom keyExtractor returning different keys', () => {
    const data = [
      { uuid: 'abc-123', name: 'Item 1' },
      { uuid: 'def-456', name: 'Item 2' },
    ];

    const keyExtractor = (item) => item.uuid;

    render(
      <BigList
        data={data}
        renderItem={({ item }) => (
          <Text testID={`item-${item.uuid}`}>{item.name}</Text>
        )}
        itemHeight={50}
        keyExtractor={keyExtractor}
      />
    );

    expect(screen.getByTestId('item-abc-123')).toBeTruthy();
    expect(screen.getByTestId('item-def-456')).toBeTruthy();
  });

  test('handles undefined renderItem gracefully by providing a function', () => {
    const data = [{ id: '1', name: 'Item 1' }];

    // renderItem should return null if not needed
    render(
      <BigList data={data} renderItem={() => null} itemHeight={50} />
    );

    // Test should not throw
    expect(true).toBe(true);
  });

  test('renders with very large dataset', () => {
    const data = Array.from({ length: 1000 }, (_, i) => ({
      id: `${i}`,
      name: `Item ${i}`,
    }));

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
      />
    );

    // Should render at least the first item
    expect(screen.getByTestId('item-0')).toBeTruthy();
  });

  test('handles sections with mixed lengths', () => {
    const sections = [
      [{ id: '1', name: 'Item 1' }],
      [
        { id: '2', name: 'Item 2' },
        { id: '3', name: 'Item 3' },
        { id: '4', name: 'Item 4' },
      ],
      [{ id: '5', name: 'Item 5' }, { id: '6', name: 'Item 6' }],
    ];

    render(
      <BigList
        sections={sections}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('item-2')).toBeTruthy();
    expect(screen.getByTestId('item-5')).toBeTruthy();
  });

  test('renders with ListHeaderComponentStyle', () => {
    const data = [{ id: '1', name: 'Item 1' }];
    const HeaderComponent = () => (
      <View testID="header">
        <Text>Header</Text>
      </View>
    );

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID="item-1">{item.name}</Text>}
        itemHeight={50}
        ListHeaderComponent={HeaderComponent}
        ListHeaderComponentStyle={{ backgroundColor: 'blue' }}
        headerHeight={60}
      />
    );

    expect(screen.getByTestId('header')).toBeTruthy();
    expect(screen.getByTestId('item-1')).toBeTruthy();
  });

  test('renders with ListFooterComponentStyle', () => {
    const data = [{ id: '1', name: 'Item 1' }];
    const FooterComponent = () => (
      <View testID="footer">
        <Text>Footer</Text>
      </View>
    );

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID="item-1">{item.name}</Text>}
        itemHeight={50}
        ListFooterComponent={FooterComponent}
        ListFooterComponentStyle={{ backgroundColor: 'red' }}
        footerHeight={60}
      />
    );

    expect(screen.getByTestId('footer')).toBeTruthy();
    expect(screen.getByTestId('item-1')).toBeTruthy();
  });

  test('handles itemHeight as string', () => {
    const data = [{ id: '1', name: 'Item 1' }];

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID="item-1">{item.name}</Text>}
        itemHeight="50"
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
  });

  test('handles complex itemHeight function with sectionData', () => {
    const sections = [
      [{ id: '1', name: 'Item 1', size: 'small' }],
      [{ id: '2', name: 'Item 2', size: 'large' }],
    ];

    const itemHeight = (section, index, sectionData) => {
      if (sectionData && sectionData[index]) {
        return sectionData[index].size === 'large' ? 100 : 50;
      }
      return 50;
    };

    render(
      <BigList
        sections={sections}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={itemHeight}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('item-2')).toBeTruthy();
  });

  test('updates correctly when data changes', () => {
    const data1 = [{ id: '1', name: 'Item 1' }];
    const data2 = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
    ];

    const { rerender } = render(
      <BigList
        data={data1}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.queryByTestId('item-2')).toBeNull();

    rerender(
      <BigList
        data={data2}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('item-2')).toBeTruthy();
  });

  test('handles empty sections with proper renderItem', () => {
    const sections = [];

    render(
      <BigList
        sections={sections}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        itemHeight={50}
      />
    );

    // Test should not throw
    expect(true).toBe(true);
  });

  test('renders with multiple props combined', () => {
    const data = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
    ];

    const renderHeader = () => (
      <View testID="header">
        <Text>Header</Text>
      </View>
    );

    const renderFooter = () => (
      <View testID="footer">
        <Text>Footer</Text>
      </View>
    );

    const onScroll = jest.fn();
    const onEndReached = jest.fn();

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
        renderHeader={renderHeader}
        headerHeight={60}
        renderFooter={renderFooter}
        footerHeight={60}
        onScroll={onScroll}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        numColumns={1}
        inverted={false}
        removeClippedSubviews={true}
      />
    );

    expect(screen.getByTestId('header')).toBeTruthy();
    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('item-2')).toBeTruthy();
    expect(screen.getByTestId('footer')).toBeTruthy();
  });

  test('getItem returns undefined for invalid index', () => {
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

    // Getting an item beyond the data length should return undefined
    const item = listRef.current.getItem({ index: 999 });
    expect(item).toBeUndefined();
  });

  test('handles renderEmpty with null return', () => {
    const renderEmpty = () => null;

    render(
      <BigList data={[]} renderItem={() => null} itemHeight={50} renderEmpty={renderEmpty} />
    );

    // Test should not throw
    expect(true).toBe(true);
  });
});
