import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, 
         Text, 
         View,
         TextInput,
         Keyboard,
         TouchableOpacity,
         Alert,
         } from 'react-native';
import { Button } from 'react-native-web'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function App() {
  return (
    
    <View style={styles.container}>

    <Text style={styles.logintext}>Emotion Dectection</Text>

    <Text>Hello,User</Text>

    <View style={styles.container2}>
    <Text style={styles.Menutext}>Menu</Text>
    
    {/*Button Camera Demo*/}
    <TouchableOpacity style={styles.buttonAs} onPress={() => navigation.navigate('camera')}>

    <Text style={styles.logintext2}>
      Camera
    </Text>

    </TouchableOpacity>

  
   {/*Button Information Demo*/}

   <TouchableOpacity style={styles.buttonAs} onPress={() => navigation.navigate('camera')}>

<Text style={styles.logintext2}>
  Infomation
</Text>

</TouchableOpacity>
     
   {/*Button History Demo*/}

   <TouchableOpacity style={styles.buttonAs} onPress={() => {Alert.alert('Enter History');}}>

<Text style={styles.logintext2}>
History
</Text>

</TouchableOpacity>  
    </View>
    
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:'center',
   

  },

  container2: {
    flex:0.7,
    alignItems:'center',
    flexDirection:'column',
    justifyContent:'space-evenly',

  },

  logintext:{
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
  },

  Menutext:{
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },

  logintext2:{
    fontSize: 15,
    fontWeight: '500',

  },

  buttonAs:{
    paddingVertical: 10,
    paddingHorizontal:110,
    borderRadius:30,
    borderWidth:2,
    borderColor:'#8E05C2',
    
  },
  

  
  
 
});

