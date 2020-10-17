import React, { Component } from 'react';
import "./animate.css";
import "./bootstrap.css";
import "./App.css";
import TextBox from "./Components/TextBox";
import Actions from "./Components/Actions";
import EnemyBox from "./Components/EnemyBox";
import PlayerBox from "./Components/PlayerBox";
import PlayAgain from "./Components/PlayAgain";
import _ from 'lodash';
import {enemyMovementAction, playerHealAction, playerMovementAction, selectPlayer} from "./utils/helper";
import { characters } from "./utils/characters";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = characters;
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState(
        () => {
          return {
            textMessageOne: `${this.state.enemy.name} apparait!`,
            enemy: {
              ...this.state.enemy,
              faint: null,
            },
          };
        },
        () => {
          setTimeout(() => {
            const players = [...this.state.players];
            for (let i = 0; i < this.state.players.length; i++) {
              players[i] = { ...players[i], faint: null };
              // Me
              if (i === 0) {
                players[i] = { ...players[i], me: true };
              }
            }

            this.setState(
              {
                textMessageOne: "Vous entrez pour le combattre !",
                players
              },
              () => {
                setTimeout(() => {
                  this.setState({
                    textMessageOne: ""
                  });

                  this.nextEnemyAction();
                }, 3000);
              }
            );
          }, 3000);
        }
      );
    }, 1000);
  }

  nextEnemyAction() {
    const enemyAction = Math.floor(Math.random() * this.state.enemy.actions.length);

    this.setState({
      enemy: {
        ...this.state.enemy,
        expectedAction: this.state.enemy.actions[enemyAction],
      }
    })
  }

  checkIfPlayerAlive(idPlayerSelected) {
    const players = [...this.state.players];

    if (players[idPlayerSelected].hp === 0) {
      players[idPlayerSelected] = {...players[idPlayerSelected], faint: true, isHit: false};
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
            });
            if (!allPlayersDead) {
              this.setState(
                {
                  textMessageOne: `Toute l'équipe a perdu.`,
                  textMessageTwo: `${this.state.enemy.name} a gagné!`,
                },
                () => {
                  setTimeout(() => {
                    this.setState({
                      gameOver: true
                    });
                  }, 3000);
                }
              );
            } else {
              this.setState({
                textMessageOne: "",
                round: this.state.round + 1,
              });
              this.nextEnemyAction();
            }
          }, 3000);
        }
      );
    } else {
      players[idPlayerSelected] = {...players[idPlayerSelected], isHit: false, faint: false};
      this.setState({
        textMessageOne: "",
        round: this.state.round + 1,
        players
      });
      this.nextEnemyAction();
    }
  }

  enemyTurn = () => {
    const { amount, name, effect } = this.state.enemy.expectedAction;
    const playerSelected = selectPlayer(this.state.players, effect);

    // 1 - ENEMY DEAD
    if (this.state.enemy.hp === 0) {
      this.setState(
        {
          textMessageOne: `${this.state.enemy.name} a perdu.`,
          textMessageTwo: `Vous avez gagné!`,
          enemy: {
            ...this.state.enemy,
            faint: true,
            isHit: false,
          },
        },
        () => {
          setTimeout(() => {
            this.setState({
              gameOver: true
            });
          }, 3000);
        }
      );
    // 2 - ENEMY ACTIONS
    } else {
      if (effect === "heal") {
        this.setState(
          {
            textMessageOne: `${this.state.enemy.name} se soigne pour ${amount}pts de vie.`,
            enemy: {
              ...this.state.enemy,
              hp: this.state.enemy.hp + amount,
            },
          },
          () => {
            setTimeout(() => {
              this.setState({
                textMessageOne: ""
              });
              this.nextEnemyAction();
            }, 3000);
          }
        );
      } else if (effect === "movement") {
        let { players, textMessageOne } = enemyMovementAction(this.state.players, playerSelected, this.state.enemy);
        this.setState(
          {
            textMessageOne,
            players
          },
          () => {
            setTimeout(() => {
              this.setState({
                textMessageOne: ""
              });
              this.checkIfPlayerAlive(playerSelected);
            }, 3000);
          }
        );
      } else {
        this.setState(
          prevState => {
            const players = [...this.state.players];
            players[playerSelected] = {
              ...players[playerSelected],
              isHit: true,
              hp: (prevState.players[playerSelected].hp - amount <= 0 ? 0 : prevState.players[playerSelected].hp - amount)
            };

            return {
              players,
              textMessageOne: `${
                this.state.enemy.name
              } utilise ${name} sur ${this.state.players[playerSelected].name} pour ${amount}pts de dégats!`
            };
          },
          () => {
            setTimeout(() => {
              this.checkIfPlayerAlive(playerSelected);
            }, 3000);
          }
        );
      }
    }
  }

  handleClickOnPlayerToAction = (player) => {
    const { playerActionSelectable } = this.state;

    if (playerActionSelectable.effect === "heal") {
      let { players, textMessageOne } = playerHealAction([...this.state.players], player, playerActionSelectable);
      this.setState({
        textMessageOne,
        players
      });
    } else if (playerActionSelectable.effect === "movement") {
      let { players, textMessageOne } = playerMovementAction([...this.state.players], player);
      this.setState({
        textMessageOne,
        players
      });
    }
    //2 - ENEMY TURN
    setTimeout(() => {
      this.setState({
        playerActionSelectable: undefined,
      });
      this.enemyTurn();
    }, 3000);
  }

  handleClickOnActionBar = (action) => {
    const { effect, name, amount } = action;

    // 1 - ATTACK
    if (effect === "melee" || effect === "range") {
      // 1.1 - PLAYER ACTION
      this.setState({
        enemy: {
          ...this.state.enemy,
          hp: (this.state.enemy.hp - amount <= 0 ? 0 : this.state.enemy.hp - amount),
          isHit: true,
        },
        textMessageOne: `${
          _.find(this.state.players, 'me').name
        } utilise ${name} pour ${amount}pts de dégats!`
      });
      // 1.2 - ENEMY ACTION
      setTimeout(() => {
        // Enemy turn
        this.setState({
          enemy: {
            ...this.state.enemy,
            isHit: false,
            faint: false,
          }
        });
        this.enemyTurn();
      }, 3000);
    // 2 - HEAL
    } else if (effect === "heal") {
      // 2.1 - PLAYER ACTION
      const players = [...this.state.players];
      for (let i = 0; i < this.state.players.length; i++) {
        if(this.state.players[i].hp > 0) {
          players[i] = { ...players[i], isSelectable: true };
        }
      }
      this.setState({
        textMessageOne: "Veuillez selectionner un joueur à soigner.",
        playerActionSelectable: action,
        players
      });
    // 3 - MOVEMENT
    } else if (effect === "movement") {
      // 3.1 - PLAYER ACTION
      const players = [...this.state.players];
      for (let i = 0; i < this.state.players.length; i++) {
        if(this.state.players[i] !== _.find(this.state.players, 'me') && this.state.players[i].hp > 0) {
          players[i] = { ...players[i], isSelectable: true };
        }
      }
      this.setState({
        textMessageOne: "Veuillez selectionner la place que vous souhaitez.",
        playerActionSelectable: action,
        players
      });
    }
  }

  handlePlayAgain = () => {
    const players = [...this.state.players];
    for (let i = 0; i < this.state.players.length; i++) {
      players[i] = { ...players[i], faint: false, isHit: false, hp: this.state.players[i].maxHp };
    }

    this.setState({
      enemy: {
        ...this.state.enemy,
        hp: this.state.enemy.maxHp,
        faint: false,
        isHit: false,
      },
      gameOver: false,
      textMessageOne: "",
      textMessageTwo: "",
      round: 1,
      players
    });
  }

  render() {
    return (
      <div className="container h-100">
        <div className="row row h-100 justify-content-center align-items-center">
          <div className="col-sm-12">
            {/* BATTLE SCREEN CONTAINER */}
            <div id="battle-container" className="px-2 mx-auto">
              <div id="turn-text"><i className="fas fa-dice"/> Tour {this.state.round}</div>
              <div className="all-players-box">
                {_.map(this.state.players, player => (
                  <PlayerBox
                    key={player.name}
                    player={player}
                    onClick={player.isSelectable ? this.handleClickOnPlayerToAction : () => { return null }}
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
                  {this.state.textMessageOne !== "" &&
                  this.state.gameOver === false && (
                    <TextBox
                      messageOne={this.state.textMessageOne}
                      messageTwo={this.state.textMessageTwo}
                    />
                  )}

                  {this.state.textMessageOne === "" &&
                  this.state.gameOver === false &&
                  Object.keys(_.find(this.state.players, 'me').actions).map((key, index) => {
                    return (
                      <Actions
                        key={key}
                        frontPlayer={_.find(this.state.players, 'me') === _.last(this.state.players)}
                        action={_.find(this.state.players, 'me').actions[key]}
                        onClick={this.handleClickOnActionBar}
                      />
                    );
                  })}
                  {this.state.gameOver === true && (
                    <PlayAgain handlePlayAgain={this.handlePlayAgain} />
                  )}
                </div>
              </div>
              {/* END TEXT BOX SECTION */}
            </div>
            {/* END BATTLE SCREEN CONTAINER */}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
