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

export default function SectionList() {
  const renderItem = ({ item }) => {
    return (
      <List.Item
        title={item.title}
        description={item.description}
        style={styles.container}
        left={(props) => <List.Icon {...props} icon="account" />}
      />
    );
  };
  const renderEmpty = () => <List.Item title="No items" />;
  const renderHeader = () => (
    <List.Item
      title="Marco Cesarato"
      description="cesarato.developer@gmail.com"
      style={styles.container}
      left={(props) => <List.Icon {...props} icon="account" />}
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
            style={styles.container}
            data={data}
            // Item
            itemHeight={90}
            renderItem={renderItem}
            renderEmpty={renderEmpty}
            // Header
            headerHeight={90}
            renderHeader={renderHeader}
            // Footer
            footerHeight={100}
            renderFooter={renderFooter}
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
});
