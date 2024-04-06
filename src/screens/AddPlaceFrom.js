import { Image, TextInput, TouchableOpacity } from "react-native"

import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { backendLink, red } from "../constants/constants.js"
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import BouncyCheckbox from "react-native-bouncy-checkbox";

/* 

*/
const AddPlaceFrom = (props) => {

  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [photoDev, setPhotoDev] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('0');
  const [checkOut, setCheckOut] = useState('0');
  const [maxGuests, setMaxGuests] = useState('0');
  const [price, setPrice] = useState('0');
  const [length, setLength] = useState('0');

  const [perk1, setPerk1] = useState(false);
  const [perk2, setPerk2] = useState(false);
  const [perk3, setPerk3] = useState(false);
  const [perk4, setPerk4] = useState(false);

  const navigation = useNavigation()
  const owner = props.route.params.user;


  const handleCbClick = (perknum, perkname) => {
    if (perknum == 1) {
      setPerk1(!perk1)
      !perk1 ? (setPerks([...perks, perkname])) : (setPerks([...perks.filter(selectedName => selectedName !== perkname)]))
    }
    if (perknum == 2) {
      setPerk2(!perk2)
      !perk2 ? (setPerks([...perks, perkname])) : (setPerks([...perks.filter(selectedName => selectedName !== perkname)]))
    }
    if (perknum == 3) {
      setPerk3(!perk3)
      !perk3 ? (setPerks([...perks, perkname])) : (setPerks([...perks.filter(selectedName => selectedName !== perkname)]))
    }
    if (perknum == 4) {
      setPerk4(!perk4)
      !perk4 ? (setPerks([...perks, perkname])) : (setPerks([...perks.filter(selectedName => selectedName !== perkname)]))
    }
  }

  console.log(perks);

  const handelPhotoDevice = async (e) => {
    const file = e.target.files[0]
    const base64 = await convertToBase64(file);
    setPhotoDev(base64)
    e.target.value = null;
  }

  const handelPhotoClick = () => {
    if (photoDev) {
      addedPhotos.push(photoDev)
      setPhotoDev('')
    }
  }

  const deletePicture = () => {
    addedPhotos.pop()
    setAddedPhotos(addedPhotos)
    setLength(length + 1)
  }

  const handelSubmit = async (e) => {
    e.preventDefault()
    if (title.length == 0 || description.length == 0 || address.length == 0) {
      alert("Title, Address and Description are Required")
      return
    }
    else if (price <= 0) {
      alert("Enter Valid Price")
      return
    }
    else if (addedPhotos.length == 0) {
      alert("Add Atleast one Photo")
      return
    }
    const placeData = {
      owner, title, address, addedPhotos,
      description, perks, extraInfo,
      checkIn, checkOut, maxGuests, price,
    };
    await axios.post(`${backendLink}/places`, placeData);
    navigation.navigate('profilePlace')
  }

  const convertToBase64 = (file) => {
    return new promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result)
      };
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  return (
    <SafeAreaView>
      <View>
        <View>

          <View>
            <Text>Title</Text>
            <Text>Title Should be Short but Catchy</Text>
            <TextInput placeholder='Max Characters: 50' value={title} onChangeText={(text) => setTitle(text)} maxLength={50} />
          </View>

          <View>
            <Text>Address</Text>
            <Text>Address of the Place</Text>
            <TextInput placeholder="Ex: Delhi, India" value={address} onChangeText={(text) => setAddress(text)} />
          </View>

          <View>
            <Text>Description</Text>
            <Text>Description of the Place</Text>
            <TextInput value={description} placeholder='Max Characters: 500' onChangeText={(text) => setDescription(text)} maxLength={500} />
          </View>

          <View>
            <Text>Extra Information</Text>
            <Text>House Rules Etc</Text>
            <TextInput value={extraInfo} placeholder='Max Characters: 500' onChangeText={(text) => setExtraInfo(text)} />
          </View>
          {/* Images */}
          <View>
            <Text>Images</Text>
            <Text>More = Better</Text>
            <View>
              {/* <input
                  type="file"
                  className='file-upload'
                  accept='.jpeg, .png, .jpg , .webp'
                  onChange={(ev) => handelPhotoDevice(ev)}
                /> 
              <TouchableOpacity onPress={handelPhotoClick}><Text>Add</Text></TouchableOpacity> 
              */}
            </View>

            <View>
              {/* {
                addedPhotos.length > 0 ? (
                  <TouchableOpacity onPress={deletePicture} className='image-button'><Text>Remove Photo</Text></TouchableOpacity>
                ) : (<></>)
              } */}
            </View>

            <View>
              {
                addedPhotos.map((item, index) => (
                  <Image key={index} source={item} />
                ))
              }
            </View>

          </View>
          {/* Perks */}
          <View>
            <Text>Perks</Text>
            <Text>Checkmark Perks</Text>
            <View>
              <View>
                <BouncyCheckbox
                  disableBuiltInState
                  isChecked={perk1}
                  onPress={() => handleCbClick(1, 'wifi')}
                  fillColor={red}
                />
                <Text>WiFi</Text>
              </View>
              <View>
                <BouncyCheckbox
                  disableBuiltInState
                  isChecked={perk2}
                  onPress={() => handleCbClick(2, 'parking')}
                  fillColor={red}
                />
                <Text>Parking</Text>
              </View>
              <View>
                <BouncyCheckbox
                  disableBuiltInState
                  isChecked={perk3}
                  onPress={() => handleCbClick(3, 'pool')}
                  fillColor={red}
                />
                <Text>Pool</Text>
              </View>
              <View>
                <BouncyCheckbox
                  disableBuiltInState
                  isChecked={perk4}
                  onPress={() => handleCbClick(4, 'tv')}
                  fillColor={red}
                />
                <Text>TV</Text>
              </View>
            </View>
          </View>

          <View>
            <Text>CheckIn</Text>
            <View>
              <TextInput keyboardType='number-pad' value={checkIn} placeholder='Check In [0-24]' onChangeText={(text) => setCheckIn(text)} maxLength={2} />
            </View>
          </View>

          <View>
            <Text>CheckOut</Text>
            <View>
              <TextInput keyboardType='number-pad' value={checkOut} placeholder='Check Out [0-24]' onChangeText={(text) => setCheckOut(text)} maxLength={2} />
            </View>
          </View>

          <View>
            <Text>Maximum Guests</Text>
            <View>
              <TextInput keyboardType='number-pad' value={maxGuests} placeholder='Max Guests [0-99]' onChangeText={(text) => setMaxGuests(text)} maxLength={2} />
            </View>
          </View>

          <View>
            <Text>Price Per Night</Text>
            <Text>In Rupees</Text>
            <View>
              <TextInput keyboardType='number-pad' value={price} placeholder='For Ex: 10000' onChangeText={(text) => setPrice(text)} />
            </View>
          </View>

          <TouchableOpacity onPress={handelSubmit}>
            <Text>Save</Text>
          </TouchableOpacity>

        </View>
      </View>
    </SafeAreaView>
  )
}

export default AddPlaceFrom

const styles = StyleSheet.create({})