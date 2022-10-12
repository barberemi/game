// To get the color rank
export const getColorRank = (index) => {
  switch (true) {
    case index === 0:
      return '#ff8000'
    case index < 9:
      return '#c600ff'
    case index < 50:
      return '#00BFFF'
    default:
      return '#ffffff'
  }
}

// To get the season rewards
export const getRewardsByRank = (index, season) => {
  switch (true) {
    case index === 0:
      return season.itemsRewarded1
    case index < 9:
      return season.itemsRewarded2
    case index < 50:
      return season.itemsRewarded3
    default:
      return season.itemsRewarded4
  }
}
