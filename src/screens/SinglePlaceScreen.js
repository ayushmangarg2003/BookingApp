import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Navbar from '../components/Navbar'
import { heightPercentageToDP } from 'react-native-responsive-screen'

const SinglePlaceScreen = (props) => {
  const place = props.route.params.place
  const photos = place.photos
  const perks = place.perks
  return (
    <SafeAreaView>
      <Navbar />
      <ScrollView style={styles.scrollview}>
        <Text>{place.title}</Text>
        <Text>{place.description}</Text>
        <Text>{place.checkIn}</Text>
        <Text>{place.checkOut}</Text>
        <Text>{place.extraInfo}</Text>
        <Text>{place.maxGuests}</Text>
        <View>
          {
            photos.map((item, index) => (
              <Image style={styles.img} key={index} source={{ uri: item }} />
            ))
          }
        </View>
        <View>
          {
            perks.map((item, index) => (
              <Text key={index}>{item}</Text>
            ))
          }
        </View>
        <Text>{place.price}</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SinglePlaceScreen

const styles = StyleSheet.create({
  scrollview: {
    height: heightPercentageToDP(89),
  },
  img:{
    width:120,
    height:120
  }
})