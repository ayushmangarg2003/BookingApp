import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { BuildingOfficeIcon, ChatBubbleLeftEllipsisIcon, HomeIcon, PlusIcon, UserIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'


const Navbar = () => {
    const navigation = useNavigation('')
    return (
        <View style={styles.navbar}>
            <TouchableOpacity onPress={() => { navigation.navigate('home') }}>
                <HomeIcon size={30} strokeWidth={2} color={'#777'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('contact') }}>
                <ChatBubbleLeftEllipsisIcon size={30} strokeWidth={2} color={'#777'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('addplace') }}>
                <PlusIcon size={30} strokeWidth={2} color={'#777'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('bookings') }}>
                <BuildingOfficeIcon size={30} strokeWidth={2} color={'#777'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('profile') }}>
                <UserIcon size={30} strokeWidth={2} color={'#777'} />
            </TouchableOpacity>
        </View>
    )
}

export default Navbar

const styles = StyleSheet.create({
    navbar: {
        position: 'absolute',
        top: heightPercentageToDP(93),
        height: heightPercentageToDP(10),
        width: widthPercentageToDP(100),
        display: 'flex',
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        alignItems: 'center',
    }
})