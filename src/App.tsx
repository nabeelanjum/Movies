import React from "react";
import { View } from "react-native";
import RootNavigation from './navigation';

const App: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <RootNavigation />
    </View>
  );
};

export default App;
