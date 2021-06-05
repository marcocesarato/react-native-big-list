import React from "react";
import { StyleSheet, View } from "react-native";

const Block = (props) => {
  return <View {...props} style={styles.block} />;
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
});

export default Block;
