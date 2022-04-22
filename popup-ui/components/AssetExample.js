import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, ActivityIndicator } from 'react-native';

export default function App () {
 

  return (
    <View style={styles.container}>
  <ActivityIndicator size='large'/>
  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  ActivityIndicator:{
  
  }
  
});
