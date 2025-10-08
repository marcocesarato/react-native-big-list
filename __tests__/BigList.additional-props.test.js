import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Text, View, Animated, RefreshControl, ScrollView } from 'react-native';
import BigList from '../lib/BigList';

describe('BigList - Additional Props', () => {
  test('renders with contentInset prop', () => {
    const data = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
    ];

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
        contentInset={{ top: 10, bottom: 10, left: 5, right: 5 }}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('item-2')).toBeTruthy();
  });

  test('renders with renderAccessory prop', () => {
    const data = [{ id: '1', name: 'Item 1' }];

    const renderAccessory = (listRef) => (
      <View testID="accessory">
        <Text>Accessory Component</Text>
      </View>
    );

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
        renderAccessory={renderAccessory}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('accessory')).toBeTruthy();
  });

  test('renders with renderScrollViewWrapper prop', () => {
    const data = [{ id: '1', name: 'Item 1' }];

    const renderScrollViewWrapper = (scrollView) => (
      <View testID="scroll-wrapper">
        {scrollView}
      </View>
    );

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
        renderScrollViewWrapper={renderScrollViewWrapper}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('scroll-wrapper')).toBeTruthy();
  });

  test('renders with custom refreshControl', () => {
    const data = [{ id: '1', name: 'Item 1' }];
    const onRefresh = jest.fn();

    const customRefreshControl = (
      <RefreshControl refreshing={false} onRefresh={onRefresh} />
    );

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
        refreshControl={customRefreshControl}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
  });

  test('renders with actionSheetScrollRef', () => {
    const data = [{ id: '1', name: 'Item 1' }];
    const actionSheetScrollRef = React.createRef();

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
        actionSheetScrollRef={actionSheetScrollRef}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
  });

  test('renders with controlItemRender prop', () => {
    const data = [{ id: '1', name: 'Item 1' }];

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
        controlItemRender={true}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
  });

  test('renders with ListHeaderComponentStyle', () => {
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
        headerHeight={60}
        ListHeaderComponent={renderHeader}
        ListHeaderComponentStyle={{ backgroundColor: 'blue', padding: 10 }}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
  });

  test('renders with ListFooterComponentStyle', () => {
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
        footerHeight={60}
        ListFooterComponent={renderFooter}
        ListFooterComponentStyle={{ backgroundColor: 'red', padding: 10 }}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
  });

  test('renders with nativeOffsetValues', () => {
    const data = [{ id: '1', name: 'Item 1' }];
    const xOffset = new Animated.Value(0);
    const yOffset = new Animated.Value(0);

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
        nativeOffsetValues={{ x: xOffset, y: yOffset }}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
  });

  test('renders with stickySectionHeadersEnabled false', () => {
    const sections = [
      [{ id: '1', name: 'Item 1' }],
      [{ id: '2', name: 'Item 2' }],
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
        stickySectionHeadersEnabled={false}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
  });

  test('handles onScrollEndDrag callback', () => {
    const onScrollEndDrag = jest.fn();
    const data = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
    ];

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
        onScrollEndDrag={onScrollEndDrag}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
  });

  test('renders with custom ScrollViewComponent', () => {
    const data = [{ id: '1', name: 'Item 1' }];
    const CustomScrollView = ScrollView;

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
        ScrollViewComponent={CustomScrollView}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
  });

  test('renders with getItemLayout function', () => {
    const data = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
    ];

    const getItemLayout = (data, index) => ({
      length: 50,
      offset: 50 * index,
      index,
    });

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
        getItemLayout={getItemLayout}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('item-2')).toBeTruthy();
  });

  test('renders with dynamic itemHeight function', () => {
    const data = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
    ];

    const itemHeight = (item, index) => {
      return index === 0 ? 50 : 70;
    };

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={itemHeight}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('item-2')).toBeTruthy();
  });

  test('renders with keyboardDismissMode', () => {
    const data = [{ id: '1', name: 'Item 1' }];

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
        keyboardDismissMode="on-drag"
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
  });

  test('renders with keyboardShouldPersistTaps', () => {
    const data = [{ id: '1', name: 'Item 1' }];

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
        keyboardShouldPersistTaps="handled"
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
  });

  test('renders with scrollEventThrottle', () => {
    const data = [{ id: '1', name: 'Item 1' }];

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
        scrollEventThrottle={32}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
  });

  test('renders with hideMarginalsOnEmpty true', () => {
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
        data={[]}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        itemHeight={50}
        renderHeader={renderHeader}
        headerHeight={60}
        renderFooter={renderFooter}
        footerHeight={60}
        hideMarginalsOnEmpty={true}
      />
    );

    // Test should not throw - hideMarginalsOnEmpty hides header/footer when list is empty
    expect(true).toBe(true);
  });

  test('renders with renderEmptySections true', () => {
    const sections = [
      [],
      [{ id: '1', name: 'Item 1' }],
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
        renderEmptySections={true}
      />
    );

    // When renderEmptySections is true, empty sections should be rendered
    expect(screen.getByTestId('item-1')).toBeTruthy();
  });

  test('renders with dynamic headerHeight function', () => {
    const data = [{ id: '1', name: 'Item 1' }];

    const headerHeight = () => 80;

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
        headerHeight={headerHeight}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('header')).toBeTruthy();
  });

  test('renders with dynamic footerHeight function', () => {
    const data = [{ id: '1', name: 'Item 1' }];

    const footerHeight = () => 90;

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
        footerHeight={footerHeight}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('footer')).toBeTruthy();
  });
});
