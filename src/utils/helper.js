import _ from "lodash";

// When a player heal an other player (or himself)
export const playerHealAction = (players, playerHeal, action) => {
  for (let i = 0; i < players.length; i++) {
    players[i] = { ...players[i], isSelectable: false };
    if (playerHeal.name === players[i].name && action.effect === "heal") {
      const newHp = (players[i].hp + action.amount) < players[i].maxHp
        ? players[i].hp + action.amount
        : players[i].maxHp
      ;
      players[i] = {...players[i], hp: newHp};
    }
  }

  const textMessageOne = `${_.find(players, 'me').name}
   utilise ${action.name} pour soigner ${playerHeal.name} de ${action.amount}pts de vie!`;

  return {players, textMessageOne}
}

// When a player move from the battle
export const playerMovementAction = (players, playerMove) => {
  let positionToAdd = 0;

  for (let i = 0; i < players.length; i++) {
    players[i] = { ...players[i], isSelectable: false };
    if (playerMove.name === players[i].name) {
      positionToAdd = i;
    }
  }

  // Need know if front or behind the player selected
  positionToAdd = _.find(_.slice(_.cloneDeep(players), 0, positionToAdd + 1), 'me')
    ? positionToAdd + 1
    : positionToAdd
  ;
  // cut on 2 array
  const startingPlayers = _.slice(_.cloneDeep(players), 0, positionToAdd);
  const endingPlayers = _.slice(_.cloneDeep(players), positionToAdd);
  // remove me
  _.remove(startingPlayers, 'me');
  _.remove(endingPlayers, 'me');
  // add me
  startingPlayers.push(_.find(players, 'me'));
  players = startingPlayers.concat(endingPlayers);

  const textMessageOne = `${_.find(players, 'me').name} se positionne à la place de ${playerMove.name}.`;

  return {players, textMessageOne}
}

// When a enemy move a player from the battle
export const enemyMovementAction = (players, idPlayerMove, enemy) => {
  const textMessageOne = `${enemy.name} utilise ${enemy.expectedAction.name} sur ${players[idPlayerMove].name} et lui inflige ${enemy.expectedAction.amount}pts de dégats.`;

  players[idPlayerMove] = {
    ...players[idPlayerMove],
    isHit: true,
    hp: (players[idPlayerMove].hp - enemy.expectedAction.amount <= 0 ? 0 : players[idPlayerMove].hp - enemy.expectedAction.amount)
  };
  // Need know if front or behind the player selected
  const positionToAdd = players.length - 2;
  // cut on 2 array
  const startingPlayers = _.slice(_.cloneDeep(players), 0, positionToAdd);
  const endingPlayers = _.slice(_.cloneDeep(players), positionToAdd);
  // remove last player
  _.remove(endingPlayers, {'name': players[idPlayerMove].name});
  // and add him then
  startingPlayers.push(players[idPlayerMove]);
  players = startingPlayers.concat(endingPlayers);

  return {players, textMessageOne}
}

// When an enemy select a player
export const selectPlayer = (players, actionEffect) => {
  let playersToKeep = [];
  for (let i = 0; i < players.length; i++) {
    if (players[i].hp > 0) {
      playersToKeep.push(i);
    }
  }

  const num = actionEffect === "melee" || actionEffect === "movement"
    ? _.last(playersToKeep)
    : Math.floor(Math.random() * players.length)
  ;

  return (!_.includes(playersToKeep, num)) ? selectPlayer(players, actionEffect) : num;
}