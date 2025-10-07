import React from "react";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { List, Subheading } from "react-native-paper";
import { StatusBar } from "expo-status-bar";

import BigList from "react-native-big-list";
import data from "../data/data.json";
import Block from "./components/Block";

export default function HorizontalList() {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <List.Item
          title={item.title}
          description={item.description}
          style={styles.item}
          left={(props) => <List.Icon {...props} icon="account" />}
        />
      </View>
    );
  };
  const renderEmpty = () => <List.Item title="No items" />;
  const renderHeader = () => (
    <View style={styles.itemContainer}>
      <List.Item
        title="Header"
        description="Horizontal List Header"
        style={styles.item}
        left={(props) => <List.Icon {...props} icon="format-list-bulleted" />}
      />
    </View>
  );
  const renderFooter = () => (
    <Block>
      <Subheading>End of list</Subheading>
    </Block>
  );
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.wrapper}>
          <BigList
            horizontal={true}
            style={styles.list}
            data={data}
            // Item
            itemHeight={200}
            renderItem={renderItem}
            renderEmpty={renderEmpty}
            // Header
            headerHeight={200}
            renderHeader={renderHeader}
            // Footer
            footerHeight={200}
            renderFooter={renderFooter}
          />
        </View>
        <StatusBar style="auto" />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  itemContainer: {
    width: 200,
    height: "100%",
  },
  item: {
    flex: 1,
  },
});
