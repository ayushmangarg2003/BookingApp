import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'

export default function ProfileScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.avatarImg} source={require("../assets/avatar.png")} />
            <Text style={styles.text}>Hello Ji</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: '#f6f6f6',
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(100),
        justifyContent: 'center',
        alignItems: 'center',
        gap:10,
    },
    avatarImg: {
        height: widthPercentageToDP(50),
        width: widthPercentageToDP(50),
    },
    text: {
        width: widthPercentageToDP(90),
        textAlign:'center',
        borderRadius:4,
        padding:10,
        fontSize:18,
        backgroundColor:'#fff'
    }
})