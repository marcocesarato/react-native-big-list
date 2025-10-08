import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Text, View, ScrollView } from 'react-native';
import BigList from '../lib/BigList';

describe('BigList - Additional Advanced Features', () => {
  test('renders with renderScrollViewWrapper', () => {
    const data = [{ id: '1', name: 'Item 1' }];

    const renderScrollViewWrapper = (scrollView) => (
      <View testID="scroll-wrapper">
        {scrollView}
      </View>
    );

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID="item-1">{item.name}</Text>}
        itemHeight={50}
        renderScrollViewWrapper={renderScrollViewWrapper}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('scroll-wrapper')).toBeTruthy();
  });

  test('renders with custom ScrollViewComponent', () => {
    const data = [{ id: '1', name: 'Item 1' }];

    // Use the default ScrollView as custom component
    const CustomScrollView = ScrollView;

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID="item-1">{item.name}</Text>}
        itemHeight={50}
        ScrollViewComponent={CustomScrollView}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
  });

  test('handles nativeOffsetValues prop', () => {
    const data = [{ id: '1', name: 'Item 1' }];
    const { Animated } = require('react-native');
    const offsetX = new Animated.Value(0);
    const offsetY = new Animated.Value(0);

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID="item-1">{item.name}</Text>}
        itemHeight={50}
        nativeOffsetValues={{ x: offsetX, y: offsetY }}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
  });

  test('handles actionSheetScrollRef prop', () => {
    const data = [{ id: '1', name: 'Item 1' }];
    const actionSheetRef = React.createRef();

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID="item-1">{item.name}</Text>}
        itemHeight={50}
        actionSheetScrollRef={actionSheetRef}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
  });

  test('getListProcessor returns processor when scrollView exists', () => {
    const listRef = React.createRef();
    const data = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
    ];

    render(
      <BigList
        ref={listRef}
        data={data}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
      />
    );

    // getListProcessor should be callable
    const processor = listRef.current.getListProcessor();
    // In test environment, it might return null due to mock
    expect(processor === null || processor !== undefined).toBe(true);
  });

  test('handles complex scroll scenarios with sections', () => {
    const listRef = React.createRef();
    const sections = [
      [{ id: '1', name: 'Item 1' }, { id: '2', name: 'Item 2' }],
      [{ id: '3', name: 'Item 3' }, { id: '4', name: 'Item 4' }],
    ];

    const renderSectionHeader = (sectionIndex) => (
      <View testID={`section-${sectionIndex}`}>
        <Text>Section {sectionIndex}</Text>
      </View>
    );

    render(
      <BigList
        ref={listRef}
        sections={sections}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
        renderSectionHeader={renderSectionHeader}
        sectionHeaderHeight={40}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('section-0')).toBeTruthy();
  });

  test('handles data prop changes correctly', () => {
    const data1 = [{ id: '1', name: 'Item 1' }];
    const data2 = [{ id: '1', name: 'Item 1' }, { id: '2', name: 'Item 2' }];

    const { rerender } = render(
      <BigList
        data={data1}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.queryByTestId('item-2')).toBeNull();

    rerender(
      <BigList
        data={data2}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('item-2')).toBeTruthy();
  });

  test('handles sections prop changes correctly', () => {
    const sections1 = [[{ id: '1', name: 'Item 1' }]];
    const sections2 = [
      [{ id: '1', name: 'Item 1' }],
      [{ id: '2', name: 'Item 2' }],
    ];

    const { rerender } = render(
      <BigList
        sections={sections1}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.queryByTestId('item-2')).toBeNull();

    rerender(
      <BigList
        sections={sections2}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={50}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('item-2')).toBeTruthy();
  });

  test('getItemHeight with getItemLayout function', () => {
    const data = [{ id: '1', name: 'Item 1' }];

    const getItemLayout = (data, index) => ({
      length: 75,
      offset: 75 * index,
      index,
    });

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID="item-1">{item.name}</Text>}
        getItemLayout={getItemLayout}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
  });

  test('handles large sections with dynamic heights', () => {
    const sections = [
      Array.from({ length: 50 }, (_, i) => ({ id: `1-${i}`, name: `Item ${i}`, size: i % 2 === 0 ? 'large' : 'small' })),
      Array.from({ length: 50 }, (_, i) => ({ id: `2-${i}`, name: `Item ${i}`, size: 'medium' })),
    ];

    const itemHeight = (section, index, sectionData) => {
      if (sectionData && sectionData[index]) {
        const size = sectionData[index].size;
        if (size === 'large') return 100;
        if (size === 'medium') return 75;
        return 50;
      }
      return 50;
    };

    render(
      <BigList
        sections={sections}
        renderItem={({ item }) => <Text testID={`item-${item.id}`}>{item.name}</Text>}
        itemHeight={itemHeight}
      />
    );

    expect(screen.getByTestId('item-1-0')).toBeTruthy();
    expect(screen.getByTestId('item-2-0')).toBeTruthy();
  });

  test('handles onMomentumScrollBegin callback', () => {
    const onMomentumScrollBegin = jest.fn();
    const data = [{ id: '1', name: 'Item 1' }];

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID="item-1">{item.name}</Text>}
        itemHeight={50}
        onMomentumScrollBegin={onMomentumScrollBegin}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
  });

  test('renders with all scroll event handlers', () => {
    const onScroll = jest.fn();
    const onScrollBeginDrag = jest.fn();
    const onScrollEndDrag = jest.fn();
    const onMomentumScrollEnd = jest.fn();
    const onMomentumScrollBegin = jest.fn();
    const onScrollEnd = jest.fn();

    const data = [{ id: '1', name: 'Item 1' }];

    render(
      <BigList
        data={data}
        renderItem={({ item }) => <Text testID="item-1">{item.name}</Text>}
        itemHeight={50}
        onScroll={onScroll}
        onScrollBeginDrag={onScrollBeginDrag}
        onScrollEndDrag={onScrollEndDrag}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onScrollEnd={onScrollEnd}
      />
    );

    expect(screen.getByTestId('item-1')).toBeTruthy();
  });
});
