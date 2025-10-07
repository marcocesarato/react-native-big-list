import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Text, View } from 'react-native';
import BigList from '../lib/BigList';

describe('BigList - Sections', () => {
  test('renders sections with data', () => {
    const sections = [
      [
        { id: '1', name: 'Item 1' },
        { id: '2', name: 'Item 2' },
      ],
      [
        { id: '3', name: 'Item 3' },
        { id: '4', name: 'Item 4' },
      ],
    ];

    const renderItem = ({ item }) => (
      <View testID={`item-${item.id}`}>
        <Text>{item.name}</Text>
      </View>
    );

    render(<BigList sections={sections} renderItem={renderItem} itemHeight={50} />);

    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('item-2')).toBeTruthy();
    expect(screen.getByTestId('item-3')).toBeTruthy();
    expect(screen.getByTestId('item-4')).toBeTruthy();
  });

  test('renders section headers', () => {
    const sections = [
      [
        { id: '1', name: 'Item 1' },
        { id: '2', name: 'Item 2' },
      ],
      [
        { id: '3', name: 'Item 3' },
        { id: '4', name: 'Item 4' },
      ],
    ];

    const renderItem = ({ item }) => (
      <View testID={`item-${item.id}`}>
        <Text>{item.name}</Text>
      </View>
    );

    const renderSectionHeader = (sectionIndex) => (
      <View testID={`section-${sectionIndex}`}>
        <Text>Section {sectionIndex}</Text>
      </View>
    );

    render(
      <BigList
        sections={sections}
        renderItem={renderItem}
        itemHeight={50}
        renderSectionHeader={renderSectionHeader}
        sectionHeaderHeight={40}
      />
    );

    expect(screen.getByTestId('section-0')).toBeTruthy();
    expect(screen.getByTestId('section-1')).toBeTruthy();
  });

  test('isEmpty() returns true with empty sections', () => {
    const listRef = React.createRef();
    const sections = [[], []];

    render(
      <BigList
        ref={listRef}
        sections={sections}
        renderItem={() => null}
        itemHeight={50}
      />
    );

    expect(listRef.current.isEmpty()).toBe(true);
  });

  test('isEmpty() returns false with non-empty sections', () => {
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

    expect(listRef.current.isEmpty()).toBe(false);
  });

  test('getItem() works with sections', () => {
    const listRef = React.createRef();
    const sections = [
      [
        { id: '1', name: 'Item 1' },
        { id: '2', name: 'Item 2' },
      ],
      [
        { id: '3', name: 'Item 3' },
        { id: '4', name: 'Item 4' },
      ],
    ];

    render(
      <BigList
        ref={listRef}
        sections={sections}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        itemHeight={50}
      />
    );

    // Get items from first section
    expect(listRef.current.getItem({ section: 0, index: 0 })).toEqual(sections[0][0]);
    expect(listRef.current.getItem({ section: 0, index: 1 })).toEqual(sections[0][1]);

    // Get items from second section
    expect(listRef.current.getItem({ section: 1, index: 0 })).toEqual(sections[1][0]);
    expect(listRef.current.getItem({ section: 1, index: 1 })).toEqual(sections[1][1]);
  });

  test('renders section footers', () => {
    const sections = [
      [{ id: '1', name: 'Item 1' }],
      [{ id: '2', name: 'Item 2' }],
    ];

    const renderItem = ({ item }) => (
      <View testID={`item-${item.id}`}>
        <Text>{item.name}</Text>
      </View>
    );

    const renderSectionFooter = (sectionIndex) => (
      <View testID={`footer-${sectionIndex}`}>
        <Text>Footer {sectionIndex}</Text>
      </View>
    );

    render(
      <BigList
        sections={sections}
        renderItem={renderItem}
        itemHeight={50}
        renderSectionFooter={renderSectionFooter}
        sectionFooterHeight={30}
      />
    );

    expect(screen.getByTestId('footer-0')).toBeTruthy();
    expect(screen.getByTestId('footer-1')).toBeTruthy();
  });
});
