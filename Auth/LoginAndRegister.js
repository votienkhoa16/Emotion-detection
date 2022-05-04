import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView,
        Dimensions, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackHandler, ToastAndroid } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


const { width } = Dimensions.get('screen');
const colors = ['#6190E8', '#A7BFE8'];
const Tab = createMaterialTopTabNavigator();

function LoginScreen(props) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  
  
  //login function
  const login = async () => {
    //check if the user fill the form or not
    if (username === "" || password === ""){
      ToastAndroid.show('Please enter your username or password.', ToastAndroid.LONG);
    } else {
      //send the username and password to the server
      await fetch(global.api + 'login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            username: username,
            password: password,
        })
    })
    //get the msg on the server, if SUCCESS, save username in storage to keep the user log in
    //if not 'SUCCESS', show the msg from the server
    .then(resp => resp.json())
    .then(data => {
      if (data == 'SUCCESS'){
        AsyncStorage.setItem('user', username);
        props.navigation.navigate('Home');
        ToastAndroid.show('You have logged in successfully!', ToastAndroid.SHORT);
        ToastAndroid.show('Welcome, ' + username + '!', ToastAndroid.LONG);
      }
      else {
        ToastAndroid.show(data, ToastAndroid.LONG);
      }
    })
    .catch(error => console.log(error))
    }
  }

  return (
    <SafeAreaView style={styles.container } edges={['top', 'left', 'right']}>
           {colors.map((x, i) => (
        <View
          style={[
            styles.bgCircle1,
            {
              backgroundColor: x,
              transform: [
                { translateX: -(width / 6) + (i * width) / colors.length },
                {
                  translateY:
                    -(width *1) - ((i / 1.25) * width) / colors.length,
                },
              ],
            },
          ]}
          key={i.toString()}
        />
      ))}
     
        <KeyboardAvoidingView style={styles.centerizedView}>
          <View style={styles.authBox}>
            
            <Text style={styles.loginTitleText}>Login</Text>
            <View style={styles.hr}></View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>User Name</Text>
              <TextInput
                value={username}
                onChangeText={text => setUserName(text)}
                style={styles.input}
                autoCapitalize = 'none'
                textContentType='username'
              />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.input}
                secureTextEntry={true}
                autoCapitalize = 'none'
                textContentType='password'
              />
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={() => login()}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
  );
}

//Sign Up Screen
function SignUpScreen(props) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const [email, setEmail] = useState();
  
  const register = async () => {
    //check if password = confirm password
    if(password != password2){
      ToastAndroid.show("The passwords do not match, Please enter again!", ToastAndroid.LONG);
    } else{
      await fetch(global.api + 'login/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            username: username,
            password: password,
            email: email,
        })
      })
      //get the msg on the server, if SUCCESS, save username in storage to keep the user log in
      //if not 'SUCCESS', show the msg from the server
      .then(resp => resp.json())
      .then(data => {
        if (data == 'SUCCESS'){
          AsyncStorage.setItem('user', username);
          props.navigation.navigate('Home');
          ToastAndroid.show('You have successfully registered!', ToastAndroid.SHORT);
          ToastAndroid.show('Welcome, ' + username + '!', ToastAndroid.LONG);
        } else {
          ToastAndroid.show(data, ToastAndroid.LONG);
        }
      })
    }
  }


  return (
    <View style={styles.container} >
           {colors.map((x, i) => (
        <View
          style={[
            styles.bgCircle1,
            {
              backgroundColor: x,
              transform: [
                { translateX: -(width / 6) + (i * width) / colors.length },
                {
                  translateY:
                    -(width * 0.6) - ((i / 1.25) * width) / colors.length,
                },
              ],
            },
          ]}
          key={i.toString()}
        />
      ))}
     
        <View style={styles.centerizedView}>
          <KeyboardAvoidingView behavior='padding' style={styles.authBox}>
            
            <Text style={styles.loginTitleText}>Register</Text>
            <View style={styles.hr}></View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>User Name</Text>
              <TextInput
                value={username}
                onChangeText={text => setUserName(text)}
                style={styles.input}
                autoCapitalize = 'none'
                textContentType='username'
              />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.input}
                secureTextEntry={true}
                autoCapitalize = 'none'
                textContentType='password'
              />
            </View>

            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <TextInput
                value={password2}
                onChangeText={text => setPassword2(text)}
                style={styles.input}
                secureTextEntry={true}
                autoCapitalize = 'none'
                textContentType='password'
              />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.input}
                autoCapitalize = 'none'
                keyboardType='email-address'
                textContentType='emailAddress'
              />
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={() => register()}>
              <Text style={styles.loginButtonText}>Register</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </View>
  );
}

export default function AuthApp() {

  //custom hardware back button
  //custom the back button will revenge user go back to the logo screen
  //and get stuck in there
  const backActionHandler = () => {
    Alert.alert("Alert!", "Are you sure you want to exit the app?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp()
      () }
    ]);
    return true;
  }
  
  useEffect(()=> {
    //Add event listener for hardware back button press on Android
    BackHandler.addEventListener("hardwareBackPress", backActionHandler);

    return () =>
      //clear/remove event listener
      BackHandler.removeEventListener("hardwareBackPress", backActionHandler);
  }, [])
  
  return (
    <SafeAreaProvider>

        <Tab.Navigator>
          <Tab.Screen name='Login' component={LoginScreen} />
          <Tab.Screen name='Register' component={SignUpScreen} />
        </Tab.Navigator>

    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 100,
    alignItems: 'center',
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

  centerizedView: {
    width: '100%',
    top: 150,
  },

  authBox: {
    width: '100%',
    height:'95%',
    backgroundColor: '#fafafa',
    borderRadius: 20,
    alignSelf: 'center',
    paddingHorizontal: 15,
    paddingBottom: 90,
    elevation: 5,
  },

  loginTitleText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign:'center',
  },

  hr: {
    width: '100%',
    height: 0.5,
    backgroundColor: '#6190E8',
    marginTop: 6,
  },

  inputBox: {
    marginTop: 20,
  },
  
  inputLabel: {
    fontSize: 18,
    marginBottom: 6,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#dfe4ea',
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: '#A7BFE8',
    marginTop: 30,
    paddingVertical: 10,
    borderRadius: 4,
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  
});
