import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,SafeAreaView } from 'react-native';
import { Camera } from 'expo-camera';
import Svg, { Ellipse } from "react-native-svg";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  
  const cam = useRef().current;

  const _takePicture = async() =>{
    const option =  {quality: 0.5,base64: true, skipProcessing: false}

    const picture =await cam.takePictureAsync(option)

    if(picture.source){
      console.log(picture.source);
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
          
        <View>
        <View >
        <TouchableOpacity
             style={{
            width: 70,
            height: 70,
            bottom: 0,
            borderRadius: 60,
            backgroundColor: '#fff',
            position: 'absolute',
            flex: 1,
            padding: 10,
            alignItems:'center',
            }}
            onPress={() => _takePicture}>
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
    flexDirection:'row',
    margin: 20,
    alignItems:'center',
  },
});
