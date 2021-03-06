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
import PropTypes from 'prop-types'
import axios from 'axios'
import Cookies from 'js-cookie'
import Loader from '../../../Components/Loader/Loader'
import { Redirect } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

const Container = styled.div`
  ${(props) =>
    props.isGuildBoss &&
    css`
      background-image: url(${process.env.PUBLIC_URL +
      '/img/backgrounds/guild-exploration-min.jpg'});
    `};

  ${(props) =>
    !props.isGuildBoss &&
    css`
      background-image: url(${process.env.PUBLIC_URL +
      '/img/backgrounds/swamp-min.jpg'});
    `};
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100vh !important;
`

const InterfaceActions = styled.div`
  //background-image: url('${process.env.PUBLIC_URL +
  '/img/skillsbar/interface-4.png'}');
  // height: 342px;
  height: 232px;
  width: 700px;
  bottom: 0;
  background-repeat: no-repeat;
`

class Fight extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: parseInt(this.props.match.params.idFight),
      error: undefined,
      loading: true,
      redirect: undefined,
      enemy: undefined,
      players: undefined,
      textMessageOne: ' ',
      textMessageTwo: '',
      playerActionSelectable: undefined,
      round: 1,
      rotateRound: false,
      gameOver: false
    }
  }

  componentDidMount() {
    axios
      .get(process.env.REACT_APP_API_URL + '/fights/' + this.state.id + '/1', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('auth-token')}`
        }
      })
      .then((response) => {
        if (response.data) {
          if (
            response.data.type !== 'waiting' ||
            jwtDecode(Cookies.get('auth-token')).email !==
              response.data.user.email
          ) {
            this.setState({ redirect: '/home' })
          } else {
            this.setState({
              loading: false,
              players: [
                {
                  ...response.data.user,
                  faint: undefined,
                  isHit: false,
                  isSelectable: false,
                  hot: [],
                  dot: []
                }
              ],
              enemy: {
                ...response.data.monster,
                faint: undefined,
                isHit: false,
                hot: [],
                dot: [],
                expectedAction: undefined
              }
            })
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
        }
      })
      .catch(() => {
        this.setState({ redirect: '/home' })
      })
  }

  nextEnemyAction() {
    const enemyAction = Math.floor(
      Math.random() * this.state.enemy.skills.length
    )

    this.setState({
      enemy: {
        ...this.state.enemy,
        isHit: false,
        expectedAction: this.state.enemy.skills[enemyAction]
      }
    })
  }

  endTurn() {
    const players = [...this.state.players]
    const enemy = this.state.enemy
    let timer = 0

    // 1 - DOT ENEMY
    if (enemy.dot.length > 0) {
      let { user } = userTakeDot(enemy)
      this.setState({ enemy: user }, () => {
        setTimeout(() => {
          if (this.checkIfEnemyAlive()) {
            // 2 - HOT ENEMY
            if (enemy.hot.length > 0) {
              let { user } = userTakeHot(enemy)
              this.setState({ enemy: user })
            }
          }
        }, 3000)
      })
    }

    // 3 - DOT PLAYERS
    for (let i = 0; i < players.length; i++) {
      if (players[i].dot.length > 0 && players[i].hp > 0) {
        let { user } = userTakeDot(this.state.players[i])
        players[i] = user
        this.setState({ players }, () => {
          setTimeout(() => {
            if (this.checkIfPlayerAlive(i)) {
              // 4 - HOT PLAYERS
              if (players[i].hot.length > 0) {
                let { user } = userTakeHot(this.state.players[i])
                players[i] = user
                this.setState({
                  players
                })
              }
            }
          }, 3000)
        })
        timer = timer + 3000
      } else {
        // 4 - HOT PLAYERS
        if (players[i].hot.length > 0) {
          let { user } = userTakeHot(this.state.players[i])
          players[i] = user
          this.setState({
            players
          })
        }
      }
    }

    // 5 - DECREMENT ALL DOT/HOT/BLOCKED SKILLS
    setTimeout(() => {
      this.setState({
        round: this.state.round + 1,
        rotateRound: true,
        players: playersTurnFinished(this.state.players),
        enemy: enemyTurnFinished(this.state.enemy),
        textMessageOne: ''
      })
      this.nextEnemyAction()

      // Reset rotateRound
      setTimeout(() => {
        this.setState({
          rotateRound: false
        })
      }, 1000)
    }, timer)
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
                    this.fightFinished('lost')
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
    }

    players[idPlayerSelected] = {
      ...players[idPlayerSelected],
      isHit: false,
      faint: false
    }
    this.setState({
      players
    })

    return true
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
            this.fightFinished('won')
          }, 3000)
        }
      )
      return false
    }

    this.setState({
      enemy: {
        ...this.state.enemy,
        isHit: false
      }
    })

    return true
  }

  enemyTurn = () => {
    const { amount, name, effect, duration } = this.state.enemy.expectedAction
    const playerSelected = selectPlayer(this.state.players, effect)

    // Reset isHit of all users
    const players = [...this.state.players]
    for (let i = 0; i < players.length; i++) {
      players[i] = { ...players[i], isHit: false }
    }
    this.setState({
      players: players,
      enemy: {
        ...this.state.enemy
      }
    })

    if (this.checkIfEnemyAlive()) {
      if (effect === 'heal') {
        this.setState(
          {
            textMessageOne: `${this.state.enemy.name} se soigne pour ${amount}pts de vie.`,
            enemy: {
              ...this.state.enemy,
              isHit: { amount: amount, type: 'heal' },
              hp:
                this.state.enemy.hp + amount > this.state.enemy.maxHp
                  ? this.state.enemy.maxHp
                  : this.state.enemy.hp + amount
            }
          },
          () => {
            setTimeout(() => {
              // this.setState({
              //   textMessageOne: ''
              // })
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
              // isHit: { amount: amount, type: 'heal' },
              hot: [...this.state.enemy.hot, { amount, duration }]
            }
          },
          () => {
            setTimeout(() => {
              // this.setState({
              //   textMessageOne: ''
              // })
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
              // this.setState({
              //   textMessageOne: ''
              // })
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
              // this.setState({
              //   textMessageOne: ''
              // })
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
              // isHit: { amount: amount, type: 'damage' },
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
              isHit: { amount: amount, type: 'damage' },
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

      // 1.2 - INCREMENT COOLDOWN SKILL
      for (let i = 0; i < players[0].skills.length; i++) {
        if (players[0].skills[i].id === playerActionSelectable.id) {
          players[0].skills[i].nbBlockedTurns = playerActionSelectable.cooldown
        }
      }

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

      // 1.2 - INCREMENT COOLDOWN SKILL
      const players = [...this.state.players]
      for (let i = 0; i < players[0].skills.length; i++) {
        if (players[0].skills[i].id === action.id) {
          players[0].skills[i].nbBlockedTurns = action.cooldown
        }
      }
      this.setState(
        {
          enemy: {
            ...this.state.enemy,
            hp,
            isHit:
              effect === 'dot' ? false : { amount: amount, type: 'damage' },
            dot
          },
          players: players,
          textMessageOne
        },
        // 1.2 - ENEMY ACTION
        () => {
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
        }
      )
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

  fightFinished = (type) => {
    axios
      .put(
        process.env.REACT_APP_API_URL + '/fights/' + this.state.id,
        {
          round: this.state.round,
          hp: this.state.players[0].hp,
          type: type,
          remainingHp: this.state.enemy.hp
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('auth-token')}`
          }
        }
      )
      .then((response) => {
        if (response.data) {
          this.setState({ redirect: '/reward/' + this.state.id })
        }
      })
      .catch((error) => {
        this.setState({
          error: error.response.status
        })
      })
  }

  render() {
    const { redirect, loading, error, players, enemy } = this.state

    if (redirect) {
      return <Redirect to={redirect} />
    }

    return (
      <>
        {error && (
          <span className="text-danger">
            <b>Erreur :</b> {error.error}
          </span>
        )}
        {players && enemy && (
          <Container isGuildBoss={enemy.isGuildBoss}>
            <div className="container h-100">
              <div className="row h-100 align-middle">
                {loading && <Loader />}
                {/* BATTLE SCREEN CONTAINER */}
                <div className="col-sm-12">
                  <div id="turn-text-number">
                    <img
                      src={process.env.PUBLIC_URL + '/img/sablier.png'}
                      alt="sablier"
                      className={
                        this.state.rotateRound ? 'animated rotateIn' : ''
                      }
                    />
                    <span
                      className={`text-round ${
                        this.state.round.toString().length === 1
                          ? 'text-round-one-digit'
                          : 'text-round-two-digit'
                      }`}
                    >
                      {this.state.round}
                    </span>
                  </div>
                  <div className="characters-and-text-box">
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
                  </div>
                  {/* TEXT BOX SECTION */}
                  <InterfaceActions id="text-box">
                    <img
                      src={process.env.PUBLIC_URL + '/img/skillsbar/test.png'}
                      alt="skill bar"
                    />
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
                        Object.keys(
                          _.find(this.state.players, 'me').skills
                        ).map((key) => {
                          return (
                            <>
                              <Actions
                                key={key}
                                number={key}
                                frontPlayer={
                                  _.find(this.state.players, 'me') ===
                                  _.last(this.state.players)
                                }
                                action={
                                  _.find(this.state.players, 'me').skills[key]
                                }
                                onClick={this.handleClickOnActionBar}
                              />
                            </>
                          )
                        })}
                    </div>
                  </InterfaceActions>
                  {/* TEXT BOX SECTION */}
                </div>
                {/* END BATTLE SCREEN CONTAINER */}
              </div>
            </div>
          </Container>
        )}
      </>
    )
  }
}

Fight.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      idFight: PropTypes.string
    }).isRequired
  }).isRequired
}

export default Fight
