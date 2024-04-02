import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { red, white } from '../constants/constants';
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
    const navigateBookings = () => {
        navigation.navigate('bookings')
    }
    const navigatePlaces = () => {
        navigation.navigate('profilePlace')
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.profileCard}>
                <Image style={styles.avatarImg} source={require("../assets/avatar.png")} />
                <Text style={styles.text}>{authState.email}</Text>
            </View>
            <TouchableOpacity onPress={navigateBookings} style={styles.pageTextStyle}><Text style={styles.pageText}>Your Bookings</Text></TouchableOpacity>
            <TouchableOpacity onPress={navigatePlaces} style={styles.pageTextStyle}><Text style={styles.pageText}>Your Places</Text></TouchableOpacity>
            <TouchableOpacity onPress={handelLogout} style={styles.buttonStyle}><Text style={styles.btn_text}>Logout</Text></TouchableOpacity>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: white,
        width: widthPercentageToDP(100),
        height: '100%',
        alignItems: 'center',
        gap: 20,
        padding: 16,
    },
    avatarImg: {
        height: widthPercentageToDP(50),
        width: widthPercentageToDP(50),
    },
    text: {
        width: '90%',
        textAlign: 'center',
        borderRadius: 4,
        padding: 10,
        fontSize: 18,
        backgroundColor: white,
    },
    buttonStyle: {
        width: widthPercentageToDP(90),
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: red,
    },
    pageTextStyle: {
        width: widthPercentageToDP(90),
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#fff',
        color: red,
    },
    btn_text: {
        color: '#fff',
        borderRadius: 4,
        padding: 10,
        fontSize: 18,
        textTransform:'uppercase',
        fontWeight:'800'
    },
    pageText: {
        borderRadius: 4,
        padding: 10,
        fontSize: 16,
    },
    profileCard: {
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 'auto',
        padding: 16,
        gap: 8,
    }
})