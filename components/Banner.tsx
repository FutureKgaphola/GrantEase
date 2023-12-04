
import React from 'react';
import { StyleSheet,Image,View} from 'react-native';

const Banner = () => {
    return ( 
      <View>
        <Image style={styles.Himage} source={require('../assets/pic1.jpg')} />
        
      </View>
        
     );
}
 
export default Banner;

const styles=StyleSheet.create({
    Himage: {
        width: "100%",
        height: 228,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8,
        zIndex: 15,
      },
})

