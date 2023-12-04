
import React, { useEffect, useRef, useState } from 'react';
import {SafeAreaView,StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import Banner from '../components/Banner';
import { AnimatedFAB,Snackbar  } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Feed = () => {
  const webViewRef = useRef(null);
  const [key, setKey] = useState(1);
  const [visible, setVisible] = React.useState(false);
  const onDismissSnackBar = () => setVisible(false);
  const refreshPage = () => {
    setKey(key + 1);
  };
  useEffect(()=>{refreshPage()
    return () => {}},[])
    return ( 
      
      <SafeAreaView style={{flex: 1}}>
        <Banner/>
        <WebView
        key={key}
        ref={webViewRef}
        source={{uri: 'https://srd.sassa.gov.za/'}} />

        <AnimatedFAB
        rippleColor={'white'}
        icon={()=>(<Ionicons name="refresh" size={24} color="black" />)}
        label={'Label'}
        extended={false}
        onPress={() => {
          refreshPage();
          setVisible(!visible);
        }}
        visible={true}
        animateFrom={'right'}
        iconMode={'static'}
        style={[styles.fabStyle]}
      />
      <Snackbar
      duration={2000}
        visible={visible}
        onDismiss={onDismissSnackBar}
        >
        Refreshing...
      </Snackbar>
      </SafeAreaView>
     );
}
 
export default Feed;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
    backgroundColor:'#FFBD11'
  },
});