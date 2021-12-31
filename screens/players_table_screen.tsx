/* eslint-disable max-statements */
import { FlatList, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native'
import { DataTable } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import React from 'react'
import { RootStackParamList } from './RootStackParams'
import { StackNavigationProp } from '@react-navigation/stack'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { headerFields } from '../utils/index_conversion'
import { palette } from '../utils/palette'
import positions from '../utils/positions'
import { useNavigation } from '@react-navigation/native'

interface Styles {
  headerTitle: TextStyle,
  cellName: TextStyle,
  cellRating: TextStyle,
  root: ViewStyle,
  text: TextStyle
}

interface Array {
  map: Function,
  find: Function,
  filter: Function
}

type StackMainScreenProps = StackNavigationProp<RootStackParamList, 'Main'>

type PlayersProps = {
  playersData: Array,
  clubsData: Array
}

const styles = StyleSheet.create<Styles>({
  cellName: { flex: 3, justifyContent: 'flex-start', paddingLeft: '2%' },
  cellRating: { flex: 2, justifyContent: 'center' },
  headerTitle: { color: palette.text,
    fontSize: RFValue(8),
    fontWeight: '600',
    justifyContent: 'center',
    letterSpacing: -0.2,
    opacity: 0.54,
    textTransform: 'uppercase'
  },
  root: {
    alignItems: 'center',
    backgroundColor: palette.root,
    flex: 1,
    justifyContent: 'center',
    paddingTop: '10%'
  },
  text: { color: palette.text, fontSize: RFValue(9), fontWeight: '500', letterSpacing: -0.2 }
})

const PlayersTableScreen: React.FC<PlayersProps> = ({ playersData, clubsData }): JSX.Element => {
  const navigation = useNavigation<StackMainScreenProps>()
  const [sortedBy, setSortedBy] = React.useState<string>('id')
  const [sortDirection, setSortDirection] = React.useState<string>('asc')

  const fields = Object.keys(playersData[0])

  // Some values must be arranged.
  const tableValue = (item: any) => ({
    averageRating: item ? parseFloat(item).toFixed(2) : 'Non noté',
    clubId: clubsData.find((club: { id: number}) => club.id === item)?.name,
    matchesPlayed: item,
    name: item,
    quotation: item,
    totalGoals: item || 0,
    ultraPosition: positions[item]?.label
  })

  const isEvenNumber = (index: number) => index % 2 === 0

  const _renderRow = (data: { id: string, name: string, ultraPosition: number }, index: number) =>
    <DataTable.Row style={{ backgroundColor: isEvenNumber(index) && palette.overlayPrimary }}
      onPress={() => {
        navigation.navigate('PlayerInfo', {
          name: data.name,
          playerId: data.id,
          ultraPosition: data.ultraPosition })
      }}>

      {Object.values(data)
        .map((item: any, j: number) => fields[j] !== 'id' && fields[j] !== 'lastName' &&
          <DataTable.Cell key={j} style={[
            { justifyContent: 'center' },
            fields[j] === 'ultraPosition' && {
              backgroundColor: positions[item].color
            },
            fields[j] === 'name' && styles.cellName,
            fields[j] === 'averageRating' && styles.cellRating
          ]}><Text style={[
            styles.text,
            fields[j] === 'ultraPosition' && {
              fontWeight: '500'
            },
            fields[j] === 'name' && {
              color: palette.royalblue,
              fontWeight: '500'
            }
          ]}>{tableValue(item)[fields[j]]}</Text></DataTable.Cell>)}

    </DataTable.Row>

  // Passing item.id instead of index avoid computations.
  const keyExtractor = React.useCallback((item) => item.id, [])

  const sortedPlayersData = playersData.sort((playerA: object, playerB: object) => {
    if (playerA[sortedBy] > playerB[sortedBy]) {
      return sortDirection === 'asc' ? -1 : 1
    } else if (playerB[sortedBy] > playerA[sortedBy]) {
      return sortDirection === 'asc' ? 1 : -1
    }
    return 0
  })

  // FlatList includes some precious attributes to optimize performances.
  const _renderFlatList = () => <FlatList data={sortedPlayersData}
    keyExtractor={keyExtractor}
    initialNumToRender={30}
    extraData={sortDirection}
    removeClippedSubviews={true}
    renderItem={({ item, index }) => _renderRow(item, index)}></FlatList>

  const _renderArrowSortable = (field: string) => {
    const fieldValue = field === 'name' ? 'lastName' : field
    if (fieldValue === sortedBy && sortDirection === 'asc') {
      // Up unicode
      return <Text style={styles.headerTitle}>&#x2191;</Text>
    } else {
      // Down unicode
      return <Text style={styles.headerTitle}>&#x2193;</Text>
    }
  }

  return (
    <DataTable>
      <DataTable.Header>
        {fields.map((field, i) => field !== 'id' && field !== 'lastName' && <DataTable.Title style={[
          { justifyContent: 'center' },
          field === 'name' && styles.cellName,
          field === 'averageRating' && styles.cellRating
        ]} key={i}>
          <TouchableOpacity onPress={() => {
            if (field === 'ultraPosition' || field === 'name') {
              setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
              setSortedBy(field === 'name' ? 'lastName' : field)
            }
          }} style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', paddingTop: '4%' }}>
            <Text style={styles.headerTitle}>{headerFields[field]}</Text>
            {field === 'name' || field === 'ultraPosition' ? _renderArrowSortable(field) : null}
          </TouchableOpacity></DataTable.Title>)}
      </DataTable.Header>

      {_renderFlatList()}

    </DataTable>
  )
}

export default PlayersTableScreen
