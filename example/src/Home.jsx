import React, { useState } from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { Appbar, TextInput, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ColumnsList from "./lists/ColumnsList";
import CompareList from "./lists/CompareList";
import List from "./lists/List";
import MultiSelectList from "./lists/MultiSelectList";
import SectionList from "./lists/SectionList";
import SelectList from "./lists/SelectList";

const Home = () => {
  const {
    colors: { background, surface },
  } = useTheme();
  const [openSelector, setOpenSelector] = useState(false);
  const [selected, setSelected] = useState("standard");
  const [insetBottom, setInsetBottom] = useState(0);
  const insets = useSafeAreaInsets();
  const options = [
    { label: "Standard List", value: "standard" },
    { label: "Columns List", value: "columns" },
    { label: "Sections List", value: "sections" },
    { label: "Multiselect List", value: "multiselect" },
    { label: "Compare List", value: "compare" },
  ];
  const selectedOption = options.find((item) => item.value === selected);
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: background,
          paddingBottom: insetBottom + insets.bottom + 64,
        },
      ]}
    >
      <Appbar.Header style={[styles.header, { height: 75 }]}>
        <Appbar.Content title="BigList Example" subtitle="10.000 items" />
      </Appbar.Header>
      <TouchableOpacity
        style={[
          styles.containerBottom,
          { backgroundColor: surface, bottom: insets.bottom },
        ]}
        onPress={() => setOpenSelector(!openSelector)}
        onLayout={(event) => {
          setInsetBottom(event.height || 0);
        }}
      >
        <TextInput
          label="View mode"
          editable={false}
          onTouchStart={() => setOpenSelector(true)}
          value={selectedOption.label}
          right={
            <TextInput.Icon
              name="chevron-down"
              onPress={() => setOpenSelector(!openSelector)}
            />
          }
        />
      </TouchableOpacity>
      {selected === "standard" ? (
        <List />
      ) : selected === "columns" ? (
        <ColumnsList />
      ) : selected === "sections" ? (
        <SectionList />
      ) : selected === "multiselect" ? (
        <MultiSelectList />
      ) : selected === "compare" ? (
        <CompareList />
      ) : null}

      {openSelector && (
        <View
          style={[
            StyleSheet.absoluteFill,
            { flex: 1, backgroundColor: surface },
          ]}
        >
          <Appbar.Header style={[styles.header, { height: 75 }]}>
            <Appbar.Content
              title="View mode"
              subtitle="Select the list view mode example..."
            />
          </Appbar.Header>
          <SelectList
            data={options}
            onSelect={(value) => {
              setSelected(value);
              setOpenSelector(false);
            }}
          />
        </View>
      )}
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
});

export default Home;
