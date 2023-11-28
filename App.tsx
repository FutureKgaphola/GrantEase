/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import auth from '@react-native-firebase/auth';
import { GoogleSignin,GoogleSigninButton ,statusCodes } from '@react-native-google-signin/google-signin';


GoogleSignin.configure({
  webClientId: '534881027218-0k23t5grdmpdpeq9hl6nm7sdopuqnu1q.apps.googleusercontent.com'
});

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): JSX.Element {
  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential =await auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    const res=await auth().signInWithCredential(googleCredential);
    if(res){
      Alert.alert('Success',"User Authenticated");
    }
  }

  const signOut = async () => {
    try {
      const resp=await GoogleSignin.signOut();
      if(resp){
        console.log("signned out");
      }
      console.log("signned out");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.Container}>
      
      <StatusBar
        backgroundColor="#fff"
      />
      <TouchableOpacity>
      <GoogleSigninButton
  size={GoogleSigninButton.Size.Wide}
  color={GoogleSigninButton.Color.Dark}
  onPress={()=>{}}
  disabled={false}
/>
      </TouchableOpacity>


      <TouchableOpacity style={{padding:10,backgroundColor:'blue'}} onPress={()=>onGoogleButtonPress()}>
      <Text>sign in google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{padding:10,backgroundColor:'blue',marginTop:30}} onPress={()=>signOut()}>
      <Text>sign out</Text>
      </TouchableOpacity>

      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center'

  },
  
});

export default App;
