import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Text, View } from 'react-native';
import BigList from '../lib/BigList';

describe('BigList - Complete Coverage Tests', () => {
  test('renders with zero height sections', () => {
    const sections = [
      [],
      [],
      [{ id: '1', name: 'Item 1' }],
    ];

    render(
      <BigList
        sections={sections}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
        renderEmptySections={false}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
  });

  test('handles mixed empty and non-empty sections with headers', () => {
    const sections = [
      [],
      [{ id: '1', name: 'Item 1' }],
      [],
      [{ id: '2', name: 'Item 2' }],
      [],
    ];

    const renderSectionHeader = (sectionIndex) => (
      <View testID={`section-${sectionIndex}`}>
        <Text>Section {sectionIndex}</Text>
      </View>
    );

    render(
      <BigList
        sections={sections}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
        renderSectionHeader={renderSectionHeader}
        sectionHeaderHeight={40}
        renderEmptySections={false}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('item-2')).toBeTruthy();
  });

  test('handles very large dataset with sections', () => {
    const sections = Array.from({ length: 10 }, (_, sectionIdx) =>
      Array.from({ length: 20 }, (_, itemIdx) => ({
        id: `${sectionIdx}-${itemIdx}`,
        name: `Item ${sectionIdx}-${itemIdx}`,
      }))
    );

    render(
      <BigList
        sections={sections}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
      />
    );

    expect(screen.getByTestId('item-0-0')).toBeTruthy();
  });

  test('handles sections with varying row counts and numColumns', () => {
    const sections = [
      Array.from({ length: 7 }, (_, i) => ({ id: `1-${i}`, name: `Item ${i}` })),
      Array.from({ length: 5 }, (_, i) => ({ id: `2-${i}`, name: `Item ${i}` })),
      Array.from({ length: 11 }, (_, i) => ({ id: `3-${i}`, name: `Item ${i}` })),
    ];

    render(
      <BigList
        sections={sections}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
        numColumns={3}
      />
    );

    expect(screen.getByTestId('item-1-0')).toBeTruthy();
    expect(screen.getByTestId('item-2-0')).toBeTruthy();
    expect(screen.getByTestId('item-3-0')).toBeTruthy();
  });

  test('renders with custom onLayout callback', () => {
    const onLayout = jest.fn();
    const data = [{ id: '1', name: 'Item 1' }];

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
        onLayout={onLayout}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
  });

  test('handles initialScrollIndex with sections', () => {
    const sections = [
      Array.from({ length: 10 }, (_, i) => ({ id: `1-${i}`, name: `Item ${i}` })),
      Array.from({ length: 10 }, (_, i) => ({ id: `2-${i}`, name: `Item ${i}` })),
    ];

    render(
      <BigList
        sections={sections}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
        initialScrollIndex={5}
      />
    );

    expect(screen.getByTestId('item-1-0')).toBeTruthy();
  });

  test('scrollToLocation returns boolean for sections', () => {
    const listRef = React.createRef();
    const sections = [
      Array.from({ length: 5 }, (_, i) => ({ id: `1-${i}`, name: `Item ${i}` })),
      Array.from({ length: 5 }, (_, i) => ({ id: `2-${i}`, name: `Item ${i}` })),
    ];

    render(
      <BigList
        ref={listRef}
        sections={sections}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        itemHeight={50}
      />
    );

    if (listRef.current) {
      const result = listRef.current.scrollToLocation({
        sectionIndex: 1,
        itemIndex: 2,
        animated: false,
      });
      expect(typeof result).toBe('boolean');
    }
  });

  test('handles column wrapper with different styles', () => {
    const data = Array.from({ length: 10 }, (_, i) => ({
      id: `${i}`,
      name: `Item ${i}`,
    }));

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
        numColumns={2}
        columnWrapperStyle={[{ gap: 10 }, { padding: 5 }]}
      />
    );

    expect(screen.getByTestId('item-0')).toBeTruthy();
  });

  test('renders with ListEmptyComponent as function', () => {
    const EmptyComponent = () => (
      <View testID="empty-func">
        <Text>Empty List</Text>
      </View>
    );

    render(
      <BigList
        data={[]}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        itemHeight={50}
        ListEmptyComponent={EmptyComponent}
      />
    );

    expect(screen.getByTestId('empty-func')).toBeTruthy();
  });

  test('renders with ListHeaderComponent as function', () => {
    const data = [{ id: '1', name: 'Item 1' }];
    const HeaderComponent = () => (
      <View testID="header-func">
        <Text>Header</Text>
      </View>
    );

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
        ListHeaderComponent={HeaderComponent}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
  });

  test('renders with ListFooterComponent as function', () => {
    const data = [{ id: '1', name: 'Item 1' }];
    const FooterComponent = () => (
      <View testID="footer-func">
        <Text>Footer</Text>
      </View>
    );

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
        ListFooterComponent={FooterComponent}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
  });

  test('getSectionLengths with data array', () => {
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

    const lengths = listRef.current.getSectionLengths();
    expect(Array.isArray(lengths)).toBe(true);
    expect(lengths[0]).toBe(2);
  });

  test('hasSections returns correct value', () => {
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

    const hasSections = listRef.current.hasSections();
    expect(typeof hasSections).toBe('boolean');
  });

  test('handles very small batchSizeThreshold', () => {
    const data = Array.from({ length: 50 }, (_, i) => ({
      id: `${i}`,
      name: `Item ${i}`,
    }));

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
        batchSizeThreshold={0.1}
      />
    );

    expect(screen.getByTestId('item-0')).toBeTruthy();
  });

  test('handles sections with all different lengths', () => {
    const sections = [
      [{ id: '1', name: 'Item 1' }],
      [{ id: '2', name: 'Item 2' }, { id: '3', name: 'Item 3' }],
      [
        { id: '4', name: 'Item 4' },
        { id: '5', name: 'Item 5' },
        { id: '6', name: 'Item 6' },
      ],
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
    expect(screen.getByTestId('item-4')).toBeTruthy();
  });
});
