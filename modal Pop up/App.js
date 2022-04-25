import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View ,TextInput} from 'react-native';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.emailcenteredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.emailcenteredView}>
          <View style={styles.emailmodalView}>
            <Text style={styles.emailmodalText}>Please Input Email To Send The Result</Text>
            <TextInput style={styles.emailtextinput} placeholder={'Email'}></TextInput>
            <Pressable
              style={[styles.emailbutton2, styles.emailbuttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.emailtextStyle}>Send</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable style={[styles.emailbutton, styles.emailbuttonOpen]} onPress={() => setModalVisible(true)}>
        <Text style={styles.emailtextStyle}>Show Modal</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  emailcenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  emailmodalView: {
    width :'90%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  emailbutton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,

  },

  emailbutton2: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width:'40%',
    top:15,
    margin: 10,
  },
  emailbuttonOpen: {
    backgroundColor: '#F194FF',
  },
  emailbuttonClose: {
    backgroundColor: '#2196F3',
  },
  emailtextStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emailmodalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize:15,
  },

  emailtextinput:{
    margin: 3,
    backgroundColor: '#e8e8e8',
    width:'90%',
    height:40,
    top : 3,
    borderRadius:10,
  }
  ,
});

export default App;