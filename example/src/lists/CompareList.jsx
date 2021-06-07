import React from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import BigList from "react-native-big-list";
import { List, Subheading } from "react-native-paper";
import { StatusBar } from "expo-status-bar";

import data from "../data/data.json";
import Block from "./components/Block";

export default function CompareList() {
  const renderItem = ({ item }) => {
    return (
      <List.Item
        title={item.id + " - " + item.title}
        description={item.description}
        style={styles.container}
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
            ListHeaderComponent={renderBigHeader}
            ListFooterComponent={renderFooter}
            ListEmptyComponent={renderEmpty}
            headerHeight={100} // Default 0, so you need to specify it to show the header
            footerHeight={100} // Default 0, so you need to specify it to show the footer
          />
          <FlatList
            style={[
              styles.container,
              Platform.select({ web: { maxHeight: "100vh" }, default: {} }),
            ]}
            data={data}
            ListHeaderComponent={renderFlatHeader}
            ListFooterComponent={renderFooter}
            ListEmptyComponent={renderEmpty}
            renderItem={renderItem}
            keyExtractor={(item) => String(item.id)}
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
});
