import React, { useState } from "react";
import BigList from "react-native-big-list";
import { Checkbox } from "react-native-paper";

const SelectList = ({ data, onSelect }) => {
  const [selected, setSelected] = useState();
  const renderItem = ({ item }) => {
    return (
      <Checkbox.Item
        mode="ios"
        label={item.label}
        status={selected === item.value ? "checked" : "unchecked"}
        onPress={() => {
          setSelected(item.value);
          onSelect(item.value);
        }}
      />
    );
  };

  return <BigList data={data} renderItem={renderItem} rowHeight={50} />;
};

export default SelectList;
