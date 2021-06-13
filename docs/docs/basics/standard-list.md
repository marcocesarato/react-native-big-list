---
sidebar_position: 1
---

# Standard list

The prop `data` is required for a standard list. For simplicity, `data` is a plain array containing the items to render.

### Data examples

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

## Example

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
    renderItem={renderItem}
    renderEmpty={renderEmpty}
    renderHeader={renderHeader}
    renderFooter={renderFooter}
    itemHeight={50} // Required (default 0)
    headerHeight={90} // Required to show header
    footerHeight={100} // Required to show footer
  />
);
```
