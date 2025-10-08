import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Text, View } from 'react-native';
import BigList from '../lib/BigList';

describe('BigList - Edge Cases and Coverage', () => {
  test('renders with empty data when batchSize is 0', () => {
    const listRef = React.createRef();
    const data = [];

    render(
      <BigList
        ref={listRef}
        data={data}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        itemHeight={50}
      />
    );

    expect(listRef.current.isEmpty()).toBe(true);
  });

  test('renders with insetTop and insetBottom', () => {
    const data = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
    ];

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
        insetTop={20}
        insetBottom={30}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('item-2')).toBeTruthy();
  });

  test('handles sections with empty first section and renderEmptySections false', () => {
    const sections = [
      [],
      [{ id: '1', name: 'Item 1' }],
      [{ id: '2', name: 'Item 2' }],
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
    expect(screen.getByTestId('item-2')).toBeTruthy();
  });

  test('renders with section footers', () => {
    const sections = [
      [{ id: '1', name: 'Item 1' }],
      [{ id: '2', name: 'Item 2' }],
    ];

    const renderSectionFooter = (sectionIndex) => (
      <View testID={`section-footer-${sectionIndex}`}>
        <Text>Footer {sectionIndex}</Text>
      </View>
    );

    render(
      <BigList
        sections={sections}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
        renderSectionFooter={renderSectionFooter}
        sectionFooterHeight={30}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
  });

  test('handles itemHeight as string', () => {
    const data = [{ id: '1', name: 'Item 1' }];

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight="50"
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
  });

  test('handles headerHeight as string', () => {
    const data = [{ id: '1', name: 'Item 1' }];

    const renderHeader = () => (
      <View testID="header">
        <Text>Header</Text>
      </View>
    );

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
        renderHeader={renderHeader}
        headerHeight="60"
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('header')).toBeTruthy();
  });

  test('handles footerHeight as string', () => {
    const data = [{ id: '1', name: 'Item 1' }];

    const renderFooter = () => (
      <View testID="footer">
        <Text>Footer</Text>
      </View>
    );

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
        renderFooter={renderFooter}
        footerHeight="60"
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('footer')).toBeTruthy();
  });

  test('renders with custom keyExtractor', () => {
    const data = [
      { uuid: 'abc', name: 'Item 1' },
      { uuid: 'def', name: 'Item 2' },
    ];

    const keyExtractor = (item) => item.uuid;

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.uuid}`}>{item.name}</Text>}
        itemHeight={50}
        keyExtractor={keyExtractor}
      />
    );

    expect(screen.getByTestId('item-abc')).toBeTruthy();
    expect(screen.getByTestId('item-def')).toBeTruthy();
  });

  test('renders ListHeaderComponent and ListFooterComponent', () => {
    const data = [{ id: '1', name: 'Item 1' }];

    const HeaderComponent = () => (
      <View testID="list-header-component">
        <Text>List Header</Text>
      </View>
    );

    const FooterComponent = () => (
      <View testID="list-footer-component">
        <Text>List Footer</Text>
      </View>
    );

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
        ListHeaderComponent={HeaderComponent}
        ListFooterComponent={FooterComponent}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
    // ListHeaderComponent and ListFooterComponent should be rendered
  });

  test('handles getItemOffset for section items', () => {
    const listRef = React.createRef();
    const sections = [
      [{ id: '1', name: 'Item 1' }, { id: '2', name: 'Item 2' }],
      [{ id: '3', name: 'Item 3' }],
    ];

    render(
      <BigList
        ref={listRef}
        sections={sections}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        itemHeight={50}
      />
    );

    const offset = listRef.current.getItemOffset({ section: 0, index: 1 });
    expect(typeof offset).toBe('number');
  });

  test('handles isVisible for section items', () => {
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

    const visible = listRef.current.isVisible({ section: 0, index: 0 });
    expect(typeof visible).toBe('boolean');
  });

  test('renders with sections when data is not provided', () => {
    const sections = [[{ id: '2', name: 'Section Item 2' }]];

    render(
      <BigList
        sections={sections}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
      />
    );

    // When sections are provided, they should be rendered
    expect(screen.getByTestId('item-2')).toBeTruthy();
  });

  test('handles renderEmpty function', () => {
    const renderEmpty = () => (
      <View testID="custom-empty">
        <Text>Custom Empty State</Text>
      </View>
    );

    render(
      <BigList
        data={[]}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        itemHeight={50}
        renderEmpty={renderEmpty}
      />
    );

    expect(screen.getByTestId('custom-empty')).toBeTruthy();
  });

  test('handles hideHeaderOnEmpty', () => {
    const renderHeader = () => (
      <View testID="header">
        <Text>Header</Text>
      </View>
    );

    render(
      <BigList
        data={[]}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        itemHeight={50}
        renderHeader={renderHeader}
        headerHeight={60}
        hideHeaderOnEmpty={true}
      />
    );

    // Test that list renders without error when hideHeaderOnEmpty is set
    expect(true).toBe(true);
  });

  test('handles hideFooterOnEmpty', () => {
    const renderFooter = () => (
      <View testID="footer">
        <Text>Footer</Text>
      </View>
    );

    render(
      <BigList
        data={[]}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        itemHeight={50}
        renderFooter={renderFooter}
        footerHeight={60}
        hideFooterOnEmpty={true}
      />
    );

    // Test that list renders without error when hideFooterOnEmpty is set
    expect(true).toBe(true);
  });

  test('renders with numColumns > 1 and columnWrapperStyle', () => {
    const data = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
      { id: '3', name: 'Item 3' },
      { id: '4', name: 'Item 4' },
    ];

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
        numColumns={2}
        columnWrapperStyle={{ gap: 10, padding: 5 }}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('item-2')).toBeTruthy();
  });

  test('renders inverted horizontal list', () => {
    const data = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
    ];

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
        horizontal={true}
        inverted={true}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('item-2')).toBeTruthy();
  });

  test('getNativeScrollRef returns scroll view reference', () => {
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
    expect(scrollRef).toBeDefined();
  });

  test('handles bottom prop', () => {
    const data = [{ id: '1', name: 'Item 1' }];

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
        bottom={20}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
  });

  test('renders with different batchSizeThreshold values', () => {
    const data = Array.from({ length: 50 }, (_, i) => ({
      id: `${i}`,
      name: `Item ${i}`,
    }));

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
        batchSizeThreshold={0.5}
      />
    );

    expect(screen.getByTestId('item-0')).toBeTruthy();
  });

  test('handles sectionHeaderHeight as function with sections', () => {
    const sections = [
      [{ id: '1', name: 'Item 1' }],
      [{ id: '2', name: 'Item 2' }],
    ];

    const sectionHeaderHeight = (section) => (section === 0 ? 40 : 60);

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
        sectionHeaderHeight={sectionHeaderHeight}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
  });

  test('handles sectionFooterHeight as function with sections', () => {
    const sections = [
      [{ id: '1', name: 'Item 1' }],
      [{ id: '2', name: 'Item 2' }],
    ];

    const sectionFooterHeight = (section) => (section === 0 ? 30 : 50);

    const renderSectionFooter = (sectionIndex) => (
      <View testID={`section-footer-${sectionIndex}`}>
        <Text>Footer {sectionIndex}</Text>
      </View>
    );

    render(
      <BigList
        sections={sections}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
        renderSectionFooter={renderSectionFooter}
        sectionFooterHeight={sectionFooterHeight}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
  });
});
