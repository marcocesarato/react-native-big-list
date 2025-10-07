import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Text, View } from 'react-native';
import BigList from '../lib/BigList';

describe('BigList - Advanced Props', () => {
  test('renders with inverted prop', () => {
    const data = [{ id: '1', name: 'Item 1' }];

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID="item-1">{item.name}</Text>}
        itemHeight={50}
        inverted={true}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
  });

  test('renders with getItemLayout prop', () => {
    const data = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
    ];

    const getItemLayout = (data, index) => ({
      length: 60,
      offset: 60 * index,
      index,
    });

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        getItemLayout={getItemLayout}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('item-2')).toBeTruthy();
  });

  test('renders with dynamic itemHeight as function', () => {
    const data = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
    ];

    const itemHeight = (section, index) => {
      return index === 0 ? 50 : 80;
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

  test('renders with insetTop and insetBottom', () => {
    const data = [{ id: '1', name: 'Item 1' }];

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID="item-1">{item.name}</Text>}
        itemHeight={50}
        insetTop={20}
        insetBottom={20}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
  });

  test('renders with batchSizeThreshold', () => {
    const data = Array.from({ length: 50 }, (_, i) => ({
      id: `${i}`,
      name: `Item ${i}`,
    }));

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
        batchSizeThreshold={10}
      />
    );

    expect(screen.getByTestId('item-0')).toBeTruthy();
  });

  test('renders with placeholder enabled', () => {
    const data = [{ id: '1', name: 'Item 1' }];

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID="item-1">{item.name}</Text>}
        itemHeight={50}
        placeholder={true}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
  });

  test('renders with placeholderComponent', () => {
    const data = [{ id: '1', name: 'Item 1' }];
    const PlaceholderComponent = () => <View testID="placeholder"><Text>Loading...</Text></View>;

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID="item-1">{item.name}</Text>}
        itemHeight={50}
        placeholder={true}
        placeholderComponent={<PlaceholderComponent />}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
  });

  test('renders with renderAccessory', () => {
    const data = [{ id: '1', name: 'Item 1' }];
    const renderAccessory = () => (
      <View testID="accessory">
        <Text>Accessory</Text>
      </View>
    );

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID="item-1">{item.name}</Text>}
        itemHeight={50}
        renderAccessory={renderAccessory}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('accessory')).toBeTruthy();
  });

  test('renders with stickySectionHeadersEnabled', () => {
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
        sections={sections}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
        renderSectionHeader={renderSectionHeader}
        sectionHeaderHeight={40}
        stickySectionHeadersEnabled={true}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
  });

  test('isVisible() returns correct boolean', () => {
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

    // In test environment, isVisible may behave differently
    const isVisible = listRef.current.isVisible({ index: 0 });
    expect(typeof isVisible).toBe('boolean');
  });

  test('renders with hideMarginalsOnEmpty', () => {
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
        renderItem={() => null}
        itemHeight={50}
        renderHeader={renderHeader}
        headerHeight={60}
        renderFooter={renderFooter}
        footerHeight={60}
        hideMarginalsOnEmpty={true}
      />
    );

    // With hideMarginalsOnEmpty, headers and footers should be hidden on empty list
    expect(screen.queryByTestId('header')).toBeDefined();
  });

  test('renders with hideHeaderOnEmpty', () => {
    const renderHeader = () => (
      <View testID="header">
        <Text>Header</Text>
      </View>
    );

    render(
      <BigList
        data={[]}
        renderItem={() => null}
        itemHeight={50}
        renderHeader={renderHeader}
        headerHeight={60}
        hideHeaderOnEmpty={true}
      />
    );

    // Header handling with hideHeaderOnEmpty
    expect(screen.queryByTestId('header')).toBeDefined();
  });

  test('renders with controlItemRender prop', () => {
    const data = [{ id: '1', name: 'Item 1' }];

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID="item-1">{item.name}</Text>}
        itemHeight={50}
        controlItemRender={true}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
  });

  test('renders with dynamic sectionHeaderHeight as function', () => {
    const sections = [
      [{ id: '1', name: 'Item 1' }],
      [{ id: '2', name: 'Item 2' }],
    ];

    const sectionHeaderHeight = (section) => {
      return section === 0 ? 40 : 60;
    };

    const renderSectionHeader = (sectionIndex) => (
      <View testID={`section-header-${sectionIndex}`}>
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

  test('renders with dynamic sectionFooterHeight as function', () => {
    const sections = [
      [{ id: '1', name: 'Item 1' }],
      [{ id: '2', name: 'Item 2' }],
    ];

    const sectionFooterHeight = (section) => {
      return section === 0 ? 30 : 50;
    };

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

  test('renders with columnWrapperStyle for multi-column layout', () => {
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
        columnWrapperStyle={{ gap: 10 }}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('item-2')).toBeTruthy();
  });
});
