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
import {LineChart,BarChart} from 'react-native-chart-kit'

const barData = {
      labels: ['Sad', 'Neutal', 'Happy',],
      datasets: [
        {
          data: [20,  80, 43],
        },
      ],
    };

export default function App() {
  return (
    < SafeAreaView style={styles.container}>
    <Text style={styles.logintext}>Result</Text>
    <View style={styles.container2}>
    <Text style={styles.stat}>status</Text>
    <BarChart data={barData} width={300} height={175} chartConfig={{backgroundColor: '#fff',backgroundGradientFrom: '#8E05C2',
      backgroundGradientTo: '#8E05C3',
      decimalPlaces: 3,
      color: (opacity = 0.5) => `rgba(255, 255, 255, ${opacity})`,
      style: {borderRadius: 16}
      }
      }
    bezier 
    style={{
      marginVertical: 8,
      borderRadius: 16,
    }}
  />


    <View style={styles.RectangleShapeView}>
    <Text style={styles.message}>Hello,You are Sad. Would You like to Listen To Lo-fi music ?  </Text>
    <View style={styles.buttonRow}>
    <TouchableOpacity><Text>Yes</Text></TouchableOpacity>

    <TouchableOpacity ><Text>No</Text></TouchableOpacity>
    </View>
    </View>

    <View style={styles.RectangleShapeView2}>
    <Text style={styles.message}>Hello,You are Sad. Would You like to Listen To Lo-fi music ?  </Text>
    <View style={styles.buttonRow}>
    <TouchableOpacity onPress={ ()=> Linking.openURL('https://www.youtube.com/watch?v=5qap5aO4i9A') }><Text>Yes</Text></TouchableOpacity>
    <TouchableOpacity><Text>No</Text></TouchableOpacity>
    </View>


    </View>
   

    
    </View>
    </ SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8E05C2',
    alignItems: 'center',
    justifyContent:'center',
   
  },

  container2: {
    flex:0.7,
    alignItems:'center',
    flexDirection:'column',
  },

  logintext:{
    fontSize: 29,
    fontWeight: 'bold',
    marginTop: 20,
    backgroundColor: '#8E05C2',
    color:'#fff',
    
  },

  stat:{
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 5,
    color:'#fff',
  },

  RectangleShapeView:{
  marginTop: 20,
  width: 200,
  height: 100,
  backgroundColor: '#FFFF',
  borderRadius: 16,
  borderWidth: 1,
  borderColor: "#8E05C2",
  },

  RectangleShapeView2:{
  marginTop: 60,
  width: 200,
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
    marginTop: 60,
    justifyContent: 'space-Around',
    flexDirection:"row",
    
    
  },

 
});

