# Testing Guide

This directory contains automated tests for react-native-big-list.

## Test Structure

Tests are organized by functionality:

- **BigList.basic.test.js** - Basic rendering tests with various props configurations
- **BigList.empty.test.js** - Empty state handling and `isEmpty()` method tests
- **BigList.methods.test.js** - Tests for public methods like `getItem()`, `getItems()`, `getItemOffset()`, etc.
- **BigList.sections.test.js** - Section list functionality tests
- **BigList.headers-footers.test.js** - Header and footer rendering tests

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Test Coverage

Current coverage thresholds:
- **Statements**: 60%
- **Branches**: 45%
- **Functions**: 60%
- **Lines**: 60%

Coverage reports are generated in the `coverage/` directory.

## Writing New Tests

When adding new tests, follow these patterns:

### Basic Test Structure

```javascript
import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Text, View } from 'react-native';
import BigList from '../lib/BigList';

describe('Feature Name', () => {
  test('should do something', () => {
    const data = [{ id: '1', name: 'Item 1' }];
    const renderItem = ({ item }) => (
      <View testID={`item-${item.id}`}>
        <Text>{item.name}</Text>
      </View>
    );

    render(<BigList data={data} renderItem={renderItem} itemHeight={50} />);

    expect(screen.getByTestId('item-1')).toBeTruthy();
  });
});
```

### Testing Methods

```javascript
test('method returns expected value', () => {
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

  expect(listRef.current.isEmpty()).toBe(false);
});
```

## Testing Philosophy

These tests focus on:

1. **Component rendering** - Verifying items render correctly
2. **Public API** - Testing methods users rely on
3. **Empty states** - Ensuring proper handling of edge cases
4. **Sections support** - Validating section list functionality
5. **Props configuration** - Testing various prop combinations

## Notes

- Tests use mocked React Native components (see `__mocks__/react-native.js`)
- BigList automatically handles test environments where layout events don't fire
- Use `testID` props in `renderItem` to make elements easier to query in tests
- The `itemHeight` prop is required for tests to work properly
