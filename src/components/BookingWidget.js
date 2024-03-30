import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';

const BookingWidget = (props) => {
    const price = props.price
    const _id = props._id
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigation()
    const [error, setError] = useState("")

    const user = null

    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = checkOut - checkIn
    }

    const bookThisPlace = async () => {
        if (!user) {
            setError("Login or Signup First");
        } else {

            const response = await axios.post(`${BackendLink}/bookings`, {
                checkIn: checkIn, checkOut: checkOut, numberOfGuests: numberOfGuests, name: name, phone: phone, user: user.email,
                place: _id,
                price: numberOfNights * price,
            });
            console.log("RESPONSE", response);
            if (response.data.error) {
                setError(response.data.error)
            }
            else {
                const bookingId = response.data._id;
                navigate(`/profile/bookings`);
            }
        }
    }

    return (
        <View className='widget-parent'>
            <View className='widget-price'>
                <Text>Price: ₹{price} / per night</Text>
            </View>
            <View className='widget-detail-parent'>
                <View className='widget-details'>
                    <View className='widget-check'>
                        <Text>Check in:</Text>
                        <TextInput type="date"
                            value={checkIn}
                            required={true}
                            onChange={ev => setCheckIn(ev.target.value)} />
                    </View>
                    <View className='widget-check'>
                        <Text>Check out:</Text>
                        <TextInput type="date" required={true} value={checkOut}
                            onChange={ev => setCheckOut(ev.target.value)} />
                    </View>
                </View>
                <View className='widget-max-guest'>
                    <Text>Number of guests:</Text>
                    <TextInput type="number"
                        required={true}
                        value={numberOfGuests}
                        onChange={ev => setNumberOfGuests(ev.target.value)} />
                </View>
                {numberOfNights > 0 && (
                    <View className='extra-details'>
                        <View className='widget-extra'>
                            <Text>Your full name:</Text>
                            <TextInput type="text"
                                required={true}
                                value={name}
                                onChange={ev => setName(ev.target.value)} />
                        </View>
                        <View className='widget-extra'>
                            <Text>Phone number:</Text>
                            <TextInput type="tel"
                                placeholder='+919876543210'
                                required={true}
                                value={phone}
                                onChange={ev => setPhone(ev.target.value)} />
                        </View>
                    </View>
                )}
            </View>
            <TouchableOpacity onClick={bookThisPlace}>
                Book Now at
                {numberOfNights > 0 && (
                    <Text> ₹{numberOfNights * price}</Text>
                )}
            </TouchableOpacity>
            <View className="error">
                <Texy>
                    {error}
                </Texy>
            </View>
        </View>
    )
}

export default BookingWidget

const styles = StyleSheet.create({})