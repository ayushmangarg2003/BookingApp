import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React from 'react'
import { red } from '../constants/constants';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const Loader = () => {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color={red} />
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    zIndex: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(100),
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});