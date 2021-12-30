import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'

interface Styles {
  root: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  root: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  }
})

export type Props = {}

const PlayerInfoScreen: React.FC<Props> = (): JSX.Element => {
  return (
    <View style={styles.root}>
      <Text>Détails du joueur</Text>
    </View>
  )
}

export default PlayerInfoScreen
