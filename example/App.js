import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Home from "./src/Home";

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <Home />
      </SafeAreaProvider>
    </PaperProvider>
  );
}
