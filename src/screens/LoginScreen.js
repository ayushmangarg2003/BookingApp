import { StyleSheet, Text, View } from 'react-native'
import { backendLink, gray, white, red } from '../constants/constants'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, TextInput } from '@react-native-material/core'
import React, { useContext, useState } from 'react'
import axios from 'axios'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { AuthContext } from '../context/AuthContext.js'
import "../ignoreWarnings.js"
import Loader from '../components/Loader.js'

export default function LoginScreen() {
  const [authState, setAuthState] = useContext(AuthContext);

  const navigation = useNavigation('')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)
  
  const handleLogin = async () => {
    setLoading(true)
    const user = { email: email, password: password }
    await axios.post(`${backendLink}/user/login`, user)
      .then((response) => {
        setEmail("");
        setPassword("");
        setAuthState({
          signedIn: true, email: response.data.user,
        })
        setLoading(false)
        navigation.navigate('home')
        setError(null)
      }).catch((err) => {
        setError(err.response.data.error)
        setLoading(false)
      })
  }

  const navigateToRegister = () => {
    navigation.navigate('register')
  }

  return (
    <SafeAreaView style={styles.parent}>
      {
        loading ? (<Loader />) : (<Text></Text>)
      }
      <View style={styles.container}>
        <View style={styles.headingParent}>
          <Text style={styles.heading}>LOGIN</Text>
        </View>
        <View style={styles.contentContainer}>
          <View>
            <TextInput value={email} onChangeText={(text) => setEmail(text)} placeholder='Email' color={red} style={styles.textInput} />

            <TextInput value={password} onChangeText={(text) => setPassword(text)} placeholder='Password' secureTextEntry={true} color={red} style={styles.textInput} />

            <Button onPress={handleLogin} title="Login" backgroundColor={red} style={styles.button} />

            <Text style={styles.error}>{error}</Text>

          </View>

          <View>
            <Button onPress={navigateToRegister} variant="text" color={gray} uppercase={false} style={{ marginHorizontal: 8 }} title="New Here? Register" />
          </View>

        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  parent: {
    width: widthPercentageToDP(100),
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: white,
  },
  container: {
    width: widthPercentageToDP(75),
    height: heightPercentageToDP(100),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
  },
  headingParent: {
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
  },
  contentContainer: {
    width: '100%',
  },
  textInput: {
    marginHorizontal: 8,
    marginVertical: 8,
  },
  button: {
    padding: 8,
    marginHorizontal: 8,
    marginVertical: 8,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 4,
  },
})