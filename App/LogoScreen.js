import { StatusBar } from 'expo-status-bar';
import React, {Component, useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Keyboard, KeyboardAvoidingView, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


//--------------------Logo Screen---------------------------//
export default function LogoScreen(props){

  const checkLoggedIn = async () => {
    let userValue =  await AsyncStorage.getItem('user');
    console.log(userValue)
    if(userValue == null){
      props.navigation.navigate('Auth');
    } else {
      props.navigation.navigate('Home');
    }
  }
  useEffect(() =>{
    checkLoggedIn();
  }, [])

  return (
    <View style={styles.container}>

    <View style={styles.logocenter}>
    <Image style={styles.logo} source={require('../assets/app-icon.png')} />
    </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent:'center',
    backgroundColor: '#ecf0f1'
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