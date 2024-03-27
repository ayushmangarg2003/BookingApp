import { Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

export default function HomeScreen() {
    const navigation = useNavigation('')

    const ios = Platform.OS == 'ios';
    const topMargin = ios ? 12 : 40;

    const handelProfileClick = () => {
        navigation.navigate('profile')
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: topMargin, }}>
                <View style={styles.avatarContainer}>
                    <Text style={styles.avatarText}>Let's Explore</Text>
                    <TouchableOpacity onPress={handelProfileClick}>
                        <Image style={styles.avatarImg} source={require("../assets/avatar.png")} />
                    </TouchableOpacity>
                </View>

                <View style={styles.searchContainer}>
                    <View style={styles.searchBar}>
                        <MagnifyingGlassIcon size={20} strokeWidth={3} color={'#999'} />
                        <TextInput
                            placeholder='Search'
                            placeholderTextColor={'#999'}
                            style={{ marginHorizontal: 12 }}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: '#fff',
    },
    avatarContainer: {
        marginHorizontal: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 40,
    },
    avatarText: {
        fontWeight: 'bold',
        fontSize: widthPercentageToDP(7),
    },
    avatarImg: {
        height: widthPercentageToDP(12),
        width: widthPercentageToDP(12),
    },
    searchContainer: {
        marginHorizontal: 20,
        marginBottom: 16,
    },
    searchBar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 50,
        padding: 16,
        marginHorizontal: 8,
        paddingLeft: 24,
        backgroundColor: '#eaeaea'
    },
})