import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import { backendLink, red, white } from '../constants/constants'
import axios from 'axios'
import noData from "../assets/noPlaces.png"
import PlaceCard from '../components/PlaceCard'
import { AuthContext } from '../context/AuthContext'
import Loader from '../components/Loader'

const ProfilePlacesScreen = () => {
  const [authState, setAuthState] = useContext(AuthContext);

  const navigation = useNavigation()
  const [placesArray, setPlacesArray] = useState([])
  const [loading, setLoading] = useState(true)
  const [empty, setEmpty] = useState(true)

  useEffect(() => {
    axios.get(`${backendLink}/places`).then(response => {
      const { data } = response;
      setPlacesArray(data.reverse())
      setLoading(false)
    });
    if (placesArray.filter(checkPlace).length > 0) {
      setEmpty(false)
    }

  }, [placesArray]);


  const checkPlace = (place) => {
    return place.owner == authState.email
  }


  const handelAddClick = () => {
    navigation.navigate('addPlace', { user: authState.email })
  }

  return (
    <SafeAreaView style={styles.container}>
      {
        loading ? (<Loader />) : (<></>)
      }
      {
        empty ? (
          <View style={styles.noDataFound}>
            <Image style={styles.image} source={noData} />
            <Text style={styles.noDataText}>No Places Here</Text>
          </View>) : (
          <ScrollView style={styles.cardParent} showsVerticalScrollIndicator={false}>
            <View>
              <TouchableOpacity style={styles.newBtn} onPress={handelAddClick}><Text style={styles.btnText}>Add New Places</Text></TouchableOpacity>
            </View>
            <View style={styles.cardContainer}>
              {
                placesArray.filter(checkPlace).map((item) => (
                  <PlaceCard to={'editPlace'} key={item._id} place={item} />
                ))
              }
            </View>
          </ScrollView>
        )
      }

    </SafeAreaView>
  )
}

export default ProfilePlacesScreen

const styles = StyleSheet.create({
  noDataFound: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    width: widthPercentageToDP(100),
    height: "90%",
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
  container: {
    width: widthPercentageToDP(100),
    display: 'flex',
    gap: 12,
    height: '100%',
    alignItems: 'center',
  },
  newBtn: {
    backgroundColor: red,
    padding: 12,
    width: "50%",
    alignSelf: 'center',
    borderRadius: 20,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center'
  },
  cardParent: {
    width: '100%',
    paddingVertical: 0,
    height: '100%',
  },
  cardContainer: {
    padding: 12,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  }
})