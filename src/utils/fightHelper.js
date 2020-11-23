import _ from 'lodash'

// When a player heal an other player (or himself)
export const playerHealAction = (players, playerHeal, action) => {
  let hotMessage = ''
  for (let i = 0; i < players.length; i++) {
    players[i] = { ...players[i], isSelectable: false }
    let hot = [...players[i].hot]
    let newHp = players[i].hp

    if (playerHeal.name === players[i].name && action.effect === 'heal') {
      newHp =
        players[i].hp + action.amount < players[i].maxHp
          ? players[i].hp + action.amount
          : players[i].maxHp
    }
    if (playerHeal.name === players[i].name && action.effect === 'hot') {
      hotMessage = ` pendant ${action.duration} tours`
      hot = [
        ...players[i].hot,
        { amount: action.amount, duration: action.duration }
      ]
    }

    players[i] = { ...players[i], hp: newHp, hot }
  }

  const textMessageOne = `${_.find(players, 'me').name}
   utilise ${action.name} pour soigner ${playerHeal.name} de ${
    action.amount
  }pts de vie${hotMessage}!`

  return { players, textMessageOne }
}

// When a player move from the battle
export const playerMovementAction = (players, playerMove) => {
  let positionToAdd = 0

  for (let i = 0; i < players.length; i++) {
    players[i] = { ...players[i], isSelectable: false }
    if (playerMove.name === players[i].name) {
      positionToAdd = i
    }
  }

  // Need know if front or behind the player selected
  positionToAdd = _.find(
    _.slice(_.cloneDeep(players), 0, positionToAdd + 1),
    'me'
  )
    ? positionToAdd + 1
    : positionToAdd
  // cut on 2 array
  const startingPlayers = _.slice(_.cloneDeep(players), 0, positionToAdd)
  const endingPlayers = _.slice(_.cloneDeep(players), positionToAdd)
  // remove me
  _.remove(startingPlayers, 'me')
  _.remove(endingPlayers, 'me')
  // add me
  startingPlayers.push(_.find(players, 'me'))
  players = startingPlayers.concat(endingPlayers)

  const textMessageOne = `${
    _.find(players, 'me').name
  } se positionne à la place de ${playerMove.name}.`

  return { players, textMessageOne }
}

// When an enemy move a player from the battle
export const enemyMovementAction = (players, idPlayerMove, enemy) => {
  const textMessageOne = `${enemy.name} utilise ${enemy.expectedAction.name} sur ${players[idPlayerMove].name} et lui inflige ${enemy.expectedAction.amount}pts de dégats.`

  players[idPlayerMove] = {
    ...players[idPlayerMove],
    isHit: true,
    hp:
      players[idPlayerMove].hp - enemy.expectedAction.amount <= 0
        ? 0
        : players[idPlayerMove].hp - enemy.expectedAction.amount
  }
  // Need know if front or behind the player selected
  const positionToAdd = players.length - 2
  // cut on 2 array
  const startingPlayers = _.slice(_.cloneDeep(players), 0, positionToAdd)
  const endingPlayers = _.slice(_.cloneDeep(players), positionToAdd)
  // remove last player
  _.remove(endingPlayers, { name: players[idPlayerMove].name })
  // and add him then
  startingPlayers.push(players[idPlayerMove])
  players = startingPlayers.concat(endingPlayers)

  return { players, textMessageOne }
}

// When an enemy bloc a skill of a player from the battle
export const enemyBlockAction = (players, idPlayerMove, enemy) => {
  const idSkillBlock = Math.floor(
    Math.random() * players[idPlayerMove].actions.length
  )
  const textMessageOne = `${enemy.name} utilise ${enemy.expectedAction.name} sur ${players[idPlayerMove].name}, lui inflige ${enemy.expectedAction.amount}pts de dégats et lui bloque la compétence ${players[idPlayerMove].actions[idSkillBlock].name} pour ${enemy.expectedAction.duration} tours.`
  const actions = [...players[idPlayerMove].actions]

  actions[idSkillBlock] = {
    ...actions[idSkillBlock],
    nbBlockedTurns: enemy.expectedAction.duration
  }

  players[idPlayerMove] = {
    ...players[idPlayerMove],
    isHit: true,
    hp:
      players[idPlayerMove].hp - enemy.expectedAction.amount <= 0
        ? 0
        : players[idPlayerMove].hp - enemy.expectedAction.amount,
    actions
  }

  return { players, textMessageOne }
}

// When a user have dot and take damages
export const userTakeDot = (user) => {
  let damages = 0
  for (let i = 0; i < user.dot.length; i++) {
    damages = damages + user.dot[i].amount
  }

  user = {
    ...user,
    hp: user.hp - damages <= 0 ? 0 : user.hp - damages
  }

  return { user }
}

export const userTakeHot = (user) => {
  let healing = 0
  for (let i = 0; i < user.hot.length; i++) {
    healing = healing + user.hot[i].amount
  }

  user = {
    ...user,
    hp: user.hp + healing > user.maxHp ? user.maxHp : user.hp + healing
  }

  return { user }
}

// When a players turn is ended
export const playersTurnFinished = (players) => {
  for (let i = 0; i < players.length; i++) {
    players[i] = decrementBlockedSkill(players[i])
    players[i] = decrementHotAndDot(players[i])
  }

  return players
}

// When an enemy turn is ended
export const enemyTurnFinished = (enemy) => {
  return decrementHotAndDot(enemy)
}

// When a turn is ended and decrement all blocked skills
export const decrementBlockedSkill = (user) => {
  for (let j = 0; j < user.actions.length; j++) {
    user.actions[j].nbBlockedTurns =
      user.actions[j].nbBlockedTurns === 0
        ? 0
        : user.actions[j].nbBlockedTurns - 1
  }

  return user
}

// To decrement all HOT and DOT
export const decrementHotAndDot = (user) => {
  // HOT
  for (let j = 0; j < user.hot.length; j++) {
    user.hot[j].duration = user.hot[j].duration - 1
  }
  user.hot = _.filter(user.hot, (aHot) => {
    return aHot.duration > 0
  })

  // DOT
  for (let j = 0; j < user.dot.length; j++) {
    user.dot[j].duration = user.dot[j].duration - 1
  }
  user.dot = _.filter(user.dot, (aDot) => {
    return aDot.duration > 0
  })

  return user
}

// When an enemy select a player
export const selectPlayer = (players, actionEffect) => {
  let playersToKeep = []
  for (let i = 0; i < players.length; i++) {
    if (players[i].hp > 0) {
      playersToKeep.push(i)
    }
  }

  const num =
    actionEffect === 'melee' || actionEffect === 'movement'
      ? _.last(playersToKeep)
      : Math.floor(Math.random() * players.length)
  return _.includes(playersToKeep, num)
    ? num
    : selectPlayer(players, actionEffect)
}
