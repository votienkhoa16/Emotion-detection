import * as React from 'react';
import { useState } from 'react';
import {Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
  Alert,
  FlatList,
  Button,
  ScrollView,
} from 'react-native';
import Constants from 'expo-constants';
import {
  AntDesign,
  Feather,
  SimpleLineIcons,
  MaterialCommunityIcons,
  Entypo,
} from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';



import HisList from './components/Hislist';
import Result from './components/Detail';
import RegandSign from './components/loginandsignin';
import Info from './components/info'; //Details


const { width } = Dimensions.get('screen');
const colors = ['#6190E8', '#A7BFE8'];
const Stack = createNativeStackNavigator();

//MEnu Screen // Home
function Home({ navigation }) {
  return (
    <View style={styles.container}>
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

      <Text style={styles.title}>Emotion Detector</Text>

      <View style={styles.buttonSelection}>
        <View style={styles.buttonstyle2}>
          <Pressable
            style={({ pressed }) => [
              {
                alignItems: 'center',
                backgroundColor: '#FFFF',
                padding: 25,
                paddingHorizontal: 30,
                borderRadius: 20,
                borderWidth: 2,
                borderColor: '#A7BFE8',
                backgroundColor: pressed ? '#6190E8' : '#fff',
              },
            ]}
            onPress={() => navigation.navigate('Details')}>
            <AntDesign name="camerao" size={30} color="black" />
            <Text>Camera</Text>
          </Pressable>
        </View>

        <View style={styles.buttonstyle2}>
          <Pressable
            style={({ pressed }) => [
              {
                alignItems: 'center',
                backgroundColor: '#FFFF',
                padding: 25,
                paddingHorizontal: 30,
                borderRadius: 20,
                borderWidth: 2,
                borderColor: '#A7BFE8',
                backgroundColor: pressed ? '#6190E8' : '#fff',
              },
            ]}
            onPress={() => navigation.navigate('History')}>
            <Feather name="book" size={30} color="black" />
            <Text>History</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.buttonSelection}>
        <View style={styles.buttonstyle2}>
          <Pressable
            style={({ pressed }) => [
              {
                alignItems: 'center',
                backgroundColor: '#FFFF',
                padding: 25,
                paddingHorizontal: 30,
                borderRadius: 20,
                borderWidth: 2,
                borderColor: '#A7BFE8',
                backgroundColor: pressed ? '#6190E8' : '#fff',
              },
            ]}
            onPress={() => Alert.alert('Button Pressed!')}>
            <SimpleLineIcons name="detail" size={30} color="black" />
            <Text>Details</Text>
          </Pressable>
        </View>

        <View style={styles.buttonstyle2}>
          <Pressable
            style={({ pressed }) => [
              {
                alignItems: 'center',
                backgroundColor: '#FFFF',
                padding: 25,
                paddingHorizontal: 30,
                borderRadius: 20,
                borderWidth: 2,
                borderColor: '#A7BFE8',
                backgroundColor: pressed ? '#6190E8' : '#fff',
              },
            ]}
           onPress={() => navigation.navigate('logout')}>
            <Entypo name="log-out" size={30} color="black" />
            <Text>LogOut</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
//MEnu Screen End



//NavScreen
export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        />

          <Stack.Screen
          options={{ headerShown: false }}
          name="Details"
          component={Result}
        />
        
      
        <Stack.Screen
          options={{ headerShown: false }}
          name="History"
          component={HisList}
        />

          <Stack.Screen
          options={{ headerShown: false }}
          name="logout"
          component={RegandSign}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  //HOME
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgCircle1: {
    position: 'absolute',
    height: width * 2,
    width: width * 4,
    borderRadius: width,
    left: 0,
    top: 0,
  },

  title: {
    height: 200,
    fontSize: 40,
    fontWeight: '400',
    fontStyle: 'Oswald',
    color: '#FFF',
  },

  buttonSelection: {
    flexDirection: 'row',
  },

  buttonstyle2: {
    margin: 3,
    top: 50,
  },

  
 

  
});
