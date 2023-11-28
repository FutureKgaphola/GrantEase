import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import Home from './screens/Home';
import Login from './screens/Login';

const Stack = createNativeStackNavigator();

const App = () => {
  const options = { title: "", headerShown: false };
  return (
    <PaperProvider>
    <NavigationContainer>
      <StatusBar
        backgroundColor="#fff"
      />
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={options}/>
        <Stack.Screen name="Home" component={Home} options={options}/>
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
  },
});

export default App;
