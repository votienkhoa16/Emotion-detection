import React, { useState } from 'react';
import { Text, View, StyleSheet, Dimensions,TouchableOpacity,SafeAreaView,ScrollView,Modal,Pressable, TextInput,Image,Keyboard,Alert} from 'react-native';
import Checkbox from 'expo-checkbox';
import Constants from 'expo-constants';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import {LineChart} from "react-native-chart-kit";
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart';

import AssetExample from './AssetExample';
import Einput from './emailinput';
const { width } = Dimensions.get('screen');
const colors = ['#6190E8', '#A7BFE8', ];





export default function CircleBackground() {
  
  //Checkbox const
  const [isChecked, setChecked] = useState(false);

    return (
      
        <SafeAreaView style={styles.container}>

        
            {colors.map((x, i) => (
                <View style={[styles.bgCircle1, {
                    backgroundColor: x,
                    transform: [
                        { translateX: -(width/6) + (i * width / colors.length) },
                        { translateY: -(width * 0.6) - (i / 1.25 * width / colors.length) }
                    ]
                }]} key={i.toString()} />
            ))}
<ScrollView >
        <Card>
        <AssetExample/>
        </Card>

         <LineChart
        data={{
          labels: ['Happy', 'Neutral', 'Sad', 'Suprise', 'Scared', 'Angry'],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,],
              strokeWidth: 2,
            },
          ],
        }}
        width={Dimensions.get('window').width}
        height={200}
        chartConfig={{
          backgroundColor: '#A7BFE8',
          backgroundGradientFrom: '#A7BFE8',
          backgroundGradientTo: '#ffff',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(107,144,232, ${opacity})`,
          style: {
            borderRadius: 0,
          },
        }}
        style={{
          marginVertical: 4,
          borderRadius: 0,
          borderColor:'#ffff',
          top: 10,
        }}
      />
      
     
       <View style={styles.centerizedView}>
      <View style={styles.paragraph2}>
          <Card style={styles.card1}>
          <Text style={styles.reslve2}>Note the Emotion</Text>
          </Card>
          <Text style={styles.emotionre}>It seem that you have a rough day.Would you like to listen to some lo-fi musics that can help you relax?</Text>
         
      <View style={{ flexDirection:'row' , justifyContent:'center'}}>
          
         <TouchableOpacity
        style={styles.resultbutton}
        title="Press me"
        color="#f194ff"
        onPress={() => Alert.alert('Button with adjusted color pressed')}>
        <Text style={styles.sendtext}>Send</Text>
      </TouchableOpacity>
     
      </View>
      </View>
    </View>



      <View style={styles.centerizedView}>
      <View style={styles.paragraph2}>
          <Card style={styles.card1}>
          <Text style={styles.reslve2}>Notification</Text>
          </Card>
          <Text style={styles.emotionre}>Would you like to send This Result to Guardian?</Text>
               
      <View style={{ flexDirection:'row' , justifyContent:'center'}}>
          
         <TouchableOpacity
        style={styles.resultbutton}
        title="Press me"
        color="#f194ff"
        onPress={() => Alert.alert('Button with adjusted color pressed')}>
        <Text style={styles.sendtext}>Send</Text>
      </TouchableOpacity>
      </View>
   
      </View>
    </View>


    
   
        
       
        
        

      

</ScrollView>
        </SafeAreaView>

            
        
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',      
    },
    bgCircle1: {
        position: 'absolute',
        height: width * 2,
        width: width * 4,
        borderRadius: width,
        left: 0,
        top: 0,
    },

     card1:{
      height: 30,
   } ,


     reslve2: {
    fontSize: 25,
    textAlign:'center',
    top : 0,
  },
    
    paragraph2: {
    marginTop: 24,
    width: '100%',
    backgroundColor:'#fff',
  },
    emotionre:{
      textAlign: 'center',
      fontSize: 20,
      marginTop:30,
    },


  section: {
    flexDirection: 'row',
    alignItems: 'center',
    margin:20,
    marginHorizontal: 10,
    
  },
  paragraph: {
    fontSize: 15,
    textAlign:'center',
    
  },


  checkbox: {
   
    
  },

  resultbutton:{
   marginVertical: 40,
   width:'30%',
   height: 30,
   borderRadius:20,
   borderColor:'#A7BFE8',
   borderWidth: 2,
   backgroundColor:'#A7BFE8',
},

 sendtext: {
    fontSize: 15,
    textAlign:'center',
    marginTop:3,
    color:'white',
    
    
    
  },
  
  




  


    
 
    
  
})
