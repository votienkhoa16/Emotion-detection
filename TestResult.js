import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import MaterialButtonViolet1 from "../components/MaterialButtonViolet1";
import MaterialButtonViolet2 from "../components/MaterialButtonViolet2";

function Untitled(props) {
  return (
    <View style={styles.container}>
      <View style={styles.resultStack}>
        <Text style={styles.result}>Result</Text>
        <Text style={styles.status}>Status</Text>
        <View style={styles.rect}></View>
      </View>
      <View style={styles.rect2}>
        <Text style={styles.hello}>
          Hello,User . Are you Sad ? Would you like to listen to Lo-fi Music
        </Text>
      </View>
      <View style={styles.materialButtonViolet1Row}>
        <MaterialButtonViolet1
          style={styles.materialButtonViolet1}
        ></MaterialButtonViolet1>
        <MaterialButtonViolet2
          style={styles.materialButtonViolet2}
        ></MaterialButtonViolet2>
      </View>
      <View style={styles.rect3}>
        <Text style={styles.hello1}>
          Would you like to send Your Result to Mail
        </Text>
      </View>
      <View style={styles.materialButtonViolet3Row}>
        <MaterialButtonViolet1
          style={styles.materialButtonViolet3}
        ></MaterialButtonViolet1>
        <MaterialButtonViolet2
          style={styles.materialButtonViolet4}
        ></MaterialButtonViolet2>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  result: {
    top: 0,
    left: 149,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "#121212",
    height: 68,
    width: 87,
    fontSize: 28
  },
  status: {
    top: 58,
    left: 166,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "#121212",
    height: 68,
    width: 246,
    fontSize: 20
  },
  rect: {
    top: 34,
    left: 0,
    width: 375,
    height: 180,
    position: "absolute",
    opacity: 0,
    borderWidth: 0,
    borderColor: "rgba(255,255,255,1)",
    borderStyle: "solid",
    borderTopLeftRadius: 51,
    borderTopRightRadius: 51
  },
  resultStack: {
    width: 412,
    height: 214,
    marginTop: 153
  },
  rect2: {
    width: 271,
    height: 117,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 38,
    borderWidth: 1,
    borderColor: "rgba(52,46,46,1)",
    marginTop: 21,
    alignSelf: "center"
  },
  hello: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 81,
    width: 219,
    marginTop: 23,
    marginLeft: 39
  },
  materialButtonViolet1: {
    height: 36,
    width: 100,
    borderWidth: 1,
    borderColor: "rgba(144,19,254,1)",
    borderRadius: 19
  },
  materialButtonViolet2: {
    height: 36,
    width: 100,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "rgba(144,19,254,1)",
    marginLeft: 26
  },
  materialButtonViolet1Row: {
    height: 36,
    flexDirection: "row",
    marginTop: 9,
    marginLeft: 74,
    marginRight: 75
  },
  rect3: {
    width: 271,
    height: 117,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 38,
    borderWidth: 1,
    borderColor: "rgba(52,46,46,1)",
    marginTop: 22,
    alignSelf: "center"
  },
  hello1: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 81,
    width: 219,
    marginTop: 23,
    marginLeft: 39
  },
  materialButtonViolet3: {
    height: 36,
    width: 100,
    borderWidth: 1,
    borderColor: "rgba(144,19,254,1)",
    borderRadius: 19
  },
  materialButtonViolet4: {
    height: 36,
    width: 100,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "rgba(144,19,254,1)",
    marginLeft: 30
  },
  materialButtonViolet3Row: {
    height: 36,
    flexDirection: "row",
    marginTop: 11,
    marginLeft: 80,
    marginRight: 65
  }
});


