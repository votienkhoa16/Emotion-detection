import React, { Component, useRef, useState, useEffect } from "react";
import { StyleSheet, View, Image, Touchable, TouchableOpacity, SafeAreaView, Text, Alert } from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as FS from 'expo-file-system';

//Camera screen and function
function CameraScreen(){
  
  const {status} = ImagePicker.requestCameraPermissionsAsync();

  //convert uri to base64
  //basically, when the we take the picture, it will normally print the uri code
  uriToBase64 = async (uri) => {
    let base64 = await FS.readAsStringAsync(uri, {
      encoding: FS.EncodingType.Base64,
    });
  }
  //take picture
  takePicture = async() =>{

    let pickerResult = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.5,
    });

    if(pickerResult.cancelled){
      return;
    }

    console.log(pickerResult);
    //handle the image
    await this.uploadImage({
      type: pickerResult.type,
      base64: pickerResult.base64,
      uri: pickerResult.uri,
    });
  };

  //upload image
  uploadImage = async (imageFile) => {
    //server url
    let type = imageFile.type;
    let route = "";
    let contentType = "";
    let url = "http://192.168.0.2:3000";

    type === "image"
      ? ((route = "/"), (contentType = "image/jpeg")):
      
    url;

    let respone = await FS.uploadAsync(url, imageFile.uri, {
      headers: {
        "content-type": contentType,
      },
      httpMethod: "POST",
      uploadType: FS.FileSystemUploadType.BINARY_CONTENT,
    });

    console.log(respone.headers);
    console.log(respone.body);
  }
  return (
    <SafeAreaView style={styles.container}>
      
      <Camera style={styles.camera}>
        
        <View style={styles.buttonContainer}>
        <View style={{flexDirection: 'row',}}>
        <View>
        <TouchableOpacity
            style={styles.button}
            onPress={() => takePicture()}>
            <Image style={styles.snap} source={require("./assets/snap.png")}></Image>
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
            <Image style={styles.snap} source={require('./assets/switch.png')}></Image>
          </TouchableOpacity>
        </View>
        </View>
        </View>
      </Camera>
    </SafeAreaView>
  );
}

//-----------------------------------------------------------------------------------------//

//style of the screen 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row"
  },

  camera: {
    flex: 1,
  },

  ellipse: {
    width: 56,
    height: 56
  },
  image: {
    width: 60,
    height: 51,
    marginLeft: 21,
    marginTop: 5
  },

  buttonContainer: {
    backgroundColor: '#fff',
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    margin: 80,
    marginBottom: 0,
    alignItems: 'center',
    padding: 15,
  },


  snap: {
    marginTop: 10,
    flex: 0,
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 5
  }
});

export default CameraScreen;