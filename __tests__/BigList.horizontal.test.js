import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Text, View } from 'react-native';
import BigList from '../lib/BigList';

describe('BigList - Horizontal and Additional Props', () => {
  test('renders with horizontal={true}', () => {
    const data = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
      { id: '3', name: 'Item 3' },
    ];

    render(
      <BigList
        horizontal={true}
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('item-2')).toBeTruthy();
    expect(screen.getByTestId('item-3')).toBeTruthy();
  });

  test('renders with horizontal={false} (default)', () => {
    const data = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
    ];

    render(
      <BigList
        horizontal={false}
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('item-2')).toBeTruthy();
  });

  test('renders horizontal list with header and footer', () => {
    const data = [{ id: '1', name: 'Item 1' }];

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

    render(
      <BigList
        horizontal={true}
        data={data}
        renderItem={({ item }) => <Text testID="item-1">{item.name}</Text>}
        itemHeight={200}
        renderHeader={renderHeader}
        headerHeight={200}
        renderFooter={renderFooter}
        footerHeight={200}
      />
    );

    expect(screen.getByTestId('header')).toBeTruthy();
    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('footer')).toBeTruthy();
  });

  test('renders with renderEmptySections prop', () => {
    const sections = [[], [{ id: '1', name: 'Item 1' }], []];

    render(
      <BigList
        sections={sections}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
        renderEmptySections={true}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
  });

  test('handles horizontal list with large dataset', () => {
    const data = Array.from({ length: 100 }, (_, i) => ({
      id: `${i}`,
      name: `Item ${i}`,
    }));

    render(
      <BigList
        horizontal={true}
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={150}
      />
    );

    expect(screen.getByTestId('item-0')).toBeTruthy();
  });

  test('horizontal list with sections', () => {
    const sections = [
      [{ id: '1', name: 'Item 1' }],
      [{ id: '2', name: 'Item 2' }],
    ];

    const renderSectionHeader = (sectionIndex) => (
      <View testID={`section-header-${sectionIndex}`}>
        <Text>Section {sectionIndex}</Text>
      </View>
    );

    render(
      <BigList
        horizontal={true}
        sections={sections}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={150}
        renderSectionHeader={renderSectionHeader}
        sectionHeaderHeight={150}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('item-2')).toBeTruthy();
  });

  test('handles horizontal with inverted', () => {
    const data = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
    ];

    render(
      <BigList
        horizontal={true}
        inverted={true}
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('item-2')).toBeTruthy();
  });

  test('horizontal list with numColumns should work', () => {
    const data = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
      { id: '3', name: 'Item 3' },
      { id: '4', name: 'Item 4' },
    ];

    render(
      <BigList
        horizontal={true}
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={100}
        numColumns={2}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('item-2')).toBeTruthy();
  });

  test('handles contentInset with horizontal layout', () => {
    const data = [{ id: '1', name: 'Item 1' }];

    render(
      <BigList
        horizontal={true}
        data={data}
        renderItem={({ item }) => <Text testID="item-1">{item.name}</Text>}
        itemHeight={50}
        contentInset={{ left: 10, right: 10, top: 0, bottom: 0 }}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
  });

  test('handles initialScrollIndex with horizontal', () => {
    const data = Array.from({ length: 20 }, (_, i) => ({
      id: `${i}`,
      name: `Item ${i}`,
    }));

    const listRef = React.createRef();

    render(
      <BigList
        ref={listRef}
        horizontal={true}
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={150}
        initialScrollIndex={5}
      />
    );

    expect(screen.getByTestId('item-0')).toBeTruthy();
  });

  test('horizontal list scrollToIndex works', () => {
    const listRef = React.createRef();
    const data = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
      { id: '3', name: 'Item 3' },
    ];

    render(
      <BigList
        ref={listRef}
        horizontal={true}
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={150}
      />
    );

    // Should not throw
    expect(() => listRef.current.scrollToIndex({ index: 1, animated: false })).not.toThrow();
  });
});
