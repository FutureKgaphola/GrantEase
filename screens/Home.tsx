import React from 'react';
import { getData, getstoreSignInMethod} from '../localstorage/storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
GoogleSignin.configure({
  webClientId:
    '534881027218-0k23t5grdmpdpeq9hl6nm7sdopuqnu1q.apps.googleusercontent.com',
});

import { PaperProvider } from 'react-native-paper';
import Dashboard from './Dashboard';
import Feed from './Feed';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Exit from './Exit';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Tab = createBottomTabNavigator();

const Home =({navigation}: {navigation: any}) => {

  const account=async()=>{

    console.log(await getData());
    console.log(await getstoreSignInMethod());
    
    }
  
  account();
  return (
    <PaperProvider>
  
      <Tab.Navigator screenOptions={{tabBarActiveTintColor:'#FFBD11'}}
       initialRouteName="Dashboard">
        <Tab.Screen name="Dashboard" component={Dashboard} options={{
          title:'',
          headerShown:false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={24} color="black" />
          ),
        }}/>
        <Tab.Screen name="Feed" component={Feed} options={{
          title:'',
          headerShown:false,
          tabBarLabel: 'More',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="webhook" size={24} color="black" />
          ),
        }}/>
        <Tab.Screen name="Exit" component={Exit} options={{
          title:'',
          headerShown:false,
          tabBarLabel: 'Exit',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="exit-to-app" size={24} color="black" />
          ),
        }}/>
      </Tab.Navigator>

    </PaperProvider>
  );
};

export default Home;
