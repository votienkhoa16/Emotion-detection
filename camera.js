import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,SafeAreaView } from 'react-native';
import { Camera } from 'expo-camera';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  
  const cam = useRef().current;

  const takePicture = async() =>{
    const option =  {quality: 0.5,base64: true, skipProcessing: false}

    const picture =await cam.takePictureAsync(option)

    if(picture.source){
      conole.log(picture.source);
    }
  };
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <SafeAreaView style={styles.container}>
      
      <Camera ref={cam} style={styles.camera} type={type}>
        
        <View style={styles.buttonContainer}>
          
        <View style={{flexDirection: 'row',}}>
        
        <View>
        <TouchableOpacity
            style={styles.button}
            onPress={() => _takePicture}>
            <Text style={styles.text}> Take </Text>
            
          </TouchableOpacity>

        </View>
        
        
        
        <View>
        <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.text}> Reverse </Text>
            
          </TouchableOpacity>
        </View>
         
        </View>
        </View>
      </Camera>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
