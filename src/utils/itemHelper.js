import _ from 'lodash'

// To get the color of the rarity of object
export const getColorItem = (item) => {
  switch (item.rarity) {
    case 'unusual':
      return '#1eff00'
    case 'rare':
      return '#00BFFF'
    case 'epic':
      return '#c600ff'
    case 'legendary':
      return '#ff8000'
    default:
      // common
      return '#ffffff'
  }
}

// To get the translation of the type of object
export const getItemTranslationRarity = (item) => {
  switch (item.rarity) {
    case 'unusual':
      return 'Inhabituel'
    case 'rare':
      return 'Rare'
    case 'epic':
      return 'Épique'
    case 'legendary':
      return 'Légendaire'
    default:
      // common
      return 'Commun'
  }
}

// To get the translation of the type of object
export const getItemTranslationType = (item) => {
  switch (item.type) {
    case 'helmet':
      return 'Casque'
    case 'amulet':
      return 'Amulette'
    case 'shoulders':
      return 'Épaulières'
    case 'glovers':
      return 'Gants'
    case 'armor':
      return 'Armure'
    case 'belt':
      return 'Ceinture'
    case 'pants':
      return 'Pantalon'
    case 'shoes':
      return 'Chaussures'
    case 'weapon':
      return 'Arme'
    case 'craft':
      return 'Composant'
    default:
      return item.type
  }
}

// To know if item is an equipped item
export const isAnEquippedItem = (item) => {
  const equippedItems = [
    'helmet',
    'amulet',
    'shoulders',
    'glovers',
    'armor',
    'belt',
    'pants',
    'shoes',
    'weapon'
  ]

  return !!_.includes(equippedItems, item.type)
}
