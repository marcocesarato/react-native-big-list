import React, { useState } from "react";
import { KeyboardAvoidingView, SafeAreaView, StyleSheet } from "react-native";
import BigList from "../../../lib";
import { Checkbox } from "react-native-paper";

import data from "../data/data.json";

const SelectList = () => {
  const [selected, setSelected] = useState([]);

  const onSelect = (value, isSelected) => {
    if (!isSelected) {
      const selectedIndex = selected.indexOf(value);
      const newSelectedItems = [...selected];
      newSelectedItems.splice(selectedIndex, 1);
      setSelected(newSelectedItems);
    } else {
      setSelected([...selected, value]);
    }

    // TODO: your logics

    console.log(
      "The value",
      value,
      "is " + (isSelected ? "selected" : "unselected"),
    );
  };

  const renderItem = ({ item }) => {
    return (
      <Checkbox.Item
        mode="ios"
        label={item.title}
        status={selected.includes(item.id) ? "checked" : "unchecked"}
        onPress={() => {
          onSelect(item.id, !selected.includes(item.id));
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container}>
        <BigList data={data} renderItem={renderItem} rowHeight={50} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SelectList;
