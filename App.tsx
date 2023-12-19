import "./ignoreWarnings";
import React, { useEffect } from 'react';
import { StatusBar, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import Home from './screens/Home';
import Login from './screens/Login';
import { AppContext } from './AppManager/Manager';
import Register from './screens/Register';
import Forgotpassword from './screens/Forgotpassword';
import SplashScreen from 'react-native-splash-screen'
import { getData } from "./localstorage/storage";


const Stack = createNativeStackNavigator();

const App = () => {

  const {SetcurrentVisitorId}=React.useContext(AppContext);
  
  var initialRoute="Login";
  useEffect(()=>{
    getData().then((resp:any)=>{
      if (resp!==null && resp!==undefined && resp!=="") {
        SetcurrentVisitorId(resp.user?.uid);
        initialRoute="Home";
      }
    });
    SplashScreen.hide();
  },[]);


  const options = { title: "", headerShown: false };
  return (
    <PaperProvider>
    <NavigationContainer>
      <StatusBar
        backgroundColor="#FFBD11"
      />
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="Login" component={Login} options={options}/>
        <Stack.Screen name="Home" component={Home} options={options}/>
        <Stack.Screen name="Register" component={Register} options={options}/>
        <Stack.Screen name="Forgotpassword" component={Forgotpassword} options={options}/>
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
