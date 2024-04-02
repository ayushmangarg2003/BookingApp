import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const ProfilePlacesScreen = () => {
  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity><Text>Add New Places</Text></TouchableOpacity>
      </View>
      <View>
        <Text>ProfilePlacesScreen</Text>
      </View>
    </SafeAreaView>
  )
}

export default ProfilePlacesScreen

const styles = StyleSheet.create({})