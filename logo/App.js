import * as React from 'react';
import { Text, View, StyleSheet,Image } from 'react-native';
import Constants from 'expo-constants';


export default function App() {
  return (
    <View style={styles.container}>

    <View style={styles.logocenter}>
    <Image style={styles.logo} source={require('./logo/adaptive-icon.png')} />
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignConten:'center',
    backgroundColor: '#ecf0f1',
    
  },

//Logo
  logocenter:{
    padding: 50,
  },

    logo: {
  
    height: 208,
    width: 208,
  }
});
