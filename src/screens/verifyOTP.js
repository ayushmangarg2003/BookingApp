import { StyleSheet, Text, View } from 'react-native'
import { backendLink, gray, white, errorColor, red } from '../constants/constants'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, TextInput } from '@react-native-material/core'
import React, { useContext, useState } from 'react'
import axios from 'axios'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { AuthContext } from '../context/AuthContext.js'

export default function VerifyOTP() {
    const navigation = useNavigation('')
    const [authState, setAuthState] = useContext(AuthContext);

    const [password, setPassword] = useState('')
    const [error, setError] = useState(null);

    const code = {
        userId: authState.email,
        otp: password
    }

    const getData = async (code) => {
        try {
            const res = await axios.post(`${backendLink}/user/verifyOTP`, code)
            if (res.data.status == 'verified') {
                navigation.navigate('home')
            }
            else {
                setError(res.data.message)
            }
        } catch (error) {
            setError(error)
        }
    }

    const handelSubmit = async () => {
        await getData(code)
    }

    return (
        <SafeAreaView style={styles.parent}>
            <View style={styles.container}>
                <View style={styles.headingParent}>
                    <Text style={styles.heading}>Verify OTP</Text>
                </View>
                <View style={styles.contentContainer}>
                    <View>

                        <TextInput maxLength={4} value={password} onChangeText={(text) => setPassword(text)} className='otp-input' keyboardType='number-pad' placeholder='Enter OTP' secureTextEntry={true} color={red} style={styles.textInput} />

                        <Button onPress={handelSubmit} title="Verify" backgroundColor={red} style={styles.button} />

                        <Text style={styles.error}>{error}</Text>

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