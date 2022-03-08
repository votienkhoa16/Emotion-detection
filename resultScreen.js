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


export default function resultScreen(props) {
  const[isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  //emotion accuracy values
  //'angry' = 0, 'disgust' = 1, 'fear' = 2, 'happy' = 3, 'sad' = 4, 'suprise' = 5, 'neutral' = 6
  const [angryAccuracy, setAngryAccuracy] = useState();
  const [disgustAccuracy, setDisgustAccuracy] = useState();
  const [fearAccuracy, setFearAccuracy] = useState(); 
  const [happyAccuracy, setHappyAccuracy] = useState();
  const [sadAccuracy, setSadAccuracy] = useState();
  const [supriseAccuracy, setSupriseAccuracy] =  useState();
  const [neutralAccuracy, setNeutralAccuracy] = useState();
  const [predictedEmotion, setPredictedEmotion] = useState();

 

  const api = 'http://10.123.1.234:3000/get'

  useEffect(() => {
    fetch(api)
    //get the data from api link
    .then ((resp) => resp.json())
    //set resp to to data
    .then ((json) => setData(json))
    //catch the error
    .catch ((error) => console.error(error))
    //set loading when getting the data
    .finally(() => setLoading(false))
    
    getAccuracyValueFromString(data);
  })

  function getAccuracyValueFromString(dataJson) {
    let stringValues = JSON.stringify(dataJson);
    console.log(stringValues);
    
    //split the string
    const emotionValues = stringValues.split("/");
    
    //get each value to each emotion accuracy
    //'angry' = 0, 'disgust' = 1, 'fear' = 2, 'happy' = 3, 'sad' = 4, 'surprise' = 5, 'neutral' = 6, 'predicted emotion' = 7
    setAngryAccuracy(emotionValues[0]);
    setDisgustAccuracy(emotionValues[1]);
    setFearAccuracy(emotionValues[2]);
    setHappyAccuracy(emotionValues[3]);
    setSadAccuracy(emotionValues[4]);
    setSupriseAccuracy(emotionValues[5]);
    setNeutralAccuracy(emotionValues[6]);
    setPredictedEmotion(emotionValues[7]);
  }
   
   return (
    <SafeAreaView style={styles.container}>
    <Text style={styles.logintext}>Result</Text>
    <Text style={styles.stat}>status</Text>
    <Text>You are {predictedEmotion}! </Text>
    <Text style={styles.text00}>Happy:  {happyAccuracy}% </Text>
    <Text style={styles.text00}>Neutrual:  {neutralAccuracy}% </Text>
    <Text style={styles.text00}>Angry:  {angryAccuracy}% </Text>
    <Text style={styles.text00}>Fear:  {fearAccuracy}% </Text>
    <Text style={styles.text00}>Suprised:  {supriseAccuracy}% </Text>
    <Text style={styles.text00}>Sad:  {sadAccuracy}% </Text>
    
    <View style={styles.container2}>

    <View style={styles.RectangleShapeView}>
    <Text style={styles.message}>Hello,You are Sad. Would You like to Listen To Lo-fi music ? </Text>
    </View>

    <View style={styles.ButtonContainer}>
    <View style={styles.buttonRow}>
    <TouchableOpacity><Text>Yes</Text></TouchableOpacity>
    </View>
    <View style={styles.buttonRow}>
    <TouchableOpacity><Text>No</Text></TouchableOpacity>
    </View>
    </View>

     <View style={styles.RectangleShapeView}>
    <Text style={styles.message}>Hello,You are Sad. Would You like to Listen To Lo-fi music ? </Text>
    </View>

    <View style={styles.ButtonContainer}>
    <View style={styles.buttonRow}>
    <TouchableOpacity><Text>Yes</Text></TouchableOpacity>
    </View>
    <View style={styles.buttonRow}>
    <TouchableOpacity><Text>No</Text></TouchableOpacity>
    </View>
    </View>

    

    </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8E05C2',
   
  },

  container2: {
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: '#8E05C2',
  },
  ButtonContainer:
  {
     flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      
  }

  ,
  logintext:{
    fontSize: 29,
    fontWeight: 'bold',
    marginTop: 29,
    backgroundColor: '#8E05C2',
    color:'#fff',
    textAlign:'center',
  },

  stat:{
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 2,
    color:'#fff',
    textAlign:'center',
  },

  text00:{
    color:'#fff',
    margin:2,
    marginLeft:40,
    textAlign:'left',
    fontSize: 15,
  },

  RectangleShapeView:{
  marginTop: 20,
  width: 250,
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
    marginTop: 30,
    margin:40,
    backgroundColor:'white',
    height:20,
    width:60,
    textAlign:'center',
    fontSize:20,
    borderRadius:4,
  },
});