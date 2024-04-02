import { Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import { backendLink } from '../constants/constants'
import axios from 'axios'
import PlaceCard from '../components/PlaceCard'
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'

const Search = () => {
  const [search, setSearch] = useState("")
  const [placesArray, setPlacesArray] = useState([])
  const [loading, setLoading] = useState(true)
  const navigation = useNavigation()

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
  const ios = Platform.OS == 'ios';
  const topMargin = ios ? 12 : 40;

  const handleProfile = () => {
    navigation.navigate('profile')
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: topMargin }}>

        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>Let's Explore</Text>
          <TouchableOpacity onPress={handleProfile}>
            <Image style={styles.avatarImg} source={require('../assets/avatar.png')} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <MagnifyingGlassIcon size={20} strokeWidth={3} color={'#999'} />
            <TextInput
              placeholder='Search By City'
              placeholderTextColor={'#999'}
              value={search}
              onChangeText={(e) => { setSearch(e) }}
              style={{ marginHorizontal: 16, width: '50%' }}
            />
          </View>
        </View>

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
    display: 'flex',
    backgroundColor: '#fff',
  },
  avatarContainer: {
    marginHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  avatarText: {
    fontWeight: 'bold',
    fontSize: widthPercentageToDP(7),
  },
  avatarImg: {
    height: widthPercentageToDP(12),
    width: widthPercentageToDP(12),
  },
  searchContainer: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  searchBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    padding: 16,
    marginHorizontal: 8,
    paddingLeft: 24,
    backgroundColor: '#eaeaea'
  },
  // container: {
  //   height: heightPercentageToDP(93),
  //   display: 'flex',
  //   flexWrap: 'wrap',
  //   justifyContent: 'space-between',
  // },
  card_container_parent: {
    width: '100%',
    paddingVertical: 8
  },
  card_container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
})