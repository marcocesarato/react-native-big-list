import React from 'react';
import { render } from '@testing-library/react-native';
import { Text, View } from 'react-native';
import BigList from '../lib/BigList';

describe('BigList - Methods', () => {
  test('getItem() returns correct item by index', () => {
    const listRef = React.createRef();
    const data = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
      { id: '3', name: 'Item 3' },
    ];

    render(
      <BigList
        ref={listRef}
        data={data}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        itemHeight={50}
      />
    );

    expect(listRef.current.getItem({ index: 0 })).toEqual(data[0]);
    expect(listRef.current.getItem({ index: 1 })).toEqual(data[1]);
    expect(listRef.current.getItem({ index: 2 })).toEqual(data[2]);
  });

  test('getItems() returns all items', () => {
    const listRef = React.createRef();
    const data = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
    ];

    render(
      <BigList
        ref={listRef}
        data={data}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        itemHeight={50}
      />
    );

    const items = listRef.current.getItems();
    expect(items).toEqual(data);
    expect(items.length).toBe(2);
  });

  test('getItemOffset() returns correct offset', () => {
    const listRef = React.createRef();
    const data = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
      { id: '3', name: 'Item 3' },
    ];
    const itemHeight = 50;

    render(
      <BigList
        ref={listRef}
        data={data}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        itemHeight={itemHeight}
      />
    );

    // First item should be at offset 0
    expect(listRef.current.getItemOffset({ index: 0 })).toBe(0);
    // Second item should be at offset 50
    expect(listRef.current.getItemOffset({ index: 1 })).toBe(50);
    // Third item should be at offset 100
    expect(listRef.current.getItemOffset({ index: 2 })).toBe(100);
  });

  test('getItemOffset() with header', () => {
    const listRef = React.createRef();
    const data = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
    ];
    const itemHeight = 50;
    const headerHeight = 100;

    render(
      <BigList
        ref={listRef}
        data={data}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        itemHeight={itemHeight}
        renderHeader={() => <View style={{ height: headerHeight }} />}
        headerHeight={headerHeight}
      />
    );

    // First item should be after header
    expect(listRef.current.getItemOffset({ index: 0 })).toBe(headerHeight);
    // Second item should be at header + itemHeight
    expect(listRef.current.getItemOffset({ index: 1 })).toBe(headerHeight + itemHeight);
  });

  test('isEmpty() method works correctly', () => {
    const listRef = React.createRef();

    const { rerender } = render(
      <BigList
        ref={listRef}
        data={[]}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        itemHeight={50}
      />
    );

    expect(listRef.current.isEmpty()).toBe(true);

    // Update with data
    rerender(
      <BigList
        ref={listRef}
        data={[{ id: '1', name: 'Item 1' }]}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        itemHeight={50}
      />
    );

    expect(listRef.current.isEmpty()).toBe(false);
  });

  test('getNativeScrollRef() returns scroll view reference or null', () => {
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

    const scrollRef = listRef.current.getNativeScrollRef();
    // In test environment with mocked components, this may return null
    expect(scrollRef).toBeDefined();
  });
});
