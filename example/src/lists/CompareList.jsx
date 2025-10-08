/* eslint-disable no-shadow */
import React from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { List, Subheading } from "react-native-paper";
import { StatusBar } from "expo-status-bar";

import BigList from "../../../lib";
import data from "../data/data.json";
import Block from "./components/Block";

const ITEM_HEIGHT = 50;

export default function CompareList() {
  const renderItem = ({ item }) => {
    return (
      <List.Item
        title={item.id + " - " + item.title}
        description={item.description}
        style={styles.item}
        left={(props) => <List.Icon {...props} icon="account" />}
      />
    );
  };
  const renderEmpty = () => <List.Item title="No items" />;

  const renderBigHeader = () => (
    <List.Item
      title="BigList"
      description="react-native-big-list"
      style={styles.header}
    />
  );
  const renderFlatHeader = () => (
    <List.Item
      title="FlatList"
      description="react-native"
      style={styles.header}
    />
  );
  const renderFooter = () => (
    <Block>
      <Subheading>No more items available...</Subheading>
    </Block>
  );
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.compare}>
          <BigList
            style={[
              styles.container,
              Platform.select({ web: { maxHeight: "100vh" }, default: {} }),
            ]}
            data={data}
            renderItem={renderItem}
            getItemLayout={(data, index) => ({
              length: ITEM_HEIGHT,
              offset: ITEM_HEIGHT * index,
              index,
            })}
            ListHeaderComponent={renderBigHeader}
            ListFooterComponent={renderFooter}
            ListEmptyComponent={renderEmpty}
            headerHeight={100} // Default 0, need to specify the header height
            footerHeight={100} // Default 0, need to specify the footer  height
          />
          <FlatList
            style={[
              styles.container,
              Platform.select({ web: { maxHeight: "100vh" }, default: {} }),
            ]}
            data={data}
            renderItem={renderItem}
            getItemLayout={(data, index) => ({
              length: ITEM_HEIGHT,
              offset: ITEM_HEIGHT * index,
              index,
            })} // Replaceable with `itemHeight={ITEM_HEIGHT}`
            ListHeaderComponent={renderFlatHeader} // Replaceable with `renderHeader`
            ListFooterComponent={renderFooter} // Replaceable with `renderFooter`
            ListEmptyComponent={renderEmpty} // Replaceable with `renderEmpty`
            keyExtractor={(item) => String(item.id)} // Removable
          />
        </View>
        <StatusBar style="auto" />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  compare: {
    flex: 1,
    flexDirection: "row",
  },
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    paddingTop: 20,
  },
  item: {
    flex: 1,
    maxHeight: ITEM_HEIGHT,
  },
});
