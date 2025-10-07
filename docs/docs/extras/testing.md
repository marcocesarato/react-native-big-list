---
sidebar_position: 2
---

# Testing

## Testing BigList Components

BigList is designed to work seamlessly in test environments. Unlike some list implementations that require actual layout measurements, BigList will render items even when no layout has occurred, making it perfect for unit and integration tests.

## How It Works

In production, BigList uses the container's height (obtained from `onLayout` events) to determine which items to render. However, in test environments like Jest with React Native Testing Library, these layout events don't fire because there's no actual rendering happening.

To solve this, BigList automatically detects when the container height is 0 and falls back to a default batch size, ensuring that items are rendered for testing purposes.

## Example Test

Here's an example of how to test a component using BigList:

```javascript
import React from 'react';
import { render } from '@testing-library/react-native';
import { Text, View } from 'react-native';
import BigList from 'react-native-big-list';

const MyComponent = () => {
  const data = [
    { id: '1', name: 'Item 1' },
    { id: '2', name: 'Item 2' },
    { id: '3', name: 'Item 3' },
  ];

  const renderItem = ({ item }) => (
    <View testID={`item-${item.id}`}>
      <Text>{item.name}</Text>
    </View>
  );

  return (
    <BigList
      data={data}
      renderItem={renderItem}
      itemHeight={50}
    />
  );
};

describe('MyComponent', () => {
  it('renders list items', () => {
    const { getByTestId } = render(<MyComponent />);
    
    // Items will be rendered even without layout measurements
    expect(getByTestId('item-1')).toBeTruthy();
    expect(getByTestId('item-2')).toBeTruthy();
    expect(getByTestId('item-3')).toBeTruthy();
  });
});
```

## Testing with React Native Testing Library

BigList works great with React Native Testing Library:

```javascript
import { render, screen } from '@testing-library/react-native';
import BigList from 'react-native-big-list';

test('renders items correctly', () => {
  const data = [
    { id: '1', text: 'First' },
    { id: '2', text: 'Second' },
  ];

  const renderItem = ({ item }) => (
    <Text testID={`item-${item.id}`}>{item.text}</Text>
  );

  render(
    <BigList
      data={data}
      renderItem={renderItem}
      itemHeight={50}
    />
  );

  expect(screen.getByTestId('item-1')).toHaveTextContent('First');
  expect(screen.getByTestId('item-2')).toHaveTextContent('Second');
});
```

## Testing Empty States

You can also test empty states:

```javascript
test('renders empty component when data is empty', () => {
  const EmptyComponent = () => <Text>No items</Text>;
  
  render(
    <BigList
      data={[]}
      renderItem={() => null}
      itemHeight={50}
      ListEmptyComponent={EmptyComponent}
    />
  );

  expect(screen.getByText('No items')).toBeTruthy();
});
```

## Notes

- **No layout simulation needed**: Unlike some list components, you don't need to manually trigger layout events or mock container dimensions.
- **All items rendered**: In test mode (when container height is 0), BigList renders all items up to a reasonable limit, making them available for testing.
- **renderItem is called**: Your `renderItem` function will be called for each item in your test data, allowing you to verify the rendering logic.

## Troubleshooting

If you're still experiencing issues with BigList in tests:

1. **Ensure data is provided**: Make sure your `data` or `sections` prop is not null or undefined
2. **Check renderItem**: Verify that your `renderItem` function returns valid JSX
3. **ItemHeight required**: The `itemHeight` prop is required and should be set to a positive number
4. **Test IDs**: Use `testID` props in your `renderItem` to make elements easier to query in tests
