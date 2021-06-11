import React, { useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import {
  Appbar,
  Paragraph,
  RadioButton,
  TouchableRipple,
  useTheme,
} from "react-native-paper";

import ColumnsList from "./lists/ColumnsList";
import CompareList from "./lists/CompareList";
import List from "./lists/List";
import SectionList from "./lists/SectionList";

const Home = () => {
  const {
    colors: { background, surface },
  } = useTheme();
  const [checked, setChecked] = useState("standard");
  const [insetBottom, setInsetBottom] = useState(0);
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: background,
          paddingBottom: insetBottom + 205,
        },
      ]}
    >
      <Appbar.Header style={[styles.header, { height: 75 }]}>
        <Appbar.Content title="BigList Example" subtitle="10.000 items" />
      </Appbar.Header>
      <View
        style={[styles.containerBottom, { backgroundColor: surface }]}
        onLayout={(event) => {
          setInsetBottom(event.height || 0);
        }}
      >
        <RadioButton.Group
          onValueChange={(newValue) => setChecked(newValue)}
          value={checked}
        >
          <TouchableRipple onPress={() => setChecked("standard")}>
            <View style={styles.row}>
              <Paragraph>Standard List</Paragraph>
              <View pointerEvents="none">
                <RadioButton.Android value="standard" />
              </View>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => setChecked("columns")}>
            <View style={styles.row}>
              <Paragraph>Columns List</Paragraph>
              <View pointerEvents="none">
                <RadioButton.Android value="columns" />
              </View>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => setChecked("section")}>
            <View style={styles.row}>
              <Paragraph>Section List</Paragraph>
              <View pointerEvents="none">
                <RadioButton.Android value="section" />
              </View>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => setChecked("compare")}>
            <View style={styles.row}>
              <Paragraph>Compare with FlatList</Paragraph>
              <View pointerEvents="none">
                <RadioButton.Android value="compare" />
              </View>
            </View>
          </TouchableRipple>
        </RadioButton.Group>
      </View>
      {checked === "standard" ? (
        <List />
      ) : checked === "columns" ? (
        <ColumnsList />
      ) : checked === "section" ? (
        <SectionList />
      ) : checked === "compare" ? (
        <CompareList />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    ...Platform.select({ web: { maxHeight: "100vh" }, default: {} }),
  },
  containerBottom: {
    bottom: 0,
    elevation: 999,
    left: 0,
    position: "absolute",
    width: "100%",
    zIndex: 999,
  },
  header: {
    elevation: 0,
    marginBottom: Platform.select({ web: 0, default: -5 }),
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

export default Home;
