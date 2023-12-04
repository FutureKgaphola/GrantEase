import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import Home from './screens/Home';
import Login from './screens/Login';
import { AppProvider } from './AppManager/Manager';
import Register from './screens/Register';
import Forgotpassword from './screens/Forgotpassword';

const Stack = createNativeStackNavigator();

const App = () => {

  const options = { title: "", headerShown: false };
  return (
    <AppProvider>
    <PaperProvider>
    <NavigationContainer>
      <StatusBar
        backgroundColor="#FFBD11"
      />
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={options}/>
        <Stack.Screen name="Home" component={Home} options={options}/>
        <Stack.Screen name="Register" component={Register} options={options}/>
        <Stack.Screen name="Forgotpassword" component={Forgotpassword} options={options}/>
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
    </AppProvider>
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
