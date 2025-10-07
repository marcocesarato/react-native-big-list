import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Text, View } from 'react-native';
import BigList from '../lib/BigList';

describe('BigList - Scroll Methods', () => {
  test('scrollToTop() method is callable', () => {
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

    // Should not throw
    expect(() => listRef.current.scrollToTop({ animated: false })).not.toThrow();
  });

  test('scrollToEnd() method is callable', () => {
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

    // Should not throw
    expect(() => listRef.current.scrollToEnd({ animated: false })).not.toThrow();
  });

  test('scrollTo() method is callable', () => {
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

    // Should not throw
    expect(() => listRef.current.scrollTo({ x: 0, y: 100, animated: false })).not.toThrow();
  });

  test('scrollToOffset() method is callable', () => {
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

    // Should not throw
    expect(() => listRef.current.scrollToOffset({ offset: 100, animated: false })).not.toThrow();
  });

  test('scrollToIndex() method is callable', () => {
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

    // Should not throw
    expect(() => listRef.current.scrollToIndex({ index: 1, animated: false })).not.toThrow();
  });

  test('scrollToItem() method is callable', () => {
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

    // Should not throw
    expect(() => listRef.current.scrollToItem({ item: data[1], animated: false })).not.toThrow();
  });

  test('scrollToLocation() with sections is callable', () => {
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

    // Should not throw
    expect(() => listRef.current.scrollToLocation({ section: 1, index: 0, animated: false })).not.toThrow();
  });

  test('scrollToSection() is callable', () => {
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

    // Should not throw
    expect(() => listRef.current.scrollToSection({ section: 1, animated: false })).not.toThrow();
  });

  test('flashScrollIndicators() is callable', () => {
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

    // Should not throw
    expect(() => listRef.current.flashScrollIndicators()).not.toThrow();
  });
});
