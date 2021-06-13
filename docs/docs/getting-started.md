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

:::info

You come from the FlatList? Read also "_Migrate from FlatList_" on extras section.

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
