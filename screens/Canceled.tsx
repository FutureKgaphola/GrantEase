import React from 'react';
import { Card } from "react-native-paper";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
  } from "react-native";

const Canceled = () => {
    const [appointments, setAppointments] = React.useState([
        {
          id: 1,
          name: "Dr Lani",
          career: "Cardiologist",
          image: require('../assets/bruno.jpg'),
          time: "  10:30",
          date: "  19-nov-2023",
        },
        {
          id: 2,
          name: "Dr Dave",
          career: "Cardiologist",
          image: require('../assets/bruno.jpg'),
          time: "  10:30",
          date: "  19-nov-2023",
        },
        {
          id: 3,
          name: "Dr Mandy",
          career: "Cardiologist",
          image: require('../assets/bruno.jpg'),
          time: "  10:30",
          date: "  19-nov-2023",
        },
        {
            id: 4,
            name: "Dr Simons",
            career: "Cardiologist",
            image: require('../assets/bruno.jpg'),
            time: "  10:30",
            date: "  19-nov-2023",
          }
      ]);
    return ( 
        <FlatList
        showsVerticalScrollIndicator={false}
          style={{ marginBottom: 10,marginLeft:7,marginRight:7, backgroundColor: '00FFFFFF' }}
          data={appointments}
          renderItem={({ item }) => (
            <Card key={item.id} style={{ marginTop: 10, backgroundColor: '#FAFAFD' }}>
              <Image style={styles.imageIN} source={item.image} />
  
              <Text style={styles.itemN}>{item.name}</Text>
  
              <Text style={styles.itemC}>{item.career}</Text>
  
              <Card style={{ backgroundColor: '#FAFAFD', margin: 5 }}>
                <View style={styles.ItemC2}>
                  <View style={{ flexDirection: 'row', margin: 5, justifyContent: "center", gap: 5 }}>
                    <Ionicons
                      name="time-outline"
                      color="#FFBD11"
                      size={24}
                    />
                    <Text style={styles.itemT}>
  
                      {item.time}
                    </Text>
  
                  </View>
  
                  <View style={{ flexDirection: 'row', margin: 5, justifyContent: "center", gap: 5 }}>
                    <Ionicons name="calendar-outline" color="#FFBD11" size={20} />
                    <Text style={styles.itemT}>
  
                      {item.date}
                    </Text>
  
                  </View>
  
  
                </View>
              </Card>
            </Card>
          )}
        />
     );
}
 
export default Canceled;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F3F2ED",
      gap: 5
    },
  
    BCont: {
      backgroundColor: '#F6F6F9',
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: 2,
      margin: 3
    },
  
    BTxt: {
      color: "#FFFFFF",
      alignSelf: "center",
      bottom: 25,
      left: 15,
      fontWeight: "600",
      fontSize: 13,
    },
    BTxt2: {
      color: "#FFFFFF",
      alignSelf: "center",
      bottom: 25,
      left: 15,
      fontWeight: "600",
      fontSize: 13,
    },
    BTxt3: {
      color: "#FFFFFF",
      alignSelf: "center",
      bottom: 25,
      left: 10,
      fontWeight: "600",
      fontSize: 13,
    },
    Bupdates: {
      backgroundColor: "#FFBD11",
      width: 103,
      height: 31,
      borderRadius: 15,
    },
  
    BApp: {
      backgroundColor: "#FFBD11",
      width: 103,
      height: 31,
      borderRadius: 15,
      marginHorizontal: "2%",
    },
    BCancel: {
      backgroundColor: "#FFBD11",
      width: 122,
      height: 31,
      borderRadius: 15,
    },
  
    ScrollCont: {
      padding: 3,
      backgroundColor: 'white'
    },
  
    arrCont: {
      backgroundColor: "#FAFAFD",
      width: "100%",
      height: 165,
      borderRadius: 15,
      marginVertical: "2%",
    },
    imageIN: {
      width: 45,
      height: 49,
      borderRadius: 66,
      left: "83%",
      top: "7%",
      backgroundColor: "white",
    },
  
    itemN: {
      fontSize: 15,
      fontWeight: "bold",
      bottom: "20%",
      left: "10%",
      color: 'black'
    },
  
    itemC: {
      fontSize: 13,
      fontWeight: "bold",
      bottom: "20%",
      left: "10%",
      color: "#726C6C",
    },
  
    ItemC2: {
      borderRadius: 15,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    itemT: {
      fontSize: 15,
      color: "#FFBD11",
      fontWeight: "bold",
      textDecorationLine:'line-through'
    },
  
    btnC2: {
      backgroundColor: "#FFBD11",
      width: 130,
      height: 33.5,
      bottom: "26%",
      borderRadius: 15,
      left: "55%",
    },
  
    addtxt: {
      bottom: "85%",
      left: "35%",
      color: "white",
      fontSize: 15,
      fontWeight: "bold",
    },
  
    BtnC: {
      backgroundColor: "#FBF8F8",
      width: 130,
      height: 33.5,
      bottom: "5%",
      borderRadius: 15,
      left: "5%",
      borderColor: "#FFBD11",
      borderWidth: 2,
    },
  
    CancelTxt: {
      bottom: "85%",
      left: "40%",
      fontSize: 15,
      fontWeight: "bold",
    },
  });