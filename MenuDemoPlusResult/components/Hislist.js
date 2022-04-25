import * as React from 'react';
import {useState} from 'react';
import { Text, View, StyleSheet, Dimensions,TouchableOpacity,SafeAreaView,Pressable,Alert,FlatList,Image} from 'react-native';
import Constants from 'expo-constants';
import { AntDesign,Feather,SimpleLineIcons,MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const { width } = Dimensions.get('screen');
const colors = ['#6190E8', '#A7BFE8', ]
const Stack = createNativeStackNavigator();

function Item({ item }) {
  return (
    <View style={styles.listItem}>
      <Image source={{uri:item.photo}}  style={{width:60, height:60,borderRadius:30}} />
      <View style={{alignItems:"center",flex:1}}>
        <Text style={{fontWeight:"bold"}}>{item.name}</Text>
        <Text>{item.position}</Text>
      </View>
      <TouchableOpacity style={{height:50,width:50, justifyContent:"center",alignItems:"center"}}>
        <Text style={{color:"green"}}>Call</Text>
      </TouchableOpacity>
    </View>
  );
}

const data = [
  { id: '1', title: 'First item' ,Satus: 'Happy',Date:'00/00/00' },
  { id: '2', title: 'Second item' ,Satus: 'Happy',Date:'00/00/00' },
  { id: '3', title: 'Third item' ,Satus: 'Happy' ,Date:'00/00/00' },
  { id: '4', title: 'Fourth item' ,Satus: 'Happy',Date:'00/00/00'},
  { id: '5', title: 'Fifth item' ,Satus: 'Happy' ,Date:'00/00/00' },
  { id: '6', title: 'Sixth item' ,Satus: 'Happy',Date:'00/00/00'},
  { id: '7', title: 'Seventh item' ,Satus: 'Happy' ,Date:'00/00/00'},
  { id: '8', title: 'Eight item' ,Satus: 'Happy',Date:'00/00/00'},
  { id: '9', title: 'Eight item' ,Satus: 'Happy',Date:'00/00/00' },
  { id: '10', title: 'Eight item',Satus: 'Happy',Date:'00/00/00' },
];

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
            <Text style={styles.listItemText}>Name:{item.title}</Text>
            <Text style={styles.listItemText}>Date:{item.Date}</Text>
            <Text style={styles.listItemText2}>Satus:{item.Satus}</Text>
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
  }

   



    
    
  
})