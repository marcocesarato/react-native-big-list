<div align="center">

<img alt="React Native Big List" src="../assets/logo.png" />

</div>

## How to migrate from FlatList?

Migration and then the replacement of a FlatList is very simple.

The main props of FlatList are compatible with BigList like `data`, `ListHeaderComponent`, `ListHeaderComponentStyle` etc...

So you just need to:

- Import the component
- Replace the name of the component from `FlatList` to `BigList`.
- BigList need to define a static height of the items (for the performance), so you need to add the height props like `itemHeight` for items (default `50`), `headerHeight` for the header etc...
  To have more details check the [Props list](./Props.md)
- `keyExtractor` isn't needed, so you can remove it

### Example

Before:

```js
import { FlatList } from "react-native";

/* ... */

<FlatList
  style={styles.list}
  data={data}
  ListHeaderComponent={renderFlatHeader}
  ListFooterComponent={renderFooter}
  ListFooterComponentStyle={styles.footer}
  ListEmptyComponent={renderEmpty}
  renderItem={renderItem}
  keyExtractor={(item) => item.value}
/>;
```

After:

```js
import BigList from "react-native-big-list";

/* ... */

<BigList
  style={styles.list}
  data={data}
  renderItem={renderItem}
  ListHeaderComponent={renderBigHeader}
  ListFooterComponent={renderFooter}
  ListFooterComponentStyle={styles.footer}
  ListEmptyComponent={renderEmpty}
  // Heights
  itemHeight={75} // Default 50
  headerHeight={100} // <== Required to show header
  footerHeight={100} // <== Required to show footer
/>;
```
