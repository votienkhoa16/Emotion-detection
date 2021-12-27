import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
export default function Add({ navigation }) {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const permisionFunction = async () => {
   
    const cameraPermission = await Camera.requestPermissionsAsync();

    setCameraPermission(cameraPermission.status === 'granted');

    const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
    console.log(imagePermission.status);
  
  
    

    if (
      imagePermission.status !== 'granted' &&
      cameraPermission.status !== 'granted'
    ) {
      alert('Permission for media access needed.');
    }
  };

  useEffect(() => {
    permisionFunction();
  }, []);



  const takePicture = async () => {
    if (camera.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      let photo = await camera.current.takePictureAsync(options);
      console.log(camera.current.getSupportedRatiosAsync());
      const source = photo.uri;
      camera.current.pausePreview();
      await handleSave(source);
      camera.current.resumePreview();
    }
  };

  const Save = async image  => {
      let cameraPrmissions = await Permissions.getAsync(Permissions.CAMERA_ROLL); 
      if(cameraPrmissions.status !== 'granted') {
        cameraPrmissions = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      }
      
      if(cameraPrmissions.status === 'granted') {        
        MediaLibrary.saveToLibraryAsync(image.uri)
        alert('Image saved to Library')
      } else {
        console.log('You did not allow permissions to camera');
      }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);
    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio={'1:1'}
        />
      </View>

      <Button title={'Take Picture'} onPress={takePicture} />
      <Button title={'Reverse'}> Reverse </Button>
      <Button title={'Save'} onPress={Save}/>
      {imageUri && <Image source={{ uri: imageUri }} style={{ flex: 1 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  button: {
    flex: 0.1,
    padding: 10,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
});
