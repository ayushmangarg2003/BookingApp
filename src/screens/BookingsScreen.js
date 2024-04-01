import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Navbar from '../components/Navbar'
import { AuthContext } from '../context/AuthContext.js'
import axios from 'axios';
import { backendLink, red } from "../constants/constants.js"
import BookingCard from "../components/BookingCard.js"
import noData from "../assets/noData.png"
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'

const BookingsScreen = () => {
  const [authState, setAuthState] = useContext(AuthContext);
  const [bookingArray, setBookingArray] = useState([])
  const [empty, setEmpty] = useState(true)

  useEffect(() => {
    axios.get(`${backendLink}/bookings`).then(response => {
      const { data } = response;
      setBookingArray(data.reverse())
    });

    if (bookingArray.filter(checkPlace).length > 0) {
      setEmpty(false)
    }

  }, [bookingArray]);

  const checkPlace = (booking) => {
    return booking.user == authState.email
  }


  return (
    <SafeAreaView>
      <Navbar />
      <View>

        {
          empty ? (
            <View style={styles.noDataFound}>
              <Image style={styles.image} source={noData} />
              <Text style={styles.noDataText}>Nothing Here Yet!</Text>
            </View>
          ) : (
            <ScrollView style={styles.BookingCardParent}>
              {
                bookingArray.filter(checkPlace).map((item, index) => (
                  <BookingCard key={index} user={item} />
                ))
              }
            </ScrollView>
          )


        }
      </View>
    </SafeAreaView>
  )
}

export default BookingsScreen

const styles = StyleSheet.create({
  noDataFound: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(100),
  },
  image: {
    width: '75%',
    maxHeight: '40%',
    objectFit: 'contain'
  },
  noDataText: {
    fontSize: 20,
    fontWeight: '600',
  },
  BookingCardParent: {
    display: 'flex',
    gap: 12,
  }
})