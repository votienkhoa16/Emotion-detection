import React, { Component, useRef, useState, useEffect } from "react";
import { StyleSheet, View, Image, Touchable, TouchableOpacity, SafeAreaView } from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import { Camera } from 'expo-camera';

//Camera screen and function
function CameraScreen({navgation}){

  const [type, setType] = useState(Camera.Constants.Type.back);
  const cam = useRef().current;
    return (
      <SafeAreaView style={styles.container}>

        <Camera ref={cam} style={styles.camera} type={type}>

          <View>
          <TouchableOpacity viewBox="0 0 100 100" style={styles.ellipse}

            //call class takePicute
            >
            <Ellipse
              stroke="rgba(255,255,255,1)"
              strokeWidth={0}
              fill="rgba(249,0,0,1)"
              cx={50}
              cy={50}
              rx={50}
              ry={50}
            ></Ellipse>
          </TouchableOpacity>
          <Image
            source={require("./assets/cameraSwitch.png")}
            resizeMode="contain"
            style={styles.image}
          ></Image>
          </View>
          
          </Camera>
      </SafeAreaView>
    );
    //take picture function
 // takePicture = async()=>{
 //   if(this.camera){
      //this option will set the quality of image and get the base64 of the image
  //    const options = {quality: 0.5, base64: true};
   //   const data = await this.camera.takePictureAsync(option);
 //     
 //     console.log(data.base64)
      //save the path of image
      
   //   console.log('path', path)
  //    try{
   //   }
  //    catch(error){
  //      console.log(error.message);
  //    }
//    }
//  }
}

//-----------------------------------------------------------------------------------------//
//style of the screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row"
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
  ellipseRow: {
    height: 56,
    flexDirection: "row",
    flex: 1,
    marginRight: 79,
    marginLeft: 159,
    marginTop: 663
  }
});

export default CameraScreen;