/* eslint-disable max-statements */
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RouteProp, useRoute } from '@react-navigation/native'
import React from 'react'
import { API_PLAYER_DETAIL } from './../utils/urls'
import { RootStackParamList } from './RootStackParams'
import axios from 'axios'
import { palette } from '../utils/palette'
import positions from '../utils/positions'
import { RFValue } from 'react-native-responsive-fontsize'
import { DataTable } from 'react-native-paper'
import { headerFields } from '../utils/index_conversion'
import PlayerStatsSection from './player_info/stats_section'

type RouteMainScreenProps = RouteProp<RootStackParamList, 'PlayerInfo'>

const styles = StyleSheet.create({
  basicSectionRoot: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '4%'
  },
  bigTitle: { color: palette.text,
    fontSize: 12,
    fontWeight: '600',
    justifyContent: 'center',
    letterSpacing: -0.2,
    marginBottom: 8,
    opacity: 0.54,
    textTransform: 'uppercase'
  },
  careerStatsSection: {
    backgroundColor: palette.overlayPrimary,
    borderRadius: 5,
    marginTop: '4%',
    paddingVertical: 12,
    paddingHorizontal: 12
  },
  championshipName: { fontSize: 14, fontWeight: '600', letterSpacing: -0.2, opacity: 0.54, marginBottom: 8 },
  clubName: { fontSize: 18, fontWeight: '600', letterSpacing: -0.2, opacity: 0.54 },
  headerTitle: { color: palette.text,
    fontSize: RFValue(8),
    fontWeight: '600',
    justifyContent: 'center',
    letterSpacing: -0.2,
    opacity: 0.54,
    textTransform: 'uppercase'
  },
  playerName: { fontSize: 18, fontWeight: '600', letterSpacing: -0.2, marginRight: 4 },
  positionView: {
    alignItems: 'center',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    marginRight: 12,
    top: 2,
    width: 40
  },
  root: { flex: 1, justifyContent: 'flex-start' },
  text: { color: palette.text, fontSize: RFValue(9), fontWeight: '500', letterSpacing: -0.2 }

})

type PlayerInfoProps = NativeStackScreenProps<RootStackParamList, 'PlayerInfo'>
const PlayerInfoScreen: React.FC<PlayerInfoProps> = ({ clubsData }) => {
  const [playerData, setPlayerData] = React.useState<Array>([])
  const [loading, setIsLoading] = React.useState<Boolean>(true)
  const route = useRoute<RouteMainScreenProps>()
  const loadData = () => {
    const baseUrl = `${API_PLAYER_DETAIL}/${route.params.playerId}/2021`
    axios({ method: 'get', url: baseUrl }).then((response) => {
      setPlayerData(response.data)
      setIsLoading(false)
    })
  }

  React.useEffect(() => {
    loadData()
  }, [])

  const _renderClubs = () => {
    const championships = Object.values(playerData.championships)
    const flattenedClubs = championships.map((championship) => {
      const clubIds = Object.keys(championship.clubs)
      return clubIds
    })

    const stringifyClubs = flattenedClubs.flat().map((clubId) =>
      clubsData.find(item => item.id === clubId).name
    ).join(', ')
    return stringifyClubs
  }

  const _renderBasicInfoSection = () => {
    const { name, ultraPosition } = route.params
    return (
      <View style={styles.basicSectionRoot}>
        <View style={[
          styles.positionView, {
            backgroundColor: positions[ultraPosition].color
          }
        ]}>
          <Text>{positions[ultraPosition].label}</Text>
        </View>
        <Text style={styles.playerName}>{name}</Text>
        <Text style={styles.clubName}>{`- ${_renderClubs()}`}</Text>
      </View>
    )
  }

  if (loading) {
    return <View style={{ flex: 1, justifyContent: 'center' }}>
      <ActivityIndicator color={palette.royalblue}/>
    </View>
  } else {
    const championships = Object.values(playerData.championships)
    return (
      <ScrollView>
        <View style={styles.root}>
          {_renderBasicInfoSection()}
          <PlayerStatsSection championships={championships} clubsData={clubsData}/>
        </View>
      </ScrollView>
    )
  }
}

export default PlayerInfoScreen
