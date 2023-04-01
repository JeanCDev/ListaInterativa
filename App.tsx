import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { List } from './src/List';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar
          barStyle='light-content'
        />

        <List />
    </GestureHandlerRootView>
  );
};

export default App;
