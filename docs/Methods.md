<div align="center">

<img alt="React Native Big List" src="../assets/logo.png" />

</div>

# Methods

### `scrollTo()`

```ts
scrollTo({ x?: number, y?: number, animated?: boolean });
```

Scrolls to a given x, y offset, either immediately, with a smooth animation.

Example:

```js
scrollTo({ x: 0, y: 0, animated: true });
```

### `scrollToTop()`

```js
scrollToTop({ animated = true })
```

Scrolls to the top of the content.

### `scrollToEnd()`

```js
scrollToEnd({ animated = true })
```

Scrolls to the end of the content.

### `scrollToIndex()`

```js
scrollToIndex({ index, section = 0, animated = true })
```

Scrolls to the item at the specified index such that it is positioned.

### `scrollToItem()`

```js
scrollToItem({ item, animated = false })
```

Requires linear scan through data - use scrollToIndex instead if possible.

### `scrollToOffset()`

```js
scrollToOffset({ offset, animated = false })
```

Scroll to a specific content pixel offset in the list vertically.

### `scrollToSection()`

```js
scrollToSection({ section?: number, animated = true })
```

Scrolls to the top of the section.

### `flashScrollIndicators()`

Displays the scroll indicators momentarily.

### `getNativeScrollRef()`

Provides a reference to the underlying scroll component.

### `getItemOffset()`

```js
getItemOffset({index: number, section?: number})
```

Provides the scroll vertical offset of a list item giving its section and row.

### `getItem()`

```js
getItem({index: number, section?: number})
```

Provides a list item giving its section and row.

### `getItems()`

Provides an `array` with all the items of the list.


### `isVisible()`

```js
isVisible({ index, section = 0 })
```

Provides a `boolean` giving its section and row and return if the item is visible or not on the list, useful for tests.


### `isEmpty()`

Provides a `boolean` returning if the state of the list is empty, useful for tests.
