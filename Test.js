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
    <LineChart data={barData} width={300} height={175} yAxisLabel={'%'} chartConfig={{backgroundColor: '#fff',backgroundGradientFrom: '#8E05C2',
      backgroundGradientTo: '#8E05C2',
      decimalPlaces: 2,
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
    <Text style={styles.message}> Hello,You are Sad. Would You like to Listen To Lo-fi music ?  </Text>
    </View>
    <View style={styles.buttonRow}>
    <TouchableOpacity> <Text>Yes</Text> </TouchableOpacity>
    <TouchableOpacity> <Text>No</Text> </TouchableOpacity>
    </View>
    <View style={styles.RectangleShapeView}>
    <Text style={styles.message}> Would You Like to Send Your Result to Email ?  </Text>
    </View>
    <View style={styles.buttonRow}>
    <TouchableOpacity> <Text>Yes</Text> </TouchableOpacity>
    <TouchableOpacity> <Text>Yes</Text> </TouchableOpacity>
    </View>
    </View>
    </ SafeAreaView>
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
  },

  logintext:{
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
    
    
  },

  stat:{
    fontSize: 21,
    fontWeight: 'bold',
    marginTop: 5,
  },

  RectangleShapeView:{
  marginTop: 10,
  width: 200,
  height: 100,
  backgroundColor: '#FFFFF',
  borderRadius: 16,
  borderWidth: 1,
  borderColor: "#8E05C2",
  },

  message:{
   marginTop:20,
   marginLeft:10,
  },

  buttonRow:{
    marginTop: 10,
    flexDirection:"row",
  }
});

