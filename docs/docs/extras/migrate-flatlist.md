# Migrate from FlatList

Migration and then the replacement of a FlatList is very simple.

BigList permit a fast way replacement of the FlatList component using some aliases of props that **replace** the default props.
The props compatibles are listed on [Props List](props.md#flatlist).
All of them should be replaced with their related props of BigList _(recommended)_.

The main props of FlatList are compatible with BigList like `data` and its structure, `ListHeaderComponent`, `ListHeaderComponentStyle` etc...

## Getting started

You just need to:

- Import the component
- Replace the name of the component from `FlatList` to `BigList`.
- Add the props for the heights

:::note

BigList need to define a static height of the items for maintain great performances.
If you use `getItemLayout` you don't need to define `itemHeight`<br/>

- `itemHeight` for items _(default 50)_
- `headerHeight` for the header _(default 0)_
- `footerHeight` for the footer _(default 0)_

:::

### Example

#### Before:

```js
import { FlatList } from "react-native";

const ITEM_HEIGHT = 50;

/* ... */

<FlatList
  style={styles.list}
  data={data}
  ListHeaderComponent={renderHeader}
  ListFooterComponent={renderFooter}
  ListFooterComponentStyle={styles.footer}
  ListEmptyComponent={renderEmpty}
  getItemLayout={(data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })}
  renderItem={renderItem}
  keyExtractor={(item) => item.value}
/>;
```

#### After:

```js
import BigList from "react-native-big-list";

const ITEM_HEIGHT = 50;

/* ... */

<BigList
  style={styles.list}
  data={data}
  renderItem={renderItem}
  keyExtractor={(item) => item.value}
  ListHeaderComponent={renderHeader} // Replaceable with `renderHeader`
  ListFooterComponent={renderFooter} // Replaceable with `renderFooter`
  ListFooterComponentStyle={styles.footer} // This works only with `ListFooterComponent`
  ListEmptyComponent={renderEmpty} // Replaceable with `renderEmpty`
  getItemLayout={(data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })} // Replaceable with `itemHeight={ITEM_HEIGHT}`
  keyExtractor={(item) => item.value}
  //  New props
  headerHeight={100} // Default 0, need to specify the header height
  footerHeight={100} // Default 0, need to specify the foorer height
/>;
```

## <small class="optional">Optional</small> Next steps

:::info

These steps are recommended but, if you want turn back to FlatList in anytime, you can keep only the first steps without any problems.

:::

:::note

To have more details about props check the [Props list](props.md)

:::

#### Replacing

- Replace `ListHeaderComponent` with `renderHeader`
- Replace `ListFooterComponent` with `renderFooter`
- Replace `ListEmptyComponent` with `renderEmpty`
- Replace `getItemLayout` with `itemHeight`

#### Removing

- Remove `ListFooterComponentStyle`
- Remove `ListHeaderComponentStyle`

### Final result

```js
import BigList from "react-native-big-list";

const ITEM_HEIGHT = 50;

/* ... */

<BigList
  style={styles.list}
  data={data}
  keyExtractor={(item) => item.value}
  renderItem={renderItem}
  renderHeader={renderHeader}
  renderFooter={renderFooter}
  renderEmpty={renderEmpty}
  itemHeight={ITEM_HEIGHT}
  headerHeight={100}
  footerHeight={100}
/>;
```
