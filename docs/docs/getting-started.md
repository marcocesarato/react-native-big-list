---
sidebar_position: 2
---

# Getting Started

## Install

Install the library from npm or yarn just running one of the following command lines:

| npm                                        | yarn                             |
| ------------------------------------------ | -------------------------------- |
| `npm install react-native-big-list --save` | `yarn add react-native-big-list` |

## Usage

:::note

Read also How to migrate from FlatList

:::

** Simple usage: **

```javascript
import BigList from "react-native-big-list";
// ...
const MyExample = ({ data }) => {
  const renderItem = ({ item, index }) => <MyListItem item={item} />;
  return <BigList data={data} renderItem={renderItem} itemHeight={50} />;
};
```
