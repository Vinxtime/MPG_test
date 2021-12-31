/* eslint-disable max-statements */
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import { DataTable } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import React from 'react'
import { headerFields } from '../../utils/index_conversion'
import moment from 'moment'
import { palette } from '../../utils/palette'

interface Styles {
  dateCell: TextStyle | ViewStyle,
  gameCell: TextStyle | ViewStyle,
  headerTitle: TextStyle,
  matchTitle: TextStyle,
  text: TextStyle,
  root: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  dateCell: {
    flex: 3,
    justifyContent: 'flex-start'
  },
  gameCell: {
    flex: 4,
    justifyContent: 'flex-start'
  },
  headerTitle: { color: palette.text,
    fontSize: RFValue(8),
    fontWeight: '600',
    justifyContent: 'center',
    letterSpacing: -0.2,
    opacity: 0.54,
    textTransform: 'uppercase'
  },
  matchTitle: { fontSize: 12, fontWeight: '600', letterSpacing: -0.2, marginVertical: 8, opacity: 0.54 },
  root: { backgroundColor: palette.overlaySecondary, padding: 12 },
  text: { color: palette.text, fontSize: RFValue(9), fontWeight: '500', letterSpacing: -0.2 }
})

interface Array {
  find: Function
}

type PlayerMatchesProps = {
  clubsData: Array,
  allGames: Array
}

const MatchesSection: React.FC<PlayerMatchesProps> = ({ clubsData, allGames }) => {
  const fields = ['day', 'game', 'date', 'performance']

  const getClubName = (game: object, type: string) => clubsData.find((club: {
    id: number
  }) =>
    club.id === game[type].clubId).name

  const isEvenNumber = (index: number) => index % 2 === 0

  const parseGameConfrontation = (game: object) => {
    const homeTeam = getClubName(game, 'home')
    const awayTeam = getClubName(game, 'away')
    return `${homeTeam} - ${awayTeam}`
  }

  /* eslint-disable sort-keys */
  const parsedData = (game: {
    gameWeekNumber: number,
    date: Date,
    playerPerformance: {
      status: number
    }
  }) => ({
    day: game.gameWeekNumber,
    game: parseGameConfrontation(game),
    date: moment(game.date).format('L'),
    performance: game.playerPerformance.status
  })
  /* eslint-enable sort-keys */

  const _renderMatchesTable = () => <DataTable>
    <DataTable.Header>
      {fields.map((field, i) => <DataTable.Title key={i}
      style={[
        { justifyContent: 'center' },
        field === 'game' && styles.gameCell,
        field === 'date' && styles.dateCell
      ]}>
        <Text style={styles.headerTitle}>{headerFields[field]}</Text></DataTable.Title>)}
    </DataTable.Header>
    {Object.values(allGames).map((game) => parsedData(game)).map((parsedGame: object, i: number) =>
      <DataTable.Row key={i}
        style={{ backgroundColor: isEvenNumber(i) ? palette.overlaySecondary : palette.overlayPrimary }}>
        {Object.values(parsedGame).map((item, j) => ([
          <DataTable.Cell key={j} style={[
            { justifyContent: 'center' },
            fields[j] === 'game' && styles.gameCell,
            fields[j] === 'date' && styles.dateCell
          ]}>
            <Text style={styles.text}>
              {`${item}`}</Text>
          </DataTable.Cell>
        ]))}
      </DataTable.Row>
    )}
  </DataTable>

  return (
    <View style={styles.root}>
      <Text style={styles.matchTitle}>Détails par match</Text>
      {_renderMatchesTable()}
    </View>
  )
}

export default MatchesSection
