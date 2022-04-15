import * as React from 'react';
import { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
  Alert,
  FlatList,
  Button,
} from 'react-native';
import Constants from 'expo-constants';
import {
  AntDesign,
  Feather,
  SimpleLineIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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

import Swiper from 'react-native-swiper';
import HisList from './Hislist';

const { width } = Dimensions.get('screen');
const colors = ['#6190E8', '#A7BFE8'];
const Stack = createNativeStackNavigator();

//MEnu Screen
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
            onPress={() => navigation.navigate('Hislist')}>
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
            <SimpleLineIcons name="camerao" size={30} color="black" />
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
            onPress={() => Alert.alert('Button Pressed!')}>
            <MaterialCommunityIcons name="book" size={30} color="black" />
            <Text>History</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
//MEnu Screen End

//Chart Result
function Details({ navigation }) {
  return (
    <View style={styles.container2}>
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

      <LineChart
        data={{
          labels: ['Happy', 'Neutral', 'Sad', 'Suprise', 'Scared', 'Angry'],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
              strokeWidth: 2,
            },
          ],
        }}
        width={Dimensions.get('window').width - 16}
        height={200}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#ffff',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(107,144,232, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    <Swiper>
      <LinearGradient
        colors={['#6190E8', '#A7BFE8']}
        start={{
          x: 0,
          y: 0,
        }}
        end={{
          x: 1,
          y: 1,
        }}
        style={styles.box}>
        <Text style={styles.title2}>Result</Text>
        <View style={styles.dtview}>
        
          <Text style={styles.resultdt}>Happy</Text>
          <Text style={styles.resultdt}>Sad</Text>
        </View>
        <View style={styles.dtview}>
          <Text style={styles.resultdt}>Neutrual</Text>
          <Text style={styles.resultdt}>Suprised</Text>
        </View>
        <View style={styles.dtview}>
          <Text style={styles.resultdt}>Scared</Text>
          <Text style={styles.resultdt}>Angry</Text>
        </View>
      </LinearGradient>

           <LinearGradient
        colors={['#6190E8', '#A7BFE8']}
        start={{
          x: 0,
          y: 0,
        }}
        end={{
          x: 1,
          y: 1,
        }}
        style={styles.box}>
        <Text style={styles.title2}>Result</Text>
        <View style={styles.dtview}>
        
          <Text style={styles.resultdt}>Happy</Text>
          <Text style={styles.resultdt}>Sad</Text>
        </View>
        <View style={styles.dtview}>
          <Text style={styles.resultdt}>Neutrual</Text>
          <Text style={styles.resultdt}>Suprised</Text>
        </View>
        <View style={styles.dtview}>
          <Text style={styles.resultdt}>Scared</Text>
          <Text style={styles.resultdt}>Angry</Text>
        </View>
      </LinearGradient>

       </Swiper>
    </View>
   
  );
}
//Chart Result End

//History
function History({ navigation }) {
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
    </View>
  );
}

//History End

//NavScreen
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Details"
          component={Details}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="History"
          component={HisList}
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

  //Result

  container2: {
    paddingTop: 100,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  box: {
    width: '100%',
    height: 400,
    borderRadius: 16,
  },

  title2: {
    marginTop: 0,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '400',
    fontStyle: 'Oswald',
    color: '#FFF',
  },

  dtview: {
    flexDirection: 'row',
  },

  resultdt: {
    fontStyle: 'Oswald',
    color: '#FFF',
    fontSize: 25,
    margin: 30,
  },
});
