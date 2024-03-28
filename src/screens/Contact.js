import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Navbar from '../components/Navbar'
import { SafeAreaView } from 'react-native-safe-area-context'

const Contact = () => {
  return (
    <SafeAreaView>
      <Navbar/>
      <Text>Contact</Text>
    </SafeAreaView>
  )
}

export default Contact

const styles = StyleSheet.create({})