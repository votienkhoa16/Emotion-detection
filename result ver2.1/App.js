import { StatusBar } from 'expo-status-bar';
import Checkbox from 'expo-checkbox';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, 
         Text, 
         View,
         Keyboard,
         TouchableOpacity,
         Alert,
         SafeAreaView,
         ScrollView,
         Linking,
         Modal,
         } from 'react-native';




export default function App() {
  const [modalVisible, setModalVisible,] = useState(false);
  const [isChecked, setChecked]= useState(false);
  return (

    <ScrollView style={styles.container}>
      
         /*Question*/
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalQuestion}>Do You have no Interest or Pleasure ?</Text>
              <View style={styles.section}>
                <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
                <Text style={styles.paragraph}>Yes</Text>

                <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
                <Text style={styles.paragraph}>No</Text>
              </View>

              <Text style={styles.modalQuestion}>How long is your sadness lasted ?</Text>
              <View style={styles.section}>
                <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
                <Text style={styles.paragraph}>Yes</Text>

                <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
                <Text style={styles.paragraph}>No</Text>
              </View>

              
              <Text style={styles.modalQuestion}>Have you recently losing energy ?</Text>
              <View style={styles.section}>
                <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
                <Text style={styles.paragraph}>Yes</Text>

                <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
                <Text style={styles.paragraph}>No</Text>
              </View>

              
              <Text style={styles.modalQuestion}>Are you having sleep difficulty ?</Text>
              <View style={styles.section}>
                <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
                <Text style={styles.paragraph}>Yes</Text>

                <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
                <Text style={styles.paragraph}>No</Text>
              </View>

              
              <Text style={styles.modalQuestion}>Do you have difficult concentration?</Text>
              <View style={styles.section}>
                <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
                <Text style={styles.paragraph}>Yes</Text>

                <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
                <Text style={styles.paragraph}>No</Text>
              </View>

              
              <Text style={styles.modalQuestion}>Do you recently blame yourself ?</Text>
              <View style={styles.section}>
                <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
                <Text style={styles.paragraph}>Yes</Text>

                <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
                <Text style={styles.paragraph}>No</Text>
              </View>

              
              <Text style={styles.modalQuestion}>Does Your Sadness Affect your Daily Life?</Text>
              <View style={styles.section}>
                <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
                <Text style={styles.paragraph}>Yes</Text>
                <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
                <Text style={styles.paragraph}>No</Text>
              </View>


           

          </View>
        </View>
      </Modal>

      /*Main Result*/
    <Text style={styles.logintext}>Result</Text>
    <Text style={styles.stat}>status</Text>
    <Text style={styles.predict} >You're Sad !</Text>

    <View style={styles.textContainer}>
    <Text style={styles.text00}>Happy: 10% {} </Text>
    <Text style={styles.text00}>Neutrual: 10% {} </Text>
    <Text style={styles.text00}>Angry: 10%{} </Text>
    </View>

    <View style={styles.textContainer}>
    <Text style={styles.text00}>Fear: 10%{} </Text>
    <Text style={styles.text00}>Suprised: 10%{} </Text>
    <Text style={styles.text00}>Sad: 10%{} </Text>
    </View>

    <View style={styles.container2}>

    <View style={styles.RectangleShapeView}>
    <Text style={styles.message}>Hello,You are Sad.Would You like to take a test for a reason of being this way ?</Text>
    </View>

    <View style={styles.ButtonContainer}>
    <View style={styles.buttonRow}>
    <TouchableOpacity><Text style={styles.textbuton}>No</Text></TouchableOpacity>
    </View>
    <View style={styles.buttonRow}>   
    <TouchableOpacity onPress={() => setModalVisible(true)}>
    <Text style={styles.textbuton}>Yes</Text>
    
    </TouchableOpacity>
    </View>
    </View>
      
    <View style={styles.RectangleShapeView}>
    <Text style={styles.message}>Would you like to send the Result to Your Parents or Your Guardian ?</Text>
    </View>

    <View style={styles.ButtonContainer}>
    <View style={styles.buttonRow}>
    <TouchableOpacity><Text style={styles.textbuton}>No</Text></TouchableOpacity>
    </View>
    <View style={styles.buttonRow}>   
    <TouchableOpacity><Text style={styles.textbuton}>Yes</Text></TouchableOpacity>
    </View>
    </View>
    

  

    </View>
    </ScrollView>
  
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    backgroundColor: '#8E05C2',
    
   
  },

  container2: {
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: '#8E05C2',
  },
  
  ButtonContainer:
  {   flex:1,
     flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      
  },

  predict:
  {
    color:'#fff',
    textAlign:'center',
    marginTop: 5,
    fontSize: 31.5,
  },
  
  logintext:{
    fontSize: 29,
    fontWeight: 'bold',
    marginTop: 29,
    backgroundColor: '#8E05C2',
    color:'#fff',
    textAlign:'center',
  },

  stat:{
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 1,
    color:'#fff',
    textAlign:'center',
  },

  text00:{
    color:'#fff',
    marginTop:5,
    margin:3,
    marginLeft:40,
    textAlign:'left',
    fontSize: 15,
  },

  RectangleShapeView:{
  marginTop: 20,
  width: 250,
  height: 100,
  backgroundColor: '#FFFF',
  borderRadius: 16,
  borderWidth: 1,
  borderColor: "#8E05C2",
  
  },

  message:{
   marginTop:20,
   marginLeft:10,
   
  },

  buttonRow:{
    marginTop: 30,
    margin:40,
    backgroundColor:'#fff',
    height:30,
    width:70,
    fontSize:20,
    borderRadius:16,

  },
  
  textbuton:{
    textAlign:"center",
    margin:6,
  },

  modalView: {
    marginTop:85,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 50,
    alignItems: 'center',
    shadowColor: '#0000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalQuestion:{
    fontSize:15,
    fontWeight: 'bold',
  },

  section: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop:20,
    margin:10,
  },
  
 
});

