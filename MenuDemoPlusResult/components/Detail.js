import * as React from 'react';
import { Text, View, StyleSheet, Dimensions,TouchableOpacity,SafeAreaView,ScrollView,Modal,Pressable, TextInput,
  Image,Keyboard,} from 'react-native';
import Constants from 'expo-constants';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { AntDesign,Feather,SimpleLineIcons,MaterialCommunityIcons } from '@expo/vector-icons';
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart'

const { width } = Dimensions.get('screen');
const colors = ['#6190E8', '#A7BFE8', ]



export default function CircleBackground() {
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
            

            
      
       <View style={styles.centerizedView}>
       
          <View style={styles.authBox}>

          <Text style={styles.reslve}>You re currently SAD</Text>

           <View style={styles.box}>
      </View>
          </View>
          
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
          marginBottom:4,
          top: 10,
        }}
      />
        </View>
        
    <View style={styles.hr}></View>
       <View style={styles.centerizedView2}>
          <View style={styles.authBox2}>
          <Card>
          <Text style={styles.reslve2}>Note the Emotion</Text>
          </Card>
          <Text style={styles.emotionre}>It seem that you have a rough day.</Text>
          <Text style={styles.emotionre}>Would you like to listen to some lo-fi musics that can help you relax?</Text>
          </View>
        </View>
        
        
           <View style={styles.hr}></View>
       <View style={styles.centerizedView2}>
          <View style={styles.authBox2}>
        
          </View>
        </View>
        
        
        
        
        
        

      

  </ScrollView>
        </SafeAreaView>

            
        
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',      
    },
    bgCircle1: {
        position: 'absolute',
        height: width * 2,
        width: width * 4,
        borderRadius: width,
        left: 0,
        top: 0,
    },
      centerizedView: {
    width: '100%',
    top: 2,
  },

 authBox: {
    width: '100%',
    height:'25%',
    backgroundColor: '#fafafa',
    borderRadius: 0,
    alignSelf: 'center',
    paddingHorizontal: 5,
    paddingBottom: 80,
    elevation: 5,
    shadowColor:'#000',
    shadowOffset:3,
  },
    hr: {
    width: '100%',
    height: 0.5,
  
    opacity:0,
    marginTop: 6,
  },

   reslve: {
    fontSize: 30,
    textAlign:'center',
    top : 45,
  },

 box: {
    width: '100%',
    height: 400,
    borderRadius: 0,
  },

  
  dtview: {
    flexDirection: 'row',
    margin : 5,
  },

  resultdt: {
    fontStyle: 'Oswald',
    color: '#000',
    fontSize: 20,
    top:50,
   
   
  },
//Adivsing
   centerizedView2: {
    width: '100%',
    bottom : 118,
  },
 authBox2: {
    width: '100%',
    backgroundColor: '#fafafa',
    alignSelf: 'center',
    paddingHorizontal: 5,
    paddingBottom: 80,
    elevation: 5,
  },

 reslve2: {
    fontSize: 20,
    textAlign:'left',
    top : 0,
  },
  
  emotionre:{
  fontSize: 19,
  textAlign:'center',
  
  },
   fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 30,
  },
    
  
})