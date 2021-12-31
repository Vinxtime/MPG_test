/* eslint-disable max-statements */
import { StyleSheet, Text, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { RootStackParamList } from './../RootStackParams'
import { palette } from '../../utils/palette'
import { RFValue } from 'react-native-responsive-fontsize'
import { DataTable } from 'react-native-paper'
import { headerFields } from '../../utils/index_conversion'
import MatchesSection from './matches_section'

interface Array {
  map: Function,
}

type PlayerMatchesProps = {
  championships: Array,
  clubsData: Array
}

const styles = StyleSheet.create({
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
    borderRadius: 5,
    marginTop: '4%',
    padding: 12
  },
  championshipName: { fontSize: 14, fontWeight: '600', letterSpacing: -0.2, opacity: 0.54, marginBottom: 8 },
  headerTitle: { color: palette.text,
    fontSize: RFValue(8),
    fontWeight: '600',
    justifyContent: 'center',
    letterSpacing: -0.2,
    opacity: 0.54,
    textTransform: 'uppercase'
  },
  root: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  text: { color: palette.text, fontSize: RFValue(9), fontWeight: '500', letterSpacing: -0.2 }
})

const PlayerStatsSection: React.FC<PlayerMatchesProps> = ({ championships, clubsData }) => {
  const getRelevantStatsFields = (field: string) => {
    const obj = championships[0][field]
    if (obj) {
      return Object.keys(championships[0][field])
    }
    return null
  }

  const fields = getRelevantStatsFields('keySeasonStats')
  fields?.unshift('Type')

  const _renderStatsTable = (championship: {
    keySeasonStats: object,
    percentRanks: object
  }) => {
    const keySeasonValues = championship.keySeasonStats
      ? Object.values(Object.values(championship.keySeasonStats)) : []
    const percentageRanksValues = championship.percentRanks
      ? Object.values(Object.values(championship.percentRanks)) : []
    keySeasonValues?.unshift('Nombre')
    percentageRanksValues?.unshift('Rang(%)')

    return (
      <DataTable>
        {fields?.length
          ? <React.Fragment>
            <DataTable.Header>
              {fields.map((field, i) => <DataTable.Title key={i} style={{ justifyContent: 'center' }}>
                <Text style={styles.headerTitle}>{headerFields[field]}</Text></DataTable.Title>)}
            </DataTable.Header>
            <DataTable.Row style={{ backgroundColor: palette.overlayPrimary }}>
              {keySeasonValues.map((item, j) => ([
                <DataTable.Cell key={j} style={{ justifyContent: 'center' }}>
                  <Text style={styles.text}>
                  {`${j === 0 ? item : item.toFixed(1)}`}</Text>
                  </DataTable.Cell>
              ]))}
            </DataTable.Row>  
            <DataTable.Row>
              {percentageRanksValues.map((item: number | string, j: number) => ([
                <DataTable.Cell key={j} style={{ justifyContent: 'center' }}>
                  <Text style={styles.text}>
                  {j === 0 ? item : `${parseFloat(item * 100).toFixed(0)} %`}</Text>
                  </DataTable.Cell>
              ]))}
            </DataTable.Row>
          </React.Fragment> : []}
      </DataTable>
    )
  }

  const _renderStatsByChampionship = () => championships.map((championship: {
      keySeasonStats: object,
      percentRanks: object,
      total: {
        matches: Array
      }
    }, i: number) => (
      <View key={i} style={{ backgroundColor: palette.overlayPrimary,
        marginVertical: '6%',
        paddingHorizontal: '2%',
        paddingVertical: '4%' }}>
        <Text style={styles.championshipName}>{`Championnat ${i + 1}`}</Text>
        {_renderStatsTable(championship)}
        <MatchesSection clubsData={clubsData} allGames={championship.total.matches}/>
      </View>
  ))

  return (
    <View style={styles.careerStatsSection}>
      <Text style={styles.bigTitle}>{'stats saison 21/22'}</Text>
      {_renderStatsByChampionship()}
    </View>
  )
}

export default PlayerStatsSection
