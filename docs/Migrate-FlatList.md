<div align="center">

<img alt="React Native Big List" src="../assets/logo.png" />

</div>

# How to migrate from FlatList?

Migration and then the replacement of a FlatList is very simple.

BigList permit a fast way replacement of the FlatList component using some aliases of props that **replace** the default props.
The props compatibles are listed on [Props List](./Props.md#flatlist).
All of them should be replaced with their related props of BigList _(recommended)_.

The main props of FlatList are compatible with BigList like `data` and its structure, `ListHeaderComponent`, `ListHeaderComponentStyle` etc...

## Getting started

You just need to:

- 📝 Import the component
- 📝 Replace the name of the component from `FlatList` to `BigList`.
- 📝 Add the props for the heights

  > BigList need to define a static height of the items for maintain great performances.<br>
  > If you use `getItemLayout` you don't need to define `itemHeight`<br>

  - `itemHeight` for items (default `50`)
  - `headerHeight` for the header (default `0`)
  - `footerHeight` for the footer (default `0`)

Enjoy 😃

### Example

Before:

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

After:

```js
import BigList from "react-native-big-list";

const ITEM_HEIGHT = 50;

/* ... */

<BigList
  style={styles.list}
  data={data}
  renderItem={renderItem}
  ListHeaderComponent={renderHeader} // Replaceable with `renderHeader`
  ListFooterComponent={renderFooter} // Replaceable with `renderFooter`
  ListFooterComponentStyle={styles.footer} // This works only with `ListFooterComponent`
  ListEmptyComponent={renderEmpty} // Replaceable with `renderEmpty`
  getItemLayout={(data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })} // Replaceable with `itemHeight={ITEM_HEIGHT}`
  keyExtractor={(item) => String(item.id)} // Removable
  //  New props
  headerHeight={100} // Default 0, need to specify the header height
  footerHeight={100} // Default 0, need to specify the foorer height
/>;
```

## Next steps <small>_(optional)_</small>

> These steps are recommended but if you want turn back to FlatList in anytime you can keep only the first steps without any problems.

- 📝 Replace `ListHeaderComponent` with `renderHeader`
- 📝 Replace `ListFooterComponent` with `renderFooter`
- 📝 Replace `ListEmptyComponent` with `renderEmpty`
- 📝 Replace `getItemLayout` with `itemHeight`
- ❌ Remove `keyExtractor`
- ❌ Remove `ListFooterComponentStyle`
- ❌ Remove `ListHeaderComponentStyle`

To have more details about props check the [Props list](./Props.md)

### Final result

```js
import BigList from "react-native-big-list";

const ITEM_HEIGHT = 50;

/* ... */

<BigList
  style={styles.list}
  data={data}
  renderItem={renderItem}
  renderHeader={renderHeader}
  renderFooter={renderFooter}
  renderEmpty={renderEmpty}
  itemHeight={ITEM_HEIGHT}
  headerHeight={100}
  footerHeight={100}
/>;
```
