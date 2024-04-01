import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendLink, red, white } from '../constants/constants'
import dayjs from "dayjs";
import { ArrowLongRightIcon } from 'react-native-heroicons/outline';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

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
          <View style={styles.bookingCardParent}>
            {/* <ToastContainer position="bottom-center" /> */}
            <View style={styles.t_image}>
              <Image style={styles.image} source={{ uri: place.photos[0] }} />
            </View >
            <View style={styles.bookingCardBottom}>
              <View className="card-right-details">
                <View className="upper-text">
                  <Text>{place.title}</Text>
                  <Text>{place.address}</Text>
                </View>
                <View style={styles.bookingTimings}>
                  <Text>{dayjs(new Date(booking.checkIn)).format("DD/MM/YYYY")}</Text>
                  <Text><ArrowLongRightIcon size={30} strokeWidth={1} color={'#111'} /></Text>
                  <Text>{dayjs(new Date(booking.checkOut)).format("DD/MM/YYYY")}</Text>
                </View>
                <View className="bottom-details">
                  <Text>{booking.numberOfGuests}</Text>
                  <Text>₹{booking.price}</Text>
                </View>
              </View>
              <View style={styles.addReview}>
                <TextInput value={review} onChangeText={(text) => setReview(text)} placeholder='Review' color={red} style={styles.textInput} />
                <TouchableOpacity style={styles.revButton} onPress={handelReviewSubmit}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View >
        )
    }
  </>

}

export default BookingCard

const styles = StyleSheet.create({
  bookingCardParent: {
    width: widthPercentageToDP(90),
    height: heightPercentageToDP(60),
    alignSelf: 'center',
    backgroundColor: "#fff",
    padding: 8,
    marginBottom: 12,
    borderRadius: 8
  },
  bookingTimings: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center'
  },
  t_image: {
    width: '100%',
    height: '60%',
    borderRadius: 12,
  },
  bookingCardBottom: {
    height: '40%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 12,
  },
  addReview: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    borderWidth: 4,
    height: 32,
    borderTopColor: 'white',
    borderLeftColor: 'white',
    borderRightColor: 'white',
    borderBottomColor: red,
    width: '74%',
    padding: 4,
  },
  revButton: {
    backgroundColor: red,
    width: '24%',
    padding: 4,
    height: 32,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: white,
  }
})