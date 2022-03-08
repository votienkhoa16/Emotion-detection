import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, 
         Text,
         TextInput,
         View,
         Keyboard,
         TouchableOpacity,
         Alert,
         SafeAreaView,
         ScrollView,
         Linking,
         securedTextEntry,
         passwordSecured
         } from 'react-native';

function loginScreen(props){
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const[isLoading, setLoading] = useState(true);

  //login function
  login = async() =>{
    fetch ('http://localhost/login',{
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username:userName, password: password})
        })
        .then((resp) => resp.json())
        .then((json) => setMsg(json))
        .then(msg => {
          if(msg == 'Loggedin'){
            props.navigation.navigate('Home');
          }
          else{
            Alert.alert(msg);
          }
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false))
  }

    return(
    <View style={styles.container}>
    <Text style={styles.logintext}>Emotion Detection</Text> 
        <View style={styles.container2}>
            <View style={styles.container3}>
                <Text style={styles.stat}>Sign Up</Text>
                <TextInput  style={styles.EmailInput} placeholder={'username'} textContentType='username'
                    keyboardType='username' autoCapitalize={false}/>
                <TextInput  style={styles.EmailInput} placeholder={'password'} textContentType='password'
                    securedTextEntry={passwordSecured} />
                <TouchableOpacity style={styles.Button}><Text>Sign Up</Text></TouchableOpacity>
            </View>
        </View>
   </View>
   );
}
const styles = StyleSheet.create({
    container: {
    flex: 1,
    paddingTop:22,
    backgroundColor: '#8E05C2',
     
    },
    container2: {
    marginTop: 20,
  
   
    },
  
    container3: {
    margin:40,
    alignItems:'center',
    },
  
      logintext:{
      fontSize: 29,
      fontWeight: 'bold',
      marginTop: 30,
      backgroundColor: '#8E05C2',
      color:'#fff',
      textAlign:'center',
      
    },
  
    stat:{
      fontSize: 30,
      fontWeight: 'bold',
      marginTop: 10,
      color:'#fff',
      textAlign:'center',
      
    },
  
    EmailInput:
    { marginTop:40,
      width: '100%',
      height: 48,
      backgroundColor:'#fff',
      borderRadius: 6,
      
  
    },
   
    Button:
  
    {
      margin: 40,
      backgroundColor:'#fff',
      height:40,
      width:70,
      textAlign:'center',
      borderRadius:6,
    }
  });

  export default loginScreen;