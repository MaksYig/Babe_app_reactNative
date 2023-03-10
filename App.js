import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store.js';
import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import MainNavigation from './src/navigation/MainNavigation.js';
import { NavigationContainer } from '@react-navigation/native';
import LoginForm from './src/components/LoginForm/LoginForm.js';
import AlertMsg from './src/components/Alerts/Alert.js';

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <MainNavigation />
      </NativeBaseProvider>
    </Provider>
  );
}
