import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React, { useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { backendLink, red, white } from '../constants/constants';
import DatePicker from 'react-native-modern-datepicker';

const BookingWidget = (props) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const navigation = useNavigation()
  const [error, setError] = useState("")
  const [authState, setAuthState] = useContext(AuthContext);
  const place = props.place

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = dayjs(checkOut).diff(dayjs((checkIn))) / (86400000);
  }

  const bookThisPlace = async () => {
    if (!authState.email) {
      setError("Login or Signup First");
    } else {
      const response = await axios.post(`${backendLink}/bookings`, {
        checkIn: checkIn, checkOut: checkOut, numberOfGuests: numberOfGuests, name: name, phone: phone, user: authState.email,
        place: place._id,
        price: numberOfNights * place.price,
      });
      console.log("RESPONSE", response);
      if (response.data.error) {
        setError(response.data.error)
      }
      else {
        navigation.navigate('profile');
      }
    }
  }

  const [showCheckin, setShowCheckin] = useState(false)
  const handelShowCheckIn = () => {
    setShowCheckin(!showCheckin)
  }
  const [showCheckout, setShowCheckout] = useState(false)
  const handelShowCheckOut = () => {
    setShowCheckout(!showCheckout)
  }


  return (
    <View>
      <View>
        <View>
          <Text>Price: ₹{place.price} / per night </Text>
        </View>
        <View>
          <View>
            <View>
              <Text>Check in: {checkIn}</Text>
              {
                showCheckin ? (
                  <View>
                    <TouchableOpacity onPress={handelShowCheckIn}><Text>X</Text></TouchableOpacity>
                    <DatePicker
                      mode="calendar"
                      options={{
                        backgroundColor: '#f6f6f6',
                        mainColor: red,
                        selectedTextColor: white,
                      }}
                      style={{ borderRadius: 10 }}
                      onSelectedChange={date => setCheckIn(date)}
                    />
                  </View>
                ) : (<TouchableOpacity onPress={handelShowCheckIn}><Text>Hello</Text></TouchableOpacity>
                )
              }
            </View>
            <View>
              <Text>Check out: {checkOut}</Text>
              {
                showCheckout ? (
                  <View>
                    <TouchableOpacity onPress={handelShowCheckOut}><Text>X</Text></TouchableOpacity>
                    <DatePicker
                      mode="calendar"
                      options={{
                        backgroundColor: '#f6f6f6',
                        mainColor: red,
                        selectedTextColor: white,
                      }}
                      style={{ borderRadius: 10 }}
                      onSelectedChange={date => setCheckOut(date)}
                    />
                  </View>
                ) : (<TouchableOpacity onPress={handelShowCheckOut}><Text>Hello</Text></TouchableOpacity>
                )
              }
            </View>
          </View>
          <View>
            <Text>Number of guests:</Text>
            <TextInput keyboardType='number-pad' value={numberOfGuests} placeholder={'Max: 99'} onChangeText={(text) => setNumberOfGuests(text)} maxLength={2} />
          </View>
          {numberOfNights != 0 && (
            <View>
              <View>
                <Text>Your full name:</Text>
                <TextInput placeholder='Max Characters: 50' value={name} onChangeText={(text) => setName(text)} maxLength={50} />
              </View>
              <View>
                <Text>Phone number:</Text>
                <TextInput keyboardType='number-pad' value={`${phone}`} placeholder='9876543210' onChangeText={(text) => setPhone(text)} maxLength={10} />
              </View>
            </View>
          )}
        </View>
        <TouchableOpacity onPress={bookThisPlace}>
          <Text>Book Now
            {numberOfNights > 0 && (
              <Text> at ₹{numberOfNights * place.price}</Text>
            )}
          </Text>
        </TouchableOpacity>
        <View>
          <Text>
            {error}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default BookingWidget

const styles = StyleSheet.create({})