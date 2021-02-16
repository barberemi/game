export const getBoxRightSpacing = (index) => {
  switch (index) {
    case 0:
      return '10%'
    case 1:
      return '20%'
    case 2:
      return '30%'
    case 3:
      return '40%'
    default:
      return '20%'
  }
}

export const getBoxBottomSpacing = (index) => {
  switch (index) {
    case 0:
      return '20%'
    case 1:
      return '10%'
    case 2:
      return '20%'
    case 3:
      return '10%'
    default:
      return '30%'
  }
}
