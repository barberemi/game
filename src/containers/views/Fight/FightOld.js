import React, { Component } from 'react'
import TextBox from '../../../Components/Fight/TextBox'
import Actions from '../../../Components/Fight/Actions'
import EnemyBox from '../../../Components/Fight/EnemyBox'
import PlayerBox from '../../../Components/Fight/PlayerBox'
import './Fight.scss'
import _ from 'lodash'
import {
  enemyTurnFinished,
  enemyMovementAction,
  enemyBlockAction,
  playersTurnFinished,
  playerHealAction,
  playerMovementAction,
  selectPlayer,
  userTakeDot,
  userTakeHot
} from '../../../utils/fightHelper'
import { characters } from '../../../utils/characters'

class Fight extends Component {
  constructor(props) {
    super(props)

    this.state = characters
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState(
        () => {
          return {
            textMessageOne: `${this.state.enemy.name} apparait!`,
            enemy: {
              ...this.state.enemy,
              faint: null
            }
          }
        },
        () => {
          setTimeout(() => {
            const players = [...this.state.players]
            for (let i = 0; i < this.state.players.length; i++) {
              players[i] = { ...players[i], faint: null }
              // Me
              if (i === 0) {
                players[i] = { ...players[i], me: true }
              }
            }

            this.setState(
              {
                textMessageOne: 'Vous entrez pour le combattre !',
                players
              },
              () => {
                setTimeout(() => {
                  this.setState({
                    textMessageOne: ''
                  })

                  this.nextEnemyAction()
                }, 3000)
              }
            )
          }, 3000)
        }
      )
    }, 1000)
  }

  nextEnemyAction() {
    const enemyAction = Math.floor(
      Math.random() * this.state.enemy.skills.length
    )

    this.setState({
      enemy: {
        ...this.state.enemy,
        expectedAction: this.state.enemy.skills[enemyAction]
      }
    })
  }

  endTurn() {
    const players = [...this.state.players]
    const enemy = this.state.enemy

    // 1 - DOT ENEMY
    if (enemy.dot.length > 0) {
      let { user } = userTakeDot(enemy)
      this.setState({
        enemy: user
      })
    }

    if (this.checkIfEnemyAlive()) {
      // 2 - DOT PLAYERS
      for (let i = 0; i < players.length; i++) {
        if (players[i].dot.length > 0 && players[i].hp > 0) {
          let { user } = userTakeDot(this.state.players[i])
          players[i] = user
          this.setState(
            {
              players
            },
            () => {
              setTimeout(() => {
                this.checkIfPlayerAlive(i)
              }, 3000)
            }
          )
        }
      }

      // 3 - HOT ENEMY
      if (enemy.hot.length > 0) {
        let { user } = userTakeHot(enemy)
        this.setState({
          enemy: user
        })
      }

      // 4 - HOT PLAYERS
      for (let i = 0; i < players.length; i++) {
        if (players[i].dot.length > 0) {
          let { user } = userTakeHot(this.state.players[i])
          players[i] = user
          this.setState({
            players
          })
        }
      }

      // 5 - DECREMENT ALL DOT/HOT/BLOCKED SKILLS
      this.setState({
        // textMessageOne: "",
        round: this.state.round + 1,
        players: playersTurnFinished(this.state.players),
        enemy: enemyTurnFinished(this.state.enemy)
      })
      this.nextEnemyAction()
    }
  }

  checkIfPlayerAlive(idPlayerSelected) {
    const players = [...this.state.players]

    if (players[idPlayerSelected].hp === 0) {
      players[idPlayerSelected] = {
        ...players[idPlayerSelected],
        faint: true,
        isHit: false
      }
      this.setState(
        {
          textMessageOne: `${players[idPlayerSelected].name} a été terrassé.`,
          players
        },
        () => {
          setTimeout(() => {
            //All players dead
            const allPlayersDead = _.find(players, (player) => {
              return player.hp > 0
            })
            if (!allPlayersDead) {
              this.setState(
                {
                  textMessageOne: `Toute l'équipe a perdu.`,
                  textMessageTwo: `${this.state.enemy.name} a gagné!`
                },
                () => {
                  setTimeout(() => {
                    this.setState({
                      gameOver: true
                    })
                  }, 3000)
                }
              )
            } else {
              this.setState({
                textMessageOne: ''
              })
            }
          }, 3000)
        }
      )
    } else {
      players[idPlayerSelected] = {
        ...players[idPlayerSelected],
        isHit: false,
        faint: false
      }
      this.setState({
        textMessageOne: '',
        players
      })
    }
  }

  checkIfEnemyAlive() {
    if (this.state.enemy.hp === 0) {
      this.setState(
        {
          textMessageOne: `${this.state.enemy.name} a perdu.`,
          textMessageTwo: `Vous avez gagné!`,
          enemy: {
            ...this.state.enemy,
            faint: true,
            isHit: false
          }
        },
        () => {
          setTimeout(() => {
            this.setState({
              gameOver: true
            })
          }, 3000)
        }
      )
      return false
    }

    return true
  }

  enemyTurn = () => {
    const { amount, name, effect, duration } = this.state.enemy.expectedAction
    const playerSelected = selectPlayer(this.state.players, effect)

    if (this.checkIfEnemyAlive()) {
      if (effect === 'heal') {
        this.setState(
          {
            textMessageOne: `${this.state.enemy.name} se soigne pour ${amount}pts de vie.`,
            enemy: {
              ...this.state.enemy,
              hp: this.state.enemy.hp + amount
            }
          },
          () => {
            setTimeout(() => {
              this.setState({
                textMessageOne: ''
              })
              this.endTurn()
            }, 3000)
          }
        )
      } else if (effect === 'hot') {
        this.setState(
          {
            textMessageOne: `${this.state.enemy.name} se soignera de ${amount}pts de vie à la fin des ${duration} prochains tours.`,
            enemy: {
              ...this.state.enemy,
              hot: [...this.state.enemy.hot, { amount, duration }]
            }
          },
          () => {
            setTimeout(() => {
              this.setState({
                textMessageOne: ''
              })
              this.endTurn()
            }, 3000)
          }
        )
      } else if (effect === 'movement') {
        let { players, textMessageOne } = enemyMovementAction(
          this.state.players,
          playerSelected,
          this.state.enemy
        )
        this.setState(
          {
            textMessageOne,
            players
          },
          () => {
            setTimeout(() => {
              this.setState({
                textMessageOne: ''
              })
              this.checkIfPlayerAlive(playerSelected)
              this.endTurn()
            }, 3000)
          }
        )
      } else if (effect === 'skill_block') {
        let { players, textMessageOne } = enemyBlockAction(
          this.state.players,
          playerSelected,
          this.state.enemy
        )
        this.setState(
          {
            textMessageOne,
            players
          },
          () => {
            setTimeout(() => {
              this.setState({
                textMessageOne: ''
              })
              this.checkIfPlayerAlive(playerSelected)
              this.endTurn()
            }, 3000)
          }
        )
      } else if (effect === 'dot') {
        this.setState(
          (prevState) => {
            const players = [...this.state.players]

            players[playerSelected] = {
              ...players[playerSelected],
              isHit: true,
              dot: [
                ...prevState.players[playerSelected].dot,
                { amount, duration }
              ]
            }

            return {
              players,
              textMessageOne: `${this.state.enemy.name} utilise ${name} sur ${this.state.players[playerSelected].name} ce qui fera ${amount}pts de dégats à la fin des ${duration} prochains tours!`
            }
          },
          () => {
            setTimeout(() => {
              this.endTurn()
            }, 3000)
          }
        )
      } else {
        this.setState(
          (prevState) => {
            const players = [...this.state.players]

            players[playerSelected] = {
              ...players[playerSelected],
              isHit: true,
              hp:
                prevState.players[playerSelected].hp - amount <= 0
                  ? 0
                  : prevState.players[playerSelected].hp - amount
            }

            return {
              players,
              textMessageOne: `${this.state.enemy.name} utilise ${name} sur ${this.state.players[playerSelected].name} pour ${amount}pts de dégats!`
            }
          },
          () => {
            setTimeout(() => {
              this.checkIfPlayerAlive(playerSelected)
              this.endTurn()
            }, 3000)
          }
        )
      }
    }
  }

  handleClickOnPlayerToAction = (player) => {
    const { playerActionSelectable } = this.state

    if (
      playerActionSelectable.effect === 'heal' ||
      playerActionSelectable.effect === 'hot'
    ) {
      let { players, textMessageOne } = playerHealAction(
        [...this.state.players],
        player,
        playerActionSelectable
      )
      this.setState({
        textMessageOne,
        players
      })
    } else if (playerActionSelectable.effect === 'movement') {
      let { players, textMessageOne } = playerMovementAction(
        [...this.state.players],
        player
      )
      this.setState({
        textMessageOne,
        players
      })
    }
    //2 - ENEMY TURN
    setTimeout(() => {
      this.setState({
        playerActionSelectable: undefined
      })
      this.enemyTurn()
    }, 3000)
  }

  handleClickOnActionBar = (action) => {
    const { effect, name, amount, duration } = action

    // 1 - ATTACK
    if (effect === 'melee' || effect === 'range' || effect === 'dot') {
      // 1.1 - PLAYER ACTION
      let dot = [...this.state.enemy.dot]
      let hp =
        this.state.enemy.hp - amount <= 0 ? 0 : this.state.enemy.hp - amount
      let textMessageOne = `${
        _.find(this.state.players, 'me').name
      } utilise ${name} pour ${amount}pts de dégats!`

      if (effect === 'dot') {
        dot = [...this.state.enemy.dot, { amount, duration }]
        hp = this.state.enemy.hp
        textMessageOne = `${
          _.find(this.state.players, 'me').name
        } utilise ${name} ce qui infligera ${amount}pts de dégats à la fin des ${duration} prochains tours!`
      }

      this.setState({
        enemy: {
          ...this.state.enemy,
          hp,
          isHit: true,
          dot
        },
        textMessageOne
      })
      // 1.2 - ENEMY ACTION
      setTimeout(() => {
        // Enemy turn
        this.setState({
          enemy: {
            ...this.state.enemy,
            isHit: false,
            faint: false
          }
        })
        this.enemyTurn()
      }, 3000)
      // 2 - HEAL
    } else if (effect === 'heal' || effect === 'hot') {
      // 2.1 - PLAYER ACTION
      const players = [...this.state.players]
      for (let i = 0; i < this.state.players.length; i++) {
        if (this.state.players[i].hp > 0) {
          players[i] = { ...players[i], isSelectable: true }
        }
      }
      this.setState({
        textMessageOne: 'Veuillez selectionner un joueur à soigner.',
        playerActionSelectable: action,
        players
      })
      // 3 - MOVEMENT
    } else if (effect === 'movement') {
      // 3.1 - PLAYER ACTION
      const players = [...this.state.players]
      for (let i = 0; i < this.state.players.length; i++) {
        if (
          this.state.players[i] !== _.find(this.state.players, 'me') &&
          this.state.players[i].hp > 0
        ) {
          players[i] = { ...players[i], isSelectable: true }
        }
      }
      this.setState({
        textMessageOne: 'Veuillez selectionner la place que vous souhaitez.',
        playerActionSelectable: action,
        players
      })
    }
  }

  render() {
    return (
      <div className="container h-100">
        <div className="row h-100">
          {/* BATTLE SCREEN CONTAINER */}
          <div className="col-sm-12">
            <div id="turn-text-number">
              <i className="fas fa-dice" /> Tour {this.state.round}
            </div>
            <div className="all-players-box">
              {_.map(this.state.players, (player) => (
                <PlayerBox
                  key={player.name}
                  player={player}
                  onClick={
                    player.isSelectable
                      ? this.handleClickOnPlayerToAction
                      : () => {
                          return null
                        }
                  }
                />
              ))}

              <EnemyBox
                enemy={this.state.enemy}
                expectedAction={this.state.enemy.expectedAction}
              />
            </div>

            {/* TEXT BOX SECTION */}
            <div id="text-box">
              <div id="text-box-content">
                {this.state.textMessageOne !== '' &&
                  this.state.gameOver === false && (
                    <TextBox
                      messageOne={this.state.textMessageOne}
                      messageTwo={this.state.textMessageTwo}
                    />
                  )}

                {this.state.textMessageOne === '' &&
                  this.state.gameOver === false &&
                  Object.keys(_.find(this.state.players, 'me').skills).map(
                    (key) => {
                      return (
                        <Actions
                          key={key}
                          frontPlayer={
                            _.find(this.state.players, 'me') ===
                            _.last(this.state.players)
                          }
                          action={_.find(this.state.players, 'me').skills[key]}
                          onClick={this.handleClickOnActionBar}
                        />
                      )
                    }
                  )}
              </div>
            </div>
            {/* TEXT BOX SECTION */}
          </div>
          {/* END BATTLE SCREEN CONTAINER */}
        </div>
      </div>
    )
  }
}

export default Fight
