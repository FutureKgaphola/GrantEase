import {useState,useContext} from 'react';
import {StyleSheet, Text, View, Image, ScrollView,Linking } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Button, Card} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AppContext } from '../AppManager/Manager';
import { getData } from '../localstorage/storage';
import Icon from 'react-native-vector-icons/Zocial';

const Applications = ({navigation}: {navigation: any}) => {
  const account=async()=>{
    var persitentData=await getData();
    }
  
  account();
  const {currentData,SetcurrentData,currentVisitorId}=useContext(AppContext);
  const [payments, setPayments] = useState([
    {id: 1, date: '04 december 2023'},
    {id: 2, date: '02 december 2023'},
  ]);
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Button
          icon={() => (
            <MaterialIcons name="upload-file" size={24} color="#FFBD11" />
          )}
          rippleColor={'#FFBD11'}
          textColor="black"
          style={{borderColor: '#FFBD11'}}
          mode="elevated"
          onPress={() => {
            navigation.navigate('ApplicationDetails');
          }}>
          Apply for grant
        </Button>
      </View>

      <Card style={{margin: 7, overflow: 'hidden'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Text style={{color: 'black', fontWeight: '700', marginLeft: 5}}>
              Beneficiary : {currentData?.Name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                gap: 3,
                alignItems: 'center',
                marginLeft: 5,
              }}>
              <Text>Medical conditon :</Text>
              <Text>{currentData?.illness}</Text>
              <Octicons name="eye-closed" size={24} color="black" />
            </View>
            <Text style={{marginLeft: 5}}>Financial Status : {currentData?.finance}</Text>
            <Text style={{marginLeft: 5}}>Medical Certificate : {currentData?.medical}</Text>
            <Text style={{marginLeft: 5,color:'green'}}>{currentData?.applied}</Text>
          </View>
          <View>
            <Image
              style={{
                width: 70,
                height: 70,
                borderRadius: 100,
                objectFit: 'contain',
                margin: 10,
              }}
              source={currentData?.signmethod=="google" ? {uri:currentData?.profimage} : require('../assets/money.png')}
            />
          </View>
        </View>
        <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
        <Button onPress={()=>Linking.openURL('mailto:support@sassa.com?subject=Disability grant equiry')}
         icon={() => (<Icon name="email" size={24} color="white" />)}
              buttonColor="#FFBD11"
              elevation={5}
              style={{margin:5}}
              textColor="white"
              rippleColor={'white'}
              mode="elevated">
              enquire
            </Button>
        </View>
      </Card>

      <Text style={{color: 'black', marginTop: 10}}>Payment dates</Text>
      <View style={styles.ScrollCont}>
        <ScrollView>
          {currentData?.finance=="approved" && currentData?.medical=="approved" ? payments.map(item => (
            <Card
              key={item.id}
              style={{
                overflow: 'hidden',
                borderColor: 'black',
                borderWidth: 1,
                marginTop: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingLeft: 5,
                }}>
                <Fontisto name="date" size={24} color="black" />
                <Text style={styles.txtP}>{item.date}</Text>
              </View>
            </Card>
          )) : null
        
        }
        </ScrollView>
      </View>
    </View>
  );
};

export default Applications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
    padding: 5,
  },

  ScrollCont: {
    width: '98%',
  },

  HPD: {
    right: '30%',
    fontSize: 19,
    fontWeight: 'bold',
  },
  Pcont: {
    backgroundColor: '#EBF5F0',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  txtP: {
    fontWeight: 'bold',
    fontSize: 15,
    margin: '4%',
    color: '#FFBD11',
  },
});
