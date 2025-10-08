import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Text, View } from 'react-native';
import BigList from '../lib/BigList';

describe('BigList - Dynamic Heights and Layouts', () => {
  test('getItemLayout returns correct layout with sections', () => {
    const listRef = React.createRef();
    const sections = [
      [{ id: '1', name: 'Item 1' }, { id: '2', name: 'Item 2' }],
      [{ id: '3', name: 'Item 3' }],
    ];

    const getItemLayout = (data, index) => ({
      length: 50 + (index * 10),
      offset: index * 60,
      index,
    });

    render(
      <BigList
        ref={listRef}
        sections={sections}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        itemHeight={50}
        getItemLayout={getItemLayout}
      />
    );

    const height = listRef.current.getItemHeight();
    expect(height).toBe(50);
  });

  test('works without itemHeight when getItemLayout is provided', () => {
    const data = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
    ];

    const getItemLayout = (data, index) => ({
      length: 50,
      offset: index * 50,
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
  });

  test('handles itemHeight as function returning different values', () => {
    const data = Array.from({ length: 10 }, (_, i) => ({
      id: `${i}`,
      name: `Item ${i}`,
    }));

    const itemHeight = (item, index) => {
      if (index % 3 === 0) return 60;
      if (index % 3 === 1) return 70;
      return 80;
    };

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={itemHeight}
      />
    );

    expect(screen.getByTestId('item-0')).toBeTruthy();
    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('item-2')).toBeTruthy();
  });

  test('handles section-based itemHeight function', () => {
    const sections = [
      [{ id: '1', name: 'Item 1' }, { id: '2', name: 'Item 2' }],
      [{ id: '3', name: 'Item 3' }, { id: '4', name: 'Item 4' }],
    ];

    const itemHeight = (section, index) => {
      return section === 0 ? 50 : 60;
    };

    render(
      <BigList
        sections={sections}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={itemHeight}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('item-3')).toBeTruthy();
  });

  test('renders with variable heights in multicolumn layout', () => {
    const data = Array.from({ length: 12 }, (_, i) => ({
      id: `${i}`,
      name: `Item ${i}`,
    }));

    const itemHeight = (item, index) => {
      return 50 + (index % 3) * 10;
    };

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={itemHeight}
        numColumns={3}
      />
    );

    expect(screen.getByTestId('item-0')).toBeTruthy();
    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('item-2')).toBeTruthy();
  });

  test('handles headerHeight as function', () => {
    const data = [{ id: '1', name: 'Item 1' }];

    const headerHeight = () => 100;

    const renderHeader = () => (
      <View testID="header">
        <Text>Dynamic Header</Text>
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

  test('handles footerHeight as function', () => {
    const data = [{ id: '1', name: 'Item 1' }];

    const footerHeight = () => 80;

    const renderFooter = () => (
      <View testID="footer">
        <Text>Dynamic Footer</Text>
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

  test('renders with all dynamic height functions for sections', () => {
    const sections = [
      [{ id: '1', name: 'Item 1' }],
      [{ id: '2', name: 'Item 2' }],
    ];

    const itemHeight = (section, index) => 50 + section * 10;
    const sectionHeaderHeight = (section) => 40 + section * 5;
    const sectionFooterHeight = (section) => 30 + section * 5;

    const renderSectionHeader = (sectionIndex) => (
      <View testID={`section-header-${sectionIndex}`}>
        <Text>Header {sectionIndex}</Text>
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
        itemHeight={itemHeight}
        renderSectionHeader={renderSectionHeader}
        sectionHeaderHeight={sectionHeaderHeight}
        renderSectionFooter={renderSectionFooter}
        sectionFooterHeight={sectionFooterHeight}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('item-2')).toBeTruthy();
  });

  test('handles empty sections with dynamic heights', () => {
    const sections = [
      [],
      [{ id: '1', name: 'Item 1' }],
      [],
    ];

    const sectionHeaderHeight = (section) => {
      return section === 1 ? 60 : 40;
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
        itemHeight={50}
        renderSectionHeader={renderSectionHeader}
        sectionHeaderHeight={sectionHeaderHeight}
        renderEmptySections={false}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
  });

  test('handles numColumns with sections and dynamic item heights', () => {
    const sections = [
      Array.from({ length: 6 }, (_, i) => ({ id: `1-${i}`, name: `Item ${i}` })),
      Array.from({ length: 4 }, (_, i) => ({ id: `2-${i}`, name: `Item ${i}` })),
    ];

    const itemHeight = (section, index) => {
      return section === 0 ? 50 : 60;
    };

    render(
      <BigList
        sections={sections}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={itemHeight}
        numColumns={2}
      />
    );

    expect(screen.getByTestId('item-1-0')).toBeTruthy();
    expect(screen.getByTestId('item-2-0')).toBeTruthy();
  });

  test('handles horizontal layout with dynamic heights', () => {
    const data = Array.from({ length: 10 }, (_, i) => ({
      id: `${i}`,
      name: `Item ${i}`,
    }));

    const itemHeight = (item, index) => {
      return 150 + (index % 2) * 50;
    };

    render(
      <BigList
        horizontal={true}
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={itemHeight}
      />
    );

    expect(screen.getByTestId('item-0')).toBeTruthy();
  });

  test('getItemOffset works with dynamic heights', () => {
    const listRef = React.createRef();
    const data = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
      { id: '3', name: 'Item 3' },
    ];

    const itemHeight = (item, index) => {
      return 50 + index * 10;
    };

    render(
      <BigList
        ref={listRef}
        data={data}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        itemHeight={itemHeight}
      />
    );

    const offset1 = listRef.current.getItemOffset({ index: 0 });
    const offset2 = listRef.current.getItemOffset({ index: 1 });
    expect(typeof offset1).toBe('number');
    expect(typeof offset2).toBe('number');
  });
});
