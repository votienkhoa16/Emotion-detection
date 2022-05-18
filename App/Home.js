import  React, {useEffect} from 'react';
import {Text,
  View,
  Dimensions,
  StyleSheet,
  Pressable,
  Alert,
  ToastAndroid
} from 'react-native';
import {
  AntDesign,
  Feather,
  SimpleLineIcons,
  Entypo,
} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackHandler } from 'react-native';


const { width } = Dimensions.get('screen');
const colors = ['#6190E8', '#A7BFE8'];

//home screen
export default function HomeScreen(props) {
  //log out function
  const logout = async () => {
    await AsyncStorage.clear();
    props.navigation.navigate('Auth');
    ToastAndroid.show('Logged out!', ToastAndroid.LONG);
  }

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

  useEffect( async () => {
    console.log(await AsyncStorage.getItem('user'));
    //Add event listener for hardware back button press on Android
    BackHandler.addEventListener("hardwareBackPress", backActionHandler);

    return () =>
      //clear/remove event listener
      BackHandler.removeEventListener("hardwareBackPress", backActionHandler);
  }, [])
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
            onPress={() => props.navigation.navigate('Camera')}>
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
            onPress={() => props.navigation.navigate('ResultsList')}>
            <Feather name="book" size={30} color="black" />
            <Text> Results</Text>
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
            onPress={() => props.navigation.navigate('History')}>
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
           onPress={() => logout()}>
            <Entypo name="log-out" size={30} color="black" />
            <Text>Log Out</Text>
          </Pressable>
        </View>
      </View>
    </View>
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
    //fontStyle: 'Oswald',
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