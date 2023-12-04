import React from 'react';
import {
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import {TextInput, Button, Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Zocial';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Register = ({navigation}: {navigation: any}) => {
  const [email, setemail] = React.useState('');
  const [password,setpassword]=React.useState("");
  const [secure,setsecure]=React.useState(true);
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1, backgroundColor: '#fff'}}>
        <Image
          style={{width: '100%', height: 300, objectFit: 'contain'}}
          source={require('../assets/banner.png')}
        />
        
        <Text style={{marginLeft:20}}>Setup for an account with us...</Text>

        <Card style={{margin: 10, padding: 10}}>
          <TextInput
            mode="outlined"
            label="Enter email"
            inputMode="email"
            onChangeText={text => setemail(text)}
            placeholder="Enter email"
            placeholderTextColor={'#C7C7C7'}
            left={
              <TextInput.Icon
                icon={() => <Icon name="email" size={24} color="black" />}
              />
            }
          />
          <TextInput
          mode="outlined"
          label="Enter password"
          onChangeText={(text)=>setpassword(text)}
          placeholder="Enter password"
          placeholderTextColor={'#C7C7C7'}
          secureTextEntry={secure}
          right={<TextInput.Icon icon={()=>(secure? <Octicons onPress={()=>secure? setsecure(false) : setsecure(true)} name="eye-closed" size={24} color="black" /> : <Octicons onPress={()=>secure? setsecure(false):setsecure(true)} name="eye" size={24} color="black" />)} />}
        />
          <TextInput
            mode="outlined"
            label="Enter Name"
            inputMode="text"
            placeholder="Enter Name"
            placeholderTextColor={'#C7C7C7'}
            left={
              <TextInput.Icon
                icon={() => <FontAwesome5 name="user-circle" size={24} color="black" />}
              />
            }
          />
          <TextInput
            mode="outlined"
            label="Enter SA ID."
            inputMode="numeric"
            maxLength={13}
            placeholder="Enter SA ID."
            placeholderTextColor={'#C7C7C7'}
            left={
              <TextInput.Icon
                icon={() => <Octicons name="number" size={24} color="black" />}
              />
            }
          />
          
          <Button
            icon={() => <AntDesign name="check" size={24} color="white" />}
            mode="contained"
            rippleColor={'white'}
            style={{marginTop: 20, backgroundColor: '#FFBD11'}}
            onPress={() => console.log('Pressed')}>
            Register
          </Button>

          <View style={{flexDirection: 'row',marginTop:5,marginLeft:10}}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
        <Text style={{color: '#FFBD11'}}>Login</Text>
        </TouchableOpacity>
        
      </View>
        </Card>
      </ScrollView>
      
    </TouchableWithoutFeedback>
  );
};

export default Register;
