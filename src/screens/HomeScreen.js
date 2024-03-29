import { Platform, StyleSheet, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import Navbar from '../components/Navbar'

export default function HomeScreen() {
    const navigation = useNavigation('')

    const ios = Platform.OS == 'ios';
    const topMargin = ios ? 12 : 40;

    const handelProfileClick = () => {
        navigation.navigate('profile')
    }

    return (
        <SafeAreaView style={styles.container}>
            <Navbar />
            
            <Text>Home</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

})