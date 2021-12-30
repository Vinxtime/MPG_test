import MainScreen from './screens/main'
import { NavigationContainer } from '@react-navigation/native'
import PlayerInfoScreen from './screens/player_info'
import React from 'react'
import { RootStackParamList } from './screens/RootStackParams'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator<RootStackParamList>()

const RootStack = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="PlayerInfo" component={PlayerInfoScreen} />
    </Stack.Navigator>
  </NavigationContainer>
)

export default RootStack
