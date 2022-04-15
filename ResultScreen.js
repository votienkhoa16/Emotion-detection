import React, { useState, useEffect, useRef } from 'react';
import Checkbox from 'expo-checkbox';
import { StyleSheet, 
         Text, 
         View,
         Keyboard,
         TouchableOpacity,
         Alert,
         SafeAreaView,
         ScrollView,
         Linking,
         Modal,
         Button
         } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default function ResultScreen(props) {

  //front-end values
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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

  //set advices
  const [advice, setAdvice] = useState();
  //set protector email
  const [email, setEmail] = useState("");

  const api = global.api + 'get'

  const [result, setResult] = useState([]);

  const getResult = async () => {
      //get data from api
      await fetch(api, {
        method: 'GET'
      })
      //get the data from api link
      .then (resp => resp.json())
      .then(data => {
        console.log(data);
        setResult(data);
        getAccuracyValueFromString(data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setError(true);
        setLoading(false);
      })
  }

  function getAccuracyValueFromString(dataJson) {
    //split the string
    const emotionValues = dataJson.split('/');
    
    //get each value to each emotion accuracy
    //'angry' = 0, 'disgust' = 1, 'fear' = 2, 'happy' = 3, 'sad' = 4, 'surprise' = 5, 'neutral' = 6, 'predicted emotion' = 7, 'advice' = 8
    setAngryAccuracy(emotionValues[0]);
    setDisgustAccuracy(emotionValues[1]);
    setFearAccuracy(emotionValues[2]);
    setHappyAccuracy(emotionValues[3]);
    setSadAccuracy(emotionValues[4]);
    setSupriseAccuracy(emotionValues[5]);
    setNeutralAccuracy(emotionValues[6]);
    setPredictedEmotion(emotionValues[7]);

    //get the advice
    setAdvice(emotionValues[8]);
  }

  //send email
  const sendEmail = () => {

    //get the body email
    let bodyEmail = "User are " + predictedEmotion;
    console.log(bodyEmail)
    fetch(global.api + 'email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: email, body: bodyEmail})
    })
    .then(resp => {
      console.log("sent!");
    })
    .then(data => console.log(data))
    .catch(error => console.log(error))
  }

  useEffect(() => {
    getResult();
  }, []);

  if (isLoading == true){
    return(
      <View>
        <Text>Loading....</Text>
      </View>
    );
  } else if(error == true){
    return(
      <View>
        <Text>The app couldn't take your face. Please try again!</Text>
      </View>
    );
  } 
  
  else{
    return (
      <ScrollView style={styles.container}>
  
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <Text>Please input your protector's email</Text>
          <TextInput
          label = "Protector's email"
          value = {email}
          mode = "outlined"
          onChangeText = {text => setEmail(text)}>
          </TextInput>

          <Button
          style = {{magin:10}}
          mode = "contained"
          title = "Send"
          onPress={() => sendEmail()}>
          </Button>
        </Modal>
  
      <Text style={styles.logintext}>Result</Text>
      <Text style={styles.stat}>status</Text>
      <Text style={styles.predict} >You are {predictedEmotion}! </Text>
      <Text style={styles.text00}>Happy:  {happyAccuracy}% </Text>
      <Text style={styles.text00}>Neutrual:  {neutralAccuracy}% </Text>
      <Text style={styles.text00}>Angry:  {angryAccuracy}% </Text>
      <Text style={styles.text00}>Fear:  {fearAccuracy}% </Text>
      <Text style={styles.text00}>Suprised:  {supriseAccuracy}% </Text>
      <Text style={styles.text00}>Sad:  {sadAccuracy}% </Text>
      
      <View style={styles.container2}>
  
      <View style={styles.RectangleShapeView}>
      <Text style={styles.message}>{advice}</Text>
      </View>
  
      <View style={styles.ButtonContainer}>
      <View style={styles.buttonRow}>
      <TouchableOpacity><Text style={styles.textbuton}>No</Text></TouchableOpacity>
      </View>
      <View style={styles.buttonRow}>   
      <TouchableOpacity onPress={() => setModalVisible(true)}>
      <Text style={styles.textbuton}>Yes</Text>
      
      </TouchableOpacity>
      </View>
      </View>
        
      <View style={styles.RectangleShapeView}>
      <Text style={styles.message}>Would you like to send the Result to Your Parents or Your Guardian ?</Text>
      </View>
  
      <View style={styles.ButtonContainer}>
      <View style={styles.buttonRow}>
      <TouchableOpacity><Text style={styles.textbuton}>No</Text></TouchableOpacity>
      </View>
      <View style={styles.buttonRow}>   
      <TouchableOpacity><Text style={styles.textbuton}>Yes</Text></TouchableOpacity>
      </View>
      </View>
      </View>
      </ScrollView>
    );
  }
   
}
const styles = StyleSheet.create({
  resultContainer: {
    flex: 1,
    
    backgroundColor: '#8E05C2',
    
   
  },

  container2: {
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: '#8E05C2',
  },
  
  ButtonContainer:
  {   flex:1,
     flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      
  },

  predict:
  {
    color:'#fff',
    textAlign:'center',
    marginTop: 5,
    fontSize: 31.5,
  },
  
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
    marginTop: 1,
    color:'#fff',
    textAlign:'center',
  },

  text00:{
    color:'#fff',
    marginTop:5,
    margin:3,
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
    backgroundColor:'#fff',
    height:30,
    width:70,
    fontSize:20,
    borderRadius:16,

  },
  
  textbuton:{
    textAlign:"center",
    margin:6,
  },

  modalView: {
    marginTop:85,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 50,
    alignItems: 'center',
    shadowColor: '#0000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalQuestion:{
    fontSize:15,
    fontWeight: 'bold',
  },

  section: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop:20,
    margin:10,
  },
});