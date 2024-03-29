import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const PlaceCard = (props) => {

  const navigation = useNavigation()
  const handelClick = () => {
    navigation.navigate(`singleplace`, {
      place: props.place
    })
  }

  return (
    <View style={styles.t_card}>
      <TouchableOpacity onPress={handelClick} style={styles.place_card_link}>
        <View style={styles.t_image}>
          <Image style={styles.image} source={{ uri: props.place.photos[1] }} />
        </View>
        <View style={styles.card_text}>
          <Text style={styles.heading}>{props.place.address}</Text>
          <Text style={styles.title}>{props.place.title}</Text>
          <Text style={styles.price}>₹<Text style={styles.amount}>{props.place.price} </Text> without taxes</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default PlaceCard

const styles = StyleSheet.create({
  t_card: {
    marginVertical: 12,
    marginHorizontal: 20,
    padding: 12,
    borderRadius: 20,
    height: 375,
    width: '280px',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'space-between',
  },
  t_image: {
    borderRadius: 12,
    width: '100%',
    height: '80%',
    objectFit: 'cover',
  },
  image: {
    width: '100%',
    borderRadius: 12,
    height: '100%',
  },
  card_text: {
    display: 'flex',
    justifyContent: 'flex-end',
    height: '20%',
  },
  heading: {
    fontSize: 24,
    fontWeight: '800',
  },
  title: {
    fontSize: 14,
  },
  price: {
    fontSize: 16,
    textDecorationLine: 'underline'
  },
  amount: {
    fontWeight: '800',

  }
})