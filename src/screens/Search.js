import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from '@react-native-material/core'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { backendLink, red, white } from '../constants/constants'
import axios from 'axios'
import PlaceCard from '../components/PlaceCard'

const Search = () => {
  const [search, setSearch] = useState("")
  const [placesArray, setPlacesArray] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${backendLink}/places`).then(response => {
      const { data } = response;
      setPlacesArray(data.reverse())
      setLoading(false)
    });
  }, []);

  let filtered = [];
  for (let i = 0; i < placesArray.length; i++) {
    if (placesArray[i].address.toLowerCase().includes(search.toLowerCase())) {
      filtered = [...filtered, placesArray[i]];
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Navbar />
      <TextInput value={search} onChangeText={(e) => { setSearch(e) }} style={styles.searchBar} color={red} placeholder='Search By Place' />
      <ScrollView style={styles.card_container_parent}>
        <View style={styles.card_container}>
          {
            filtered.map((item) => (
              <PlaceCard key={item._id} place={item} />
            ))
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    height: heightPercentageToDP(93),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card_container_parent:{
    width:'100%',
    paddingVertical:8
  },
  card_container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  searchBar: {
    width: '90%',
    display: 'flex',
    justifyContent: 'center',
    height: heightPercentageToDP(8),
    alignSelf: 'center',
  }
})