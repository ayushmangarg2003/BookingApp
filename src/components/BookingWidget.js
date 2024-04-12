import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React, { useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { backendLink, red, white } from '../constants/constants';
import DatePicker from 'react-native-modern-datepicker';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

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
    <View style={styles.container}>

      <View style={styles.priceParent}>
        <Text style={styles.priceText}>Price Per Day : ₹{place.price} only </Text>
      </View>

      <View style={styles.detailsParent}>
        <View style={styles.basicDetailsParent}>
          <View style={styles.checkView}>
            {
              showCheckin ? (
                <View style={styles.calanderPicker}>
                  <TouchableOpacity onPress={handelShowCheckIn}><Text>X</Text></TouchableOpacity>
                  <DatePicker
                    mode="calendar"
                    options={{
                      backgroundColor: '#f6f6f6',
                      mainColor: red,
                      selectedTextColor: white,
                    }}
                    style={styles.calander}
                    onSelectedChange={date => setCheckIn(date)}
                  />
                </View>
              ) : (<TouchableOpacity onPress={handelShowCheckIn}><Text>Check in: {checkIn} </Text></TouchableOpacity>
              )
            }
          </View>
          <View style={styles.checkView}>
            {
              showCheckout ? (
                <View style={styles.calanderPicker}>
                  <TouchableOpacity onPress={handelShowCheckOut}><Text>X</Text></TouchableOpacity>
                  <DatePicker
                    mode="calendar"
                    options={{
                      backgroundColor: '#f6f6f6',
                      mainColor: red,
                      selectedTextColor: white,
                    }}
                    style={styles.calander}
                    onSelectedChange={date => setCheckOut(date)}
                  />
                </View>
              ) : (<TouchableOpacity onPress={handelShowCheckOut}><Text>Check out : {checkOut}</Text></TouchableOpacity>
              )
            }
          </View>
        </View>

        {numberOfNights != 0 && (
          <View style={styles.extraDetailsParent}>
            <View>
              <Text>Number of guests:</Text>
              <TextInput keyboardType='number-pad' value={numberOfGuests} placeholder={'Max: 99'} onChangeText={(text) => setNumberOfGuests(text)} maxLength={2} />
            </View>
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

      <TouchableOpacity style={styles.bookBtnParent} onPress={bookThisPlace}>
        <Text style={styles.btnText} >Book Now
          {numberOfNights > 0 && (
            <Text> at ₹{numberOfNights * place.price}</Text>
          )}
        </Text>
      </TouchableOpacity>

      <View style={styles.errorParent}>
        <Text style={styles.errorText}>
          {error}
        </Text>
      </View>
    </View>
  )
}

export default BookingWidget

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
    padding: 12,
    borderRadius: 4,
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    display: 'flex',
    gap: 20,
    alignItems: 'center'
  },
  priceParent: {
    width: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  priceText: {
    fontSize: 20,
  },
  calanderPicker: {
    width: '100%'
  },
  calander: {
    borderRadius: 10,
    zIndex: -10,
  },
  detailsParent: {
    width: '100%',
  },
  basicDetailsParent: {
    display: 'flex',
    width: '100%',
  },
  checkView: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  bookBtnParent: {
    backgroundColor: red,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: 12,
    borderRadius: 4,
  },
  btnText: {
    color: '#fff',
    fontSize:16,
    fontWeight:'600'
  },
  errorText: {
    color: red,
    position: 'relative',
    top: -10,
  }
})