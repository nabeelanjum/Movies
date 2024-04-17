import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import RootNavigation from './navigation';
import store from './store';
import { toastConfigs } from './common/constants';

// TODO: separate out string literals to add localization later on //

const App: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <Provider store={store}>
        <RootNavigation />
      </Provider>
      <Toast config={toastConfigs} />
    </View>
  );
};

export default App;
