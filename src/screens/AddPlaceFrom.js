import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const AddPlaceFrom = () => {
  const [newPlace, setNewPlace] = useState(false)

  return (
    <SafeAreaView>
      <View>
        <Text>AddPlaceFrom</Text>
      </View>
    </SafeAreaView>
  )
}

export default AddPlaceFrom

const styles = StyleSheet.create({})