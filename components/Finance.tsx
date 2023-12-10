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
  var docId: string;
  const upload = () => {
    if (fileUri != '') {
      firestore()
        .collection('Applications')
        .where('userId', '==', currentVisitorId.trim())
        .get()
        .then(querySnapshot => {
          if (querySnapshot.size == 1) {
            querySnapshot.forEach(documentSnapshot => {
              docId = documentSnapshot.id;
              let Hrfile = documentSnapshot.data()?.Hrfile;
              if (Hrfile.includes('http')) {
                Alert.alert(
                  'Application exist',
                  'We already received an application for this account.',
                );
              } else {
                let specialId=uuid.v4();
                const reference = storage().ref('/Applications/' + String(specialId+fileName));
                const task = reference.putFile(fileUri);
                task.on('state_changed', taskSnapshot => {
                  console.log(
                    `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
                  );
                  setupload(String(taskSnapshot.bytesTransferred));
                  setTotalup(String(taskSnapshot.totalBytes));
                });

                task.then(async () => {
                  const url = await storage()
                    .ref('/Applications/' + String(specialId+fileName))
                    .getDownloadURL();
                  firestore()
                    .collection('users')
                    .doc(currentVisitorId)
                    .update({
                      applied: 'final application processing',
                      medcertificate: url,
                    })
                    .then(() => {
                      firestore()
                        .collection('Applications')
                        .doc(docId)
                        .update({
                          Hrfile: url,
                          HrfileName: String(specialId+fileName),
                        })
                        .then(() => {
                          setupload('');
                          setTotalup('');
                          setFileName('');
                          setDisabled(false);
                          Alert.alert(
                            'Succesful',
                            'Thank you for you submission. once our finace receives and reviews your document you will start to receive funds and payment dates on the app.',
                          );
                        });

                      setDisabled(false);
                    })
                    .catch(err => console.log(String(err)));
                });
              }
            });
          }
        });
    } else {
      if (fileUri == '') {
        Alert.alert('Notification', 'Please select a file to upload');
      }
    }
  };

  const PickAllowed=async()=>{
    try {
      const doc = await DocumentPicker.pickSingle({
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.docx,
          DocumentPicker.types.doc,
        ],
        copyTo: 'cachesDirectory',
      });
      setFileName(String(doc.name));
      setfileUri(String(doc.fileCopyUri));
    } catch (error) {
      if (!DocumentPicker.isCancel(error)) {
        setFileName('');
        setfileUri('');
        Alert.alert('Unexpected error', String(error));
      }
    }
  }

  const selectDoc = async () => {
    firestore()
      .collection('users')
      .where('userId', '==', currentVisitorId.trim())
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(documentSnapshot => {
          let medcertificate = documentSnapshot.data()?.medcertificate;
          if (medcertificate.includes('https')) {
            PickAllowed();
          } else {
            Alert.alert('Missing document', 'No medical letter found. you dont have the sassa medical letter yet from our internal doctors.');
          }
        });
      });
    
  };
  const getLetter = () => {
    firestore()
      .collection('users')
      .where('userId', '==', currentVisitorId.trim())
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          let medcertificate = documentSnapshot.data()?.medcertificate;
          if (medcertificate.includes('https')) {
            Linking.openURL(medcertificate).catch(err =>
              console.error('Error opening external link:', err),
            );
          } else {
            Alert.alert('Missing document', 'No medical letter found');
          }
        });
      });
  };

  const withdrawApplication = () => {
    firestore()
      .collection('Applications')
      .where('userId', '==', currentVisitorId.trim())
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size == 1) {
          querySnapshot.forEach(documentSnapshot => {
            let Hrfile = documentSnapshot.data()?.Hrfile;
            let HrfileName = documentSnapshot.data()?.HrfileName;
            docId=documentSnapshot.id;

            if (Hrfile.includes('http') && HrfileName !== '') {
              storage()
                .ref('/Applications/' + HrfileName)
                .delete()
                .then(() => {

                  if (Hrfile.includes('http')) {
                    firestore()
                      .collection('Applications')
                      .doc(docId)
                      .update({
                        Hrfile: 'no file',
                        HrfileName: 'no file name',
                      })
                      .then(() => {
                        firestore()
                          .collection('users')
                          .doc(currentVisitorId)
                          .update({
                            applied: 'medical letter submitted',
                            medcertificate: 'not applicable',
                          });
                        Alert.alert(
                          'Application Withdrawal',
                          'You have withdrawn your application from the finance team',
                        );
                        
                      })
                      .catch(err => {
                        Alert.alert(
                          'Withdrawal error',
                          'Something went wrong : ' + String(err),
                        );
                      });
                  } else {
                    ///remove withdrawal button
                    setDisabled(true);
                  }
                })
                .catch(err => {
                  Alert.alert('Withdrawal error', String(err));
                });
            } else {
              ///remove withdrawal button
              setVisible(true);
              setDisabled(true);
            }
          });
        }
      });
  };
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

      <Button
        disabled={isDisabled}
        icon={() => (
          <Ionicons
            name="chevron-back-circle-outline"
            color="black"
            size={24}
          />
        )}
        rippleColor={'#FFBD11'}
        textColor="black"
        style={{borderColor: '#FFBD11', marginTop: 10}}
        mode="outlined"
        onPress={() => withdrawApplication()}>
        withdraw application
      </Button>
      {startup != '' && (
        <View style={{marginLeft: 10}}>
          <Text>
            uploading {startup}kb of {Totalup}kb
          </Text>
          <ActivityIndicator animating={true} color={MD2Colors.orangeA200} />
        </View>
      )}
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
