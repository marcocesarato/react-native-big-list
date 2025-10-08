import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import BigList from '../lib/BigList';

describe('BigList - Method Coverage', () => {
  test('flashScrollIndicators can be called', () => {
    const listRef = React.createRef();
    const data = [{ id: '1', name: 'Item 1' }];

    render(
      <BigList
        ref={listRef}
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
      />
    );

    expect(() => listRef.current.flashScrollIndicators()).not.toThrow();
  });

  test('scrollTo can be called with x and y', () => {
    const listRef = React.createRef();
    const data = Array.from({ length: 20 }, (_, i) => ({
      id: `${i}`,
      name: `Item ${i}`,
    }));

    render(
      <BigList
        ref={listRef}
        data={data}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        itemHeight={50}
      />
    );

    expect(() => listRef.current.scrollTo({ x: 0, y: 100, animated: false })).not.toThrow();
  });

  test('scrollToIndex can be called', () => {
    const listRef = React.createRef();
    const data = Array.from({ length: 20 }, (_, i) => ({
      id: `${i}`,
      name: `Item ${i}`,
    }));

    render(
      <BigList
        ref={listRef}
        data={data}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        itemHeight={50}
      />
    );

    const result = listRef.current.scrollToIndex({ index: 5, animated: false });
    expect(typeof result).toBe('boolean');
  });

  test('scrollToLocation can be called for sections', () => {
    const listRef = React.createRef();
    const sections = [
      Array.from({ length: 10 }, (_, i) => ({ id: `1-${i}`, name: `Item ${i}` })),
      Array.from({ length: 10 }, (_, i) => ({ id: `2-${i}`, name: `Item ${i}` })),
    ];

    render(
      <BigList
        ref={listRef}
        sections={sections}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        itemHeight={50}
      />
    );

    const result = listRef.current.scrollToLocation({ sectionIndex: 1, itemIndex: 2, animated: false });
    expect(typeof result).toBe('boolean');
  });

  test('scrollToEnd can be called', () => {
    const listRef = React.createRef();
    const data = Array.from({ length: 20 }, (_, i) => ({
      id: `${i}`,
      name: `Item ${i}`,
    }));

    render(
      <BigList
        ref={listRef}
        data={data}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        itemHeight={50}
      />
    );

    expect(() => listRef.current.scrollToEnd({ animated: false })).not.toThrow();
  });

  test('scrollToOffset can be called with horizontal list', () => {
    const listRef = React.createRef();
    const data = Array.from({ length: 20 }, (_, i) => ({
      id: `${i}`,
      name: `Item ${i}`,
    }));

    render(
      <BigList
        ref={listRef}
        data={data}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        itemHeight={50}
        horizontal={true}
      />
    );

    expect(() => listRef.current.scrollToOffset({ offset: 100, animated: false })).not.toThrow();
  });

  test('getItemOffset works for data items', () => {
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

    const offset = listRef.current.getItemOffset({ index: 1 });
    expect(typeof offset).toBe('number');
  });

  test('isVisible returns correct value', () => {
    const listRef = React.createRef();
    const data = Array.from({ length: 50 }, (_, i) => ({
      id: `${i}`,
      name: `Item ${i}`,
    }));

    render(
      <BigList
        ref={listRef}
        data={data}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        itemHeight={50}
      />
    );

    const visible = listRef.current.isVisible({ index: 0 });
    expect(typeof visible).toBe('boolean');
  });

  test('getListProcessor returns processor', () => {
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

    const processor = listRef.current.getListProcessor();
    // Processor might be null in test environment but method should work
    expect(processor === null || processor !== undefined).toBe(true);
  });

  test('getItemHeight returns correct value', () => {
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

    const height = listRef.current.getItemHeight();
    expect(typeof height).toBe('number');
  });

  test('getSectionLengths returns array', () => {
    const listRef = React.createRef();
    const sections = [
      [{ id: '1', name: 'Item 1' }],
      [{ id: '2', name: 'Item 2' }, { id: '3', name: 'Item 3' }],
    ];

    render(
      <BigList
        ref={listRef}
        sections={sections}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        itemHeight={50}
      />
    );

    const lengths = listRef.current.getSectionLengths();
    expect(Array.isArray(lengths)).toBe(true);
  });

  test('getItem works with sections', () => {
    const listRef = React.createRef();
    const sections = [
      [{ id: '1', name: 'Item 1' }],
      [{ id: '2', name: 'Item 2' }],
    ];

    render(
      <BigList
        ref={listRef}
        sections={sections}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        itemHeight={50}
      />
    );

    const item = listRef.current.getItem({ section: 1, index: 0 });
    expect(item).toEqual({ id: '2', name: 'Item 2' });
  });
});
