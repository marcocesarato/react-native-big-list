---
sidebar_position: 2
---

# Columns list

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
