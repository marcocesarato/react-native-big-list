import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Text, View } from 'react-native';
import BigList from '../lib/BigList';

describe('BigList - Rendering Paths', () => {
  test('renders with multiple sections and headers/footers', () => {
    const sections = [
      [{ id: '1', name: 'Item 1' }],
      [{ id: '2', name: 'Item 2' }, { id: '3', name: 'Item 3' }],
      [{ id: '4', name: 'Item 4' }],
    ];

    const renderSectionHeader = (sectionIndex) => (
      <View testID={`section-header-${sectionIndex}`}>
        <Text>Section {sectionIndex}</Text>
      </View>
    );

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
        renderSectionHeader={renderSectionHeader}
        sectionHeaderHeight={40}
        renderSectionFooter={renderSectionFooter}
        sectionFooterHeight={30}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('item-2')).toBeTruthy();
  });

  test('renders with multiple columns and sections', () => {
    const sections = [
      Array.from({ length: 6 }, (_, i) => ({ id: `1-${i}`, name: `Item ${i}` })),
      Array.from({ length: 4 }, (_, i) => ({ id: `2-${i}`, name: `Item ${i}` })),
    ];

    render(
      <BigList
        sections={sections}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
        numColumns={2}
      />
    );

    expect(screen.getByTestId('item-1-0')).toBeTruthy();
    expect(screen.getByTestId('item-2-0')).toBeTruthy();
  });

  test('renders with insets and content inset', () => {
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
        insetBottom={20}
        contentInset={{ top: 10, bottom: 10, left: 5, right: 5 }}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
  });

  test('renders with custom bottom prop', () => {
    const data = [{ id: '1', name: 'Item 1' }];

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
        bottom={100}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
  });

  test('renders with horizontal layout and sections', () => {
    const sections = [
      [{ id: '1', name: 'Item 1' }],
      [{ id: '2', name: 'Item 2' }],
    ];

    render(
      <BigList
        horizontal={true}
        sections={sections}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={150}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
  });

  test('renders with dynamic itemHeight function for data', () => {
    const data = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
      { id: '3', name: 'Item 3' },
    ];

    const itemHeight = (item, index) => {
      if (index === 0) return 60;
      if (index === 1) return 70;
      return 50;
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
    expect(screen.getByTestId('item-3')).toBeTruthy();
  });

  test('renders with empty sections and renderEmptySections enabled', () => {
    const sections = [
      [],
      [{ id: '1', name: 'Item 1' }],
      [],
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
        renderEmptySections={true}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('item-2')).toBeTruthy();
  });

  test('renders with large dataset and batchSizeThreshold', () => {
    const data = Array.from({ length: 100 }, (_, i) => ({
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

  test('renders with mixed height items in sections', () => {
    const sections = [
      [{ id: '1', name: 'Item 1' }],
      [{ id: '2', name: 'Item 2' }],
    ];

    const itemHeight = (section, index) => {
      return section === 0 ? 60 : 70;
    };

    const sectionHeaderHeight = (section) => {
      return section === 0 ? 40 : 50;
    };

    const renderSectionHeader = (sectionIndex) => (
      <View testID={`section-${sectionIndex}`}>
        <Text>Section {sectionIndex}</Text>
      </View>
    );

    render(
      <BigList
        sections={sections}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={itemHeight}
        renderSectionHeader={renderSectionHeader}
        sectionHeaderHeight={sectionHeaderHeight}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('item-2')).toBeTruthy();
  });

  test('renders with header, footer and all margins enabled', () => {
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
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
        renderHeader={renderHeader}
        headerHeight={60}
        renderFooter={renderFooter}
        footerHeight={60}
        insetTop={10}
        insetBottom={10}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('header')).toBeTruthy();
    expect(screen.getByTestId('footer')).toBeTruthy();
  });

  test('renders with numColumns and multiple sections', () => {
    const sections = [
      Array.from({ length: 8 }, (_, i) => ({ id: `1-${i}`, name: `Item ${i}` })),
      Array.from({ length: 6 }, (_, i) => ({ id: `2-${i}`, name: `Item ${i}` })),
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
        numColumns={3}
        renderSectionHeader={renderSectionHeader}
        sectionHeaderHeight={40}
      />
    );

    expect(screen.getByTestId('item-1-0')).toBeTruthy();
    expect(screen.getByTestId('item-2-0')).toBeTruthy();
  });

  test('renders with all empty hide props', () => {
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
        hideMarginalsOnEmpty={false}
        hideHeaderOnEmpty={false}
        hideFooterOnEmpty={false}
      />
    );

    // When hide props are false, header and footer should render
    expect(screen.getByTestId('header')).toBeTruthy();
    expect(screen.getByTestId('footer')).toBeTruthy();
  });

  test('handles very large batchSizeThreshold', () => {
    const data = Array.from({ length: 50 }, (_, i) => ({
      id: `${i}`,
      name: `Item ${i}`,
    }));

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
        batchSizeThreshold={5}
      />
    );

    expect(screen.getByTestId('item-0')).toBeTruthy();
  });
});
