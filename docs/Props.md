<div align="center">

<img alt="React Native Big List" src="https://github.com/marcocesarato/react-native-big-list/raw/master/assets/logo.png" />

</div>

# Props

### [ScrollView Props](https://reactnative.dev/docs/view#props)

Inherits ScrollView Props.

---

### <small>Required</small> `data`

For simplicity, data is a plain array containing the items to render.

| Type  | Required                             |
| ----- | ------------------------------------ |
| array | Yes, if `sections` are not specified |

#### Examples

```js
[1, 2, 3, 4, 5, 6 /* ... */];
```

```js
[
  { label: "1", value: 1 /* ... */ },
  { label: "2", value: 2 /* ... */ },
  /* ... */
];
```

### `sections`

For simplicity, sections is a plain array containing another plain array with the items (section items) to render. If specified `data` prop will be ignored.
It'll replace the `data` prop.

It's required if no data is specified or if you want use sticky headers (look at `renderSectionHeader`) with sections.

| Type  | Required                                     |
| ----- | -------------------------------------------- |
| array | Yes, if you want to use it instead of `data` |

#### Examples

```js
[
  // Section 1
  [1, 2],
  // Section 2
  [3, 4],
  /* ... */
];
```

```js
[
  [
    // Section 1
    { label: "1", value: 1 /* ... */ },
    { label: "2", value: 2 /* ... */ },
  ],
  [
    // Section 2
    { label: "3", value: 3 /* ... */ },
    { label: "4", value: 4 /* ... */ },
  ],
  /* ... */
];
```

### <small>Required</small> `renderItem`

```ts
renderItem({ item: unknown, index: number, section: number });
```

Takes an item from data and renders it into the list.

Using `data` arguments will be an object with the `item` and its `index`.

Using `sections` arguments will be an object with the `item` and its `section` index and row `index`.

| Type     | Required |
| -------- | -------- |
| function | Yes      |

### `renderEmpty`

Rendered when the list is empty.

| Type     | Required |
| -------- | -------- |
| function | No       |

### `renderHeader`

Rendered at the top of all the items.

| Type     | Required |
| -------- | -------- |
| function | No       |

### `renderFooter`

Rendered at the bottom of all the items.

| Type     | Required |
| -------- | -------- |
| function | No       |

### `renderSectionHeader`

```ts
renderSectionHeader(section: number)
```

Rendered at the top of all the section's items.

| Type     | Required |
| -------- | -------- |
| function | No       |

### `renderSectionFooter`

```ts
renderSectionFooter(section: number)
```

Rendered at the bottom of all the section's items.

| Type     | Required |
| -------- | -------- |
| function | No       |

### `renderActionSheetScrollViewWrapper`

Wrap the entire list into an accessory component.

| Type     | Required |
| -------- | -------- |
| function | No       |

### `renderAccessory`

```ts
renderAccessory(list: BigList)
```

Rendered accessory at the bottom of the list.

| Type     | Required |
| -------- | -------- |
| function | No       |

### <small>Required</small> `itemHeight`

Specify the item height.

This is needed to have a great performance boost for lists of several thousands items.

Function example:

```ts
itemHeight(section: number, index: number)
```

| Type             | Required | Default |
| ---------------- | -------- | ------- |
| number, function | Yes      | `50`    |

### `headerHeight`

Specify the header item height.

| Type             | Required | Default |
| ---------------- | -------- | ------- |
| number, function | No       | `0`     |

### `footerHeight`

Specify the footer item height.

| Type             | Required | Default |
| ---------------- | -------- | ------- |
| number, function | No       | `0`     |

### `sectionHeaderHeight`

Specify the section header height.

Function example:

```ts
sectionHeaderHeight(section: number)
```

| Type             | Required | Default |
| ---------------- | -------- | ------- |
| number, function | No       | `0`     |

### `sectionFooterHeight`

Specify the section footer height.

Function example:

```ts
sectionFooterHeight(section: number)
```

| Type             | Required | Default |
| ---------------- | -------- | ------- |
| number, function | No       | `0`     |

### `stickySectionHeadersEnabled`

Makes section headers stick to the top of the screen until the next one pushes it off.

