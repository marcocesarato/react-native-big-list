<div align="center">

<img alt="React Native Big List" src="../assets/logo.png" />

</div>

# How to migrate from FlatList?

Migration and then the replacement of a FlatList is very simple.

The main props of FlatList are compatible with BigList like `data`, `ListHeaderComponent`, `ListHeaderComponentStyle` etc...

So you just need to:

- Import the component
- Replace the name of the component from `FlatList` to `BigList`.
- BigList need to define a static height of the items (for the performance), so you need to add the height props like `itemHeight` for items (default `50`), `headerHeight` for the header etc...<br>
  If you use `getItemLayout` you can omit the `itemHeight` (omit `itemHeight` isn't recommended)<br>
  To have more details check the [Props list](./Props.md)
- `keyExtractor` isn't needed, so you can remove it

### Example

Before:

```js
import { FlatList } from "react-native";

const ITEM_HEIGHT = 50;

/* ... */

<FlatList
  style={styles.list}
  data={data}
  ListHeaderComponent={renderFlatHeader}
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
  ListHeaderComponent={renderFlatHeader} // Replaceable with `renderHeader`
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
