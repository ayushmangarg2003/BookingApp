import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from './src/context/AuthContext';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import VerifyOTP from './src/screens/VerifyOTP';

import Home from './src/screens/Home';

import ProfilePlacesScreen from './src/screens/ProfilePlacesScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import BookingsScreen from './src/screens/BookingsScreen';

import SinglePlaceScreen from './src/screens/SinglePlaceScreen';
import AddPlaceFrom from "./src/screens/AddPlaceFrom"
import EditPlace from "./src/screens/EditPlace";

const Stack = createNativeStackNavigator();
const App = () => {
  const [authState, setAuthState] = useState(
    {
      email: '',
      signedIn: false
    }
  );

  return (
    <NavigationContainer>
      <AuthContext.Provider value={[authState, setAuthState]}>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="login" component={LoginScreen} />
          <Stack.Screen options={{ headerShown: false }} name="register" component={RegisterScreen} />
          <Stack.Screen options={{ headerShown: true, headerTitle: 'Profile' }} name="profile" component={ProfileScreen} />
          <Stack.Screen options={{ headerShown: false }} name="verifyotp" component={VerifyOTP} />
          <Stack.Screen options={{ headerShown: true, headerTitle: 'Your Bookings' }} name="bookings" component={BookingsScreen} />
          <Stack.Screen options={{ headerShown: false }} name="home" component={Home} />
          <Stack.Screen options={{ headerShown: true, headerTitle: 'Your Places' }} name="profilePlace" component={ProfilePlacesScreen} />
          <Stack.Screen options={{ headerShown: false }} name="singleplace" component={SinglePlaceScreen} />
          <Stack.Screen options={{ headerShown: false }} name="addPlace" component={AddPlaceFrom} />
          <Stack.Screen options={{ headerShown: false }} name="editPlace" component={EditPlace} />
        </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  )
}

export default App