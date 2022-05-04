import * as React from 'react';
import {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView, Pressable, Alert, FlatList, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackHandler, ToastAndroid } from 'react-native'


const { width } = Dimensions.get('screen');
const colors = ['#6190E8', '#A7BFE8', ]


//Hisotry Screen
export default function HistoryScreen(props) {
    const [data, getData] = useState();
    
    const getResultList = async() => {
        //get username
        const username = await AsyncStorage.getItem('user');
    
        await fetch (global.api + 'get/result', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(username)
        })
        .then( resp => resp.json() )
        .then( result => {
            getData(result);
        } )
        .catch( error => console.log(error) )
    }

    //custom back button to go back Home screen
  const backActionHandler = () => {
    props.navigation.navigate('Home');
    return true;
  }

    useEffect(() => {
        getResultList();

        //Add event listener for hardware back button press on Android
        BackHandler.addEventListener("hardwareBackPress", backActionHandler);

        return () =>
      //clear/remove event listener
            BackHandler.removeEventListener("hardwareBackPress", backActionHandler);
    }, [])

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
            <Text style={styles.title}>YOUR RESULT</Text> 
            <FlatList
                vertical
                style={styles.move}
                showsVerticalScrollIndicator={false}
                data={data}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
            <View style={styles.listItem}>
                <Text style={styles.listItemText}>Date: {item.RESULT_DATE}</Text>
                <Text style={styles.listItemText3}>Result</Text>
                <Text style={styles.listItemText2}>{item.RESULT}</Text>
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
    marginBottom:120,
  },

  title: {
    bottom: 50,
    fontSize: 40,
    fontWeight: '400',
    color: '#FFF',
  },

  listItem: {
    marginTop: 10,
    padding: 10,
    backgroundColor:'#fff',
    width: 400,
    borderRadius:16,
  },
  
  listItemText: {
    fontSize: 16,   
  },

  listItemText2: {
    fontSize: 30,
    textAlign : "center",
    bottom: 24,
  },

  listItemText3: {
    fontSize: 20,
    textAlign : "left",
    top: 12,
  },

  move:{
    margin: 4,
  }
})