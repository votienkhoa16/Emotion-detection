import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import CameraRoll from '@react-native-community/cameraroll';
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";

export default function Add({ navigation }) {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [useCamera, setUseCamera] = useState(false);
  const cameraRef = useRef(null);



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
    if (cameraRef) {
      console.log('in take picture');
      try {
        let photo = await cameraRef.current.takePictureAsync({
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        console.debug(photo);
        return photo;
      } catch (e) {
        console.log(e);
      }
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
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {useCamera ? (
        <View>
          <Camera style={styles.camera} type={type} ref={cameraRef}>
            <View style={{ flex: 9 }}></View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setUseCamera(false);
                }}>
                <Text style={styles.text}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}>
                <Text style={styles.text}>Flip</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button]}
                onPress={async () => {
                  console.log('in take pic');
                  const r = await takePicture();
                  setUseCamera(false);
                  if (!r.cancelled) {
                    setImage(r.uri);
                  }
                  console.log('response', JSON.stringify(r));
                }}>
                <Text style={styles.text}>PICTURE</Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      ) : (
        <>
          <View style={{ width: '100%' }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={[styles.button]}
                onPress={async () => {
                  console.log('in pick photo');
                  const r = await pickImage();
                  if (!r.cancelled) {
                    setImage(r.uri);
                  }
                  console.log('response', JSON.stringify(r));
                }}>
                <Text style={styles.text}> PICK PICTURE </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button]}
                onPress={async () => {
                  console.log('in pick camera');
                  setUseCamera(true);
                }}>
                <Text style={styles.text}> PICK CAMERA </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button]}
                onPress={Save}
                >
                <Text style={styles.text}> SAVE </Text>
                </TouchableOpacity>
            </View>
            <View style={{ width: '100%', alignItems: 'center' }}>
              {true && (
                <Image
                  source={{ uri: image }}
                  style={{ width: 200, height: 200, backgroundColor: 'blue' }}
                  Save
                />
              )}
            </View>
          </View>
        </>
      )}
    </View>
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
    flexDirection: 'row',
    minWidth: '100%',
    flex: 1,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 40,
    margin: 8,
    backgroundColor: 'grey',
  },
  text: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});
