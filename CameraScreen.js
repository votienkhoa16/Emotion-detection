import React, { Component, useRef, useState, useEffect } from "react";
import { StyleSheet, View, Image, Touchable, TouchableOpacity, SafeAreaView, Text, Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as FS from 'expo-file-system';

//Camera screen and function
function CameraScreen(props){

  React.useEffect(() => {
    takePicture();
  });
  
  const {status} = ImagePicker.requestCameraPermissionsAsync();

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
      props.navigation.navigate('Home'); 
      return;
    }

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
    let url = "http://10.123.1.234:3000/image";

    type === "image"
      ? ((route = ""), (contentType = "image/jpeg")):
      
    url;

    let respone = await FS.uploadAsync(url, imageFile.uri, {
      headers: {
        "content-type": contentType,
      },
      httpMethod: "POST",
      uploadType: FS.FileSystemUploadType.BINARY_CONTENT,
    });

    if (respone){
      console.log(respone);
      props.navigation.navigate('Result');
    }
    else {
      console.log.error();
    }
    
  }
  
  
  return (
    <SafeAreaView style={styles.container}>
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
});

export default CameraScreen;