import * as React from 'react';
import {useState} from 'react';
import { Text, View, StyleSheet, Dimensions,TouchableOpacity,SafeAreaView,Pressable,Alert,FlatList,Image} from 'react-native';
import Constants from 'expo-constants';
import { AntDesign,Feather,SimpleLineIcons,MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {StackedBarChart,LineChart} from "react-native-chart-kit";
import { VictoryBar,VictoryChart } from 'victory';

const { width } = Dimensions.get('screen');
const colors = ['#6190E8', '#A7BFE8', ]
const Stack = createNativeStackNavigator();


const HistoryScreen = () => {
  return (
      
      <Text style={styles.header}>Result</Text>
      <LineChart
        data={{
          labels: ['0:00', '6:00', '9:00', '12:00', '18:00',],
          legend:['Happy','Sad','Neutral','Supried','Angry','Fear'],
          datasets: [
            //Happy : Green #008000
            {
              data: [Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                ],
                color: (opacity = 1) => `#008000 `,
              strokeWidth: 2,
            },

             //Sad
            {
              data: [Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                ],
                color: (opacity = 1) => `#ff0000 `,
              strokeWidth: 2,
            },
               //Neutrual
             {
              data: [Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                ],
              color: (opacity = 1) => `#808080`,
              strokeWidth: 2,
            },
               //Suprised
             {
              data: [Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                ],
               color: (opacity = 1) => `#ffff00`,
              strokeWidth: 2,
            },
              //Scared
             {
              data: [Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                ],
                color: (opacity = 1) => `#800080`,
              strokeWidth: 2,
            },
              //Angry
             {
              data: [Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
               ],
              color: (opacity = 1) => `#0000ff`,
              strokeWidth: 2,
            },

             {
              data: [Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                ],
                color: (opacity = 1) => `#e69138`,
                
              strokeWidth: 2,
            },
          ],
        }}
        
        width={Dimensions.get('window').width }
        height={220}
        chartConfig={{
          backgroundColor: '#1cc510',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          useShadowColorFromDataset:false,
          decimalPlaces: 2,
          barPercentage: 0.5,
          color: (opacity = 1) => `rgba(255,255,255 ${opacity})`,
          
          style: {
            borderRadius: 16,
          },
         }}
        
        style={{
          marginVertical: 8,
          borderRadius: 16,
          alignItems:'center',
        }}
      />
    </>
  );
};

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
        top: 0
    },
    
  text: {
    marginBottom:190,
  },

  title: {
    bottom: 100,
    fontSize: 40,
    fontWeight: '400',
    fontStyle: 'Oswald',
    color: '#FFF',
  },

  listItem: {
    marginTop: 10,
    padding: 20,
    backgroundColor:'#fff',
    width: 300,
    borderRadius:16, 
  },
  
  listItemText: {
    fontSize: 16,
  },
 
  listItemText2: {
    fontSize: 14,
    textAlign : "right",
    bottom: 15,
  },

  move:{
    margin: 4,
  },

  header:{
    textAlign:'center',
    margin : 3,
  }
   



    
    
  
})
