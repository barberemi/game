export const characters = {
  players: [
    {
      name: 'Pikachu',
      me: false,
      level: 50,
      hp: 300,
      maxHp: 300,
      faint: undefined,
      isHit: false,
      isSelectable: false,
      actions: [
        { name: 'Morsure', amount: 30, effect: 'melee', nbBlockedTurns: 0 },
        {
          name: 'Eclair continue',
          amount: 40,
          effect: 'dot',
          duration: 3,
          nbBlockedTurns: 0
        },
        { name: 'Soin éclair', amount: 100, effect: 'heal', nbBlockedTurns: 0 },
        {
          name: 'Soin éclair continue',
          amount: 50,
          effect: 'hot',
          duration: 3,
          nbBlockedTurns: 0
        },
        {
          name: 'Méga tonnerre',
          amount: 100,
          effect: 'range',
          nbBlockedTurns: 0
        },
        {
          name: 'Déplacement',
          amount: null,
          effect: 'movement',
          nbBlockedTurns: 0
        }
      ],
      hot: [],
      dot: []
    },
    {
      name: 'Emolga',
      me: false,
      level: 45,
      hp: 250,
      maxHp: 250,
      faint: undefined,
      isHit: false,
      isSelectable: false,
      actions: [
        { name: 'Morsure', amount: 10, effect: 'melee', nbBlockedTurns: 0 },
        { name: 'Eclair', amount: 30, effect: 'melee', nbBlockedTurns: 0 },
        { name: 'Tonnerre', amount: 35, effect: 'melee', nbBlockedTurns: 0 },
        { name: 'Méga éclair', amount: 45, effect: 'melee', nbBlockedTurns: 0 }
      ],
      hot: [],
      dot: []
    },
    {
      name: 'Teddiursa',
      me: false,
      level: 35,
      hp: 150,
      maxHp: 150,
      faint: undefined,
      isHit: false,
      isSelectable: false,
      actions: [
        { name: 'Morsure', amount: 10, effect: 'melee', nbBlockedTurns: 0 },
        { name: 'Eclair', amount: 30, effect: 'melee', nbBlockedTurns: 0 },
        { name: 'Tonnerre', amount: 35, effect: 'melee', nbBlockedTurns: 0 },
        { name: 'Méga éclair', amount: 45, effect: 'melee', nbBlockedTurns: 0 }
      ],
      hot: [],
      dot: []
    },
    {
      name: 'Togepi',
      me: false,
      level: 40,
      hp: 200,
      maxHp: 200,
      faint: undefined,
      isHit: false,
      isSelectable: false,
      actions: [
        { name: 'Morsure', amount: 10, effect: 'melee', nbBlockedTurns: 0 },
        { name: 'Eclair', amount: 30, effect: 'melee', nbBlockedTurns: 0 },
        { name: 'Tonnerre', amount: 35, effect: 'melee', nbBlockedTurns: 0 },
        { name: 'Méga éclair', amount: 45, effect: 'melee', nbBlockedTurns: 0 }
      ],
      hot: [],
      dot: []
    },
    {
      name: 'Rondoudou',
      me: false,
      level: 50,
      hp: 300,
      maxHp: 300,
      faint: undefined,
      isHit: false,
      isSelectable: false,
      actions: [
        { name: 'Morsure', amount: 10, effect: 'melee', nbBlockedTurns: 0 },
        { name: 'Eclair', amount: 30, effect: 'melee', nbBlockedTurns: 0 },
        { name: 'Tonnerre', amount: 35, effect: 'melee', nbBlockedTurns: 0 },
        { name: 'Méga éclair', amount: 45, effect: 'melee', nbBlockedTurns: 0 }
      ],
      hot: [],
      dot: []
    }
  ],
  enemy: {
    name: 'Mewtwo',
    level: 60,
    hp: 600,
    maxHp: 600,
    faint: undefined,
    isHit: false,
    actions: [
      { name: 'Frappe', amount: 50, effect: 'melee' },
      { name: "Blocage de l'ombre", amount: 300, effect: 'dot', duration: 5 },
      { name: "Soin de l'ombre", amount: 50, effect: 'hot', duration: 3 },
      { name: "Bouclier de l'ombre", amount: 50, effect: 'heal' },
      { name: 'Poussée du chaos', amount: 30, effect: 'movement' },
      { name: 'Rêve éveillé', amount: 100, effect: 'range' },
      { name: 'Rêve éveillé', amount: 100, effect: 'skill_block', duration: 3 },
      { name: 'Cauchemard', amount: 200, effect: 'unknown' }
    ],
    hot: [],
    dot: [],
    expectedAction: undefined
  },
  textMessageOne: ' ',
  textMessageTwo: '',
  playerActionSelectable: undefined,
  round: 1,
  gameOver: false
}
