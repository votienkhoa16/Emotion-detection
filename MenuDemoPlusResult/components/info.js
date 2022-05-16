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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              quis erat suscipit, mollis nibh ut, venenatis lectus. Orci varius
              natoque penatibus et magnis dis parturient montes, nascetur
              ridiculus mus.
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              quis erat suscipit, mollis nibh ut, venenatis lectus. Orci varius
              natoque penatibus et magnis dis parturient montes, nascetur
              ridiculus mus.
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              quis erat suscipit, mollis nibh ut, venenatis lectus. Orci varius
              natoque penatibus et magnis dis parturient montes, nascetur
              ridiculus mus.
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              quis erat suscipit, mollis nibh ut, venenatis lectus. Orci varius
              natoque penatibus et magnis dis parturient montes, nascetur
              ridiculus mus.
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
