import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import verifyOTP from './src/screens/verifyOTP';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name="register" component={RegisterScreen} />
        <Stack.Screen options={{ headerShown: false }} name="home" component={HomeScreen} />
        <Stack.Screen options={{ headerShown: false }} name="profile" component={ProfileScreen} />
        <Stack.Screen options={{ headerShown: false }} name="verifyotp" component={verifyOTP} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App