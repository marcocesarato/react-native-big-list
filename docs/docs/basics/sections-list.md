---
sidebar_position: 3
---

# Sections List

To create a section list you need to specify the `sections` prop. For simplicity, `sections` is a plain array containing another plain array with the items (section items) to render. If specified `data` prop will be ignored and so it'll replace the `data` prop.

:::info
It's required if no data is specified or if you want to use sticky headers (look at **renderSectionHeader** prop) with sections.<br />
It enables also the **renderSectionHeader** and **renderSectionFooter** props.
:::

### Data examples

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

## Example

```javascript
import BigList from "react-native-big-list";

/* ... */

const sections = [
  [
    // Section 0
    { label: "1", value: 1 /* ... */ },
    { label: "2", value: 2 /* ... */ },
  ],
  [
    // Section 1
    { label: "3", value: 3 /* ... */ },
    { label: "4", value: 4 /* ... */ },
  ],
  [
    // Section 2
    { label: "6", value: 6 /* ... */ },
    { label: "6", value: 6 /* ... */ },
  ],
  /* ... */
];

const renderItem = ({ item, index }) => (
  <MyListItem label={item.label} value={item.value} />
);
const renderHeader = () => <MyHeader />;
const renderFooter = () => <MyFooter />;
const renderSectionHeader = () => <MySectionHeader />;
const renderSectionFooter = () => <MySectionFooter />;

return (
  <BigList
    sections={sections}
    renderItem={renderItem}
    renderHeader={renderHeader}
    renderFooter={renderFooter}
    renderSectionHeader={renderSectionHeader}
    renderSectionFooter={renderSectionFooter}
    itemHeight={50}
    headerHeight={90}
    footerHeight={100}
    sectionHeaderHeight={90} // Required to show section header
    sectionFooterHeight={100} // Required to show section footer
  />
);
```
