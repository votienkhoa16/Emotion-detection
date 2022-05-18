import React, { useEffect, Component, useRef, useState} from 'react';
import { Text, View, StyleSheet, Dimensions, SafeAreaView, BackHandler} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LineChart} from "react-native-chart-kit";


const { width } = Dimensions.get('screen');
const colors = ['#6190E8', '#A7BFE8', ]


export default function HistoryScreen(props) {

  const [isLoading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const res = useRef([]);
  const [data, setData] = useState([]);

  const [timeArray, setDate] = useState([]);
  const [angry, setAngry] = useState([]);
  const [disgust, setDisgust] = useState([]);
  const [fear, setFear] = useState([]);
  const [happy, setHappy] = useState([]);
  const [sad, setSad] = useState([]);
  const [surprise, setSurprise] = useState([]);
  const [neutral, setNeutral] = useState([]);
  //set time label
  //const [timeArray, setTimeArray] = useState([]);
  //set values from database
  //const [happy, setHappy] = useState([]);

  const getRequest = async() => {
    //get username
    const username = await AsyncStorage.getItem('user');
    
    //get date and result acc from the server
    
    await fetch (global.api + 'get/result2', {
      method: 'POST',
       headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(username)
    })
    .then(resp => resp.json())
    .then(resp => { 
      setData(resp);   
    })
    .catch(e => console.log(e))
  };

  //const timeArray = data[0]
  
  //var happy = [0]

  //custom back button to go back Home screen
  const backActionHandler = async () => {
    props.navigation.navigate('Home');
    //await sound.stopAsync();
    //await sound.unloadAsync();
    return true;
  }
  
  useEffect (() => {
    getRequest();
    //Add event listener for hardware back button press on Android
    BackHandler.addEventListener("hardwareBackPress", backActionHandler);

    return () =>
      //clear/remove event listener
      BackHandler.removeEventListener("hardwareBackPress", backActionHandler);
  }, [])

  useEffect(() => {
    if(data[0] == null){
      setLoading(true);
    }

    else {
      setLoading(false)
    }
  }, [data])

  if(isLoading == true){
    return(
      <SafeAreaView>
        <Text>Loading....</Text>
      </SafeAreaView>
    );
  }
  else {
      //NOTE:
      //'date' = 0, 'angry' = 1, 'disgust' = 2, 'fear' = 3, 'happy' = 4, 'sad' = 5,
        //'surprise' = 6, 'neutral' = 7
    return (
      <SafeAreaView>
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
        <View>
          <Text style={styles.title}>YOUR RESULTS</Text>
        
        <View style={styles.chart}>
          <LineChart
          data={{
            labels: data[0],
            legend:['Happy','Sad','Neutral','Supried','Angry','Fear', 'Disgust'],
            datasets: [
              //Happy : Green #008000
              {
                data: data[4],
                  color: (opacity = 1) => `#008000`,
                strokeWidth: 2,
              },
  
               //Sad
              {
                data: data[5],
                  color: (opacity = 1) => `#D01B1B`,
                strokeWidth: 2,
              },
                 //Neutal
               {
                data: data[7],
                color: (opacity = 1) => `#808080`,
                strokeWidth: 2,
              },
                 //Suprised
               {
                data: data[6],
                 color: (opacity = 1) => `#ffff00`,
                strokeWidth: 2,
              },
                //Scared
               {
                data: data[3],
                  color: (opacity = 1) => `#800080`,
                strokeWidth: 2,
              },
                //Angry
               {
                data: data[1],
                color: (opacity = 1) => `#0000ff`,
                strokeWidth: 2,
              },
              //disgust
               {
                data: data[2],
                  color: (opacity = 1) => `#e69138`,
                  
                strokeWidth: 2,
              },
            ],
          }}
          
          width={Dimensions.get('window').width }
          height={220}
          chartConfig={{
            backgroundColor: '#A7BFE8',
            backgroundGradientFrom: '#A7BFE8',
            backgroundGradientTo: '#ffff',
            useShadowColorFromDataset: true,
            decimalPlaces: 2,
            barPercentage: 0.5,
            color: (opacity = 1) => `rgba(107,144,232, ${opacity})`,
            
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
        </View>
        </View>
      </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  
    container: {
       flex: 1,
       alignItems: 'center',
        
    },

    chart: {
      marginTop: 300,
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
    textAlign: 'center',
    bottom: 50,
    fontSize: 40,
    fontWeight: '400',
    color: '#FFF',
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