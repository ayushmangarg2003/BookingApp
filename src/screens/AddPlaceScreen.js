import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Navbar from '../components/Navbar'

const AddPlaceScreen = () => {
  return (
    <SafeAreaView>
      <Navbar/>
      <Text>AddPlaceScreen</Text>
    </SafeAreaView>
  )
}

export default AddPlaceScreen

const styles = StyleSheet.create({})