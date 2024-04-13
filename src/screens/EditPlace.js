import { Alert, Image, ScrollView, TextInput, TouchableOpacity } from "react-native"
import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { backendLink, red } from "../constants/constants.js"
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { heightPercentageToDP } from "react-native-responsive-screen"
import * as ImagePicker from "expo-image-picker";
import Loader from '../components/Loader.js'
import { ArrowUpOnSquareIcon } from 'react-native-heroicons/outline';

const EditPlace = (props) => {

  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('0');
  const [checkOut, setCheckOut] = useState('0');
  const [maxGuests, setMaxGuests] = useState('0');
  const [price, setPrice] = useState('0');

  const [length, setLength] = useState('0');
  const [loading, setLoading] = useState(true)

  const [perk1, setPerk1] = useState(false);
  const [perk2, setPerk2] = useState(false);
  const [perk3, setPerk3] = useState(false);
  const [perk4, setPerk4] = useState(false);
  const [owner, setOwner] = useState(props.route.params.user)
  const navigation = useNavigation()

  const id = props.route.params.place._id
  const getUser = async () => {
    await axios.get(`${backendLink}/places/${id}`).then(response => {
      setOwner(response.data.owner)
      setTitle(response.data.title);
      setAddress(response.data.address);
      setAddedPhotos(response.data.photos);
      setDescription(response.data.description);
      setPerks(response.data.perks);
      setExtraInfo(response.data.extraInfo);
      setCheckIn(response.data.checkIn);
      setCheckOut(response.data.checkOut);
      setMaxGuests(response.data.maxGuests);
      setPrice(response.data.price);
    })
    setLoading(false)
  }
  useEffect(() => {
    getUser()
  }, [])


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

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        `Sorry, we need permission to upload images.`
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) {
        const file = result.assets[0].uri
        const base64 = await convertToBase64(file);
        addedPhotos.push(base64)
        setLength(length - 1)
      }
    }
  };

  const deletePicture = () => {
    addedPhotos.pop()
    setAddedPhotos(addedPhotos)
    setLength(length + 1)
  }

  const convertToBase64 = async (file) => {
    const data = await fetch(file);
    const blob = await data.blob();
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data);
      };
    });

  }

  const handelSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    if (title.length == 0 || description.length == 0 || address.length == 0) {
      alert("Title, Address and Description are Required")
      setLoading(false)
      return
    }
    else if (price <= 0) {
      alert("Price should be greater than ₹0")
      setLoading(false)
      return
    }
    else if (addedPhotos.length == 0) {
      alert("Add Atleast one Photo")
      setLoading(false)
      return
    }

    const placeData = {
      owner, title, address, addedPhotos,
      description, perks, extraInfo,
      checkIn, checkOut, maxGuests, price,
    };
    await axios.put(`${backendLink}/places`, { id, ...placeData });
    navigation.navigate('profilePlace')
    setLoading(false)
  }

  return (
    <SafeAreaView>
      {
        loading ? (<Loader />) : (<></>)
      }
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          {/* Title */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Title</Text>
            <TextInput style={styles.textInput} placeholder='Max Characters: 50' value={title.toString()} onChangeText={(text) => setTitle(text)} maxLength={50} />
          </View>

          {/* Address */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Address</Text>
            <TextInput style={styles.textInput} placeholder="Ex: Delhi, India" value={address.toString()} onChangeText={(text) => setAddress(text)} />
          </View>

          {/* Description */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Description</Text>
            <TextInput style={styles.textInput} value={description.toString()} placeholder='Max Characters: 500' onChangeText={(text) => setDescription(text)} maxLength={500} />
          </View>

          {/* Extra Information */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Extra Information</Text>
            <TextInput style={styles.textInput} value={extraInfo.toString()} placeholder='Max Characters: 500' onChangeText={(text) => setExtraInfo(text)} />
          </View>

          {/* Images */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Upload Images</Text>
            <View>
              <TouchableOpacity
                onPress={pickImage}>
                {/* <Text> */}
                <ArrowUpOnSquareIcon width={'60px'} height={'60px'} strokeWidth={1} color={'#111'} />
                {/* </Text> */}
              </TouchableOpacity>
            </View>

            <View style={styles.imageGallery}>
              {
                addedPhotos.map((item, index) => (
                  <Image key={index} style={styles.image} source={{ uri: item }} />
                ))
              }
            </View>
            <View>
              {
                addedPhotos.length > 0 ? (
                  <TouchableOpacity style={styles.btnParentSmall} onPress={deletePicture}><Text style={styles.btnText}>Remove Photo</Text></TouchableOpacity>
                ) : (<></>)
              }
            </View>
          </View>

          {/* Perks */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Perks</Text>
            <View style={styles.perkParent}>
              <View style={styles.perk}>
                <BouncyCheckbox
                  disableBuiltInState
                  isChecked={perk1}
                  onPress={() => handleCbClick(1, 'wifi')}
                  fillColor={red}
                />
                <Text>WiFi</Text>
              </View>
              <View style={styles.perk}>
                <BouncyCheckbox
                  disableBuiltInState
                  isChecked={perk2}
                  onPress={() => handleCbClick(2, 'parking')}
                  fillColor={red}
                />
                <Text>Parking</Text>
              </View>
              <View style={styles.perk}>
                <BouncyCheckbox
                  disableBuiltInState
                  isChecked={perk3}
                  onPress={() => handleCbClick(3, 'pool')}
                  fillColor={red}
                />
                <Text>Pool</Text>
              </View>
              <View style={styles.perk}>
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
          {/* CheckIn */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>CheckIn</Text>
            <View>
              <TextInput style={styles.textInput} keyboardType='number-pad' value={checkIn.toString()} placeholder='Check In [0-24]' onChangeText={(text) => setCheckIn(text)} maxLength={2} />
            </View>
          </View>

          {/* CheckOut */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>CheckOut</Text>
            <View>
              <TextInput style={styles.textInput} keyboardType='number-pad' value={checkOut.toString()} placeholder='Check Out [0-24]' onChangeText={(text) => setCheckOut(text)} maxLength={2} />
            </View>
          </View>

          {/* Max Guests */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Maximum Guests</Text>
            <View>
              <TextInput style={styles.textInput} keyboardType='number-pad' value={maxGuests.toString()} placeholder='Max Guests [0-99]' onChangeText={(text) => setMaxGuests(text)} maxLength={2} />
            </View>
          </View>

          {/* Price */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Price Per Night (₹)</Text>
            <View>
              <TextInput style={styles.textInput} keyboardType='number-pad' value={price.toString()} placeholder='For Ex: 10000' onChangeText={(text) => setPrice(text)} />
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.btnParent} onPress={handelSubmit}>
            <Text style={styles.btnText}>Save</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default EditPlace

const styles = StyleSheet.create({
  scrollView: {
    height: heightPercentageToDP(100),
  },
  formContainer: {
    display: 'flex',
    gap: 12,
    marginVertical: 20,
  },
  inputContainer: {
    width: '95%',
    alignSelf: 'center',
    padding: 4,
    backgroundColor: '#fff',
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  inputText: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: 16,
    paddingVertical: 4,
    fontWeight: '800',
  },
  imageGallery: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  image: {
    objectFit: 'cover',
    width: '30%',
    height: 108,
    borderRadius: 8,
  },
  btnParent: {
    backgroundColor: red,
    width: '95%',
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    padding: 12,
    borderRadius: 4,
  },
  btnParentSmall: {
    backgroundColor: red,
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 4,
    marginVertical: 8,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  perkParent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 16,
    padding: 0,
  },
  perk: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
})