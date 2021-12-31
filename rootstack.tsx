import { API_CLUBS, API_PLAYERS_POOL } from './utils/urls'
import { mainHeaderProps, playerHeaderPops } from './utils/header_props'
import { ActivityIndicator } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import PlayerInfoScreen from './screens/player_info'
import PlayersTableScreen from './screens/players_table_screen'
import React from 'react'
import { RootStackParamList } from './screens/RootStackParams'
import axios from 'axios'
import { createStackNavigator } from '@react-navigation/stack'
import { palette } from './utils/palette'

const Stack = createStackNavigator<RootStackParamList>()

type Props = {}

interface Array {
  map: Function,
  length: number,
  find: Function
}

type PlayerProps = {
  firstName: string,
  lastName: string,
  id: number,
  ultraPosition: number,
  stats: {
    averageRating: number,
    totalStartedMatches: number,
    totalPlayedMatches: number,
    totalGoals: number
  },
  quotation: number,
  clubId: number
}

// eslint-disable-next-line max-statements
const RootStack: React.FC<Props> = (): JSX.Element => {
  const [playersData, setPlayersData] = React.useState<Array>([])
  const [clubsData, setClubsData] = React.useState<Array>([])
  const [loading, setIsLoading] = React.useState<Boolean>(true)

  /* JS native object's properties sorting to ensure a relevant columns ordering. */
  /* eslint-disable sort-keys */
  const handlePlayersData = (poolPlayers: Array) => setPlayersData(poolPlayers.map((player: PlayerProps) => ({
    ultraPosition: player.ultraPosition,
    name: (`${player.firstName || ''} ${player.lastName || ''}`).trim(),
    lastName: player.lastName,
    clubId: player.clubId,
    matchesPlayed: player.stats.totalPlayedMatches
      ? (`${player.stats.totalStartedMatches}(${player.stats.totalPlayedMatches - player.stats.totalStartedMatches})`)
      : '0(0)',
    totalGoals: player.stats.totalGoals,
    quotation: player.quotation,
    averageRating: player.stats.averageRating,
    id: player.id
  })))
  /* eslint-enable sort-keys */

  const handleClubsData = (championshipClubs: Array) => setClubsData(championshipClubs.map((club:
    { id: number; name: object }) => ({ id: club.id, name: club.name['fr-FR'] })
  ))

  const loadData = () => {
    Promise.all([
      axios({ method: 'get', url: API_PLAYERS_POOL }),
      axios({ method: 'get', url: API_CLUBS })
    ]).then(([players, clubs]) => {
      const { poolPlayers } = players.data
      const { championshipClubs } = clubs.data
      handlePlayersData(poolPlayers)
      handleClubsData(Object.values(championshipClubs))
      setIsLoading(false)
    })
  }

  /*
   * Data Fetching is handled at the very top to avoid useless reloading when switching screens.
   * Would be the perfect place to include a global state such as Redux.
   * In the context of this mini-app, it would be a bad idea to pass such big data as initial params.
   * Those data are passed simply to children as route params.
   */
  React.useEffect(() => {
    loadData()
  }, [])

  if (loading) {
    return <ActivityIndicator color={palette.royalblue}/>
  } else {
    const PlayersTableScreenComponent = () => <PlayersTableScreen clubsData={clubsData} playersData={playersData}/>
    const PlayerInfoScreenComponent = () => <PlayerInfoScreen clubsData={clubsData}/>
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen name="Main" component={PlayersTableScreenComponent} options={{
            ...mainHeaderProps()
          }}/>
          <Stack.Screen name="PlayerInfo" component={PlayerInfoScreenComponent} options={{
            ...playerHeaderPops()
          }}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default RootStack
