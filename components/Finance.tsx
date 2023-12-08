import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import {ActivityIndicator, MD2Colors,Snackbar} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {AppContext} from '../AppManager/Manager';
import uuid from 'react-native-uuid';

const Finance = () => {
  const {currentVisitorId} = useContext(AppContext);
  const [fileName, setFileName] = useState('');
  const [fileUri, setfileUri] = useState('');
  const [startup, setupload] = useState('');
  const [Totalup, setTotalup] = useState('');
  const [isDisabled, setDisabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const onDismissSnackBar = () => setVisible(false);

  const getform = () => {
    const formUrl =
      'https://firebasestorage.googleapis.com/v0/b/sassa-c2b7f.appspot.com/o/MedicalAssessmentReferralForm.pdf?alt=media&token=cad67df0-138f-4efa-a556-f4eba1022726';
    Linking.openURL(formUrl)
      .then(() => console.log('Opened external link successfully'))
      .catch(err => console.error('Error opening external link:', err));
  };

  return (
    <ScrollView style={{padding: 5}} showsVerticalScrollIndicator={false}>
      <Text>
        {
          '1. Download the letter and form below\n 2. then upload them back to us as a merged signgle document. \n 3. Done, now wait for your financial state to change to uproved/declined or for any communication from uor team'
        }
      </Text>

      <TouchableOpacity
        style={{marginTop: 6, marginBottom: 6}}
        onPress={() => getLetter()}>
        <Text style={{color: 'green', textDecorationLine: 'underline'}}>
          Download your sassa medical letter
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{marginTop: 6, marginBottom: 6}}
        onPress={() => getform()}>
        <Text style={{color: 'green', textDecorationLine: 'underline'}}>
          Download Disablity grant form
        </Text>
      </TouchableOpacity>

      <Button
        icon={() => (
          <Ionicons
            name="chevron-back-circle-outline"
            color="white"
            size={24}
          />
        )}
        rippleColor={'white'}
        textColor="white"
        style={{borderColor: '#FFBD11', backgroundColor: '#FFBD11'}}
        mode="elevated"
        onPress={() => selectDoc()}>
        Attach your merged document
      </Button>
      <Text>{fileName}</Text>

      <Button
        icon={() => (
          <Ionicons
            name="chevron-back-circle-outline"
            color="black"
            size={24}
          />
        )}
        rippleColor={'#FFBD11'}
        textColor="black"
        style={{borderColor: '#FFBD11'}}
        mode="outlined"
        onPress={() => upload()}>
        Accept & submit
      </Button>

      <Snackbar
      duration={2000}
        visible={visible}
        onDismiss={onDismissSnackBar}
        >
        No application found
      </Snackbar>
    </ScrollView>
  );
};

export default Finance;
