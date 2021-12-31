import { Dimensions, StyleSheet, Text, TextStyle, TouchableOpacity } from 'react-native'
import React from 'react'
import { RootStackParamList } from '../screens/RootStackParams'
import { StackNavigationProp } from '@react-navigation/stack'
import { palette } from './../utils/palette'
import { useNavigation } from '@react-navigation/native'

interface Styles {
  title: TextStyle
}

type mainScreenProp = StackNavigationProp<RootStackParamList, 'PlayerInfo'>

const styles = StyleSheet.create<Styles>({
  title: { color: '#fff',
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: 0.1,
    width: Dimensions.get('window').width }
})

const headerStyle = {
  backgroundColor: palette.grass,
  borderBottomColor: palette.grass,
  height: Dimensions.get('window').width * 0.25
}

const BackButton = () => {
  const navigation = useNavigation<mainScreenProp>()
  return (
    <TouchableOpacity style={{ paddingLeft: '12%' }} onPress={() => navigation.navigate('Main')}>
       <Text style={styles.title}>{'X'}</Text>
    </TouchableOpacity>
  )
}

export const playerHeaderPops = () => ({
  gestureEnabled: false,
  headerLeft: () => <BackButton/>,
  headerStyle,
  headerTitle: () => <Text style={[
    styles.title,
    { width: 'auto' }
  ]}>Détails joueur</Text>
})

export const mainHeaderProps = () => ({
  gestureEnabled: false,
  headerLeft: () => null,
  headerRight: () => null,
  headerStyle,
  headerTitle: () => <Text style={styles.title}>Liste des joueurs</Text>
})
