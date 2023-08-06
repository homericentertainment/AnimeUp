import React from 'react'
import style from '../style'
import { View, ActivityIndicator,Text } from 'react-native'

export function Loader({event=false}) {
  return (
    <View style={style.main}>
      {event && <Text style={style.loaderText}>We are loading today's anime, please wait...</Text>}
      <ActivityIndicator size="large" color='#699BF7' style={{marginTop:30}}/>
    </View>
  )
}