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

 



const data = [
  { id: '1', title: 'First item' ,Satus: 'Happy',Date:'00/00/00',},
  { id: '2', title: 'Second item' ,Satus: 'Happy',Date:'00/00/00', },
  { id: '3', title: 'Third item' ,Satus: 'Happy' ,Date:'00/00/00', },
  { id: '4', title: 'Fourth item' ,Satus: 'Happy',Date:'00/00/00',},
  { id: '5', title: 'Fifth item' ,Satus: 'Happy' ,Date:'00/00/00', },
  { id: '6', title: 'Sixth item' ,Satus: 'Happy',Date:'00/00/00',},
  { id: '7', title: 'Seventh item' ,Satus: 'Happy' ,Date:'00/00/00',},
  { id: '8', title: 'Eight item' ,Satus: 'Happy',Date:'00/00/00',},
  { id: '9', title: 'Eight item' ,Satus: 'Happy',Date:'00/00/00', },
  { id: '10', title: 'Eight item',Satus: 'Happy',Date:'00/00/00',},
];


const MyLineChart = () => {
  return (
    <>
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



const getItem = (chart) => {
 
    Alert.alert(chart);
 
  }
 
  const ItemRender = ({ name }) => (
    <View style={styles.item}>
      <Text style={styles.itemText} onPress={()=> getItem(name)}>{name}</Text>
    </View>
  );
 
 
  const getname = (name) => {
 
    Alert.alert(name);
 
  };

  

//MenuScreen//Screen1
export default function Hislist() {
    return (
        <View style={styles.container}>
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
       <FlatList
       vertical
        style={styles.move}
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={item => item.id}
        
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <ItemRender id={item.id} name={item.name}/>
            <Text style={styles.listItemText}>Name:{item.title}</Text>
            <Text style={styles.listItemText}>Date:{item.Date}</Text>
            <Text style={styles.listItemText2}>Satus:{item.Satus}</Text>

            <MyLineChart/>
       
      
            
          </View>


        )}
      
      
      
      />
   
    
        

        </View>
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
