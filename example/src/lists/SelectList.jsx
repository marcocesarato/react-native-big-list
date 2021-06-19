import React, { useState } from "react";
import { KeyboardAvoidingView, SafeAreaView, StyleSheet } from "react-native";
import BigList from "react-native-big-list";
import { Checkbox } from "react-native-paper";

import data from "../data/data.json";

const SelectList = () => {
  const [selected, setSelected] = useState();
  const renderItem = ({ item }) => {
    return (
      <Checkbox.Item
        key={item.id}
        mode="ios"
        label={item.title}
        status={selected === item.id ? "checked" : "unchecked"}
        onPress={() => setSelected(item.id)}
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