| Type    | Required | Default |
| ------- | -------- | ------- |
| boolean | No       | `true`  |

### `scrollTopValue`

Specify the initial scroll from the top of the list.

| Type   | Required | Default |
| ------ | -------- | ------- |
| number | No       | `0`     |

### `insetTop`

Specify the top inset.

| Type   | Required | Default |
| ------ | -------- | ------- |
| number | No       | `0`     |

### `insetBottom`

Specify the bottom inset.

| Type   | Required | Default |
| ------ | -------- | ------- |
| number | No       | `0`     |

### `contentInset`

The amount by which the scroll view content is inset from the edges of the scroll view.

| Type                                                               | Required | Default                                    |
| ------------------------------------------------------------------ | -------- | ------------------------------------------ |
| object: {top: number, left: number, bottom: number, right: number} | No       | `{ top: 0, right: 0, left: 0, bottom: 0 }` |

### `onEndReached`

```ts
onEndReached(info: {distanceFromEnd: number})
```

| Type     | Required |
| -------- | -------- |
| function | No       |

Called once when the scroll position gets within `onEndReachedThreshold` of the rendered content.

### `onEndReachedThreshold`

How far from the end (in units of visible length of the list) the bottom edge of the list must be from the end of the content to trigger the `onEndReached` callback. Thus a value of `0.5` will trigger onEndReached when the end of the content is within half the visible length of the list.

| Type   | Required | Default |
| ------ | -------- | ------- |
| number | No       | `0`     |

## <a name="flatlist"></a> FlatList compatibility

> These are **compatibility** props for a faster FlatList replacement and all these props have an alias.<br>
> All of them should be replaced with their related props of BigList _(recommended)_.

### `getItemLayout`

```ts
(data, index) => {length: number, offset: number, index: number}
```

`getItemLayout` is an optional optimization that allows skipping the measurement of dynamic content if you know the size (height or width) of items ahead of time. getItemLayout is efficient if you have fixed size items, for example:

```ts
getItemLayout={(data, index) => (
  {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
)}
```

Adding getItemLayout can be a great performance boost for lists of several thousands items.

This is a **compatibility** prop for FlatList replacement and so it'll replace the `itemHeight` prop.

| Type     | Required |
| -------- | -------- |
| function | No       |

### `ListEmptyComponent`

Rendered when the list is empty. Can be a React Component (e.g. `SomeComponent`), or a React element (e.g. `<SomeComponent />`).

This is a **compatibility** prop for FlatList replacement and so it'll replace the `renderEmpty` prop.

| Type               | Required |
| ------------------ | -------- |
| component, element | No       |

### `ListFooterComponent`

Rendered at the bottom of all the items. Can be a React Component (e.g. `SomeComponent`), or a React element (e.g. `<SomeComponent />`).

**PS:** You need also to specify the footer height with `footerHeight` prop or using `ListFooterComponentStyle`.

This is a **compatibility** prop for FlatList replacement and so it'll replace the `renderFooter` prop.
If you are creating for the first time the list we suggest to use `renderFooter` prop instead.

| Type               | Required |
| ------------------ | -------- |
| component, element | No       |

### `ListFooterComponentStyle`

Styling for internal View for `ListFooterComponent`.

This will works only if `ListFooterComponent` is specified.

| Type                                                        | Required |
| ----------------------------------------------------------- | -------- |
| [View Style](https://reactnative.dev/docs/view-style-props) | No       |

### `ListHeaderComponent`

Rendered at the top of all the items. Can be a React Component (e.g. `SomeComponent`), or a React element (e.g. `<SomeComponent />`).

**PS:** You need also to specify the header height with `headerHeight` prop or using `ListHeaderComponentStyle`.

This is a **compatibility** prop for FlatList replacement and so it'll replace the `renderHeader` prop.
If you are creating for the first time the list we suggest to use `renderHeader` prop instead.

| Type               | Required |
| ------------------ | -------- |
| component, element | No       |

### `ListHeaderComponentStyle`

Styling for internal View for `ListHeaderComponent`.

This will works only if `ListHeaderComponent` is specified.

| Type                                                        | Required |
| ----------------------------------------------------------- | -------- |
| [View Style](https://reactnative.dev/docs/view-style-props) | No       |
