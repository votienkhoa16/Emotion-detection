import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, ScrollView, 
  Modal, TextInput, Image, ActivityIndicator, Pressable, 
  TouchableWithoutFeedback} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackHandler, ToastAndroid } from 'react-native'
import { Card } from 'react-native-paper';
import {LineChart} from "react-native-chart-kit";
import AsyncStorage from '@react-native-async-storage/async-storage';



const { width } = Dimensions.get('screen');
const colors = ['#6190E8', '#A7BFE8', ];


export default function ResultScreen(props) {

  //front-end value
  const [showButton, setShow] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  //emotion accuracy values
  //'angry' = 0, 'disgust' = 1, 'fear' = 2, 'happy' = 3, 'sad' = 4, 'suprise' = 5, 'neutral' = 6
  const [angryAccuracy, setAngry] = useState(0);
  const [disgustAccuracy, setDisgust] = useState(0);
  const [fearAccuracy, setFear] = useState(0);
  const [happyAccuracy, setHappy] = useState(0);
  const [sadAccuracy, setSad] = useState(0);
  const [supriseAccuracy, setSuprise] = useState(0);
  const [neutralAccuracy, setNeutral] = useState(0);
  const [predictedEmotion, setPredictedEmotion] = useState("");

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
    setAngry(emotionValues[0]);
    setDisgust(emotionValues[1]);
    setFear(emotionValues[2]);
    setHappy(emotionValues[3]);
    setSad(emotionValues[4]);
    setSuprise(emotionValues[5]);
    setNeutral(emotionValues[6]);
    setPredictedEmotion(emotionValues[7]);

    console.log(predictedEmotion);
    //show the notification if the predictedEmotion = 'sad'
    //get the advice
    setAdvice(emotionValues[8]);
  }

  //save result to the database
  const saveResult = async() => {
      const username = await AsyncStorage.getItem('user');
      await fetch (global.api + 'upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: username, result: predictedEmotion})
      })
      .then(resp => resp.json())
      .then(data => {
        if (data == 'SUCCESS'){
          ToastAndroid.show('Result successfully saved!', ToastAndroid.LONG);
          setShow(false);
        } else {
          ToastAndroid.show('There was an error when uploading your result. We are sorry for this inconvenience situation.', ToastAndroid.LONG);
        }
      })
      .catch(error => {
        ToastAndroid.show('There was an error when uploading your result. We are sorry for this inconvenience situation.', ToastAndroid.LONG);;
      })
  }

  
  //send email
  const sendEmail = async () => {
    
    //get username 
    const username = await AsyncStorage.getItem('user');

    fetch(global.api + 'email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: username, email: email})
    })
    .then( resp => resp.json() )
    .then( msg => {
      if (msg = 'SUCCESS'){
        ToastAndroid.show('Email is sent! Hope they will recieve the email soon.', ToastAndroid.LONG);
        setModalVisible(false);
      } else {
        ToastAndroid.show(msg, ToastAndroid.LONG);
      }
    } )
    .catch( error => console.log(error) )
  }

  //custom back button to go back Home screen
  const backActionHandler = () => {
    props.navigation.navigate('Home');
    return true;
  }

  useEffect(() => {
    getResult();
    //Add event listener for hardware back button press on Android
    BackHandler.addEventListener("hardwareBackPress", backActionHandler);

    return () =>
      //clear/remove event listener
      BackHandler.removeEventListener("hardwareBackPress", backActionHandler);
  }, []);

  if (isLoading == true){
    return(
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large'></ActivityIndicator>
      </View>
    );
  } else if(error == true){
    return(
      <SafeAreaView>
        <Text>The app couldn't take your face. Please try again!</Text>
      </SafeAreaView>
    );
  } else if (predictedEmotion == 'sad'){
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
          </Card>

         <LineChart
          data={{
          labels: ['Happy', 'Neutral', 'Sad', 'Suprise', 'Scared', 'Angry'],
          datasets: [
            {
              data: [
                happyAccuracy,
                neutralAccuracy,
                sadAccuracy,
                supriseAccuracy,
                fearAccuracy,
                angryAccuracy],
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
              <Text style={styles.reslve2}>You are cunrrently {predictedEmotion}!</Text>
            </Card>
            <Text style={styles.emotionre}>{advice}</Text>
        </View>
        <View>
          {showButton? (
            <TouchableOpacity
              style={styles.resultbutton}
              title="Press me"
              color="#f194ff"
              onPress={() => saveResult()}>
              <Text style={styles.sendtext}>Save Result</Text>
            </TouchableOpacity>
            ) : null}
        </View>
      </View>
        <View style={styles.centerizedView}>
          <View style={styles.paragraph2}>
            <Card style={styles.card1}>
            <Text style={styles.reslve2}>Notification</Text>
            </Card>
            <Text style={styles.emotionre}>Would you like to send Notification to your protector?</Text>
              <View style={styles.section}>
              </View>
          </View>
        </View>

        <TouchableWithoutFeedback style={styles.emailcenteredView} onPress={() => setModalVisible(false)}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.emailcenteredView}>
              <View style={styles.emailmodalView}>
                <Text style={styles.emailmodalText}>Please Input Your Protector's Email</Text>
                <TextInput 
                  style={styles.emailtextinput} 
                  placeholder={'Email'}
                  value={email} 
                  onChangeText={ text => setEmail(text) }
                  >
                  </TextInput>
                <Pressable
                  style={[styles.emailbutton2, styles.emailbuttonClose]}
                  onPress={() => sendEmail()}>
                  <Text style={styles.emailtextStyle}>Send</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </TouchableWithoutFeedback>

          <TouchableOpacity
            style={styles.resultbutton}
            title="Press me"
            color="#f194ff"
            onPress={() => setModalVisible(true)}>
            <Text style={styles.sendtext}>Send email</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  } 
  else {
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
          </Card>

         <LineChart
          data={{
          labels: ['Happy', 'Neutral', 'Sad', 'Suprise', 'Scared', 'Angry'],
          datasets: [
            {
              data: [
                happyAccuracy,
                neutralAccuracy,
                sadAccuracy,
                supriseAccuracy,
                fearAccuracy,
                angryAccuracy],
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
              <Text style={styles.reslve2}>You are cunrrently {predictedEmotion}!</Text>
            </Card>
            <Text style={styles.emotionre}>{advice}</Text>
            
          </View>
        </View>
        <View>
          {showButton? (
            <TouchableOpacity
              style={styles.resultbutton}
              title="Press me"
              color="#f194ff"
              onPress={() => saveResult()}>
              <Text style={styles.sendtext}>Save Result</Text>
            </TouchableOpacity>
            ) : null}
        </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
  
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },

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
    height: 40,
  },

  reslve2: {
    fontSize: 25,
    textAlign:'center',
    top : 0,
  },

  paragraph2: {
    marginTop: 30,
    width: '100%',
    height: 145,
    backgroundColor:'#fff',
  },

  emotionre:{
    textAlign: 'center',
    fontSize: 20,
    marginTop:30
  },

  section: {
    flexDirection: 'row',
    alignItems: 'center',
    margin:30,
    marginHorizontal: 20,
    marginTop: 5,
  },

  paragraph: {
    fontSize: 15,
  },

  checkbox: {
    margin: 8,
  },

  resultbutton:{
    marginTop: 15,
    marginBottom: 0,
    justifyContent: 'center',
    alignSelf: 'center',
    width:'30%',
    height: 40,
    borderRadius:20,
    borderColor:'#A7BFE8',
    borderWidth: 2,
    backgroundColor:'#A7BFE8',
 },

  sendtext: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 18,
    marginBottom: 4,
    color:'white',
    textShadowColor: '#000000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },

  emailcenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

  emailmodalView: {
    width :'90%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  emailbutton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  emailbutton2: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width:'40%',
    top:15,
    margin: 10,
  },

  emailbuttonOpen: {
    backgroundColor: '#F194FF',
  },

  emailbuttonClose: {
    backgroundColor: '#2196F3',
  },

  emailtextStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  emailmodalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize:15,
  },

  emailtextinput:{
    margin: 3,
    backgroundColor: '#e8e8e8',
    width:'90%',
    height:40,
    top : 3,
    borderRadius:10,
  },
});