import * as React from 'react';
import {useState} from 'react';
import { Text, View, StyleSheet, Dimensions,TouchableOpacity,SafeAreaView,Pressable,Alert,FlatList,Image,ScrollView} from 'react-native';
import Constants from 'expo-constants';
import { AntDesign,Feather,SimpleLineIcons,MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const { width } = Dimensions.get('screen');
const colors = ['#6190E8', '#A7BFE8', ]



//MenuScreen//Screen1
export default function InfoDetailList() {
    return (
        <ScrollView style={styles.container}>
            {colors.map((x, i) => (
                <View style={[styles.bgCircle1, {
                    backgroundColor: x,
                    transform: [
                        { translateX: -(width/6) + (i * width / colors.length) },
                        { translateY: -(width * 0.6) - (i / 1.25 * width / colors.length) }
                    ]
                }]} key={i.toString()} />
            ))}


         <Text style={styles.text}></Text> 
         <Text style={styles.title}>Emotion Detection</Text>
            <Text style={styles.paragraph}>
              Welcome User to The Emotion Detection where you can be detect your emotion result with your phone as it's Fast and Simple to use.
              In order to use the App , You must have an account to use . If you don't have an Account , Please Sign Up for an account in order to use it
            </Text> 
            <Text style={styles.paragraph}>
             To dectect your current emotion that you are having right now ,you must click on the camera icon to take a picture of a person face or a selfie.
             Then after taking the photo, it will scan the result the result and will display the result with the demonstariton chart.
             In case of a person is currently Sad ,there will be a section that you can send to your guardian to know your mood by type the input of their email
            </Text>
        <View style={styles.seperator}/>
            <Text style={styles.paragraph}>
              The Result will display the both on chart and the status of the emotion that you are on.
              If the current status that you are Sad, there will be a section that you can send to your guardian to know your mood by type the input of their email, however,
               this section will only display if The user is SAD 
            </Text>
      <View style={styles.seperator}/>
            <Text style={styles.paragraph}>
              The history will display of user that using the app which are the last status, date of using the name of the user . With the addition of Multiple Chart 
            </Text>
        </ScrollView>
    )
}






const styles = StyleSheet.create({
    container: {
        flex: 1,
       
       
    },
    bgCircle1: {
        position: 'absolute',
        height: width * 2,
        width: width * 4,
        borderRadius: width,
        left: 0,
        top: 0,
     
    },
    

 
  text: {
    marginBottom:190,
  },


  title: {
    bottom: 80,
    fontSize: 40,
    fontWeight: '400',
    color: '#FFF',
    textAlign:'center'
  },

  seperator:{
    margin : 15,
  },

  paragraph:{
    textAlign: 'center',
    marginVertical: 8,
    fontSize:14,
    
  }

})
