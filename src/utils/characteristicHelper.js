// To get the translation of the name of characteristic
export const getCharacteristicTranslationName = (characteristic) => {
  switch (characteristic.name) {
    case 'agility':
      return 'Agilité'
    case 'intelligence':
      return 'Intelligence'
    case 'strength':
      return 'Force'
    case 'experience':
      return 'Expérience'
    case 'health':
      return 'Vie'
    case 'remainingActions':
      return 'Actions restantes'
    case 'defense':
      return 'Défense'
    default:
      return characteristic.name
  }
}
