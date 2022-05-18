import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
//import all screen
import CameraScreen from './App/CameraScreen';
import AuthApp from './Auth/LoginAndRegister';
import ResultScreen from './App/ResultScreen';
import LogoScreen from './App/LogoScreen';
import HomeScreen from './App/Home';
import ResultsListScreen from './App/ResultsList';
import HistoryScreen from './App/HistoryScreen';


//global api link
global.api = "http://192.168.0.103:3000/"

//create a screen routes stack
const Stack = createNativeStackNavigator();

//main app here
//normally, main app is used for navigate screens in stack
function App(){
  return(
    <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Logo">
        <>
        <Stack.Screen name="Logo" options={{ headerShown: false }} component={LogoScreen} />
        <Stack.Screen name="Auth" options={{ headerShown: false }} component={AuthApp} />
        <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
        <Stack.Screen name="Camera" options={{ headerShown: false }} component={CameraScreen} />
        <Stack.Screen name="Result" options={{ headerShown: false }} component={ResultScreen} />
        <Stack.Screen name="ResultsList" options={{ headerShown: false }} component={ResultsListScreen} />
        <Stack.Screen name="History" options={{ headerShown: false }} component={HistoryScreen} />
        </>
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}
export default App;