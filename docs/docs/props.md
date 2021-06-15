---
sidebar_position: 5
---

# Props

## [ScrollView Props](https://reactnative.dev/docs/scrollview#props)

Inherits ScrollView Props.

---

## Standard Props

### <small class="required">Required</small> `data`

For simplicity, `data` is a plain array containing the items to render.

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

### <small class="required">Required</small> `renderItem`

```ts
renderItem({ item: unknown, index: number, section: number });
```

Takes an item from data and renders it into the list.

Using `data` arguments will be an object with the `item` and its `index`.

Using `sections` arguments will be an object with the `item` and its `section` index and row `index`.

:::note
You need also to specify the height using [**itemHeight**](#required-itemheight).
:::

| Type     | Required |
| -------- | -------- |
| function | Yes      |

### <small class="required">Required</small> `itemHeight`

Specify the item height.

This is needed to have a great performance boost for lists of several thousands items.

**Function example:**

```ts
itemHeight(section: number, index: number)
```

| Type             | Required | Default |
| ---------------- | -------- | ------- |
| number, function | Yes      | `50`    |

### <small class="required">Required</small> `sections`

For simplicity, `sections` is a plain array containing another plain array with the items (section items) to render.

:::caution
Specifying this prop you'll overwrite _data_ prop and so it'll be ignored.
It's required if no _data_ is specified or if you want to use sticky headers/sections separators (look also at [**renderSectionHeader**](#rendersectionheader) and [**renderSectionFooter**](#rendersectionfooter)).
:::

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

### `renderEmpty`

Rendered when the list is empty.

| Type     | Required |
| -------- | -------- |
| function | No       |

### `renderHeader`

Rendered at the top of all the items.

:::note
You need also to specify the height using [**headerHeight**](#headerheight).
:::

| Type     | Required |
| -------- | -------- |
| function | No       |

### `renderFooter`

Rendered at the bottom of all the items.

:::note
You need also to specify the height using [**footerHeight**](#footerheight).
:::

| Type     | Required |
| -------- | -------- |
| function | No       |

### `renderSectionHeader`

```ts
renderSectionHeader(section: number)
```

Rendered at the top of all the section's items.

:::note
You need also to specify the height using [**sectionHeaderHeight**](#sectionheaderheight).
:::

| Type     | Required |
| -------- | -------- |
| function | No       |

### `renderSectionFooter`

```ts
renderSectionFooter(section: number)
```

Rendered at the bottom of all the section's items.

:::note
You need also to specify the height using [**sectionFooterHeight**](#sectionfooterheight).
:::

| Type     | Required |
| -------- | -------- |
| function | No       |

### `renderScrollViewWrapper`

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

**Function example:**

```ts
sectionHeaderHeight(section: number)
```

| Type             | Required | Default |
| ---------------- | -------- | ------- |
| number, function | No       | `0`     |

### `sectionFooterHeight`

Specify the section footer height.

**Function example:**

```ts
sectionFooterHeight(section: number)
```

| Type             | Required | Default |
| ---------------- | -------- | ------- |
| number, function | No       | `0`     |

### `disablePlaceholder`

Disable placeholder on fast scrolling.

| Type    | Required | Default |
| ------- | -------- | ------- |
| boolean | No       | `false` |

### `placeholderImage`

Placeholder background repeated on fast scrolling.

| Type                                                          | Required |
| ------------------------------------------------------------- | -------- |
| [ImageSource](https://reactnative.dev/docs/image#imagesource) | No       |

### `placeholderComponent`

Placeholder component on fast scrolling. This is component is placed at start from the top to the first visible item and from the last visible item to the end of the scroll view.

:::caution

This will replace the **placeholderImage** and need **disablePlaceholder** equal to _false_.

:::

| Type               | Required |
| ------------------ | -------- |
| component, element | No       |

### `stickySectionHeadersEnabled`

Makes section headers stick to the top of the screen until the next one pushes it off.

| Type    | Required | Default |
| ------- | -------- | ------- |
| boolean | No       | `true`  |

### `numColumns`

Format the list in column format by placing the elements side by side with x elements per x number of columns per row.

| Type   | Required | Default |
| ------ | -------- | ------- |
| number | No       | `1`     |

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

### `refreshing`

Set this true while waiting for new data from a refresh.

| Type    | Required | Default |
| ------- | -------- | ------- |
| boolean | No       | `false` |

### `onViewableItemsChanged`

Called when the viewability of rows changes.

| Type                                                                                                                                                                         | Required |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| (callback: { changed: array of [ViewTokens](https://reactnative.dev/docs/viewtoken), viewableItems: array of [ViewTokens](https://reactnative.dev/docs/viewtoken) }) => void | No       |

### `onRefresh`

If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the `refreshing` prop correctly.

| Type     | Required |
| -------- | -------- |
| function | No       |

### `onEndReached`

```ts
onEndReached(info: {distanceFromEnd: number})
```

| Type     | Required |
| -------- | -------- |
| function | No       |

Called once when the scroll position gets within `onEndReachedThreshold` of the rendered content.

### `onEndReachedThreshold`

How far from the end (in units of visible length of the list) the bottom edge of the list must be from the end of the content to trigger the `onEndReached` callback. Thus a value of `0.5` will trigger `onEndReached` when the end of the content is within half the visible length of the list.

| Type   | Required | Default |
| ------ | -------- | ------- |
| number | No       | `0`     |

### `batchSizeThreshold`

:::info
**A lower value of this prop improve performance and memory usage.**<br />
Minimum value limited to _0.5_ to display all elements on the visible list with no gaps.
:::

How much threshold must be applied to the batch size to render the elements before rendering the other batch of elements. Thus a value of `0.5` will make the batch size equal to half the visible length of the list (above and below from the current position of the batch).

| Type   | Required | Default |
| ------ | -------- | ------- |
| number | No       | `1`     |

## <a name="flatlist"></a> FlatList Props

:::caution Compatibility

These are **compatibility** props for a faster FlatList replacement and all these props have an alias.
These props will **replace** their related alias standard props.
All of them should be replaced with their related props as best practice.

:::

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

:::note Compatibility

This is a **compatibility** prop for FlatList replacement and so it'll replace the [**itemHeight**](#required-itemheight) prop.

:::

| Type     | Required |
| -------- | -------- |
| function | No       |

### `ListEmptyComponent`

Rendered when the list is empty. Can be a React Component (e.g. `SomeComponent`), or a React element (e.g. `<SomeComponent />`).

:::note Compatibility

This is a **compatibility** prop for FlatList replacement and so it'll replace the [**renderEmpty**](#renderempty) prop.

:::

| Type               | Required |
| ------------------ | -------- |
| component, element | No       |

### `ListFooterComponent`

Rendered at the bottom of all the items. Can be a React Component (e.g. `SomeComponent`), or a React element (e.g. `<SomeComponent />`).

:::note
You need also to specify the footer height with [**footerHeight**](#footerheight) prop or using [**ListFooterComponentStyle**](#listfootercomponentstyle).
:::

:::note Compatibility

This is a **compatibility** prop for FlatList replacement and so it'll replace the [**renderFooter**](#renderfooter) prop.
If you are creating for the first time the list we suggest to use [**renderFooter**](#renderfooter) prop instead.

:::

| Type               | Required |
| ------------------ | -------- |
| component, element | No       |

### `ListFooterComponentStyle`

:::info

This will works only if [**ListFooterComponent**](#listfootercomponent) is specified.

:::

Styling for internal View for [**ListFooterComponent**](#listfootercomponent).

| Type                                                        | Required |
| ----------------------------------------------------------- | -------- |
| [View Style](https://reactnative.dev/docs/view-style-props) | No       |

### `ListHeaderComponent`

Rendered at the top of all the items. Can be a React Component (e.g. `SomeComponent`), or a React element (e.g. `<SomeComponent />`).

:::note
You need also to specify the header height with [**headerHeight**](#headerheight) prop or using [**ListHeaderComponentStyle**](#listfootercomponentstyle).
:::

:::note Compatibility

This is a **compatibility** prop for FlatList replacement and so it'll replace the [**renderHeader**](#renderheader) prop.
If you are creating for the first time the list we suggest to use [**renderHeader**](#renderheader) prop instead.

:::

| Type               | Required |
| ------------------ | -------- |
| component, element | No       |

### `ListHeaderComponentStyle`

:::info

This will works only if [**ListHeaderComponent**](#listfootercomponent) is specified.

:::

Styling for internal View for [**ListHeaderComponent**](#listfootercomponent).

| Type                                                        | Required |
| ----------------------------------------------------------- | -------- |
| [View Style](https://reactnative.dev/docs/view-style-props) | No       |
