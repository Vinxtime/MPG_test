interface Array {
  map: Function,
  find: Function,
  filter: Function
}

export type RootStackParamList = {
  Main: {
    playersData: Array,
    clubsData: Array
  },
  PlayerInfo: {
    playerId: string
  }
}
