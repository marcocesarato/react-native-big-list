import React from "react";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  Platform,
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
            headerHeight={100} // <== Required to show header
            footerHeight={100} // <== Required to show footer
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
  container: {
    flex: 1,
  },
  compare: {
    flex: 1,
    flexDirection: "row",
  },
  header: {
    flex: 1,
    paddingTop: 20,
  },
});
