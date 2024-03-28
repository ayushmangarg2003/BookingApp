import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Navbar from '../components/Navbar'

const BookingsScreen = () => {
  return (
    <SafeAreaView>
      <Navbar />
      <Text>BookingsScreen</Text>
    </SafeAreaView>
  )
}

export default BookingsScreen

const styles = StyleSheet.create({})