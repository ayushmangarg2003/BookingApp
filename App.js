import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import VerifyOTP from './src/screens/VerifyOTP';
import BookingsScreen from './src/screens/BookingsScreen';
import MyPlaces from './src/screens/MyPlaces';
import About from './src/screens/About';
import Search from './src/screens/Search';
import ProfilePlacesScreen from './src/screens/ProfilePlacesScreen';
import SinglePlaceScreen from './src/screens/SinglePlaceScreen';
import React, { useState } from "react";
import { AuthContext } from './src/context/AuthContext';

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
          <Stack.Screen options={{ headerShown: false }} name="myplaces" component={MyPlaces} />
          <Stack.Screen options={{ headerShown: false }} name="about" component={About} />
          <Stack.Screen options={{ headerShown: false }} name="search" component={Search} />
          <Stack.Screen options={{ headerShown: false }} name="profilePlace" component={ProfilePlacesScreen} />
          <Stack.Screen options={{ headerShown: false }} name="singleplace" component={SinglePlaceScreen} />
        </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  )
}

export default App