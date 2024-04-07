import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendLink, red, white } from '../constants/constants'
import dayjs from "dayjs";
import { ArrowLongRightIcon } from 'react-native-heroicons/outline';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';

const BookingCard = (props) => {
  const [place, setPlace] = useState({
    photos: []
  })
  const booking = props.user
  const [loading, setLoading] = useState(true)
  const [review, setReview] = useState("")

  const handelReviewSubmit = (e) => {
    e.preventDefault()
    const data = { place: booking.place, review: review }
    if (review.length < 100) {
      alert("Reviews should have at least 100 characters")
      return
    }
    try {
      axios.post(`${backendLink}/review/addReview`, data).then(() => {
        setReview("")
      })
    } catch (error) {
      console.log("Some Error Occured");
    }
  }

  useEffect(() => {
    axios.get(`${backendLink}/places/${booking.place}`).then(response => {
      const { data } = response;
      setPlace(data)
      setLoading(false)
    });
  }, []);

  return <>
    {
      loading ? (<></>) :
        (
          <View style={styles.desCard}>
            <Image style={styles.desImage} source={{ uri: place.photos[0] }} />
            <LinearGradient
              colors={['rgba(0,0,0,0.6)', 'transparent', 'transparent', 'rgba(0,0,0,0.6)']}
              style={styles.linearGradient}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />
            <Text style={styles.desTitle}>{place.title.trim()}</Text>
            <Text style={styles.desAddress}>{place.address.trim()}</Text>
            <View style={styles.bookingTimings}>
              <Text style={styles.desSub}>{dayjs(new Date(booking.checkIn)).format("DD/MM/YYYY").trim()}</Text>
              <Text style={styles.desSub}><ArrowLongRightIcon size={30} strokeWidth={1} color={'#fff'} /></Text>
              <Text style={styles.desSub}>{dayjs(new Date(booking.checkOut)).format("DD/MM/YYYY").trim()}</Text>
            </View>
            {/* <Text style={styles.desTitle}>₹{booking.price}</Text> */}
            <View style={styles.addReview}>
              <TextInput value={review} onChangeText={(text) => setReview(text)} placeholder='Review' color={white} placeholderTextColor={'#ccc'} style={styles.textInput} />
              <TouchableOpacity style={styles.revButton} onPress={handelReviewSubmit}>
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View >
        )
    }
  </>

}

export default BookingCard

const styles = StyleSheet.create({
  desCard: {
    width: widthPercentageToDP(95),
    height: widthPercentageToDP(100),
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'relative',
    marginBottom: 20,
    gap: 8,
    position: 'relative',
  },
  desImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  linearGradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    bottom: 0,
  },
  desSub: {
    fontSize: 12,
    textAlign: 'left',
    color: '#fff',
    fontWeight: '600',
  },
  desTitle: {
    fontSize: 16,
    textAlign: 'left',
    color: '#fff',
    width: '100%',
    position: 'absolute',
    top: 0,
    padding: 8,
  },
  desAddress: {
    fontSize: 16,
    textAlign: 'left',
    color: '#fff',
    width: '100%',
    position: 'absolute',
    top: 20,
    padding: 8,
  },
  bookingTimings: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    position: 'absolute',
    top: 40,
    width: '100%',
    padding: 8,
  },

  bookingCardBottom: {
    height: '40%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  addReview: {
    paddingHorizontal: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  textInput: {
    borderWidth: 2,
    height: 32,
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'red',
    width: '75%',
    padding: 4,
  },
  revButton: {
    backgroundColor: red,
    paddingHorizontal: 12,
    height: 32,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%'
  },
  buttonText: {
    color: white,
  }
})