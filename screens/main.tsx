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

const MainScreen: React.FC<Props> = (): JSX.Element => {
  return (
    <View style={styles.root}>
      <Text>Tableau</Text>
    </View>
  )
}

export default MainScreen
