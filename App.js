import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, 
         Text, 
         View,
         TextInput,
         Keyboard,
         TouchableOpacity,Alert
         
         } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>

    
    <Text style={styles.logintext}>Login</Text>
    {/*User Start*/}

    <TextInput style={styles.basicTextInput} placeholder={'Email'} textContentType='emailAddress' keyboardType='email-address' autoCapitalize={false} />
  
    {/*User ENds*/}
    
    

    {/*Pass Start*/}
    <TextInput style={styles.basicTextInput} placeholder={'Password'} textContentType='Password' keyboardType='Password' autoCapitalize={false} />
     {/*Pass ENds*/}
      
      {/*Button "Enter*/}
    <TouchableOpacity

      style={styles.roundedButton}
      onPress={ () => {
        Alert.alert('Sign In Ok');
      }}
    >
      <Text style={styles.enterText} >Enter</Text>
    </TouchableOpacity>

     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:'center',
    display:'flex',
    flexDirection:'column'

  },

 
 
  /*Button "Enter*/
  roundedButton:{
    paddingVertical:15,
    paddingHorizontal:130,
    backgroundColor:'#8E05C2',
    borderRadius:1000,
    shadowColor:'#000',
    shadowOffset: {width : 2, height: 2},
    shadowRadius: 3.5,
    shadowOpacity: 0.25,
    elevation:2,

  },

  enterText:{
    color:'#fff',
    fontSize:20,
    fontWeight:'bold'
  },

  logintext:{
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },

  basicTextInput:{
    
    backgroundColor: '#f1f3f6',
    paddingVertical:15,
    paddingHorizontal:13,
    borderRadius:1000,
    textAlign: 'justify',
   
  },

  
  
 
});

