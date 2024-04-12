import { Dimensions, Image, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import axios from 'axios'
import { backendLink, red, white } from "../constants/constants"
import Carousel from 'react-native-snap-carousel';
import BookingWidget from '../components/BookingWidget'
import Loader from "../components/Loader"


export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 1);



const renderItem = ({ item }) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: white,
        width: widthPercentageToDP(100),
        height: 450,
        borderRadius: 30,
      }}>
      <Image source={{ uri: item }} style={{ width: '100%', height: '100%' }} />
    </View>
  );
};


const SinglePlaceScreen = (props) => {
  const [place, setPlace] = useState({
    photos: [],
    perks: []
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${backendLink}/places/${props.route.params.place._id}`).then(response => {
      const { data } = response;
      setPlace(data)
      setLoading(false)
    })
  }, [])

  const photos = place.photos
  const perks = place.perks

  const [review, setReview] = useState([])
  const [filtered, setFiltered] = useState([])
  const [showRev, setShowRev] = useState(false)

  useEffect(() => {
    axios.get(`${backendLink}/review/getReview`).then(response => {
      const { data } = response;
      const temp = review.filter(checkPlace)
      setReview(data.reverse())
      if (temp.length > 3) {
        setFiltered(temp.slice(0, 3))
      }
      else if (temp.length > 0) {
        setFiltered(temp)
      }
    })
  }, [showRev]);

  const handelReviews = () => {
    setShowRev(!showRev)

  }

  const checkPlace = (review) => {
    return review.place == place._id
  }

  return <>
    {

      loading ? (<Loader />) : (<SafeAreaView>
        <ScrollView style={styles.scrollview}>
          <View>
            <Carousel
              data={photos}
              renderItem={renderItem}
              sliderWidth={SLIDER_WIDTH}
              itemWidth={ITEM_WIDTH}
            />
          </View>

          <View style={styles.bottomSection}>


            <Text style={styles.title}>{place.title.trim()}</Text>
            <Text style={styles.address}>{place.address.trim()}</Text>
            <Text style={styles.body}>{place.description.trim()}</Text>


            <View style={styles.numbers}>
              <Text style={styles.number}>Max Guests: {place.maxGuests.toString()}</Text>
              <Text style={styles.number}>Check In : {place.checkIn.toString()}</Text>
              <Text style={styles.number}>Check Out : {place.checkOut.toString()}</Text>
            </View>

            <View style={styles.perks}>
              {
                perks.map((item, index) => (
                  <Text style={styles.perk} key={index}>{item}</Text>
                ))
              }
            </View>

            <BookingWidget place={place} />

            <Text style={styles.title}>Extra Info.</Text>
            <Text style={styles.body}>{place.extraInfo}</Text>


            <View>
              {
                !showRev ? (<TouchableOpacity style={styles.reviewToggleButton} onPress={handelReviews}><Text style={styles.reviewToggleText}>See Reviews</Text></TouchableOpacity>
                ) : (
                  <>
                    <TouchableOpacity style={styles.reviewToggleButton} onPress={handelReviews}><Text style={styles.reviewToggleText}>Hide Reviews</Text></TouchableOpacity>
                    <View>
                      <Text style={styles.title}>Reviews</Text>
                    </View>
                    <View style={styles.reviews_parent}>
                      {
                        filtered.map((item, index) => (
                          <View key={index} style={styles.review}>
                            <Text style={styles.review_text}>{item.review}</Text>
                            <View style={styles.review_red}></View>
                          </View>
                        ))
                      }
                    </View>
                  </>
                )
              }
            </View>
          </View>

        </ScrollView>
      </SafeAreaView>)
    }
  </>

}

export default SinglePlaceScreen

const styles = StyleSheet.create({
  scrollview: {
    backgroundColor: '#fff',
  },
  bottomSection: {
    borderRadius: 30,
    paddingHorizontal: 12,
    paddingTop: 12,
    position: 'relative',
    backgroundColor: '#fff',
    top: -30,
  },
  img: {
    width: 120,
    height: 120
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
  },
  address: {
    fontSize: 16,
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
  perks: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: 12,
  },
  body:{
    
  },
  perk: {
    backgroundColor: red,
    color: white,
    borderRadius: 4,
    fontWeight: '800',
    textAlign: 'center',
    paddingVertical: 4,
    width: widthPercentageToDP(20),
    textTransform: 'capitalize'
  },
  numbers: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  number: {
    width: '32%',
    textAlign: 'center',
    paddingVertical: 12,
    backgroundColor: '#ededed',
  },
  reviews_parent: {
    display: 'flex',
    gap: 8,
  },
  review: {
    backgroundColor: '#ededed',
    display: 'flex',
    flexDirection: 'row-reverse',
    borderRadius: 20
  },
  review_red: {
    width: '10%',
    backgroundColor: red
  },
  review_text: {
    width: "90%",
    padding: 8,
    fontSize: 12,
  },
  reviewToggleButton: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    padding: 12,
  },
  reviewToggleText: {
    fontSize: 16,
    fontWeight: '600',
  },
})