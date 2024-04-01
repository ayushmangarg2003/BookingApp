import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { backendLink, black, gray, white, errorColor, red } from '../constants/constants'
import { Button, TextInput } from '@react-native-material/core'
import axios from 'axios'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { AuthContext } from '../context/AuthContext.js'

const RegisterScreen = () => {
  const navigation = useNavigation('')
  const [authState, setAuthState] = useContext(AuthContext);

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null);

  const handleRegister = () => {

    const user = { name: name, email: email, password: password }
    axios.post(`${backendLink}/user/register`, user)
      .then((response) => {
        setName("");
        setEmail("");
        setPassword("");
        setAuthState({
          signedIn: true, email: response.data.user.email,
        })
        navigation.navigate('verifyotp')
      }).catch((err) => {
        setError(err.response.data.error)
      })
  }

  const navigateToLogin = () => {
    navigation.navigate('login')
  }
  return (
    <SafeAreaView>
      <View style={styles.parent}>
        <View style={styles.container}>

          <View style={styles.headingParent}>
            <Text style={styles.heading}>REGISTER</Text>
          </View>

          <View style={styles.contentContainer}>
            <View>
              <TextInput value={name} onChangeText={(text) => setName(text)} color={red} placeholder='Name' style={styles.textInput} />

              <TextInput value={email} onChangeText={(text) => setEmail(text)} color={red} placeholder='Email' style={styles.textInput} />

              <TextInput value={password} onChangeText={(text) => setPassword(text)} color={red} placeholder='Password' secureTextEntry={true} style={styles.textInput} />

              <Button onPress={handleRegister} title="Register" backgroundColor={red} style={styles.button} />

              <Text style={styles.error}>{error}</Text>
            </View>

            <View>
              <Button onPress={navigateToLogin} variant="text" color={gray} uppercase={false} style={{ marginHorizontal: 8 }} title="Have an Account? Login" />
            </View>
          </View>

        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  parent: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(100),
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

export default RegisterScreen