import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

const { width } = Dimensions.get('screen');
const colors = ['#6190E8', '#A7BFE8'];
const Tab = createMaterialTopTabNavigator();

//Sign In
function Login() {
  return (
    < SafeAreaView style={styles.container}>
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
     
        <View style={styles.centerizedView}>
          <View style={styles.authBox}>
            
            <Text style={styles.loginTitleText}>Login</Text>
            <View style={styles.hr}></View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                autoCapitalize={false}
                keyboardType='email-address'
                textContentType='emailAddress'
              />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.input}
                autoCapitalize={false}
                secureTextEntry={true}
                textContentType='password'
              />
            </View>
            <TouchableOpacity style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ SafeAreaView>
  );
}
//Sign Up
function TabB() {
  return (
    <SafeAreaView style={styles.container}>
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
          <View style={styles.authBox}>
            
            <Text style={styles.loginTitleText}>Register</Text>
            <View style={styles.hr}></View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                autoCapitalize={false}
                keyboardType='email-address'
                textContentType='emailAddress'
              />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.input}
                autoCapitalize={false}
                secureTextEntry={true}
                textContentType='password'
              />
            </View>

            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                autoCapitalize={false}
                secureTextEntry={true}
                textContentType='password'
              />
            </View>
            <TouchableOpacity style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer independent={true}>
    <Tab.Navigator>
      <Tab.Screen options={{ headerShown: false }} name='Login' component={Login} />
      <Tab.Screen options={{ headerShown: false }} name='SignUp' component={TabB} />
    </Tab.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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