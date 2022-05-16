import * as React from 'react';
import {useState} from 'react';
import { Text, View, StyleSheet, Dimensions,TouchableOpacity,SafeAreaView,Pressable,Alert,FlatList,Image,ScrollView} from 'react-native';
import Constants from 'expo-constants';
import { AntDesign,Feather,SimpleLineIcons,MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  useCollapsible,
  AnimatedSection,
} from 'reanimated-collapsible-helpers';
const { width } = Dimensions.get('screen');
const colors = ['#6190E8', '#A7BFE8', ]
const Separator = () => <View style={styles.separator} />;


//MenuScreen//Screen1
export default function InfoDetailList() {
  const { animatedHeight, height, onPress, onLayout, state } = useCollapsible();
    return (
        <ScrollView style={styles.container}>
            {colors.map((x, i) => (
                <View style={[styles.bgCircle1, {
                    backgroundColor: x,
                    transform: [
                        { translateX: -(width/6) + (i * width / colors.length) },
                        { translateY: -(width * 0.6) - (i / 1.25 * width / colors.length) }
                    ]
                }]} key={i.toString()} />
            ))}



         <Text style={styles.text}></Text> 
         <Text style={styles.title}>Emotion Detection</Text> 
      
         <View style={styles.overflow}>
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Text style={styles.buttonText}>
            {state === 'expanded' ? 'Introduction' : 'Introduction'}
          </Text>
        </TouchableOpacity>
        <AnimatedSection
          animatedHeight={animatedHeight}
          onLayout={onLayout}
          state={state}
        >
          <View style={styles.textContainer}>
            <Text>
              Welcome User to The Emotion Detection where you can be detect your emotion result with your phone as it's Fast and Simple to use.
              In order to use the App , You must have an account to use . If you don't have an Account , Please Sign Up for an account in order to use it
            </Text>
          </View>
        </AnimatedSection>
      </View>

  <Separator/>

         <View style={styles.overflow}>
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Text style={styles.buttonText}>
            {state === 'expanded' ? 'How to Use' : 'How to Use'}
          </Text>
        </TouchableOpacity>
        <AnimatedSection
          animatedHeight={animatedHeight}
          onLayout={onLayout}
          state={state}
        >
          <View style={styles.textContainer}>
            <Text>
             To dectect your current emotion that you are having right now ,you must click on the camera icon to take a picture of a person face or a selfie.
             Then after taking the photo, it will scan the result the result and will display the result with the demonstariton chart.
             In case of a person is currently Sad ,there will be a section that you can send to your guardian to know your mood by type the input of their email
            </Text>
          </View>
        </AnimatedSection>
      </View>

    <Separator/>
  
         <View style={styles.overflow}>
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Text style={styles.buttonText}>
            {state === 'expanded' ? 'Result' : 'Result'}
          </Text>
        </TouchableOpacity>
        <AnimatedSection
          animatedHeight={animatedHeight}
          onLayout={onLayout}
          state={state}
        >
          <View style={styles.textContainer}>
            <Text>
              The Result will display the both on chart and the status of the emotion that you are on.
              If the current status that you are Sad, there will be a section that you can send to your guardian to know your mood by type the input of their email
            </Text>
          </View>
        </AnimatedSection>
      </View>

    
    <Separator/>
  
         <View style={styles.overflow}>
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Text style={styles.buttonText}>
            {state === 'expanded' ? 'History' : 'History'}
          </Text>
        </TouchableOpacity>
        <AnimatedSection
          animatedHeight={animatedHeight}
          onLayout={onLayout}
          state={state}
        >
          <View style={styles.textContainer}>
            <Text>
              The history will display of user that using the app which are the last status, date of using the name of the user . With the addition of Multiple Chart 
            </Text>
          </View>
        </AnimatedSection>
      </View>

        <Separator/>
  
         <View style={styles.overflow}>
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Text style={styles.buttonText}>
            {state === 'expanded' ? 'Credit' : 'Credit'}
          </Text>
        </TouchableOpacity>
        <AnimatedSection
          animatedHeight={animatedHeight}
          onLayout={onLayout}
          state={state}
        >
          <View style={styles.textContainer}>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              quis erat suscipit, mollis nibh ut, venenatis lectus. Orci varius
              natoque penatibus et magnis dis parturient montes, nascetur
              ridiculus mus.
            </Text>
          </View>
        </AnimatedSection>
      </View>
        

        </ScrollView>
    )
}






const styles = StyleSheet.create({
    container: {
        flex: 1,
       
       
    },
    bgCircle1: {
        position: 'absolute',
        height: width * 2,
        width: width * 4,
        borderRadius: width,
        left: 0,
        top: 0,
     
    },
    

 
  text: {
    marginBottom:190,
  },


  title: {
    bottom: 80,
    fontSize: 40,
    fontWeight: '400',
    fontStyle: 'Oswald',
    color: '#FFF',
    textAlign:'center'
  },

  // instro1: {
  //   textAlign: 'center',
  //   marginVertical: 8,
  //   fontSize:20,
  // },

   separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    opacity:'100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

   overflow: {
    overflow: 'hidden',
    backgroundColor: 'white',
    borderRadius: 6,
  },
  button: {
    padding: 10,
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 20,
  },
  textContainer: {
    padding: 15,
  },
   



    
    
  
})
