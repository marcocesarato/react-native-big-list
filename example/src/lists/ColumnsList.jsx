import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import BigList from "../../../lib";
import { List, Subheading, TextInput } from "react-native-paper";
import { StatusBar } from "expo-status-bar";

import data from "../data/data.json";
import Block from "./components/Block";

export default function SectionList() {
  const [numberColumns, setNumberColumns] = useState(3);
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
    <View>
      <TextInput
        label="Number of columns (max 10)"
        value={String(numberColumns)}
        type="numeric"
        keyboardType="numeric"
        onChangeText={(value) => {
          const num = parseInt(value, 10) || "";
          setNumberColumns(num);
        }}
      />
    </View>
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
            numColumns={Math.min(
              Math.max(parseInt(numberColumns, 10) || 1, 1),
              10,
            )}
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
