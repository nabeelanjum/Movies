import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import RootNavigation from './navigation';
import store from './store';

const App: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <Provider store={store}>
        <RootNavigation />
      </Provider>
    </View>
  );
};

export default App;
