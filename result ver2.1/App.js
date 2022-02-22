import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, 
         Text, 
         View,
         Keyboard,
         TouchableOpacity,
         Alert,
         SafeAreaView,
         ScrollView,
         Linking
         } from 'react-native';



export default function App() {
  return (
    <View style={styles.container}>
    <Text style={styles.logintext}>Result</Text>
    <Text style={styles.stat}>status</Text>
    <Text style={styles.predict} >You're Sad !</Text>
    <Text style={styles.text00}>Happy: {} </Text>
    <Text style={styles.text00}>Neutrual: {} </Text>
    <Text style={styles.text00}>Angry {} </Text>
    <Text style={styles.text00}>Fear {} </Text>
    <Text style={styles.text00}>Suprised{} </Text>
    <Text style={styles.text00}>Sad: {} </Text>
    
    <View style={styles.container2}>

    <View style={styles.RectangleShapeView}>
    <Text style={styles.message}>Hello,You are Sad. Would You like to Listen To Lo-fi music ? </Text>
    </View>

    <View style={styles.ButtonContainer}>
    <View style={styles.buttonRow}>
    <TouchableOpacity><Text>Yes</Text></TouchableOpacity>
    </View>
    <View style={styles.buttonRow}>
    <TouchableOpacity><Text>No</Text></TouchableOpacity>
    </View>
    </View>

     <View style={styles.RectangleShapeView}>
    <Text style={styles.message}>Hello,You are Sad. Would You like to Listen To Lo-fi music ? </Text>
    </View>

    <View style={styles.ButtonContainer}>
    <View style={styles.buttonRow}>
    <TouchableOpacity><Text>Yes</Text></TouchableOpacity>
    </View>
    <View style={styles.buttonRow}>
    <TouchableOpacity><Text>No</Text></TouchableOpacity>
    </View>
    </View>

    

    </View>
    </View>
  
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8E05C2',
   
  },

  container2: {
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: '#8E05C2',
  },
  ButtonContainer:
  {
     flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      
  },

  predict:
  {
    color:'#fff',
    textAlign:'center',
    marginTop: 3,
    fontSize: 31.5,
  },
  
  logintext:{
    fontSize: 29,
    fontWeight: 'bold',
    marginTop: 29,
    backgroundColor: '#8E05C2',
    color:'#fff',
    textAlign:'center',
  },

  stat:{
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 1,
    color:'#fff',
    textAlign:'center',
  },

  text00:{
    color:'#fff',
    margin:2,
    marginLeft:40,
    textAlign:'left',
    fontSize: 15,
  },

  RectangleShapeView:{
  marginTop: 20,
  width: 250,
  height: 100,
  backgroundColor: '#FFFF',
  borderRadius: 16,
  borderWidth: 1,
  borderColor: "#8E05C2",
  
  },



  message:{
   marginTop:20,
   marginLeft:10,
   
  },

  buttonRow:{
    marginTop: 30,
    margin:40,
    backgroundColor:'white',
    height:20,
    width:60,
    textAlign:'center',
    fontSize:20,
    borderRadius:4,

  },

 
});

