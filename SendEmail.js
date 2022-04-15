import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import * as MailComposer from 'expo-mail-composer';

function EmailScreen(props) {
//send email
    sendEmail = async() => {
        MailComposer.composeAsync({
            recipients:
            ['otakutonyvo16@gmail.com'],
            subject: 'Test email',
            body: 'Hello, noob!\nThis is an auto-email.Hope you die soon.\n\nVo Tien Khoa.'
        });
    }
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.rect} onPress ={() => {sendEmail()}}>
        <Text style={styles.loremIpsum}>Tap here to send email</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  rect: {
    width: 238,
    height: 44,
    backgroundColor: "#E6E6E6",
    borderWidth: 1,
    borderColor: "rgba(195,35,244,1)",
    alignSelf: "center"
  },
  loremIpsum: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 14,
    marginLeft: 49
  }
});

export default EmailScreen;