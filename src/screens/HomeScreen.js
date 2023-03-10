import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginForm from '../components/LoginForm/LoginForm.js';

const HomeScreen = (props) => {
  return (
    <View style={styles.container}>
      <LoginForm props={props} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default HomeScreen;
