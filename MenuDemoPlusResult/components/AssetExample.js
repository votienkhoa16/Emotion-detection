import * as React from 'react';
import { Text, View, StyleSheet, Image,Dimensions ,SafeAreaView} from 'react-native';

export default function AssetExample() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.paragraph}>
        YOU ARE CURRENTLY SAD
      </Text>  
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    borderColor: '#A7BFE8',
    },

    
  paragraph: {
    marginBottom: 24,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign:'center',
    width: Dimensions.get('window').width,
    
  },

});
