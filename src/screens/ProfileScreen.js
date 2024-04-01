import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { red, white } from '../constants/constants';
import Navbar from '../components/Navbar';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext.js'

export default function ProfileScreen() {
    const [authState, setAuthState] = useContext(AuthContext);

    const navigation = useNavigation()
    const handelLogout = () => {
        setAuthState({
            signedIn: false, email: "",
        })
        navigation.navigate('login')
    }

    return (
        <SafeAreaView style={styles.container}>
            <Navbar />
            <Image style={styles.avatarImg} source={require("../assets/avatar.png")} />
            <Text style={styles.text}>{authState.email}</Text>
            <TouchableOpacity onPress={handelLogout} style={styles.buttonStyle}><Text style={styles.btn_text}>Logout</Text></TouchableOpacity>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: '#f6f6f6',
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(100),
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    avatarImg: {
        height: widthPercentageToDP(50),
        width: widthPercentageToDP(50),
    },
    text: {
        width: widthPercentageToDP(90),
        textAlign: 'center',
        borderRadius: 4,
        padding: 10,
        fontSize: 18,
        backgroundColor: white
    },
    buttonStyle: {
        width: widthPercentageToDP(90),
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: red,
    },
    btn_text: {
        color: '#fff',
        borderRadius: 4,
        padding: 10,
        fontSize: 18,
    }
})