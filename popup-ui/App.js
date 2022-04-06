import * as React from 'react';
import { Text, View, StyleSheet,TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

import { Root, Popup,Toast } from 'popup-ui';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default class App extends React.Component {
  render() {
    return (
     <Root>
    <View style={{ flex: 1, justifyContent: 'center' }}>
       
          <TouchableOpacity
            onPress={() =>
              Popup.show({
                type: 'Warning',
                title: 'App couldnt take your face',
                textBody: 'Please Retry Taking a Photo',
                buttontext: 'Ok',
                button:true,
                callback: () => Popup.hide()
              })
            }>
            <Text>Warning PopUp</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              Popup.show({
                type: 'Success',
                title: 'App Has take your face',
                textBody: 'Please Wait for Photo to Anilyze',
                buttontext: 'Ok',
                button:true,
                callback: () => Popup.hide()
              })
            }>
            <Text>Success PopUp</Text>
          </TouchableOpacity>

       

    </View>
</Root>
    );
  }
}

