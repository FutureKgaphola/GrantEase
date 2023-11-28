import React from 'react';
import {Alert, Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
GoogleSignin.configure({
  webClientId:
    '534881027218-0k23t5grdmpdpeq9hl6nm7sdopuqnu1q.apps.googleusercontent.com',
});
import {Button, Card, TextInput, Switch} from 'react-native-paper';

async function onGoogleButtonPress() {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = await auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  const res = await auth().signInWithCredential(googleCredential);
  if (res) {
    Alert.alert('Success', 'User Authenticated');
  }
}

const signOut = async () => {
  try {
    const resp = await GoogleSignin.signOut();
    if (resp) {
      console.log('signned out');
    }
    console.log('signned out');
  } catch (error) {
    console.error(error);
  }
};

const Login = () => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <ScrollView contentContainerStyle={{flexGrow:1,backgroundColor: '#fff'}}>
      <Image
        style={{width: '100%', height: 300, objectFit: 'contain'}}
        source={require('../assets/banner.png')}
      />

      <Text style={{fontSize: 25}}>Good To See</Text>
      <Text style={{fontSize: 25}}>you Back</Text>
      <Card style={{padding: 10, backgroundColor: '#FFF', margin: 10}}>
        <TextInput
          mode="outlined"
          label="Enter email"
          inputMode='email'
          placeholder="Enter email"
          left={<TextInput.Icon icon="eye" />}
        />
        <TextInput
          mode="outlined"
          label="Enter password"
          placeholder="Enter password"
          secureTextEntry
          right={<TextInput.Icon icon="eye" />}
        />
        <Text style={{alignSelf: 'flex-end'}}>Forgot password</Text>
        <Button
          textColor="#fff"
          style={{borderRadius: 8, backgroundColor: '#FFBD11', marginTop: 5}}
          mode="elevated"
          onPress={() => console.log('Pressed')}>
          Login
        </Button>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginTop: 5,
            alignItems: 'center',
            backgroundColor: '#F6F5F2',
            borderRadius: 8,
            zIndex: 6,
          }}>
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Icon}
            color={GoogleSigninButton.Color.Light}
            onPress={() => {
              () => onGoogleButtonPress();
            }}
            disabled={false}
          />
          <Text
            style={{alignSelf: 'center', color: '#FFBD11', fontWeight: '600'}}>
            Sign with Google
          </Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <Text>Remember me </Text>
          <Switch
            thumbColor={'#FFBD11'}
            value={isSwitchOn}
            onValueChange={onToggleSwitch}
          />
        </View>
      </Card>
      <View style={{flexDirection: 'row'}}>
        <Text>Don't have an account? </Text>
        <Text style={{color: '#FFBD11'}}>Signup</Text>
      </View>
    </ScrollView>
  );
};

export default Login;
