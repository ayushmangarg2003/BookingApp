import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { LinearGradient } from 'expo-linear-gradient'

const PlaceCard = (props) => {

  const navigation = useNavigation()
  const handelClick = () => {
    navigation.navigate(`singleplace`, {
      place: props.place
    })
  }

  return (
    <TouchableOpacity onPress={handelClick} style={styles.desCard}>
      <Image style={styles.desImage} source={{ uri: props.place.photos[1] }} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.linearGradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      <Text style={styles.desTitle}>{props.place.address}</Text>
      <Text style={styles.desSub}>{props.place.title}</Text>
      <Text style={styles.desSub}>₹<Text style={styles.amount}>{props.place.price} </Text> without taxes</Text>
    </TouchableOpacity>
  )
}

export default PlaceCard

const styles = StyleSheet.create({
  desCard: {
    width: widthPercentageToDP(45),
    height: widthPercentageToDP(65),
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'relative',
    padding: 16,
    paddingVertical: 24,
    marginBottom: 20,
  },
  desImage: {
    width: widthPercentageToDP(44),
    height: widthPercentageToDP(65),
    borderRadius: 35,
    position: 'absolute'
  },
  linearGradient: {
    width: widthPercentageToDP(44),
    height: heightPercentageToDP(15),
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    position: 'absolute',
    bottom: 0,
  },
  desTitle: {
    fontSize: widthPercentageToDP(4),
    color: '#fff',
    fontWeight: '600',
  },
  desSub: {
    fontSize: widthPercentageToDP(2.2),
    color: '#fff',
  }
})