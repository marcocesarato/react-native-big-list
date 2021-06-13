---
sidebar_position: 2
---

# Columns list

Like the [standard list](standard-list.md), the prop `data` is required. You just need to specify the number of columns using the prop `numColumns` that will format the list in column format by placing the elements side by side with x elements per x number of columns per row.

### Props

#### `numColumns`

| Type   | Required | Default |
| ------ | -------- | ------- |
| number | No       | `1`     |

## Example

Here and example

```javascript
import BigList from "react-native-big-list";

/* ... */

const data = [
  { label: "1", value: 1 /* ... */ },
  { label: "2", value: 2 /* ... */ },
  { label: "3", value: 3 /* ... */ },
  { label: "4", value: 4 /* ... */ },
  { label: "5", value: 5 /* ... */ },
  /* ... */
];

const renderItem = ({ item, index }) => (
  <MyListItem label={item.label} value={item.value} />
);
const renderEmpty = () => <MyEmpty />;
const renderHeader = () => <MyHeader />;
const renderFooter = () => <MyFooter />;

return (
  <BigList
    data={data}
    numColumns={5} // Set the number of columns
    renderItem={renderItem}
    renderEmpty={renderEmpty}
    renderHeader={renderHeader}
    renderFooter={renderFooter}
    itemHeight={50}
    headerHeight={90}
    footerHeight={100}
  />
);
```
