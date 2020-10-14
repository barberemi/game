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

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: [
        {
          name: "Pikachu",
          me: false,
          level: 50,
          hp: 300,
          maxHp: 300,
          faint: undefined,
          isHit: false,
          isSelectable: false,
          actions: [
            { name: "Morsure", amount: 10, effect: "attack" },
            { name: "Eclair", amount: 30, effect: "attack" },
            { name: "Soin éclair", amount: 100, effect: "defense" },
            { name: "Méga tonnerre", amount: 50, effect: "attack" },
          ],
        },
        {
          name: "Emolga",
          me: false,
          level: 45,
          hp: 250,
          maxHp: 250,
          faint: undefined,
          isHit: false,
          isSelectable: false,
          actions: [
            { name: "Morsure", amount: 10, effect: "attack" },
            { name: "Eclair", amount: 30, effect: "attack" },
            { name: "Tonnerre", amount: 35, effect: "attack" },
            { name: "Méga éclair", amount: 45, effect: "attack" },
          ],
        },
        {
          name: "Teddiursa",
          me: false,
          level: 35,
          hp: 150,
          maxHp: 150,
          faint: undefined,
          isHit: false,
          isSelectable: false,
          actions: [
            { name: "Morsure", amount: 10, effect: "attack" },
            { name: "Eclair", amount: 30, effect: "attack" },
            { name: "Tonnerre", amount: 35, effect: "attack" },
            { name: "Méga éclair", amount: 45, effect: "attack" },
          ],
        },
        {
          name: "Togepi",
          me: false,
          level: 40,
          hp: 200,
          maxHp: 200,
          faint: undefined,
          isHit: false,
          isSelectable: false,
          actions: [
            { name: "Morsure", amount: 10, effect: "attack" },
            { name: "Eclair", amount: 30, effect: "attack" },
            { name: "Tonnerre", amount: 35, effect: "attack" },
            { name: "Méga éclair", amount: 45, effect: "attack" },
          ],
        },
        {
          name: "Rondoudou",
          me: false,
          level: 50,
          hp: 300,
          maxHp: 300,
          faint: undefined,
          isHit: false,
          isSelectable: false,
          actions: [
            { name: "Morsure", amount: 10, effect: "attack" },
            { name: "Eclair", amount: 30, effect: "attack" },
            { name: "Tonnerre", amount: 35, effect: "attack" },
            { name: "Méga éclair", amount: 45, effect: "attack" },
          ],
        },
      ],
      enemy: {
        name: "Mewtwo",
        level: 60,
        hp: 600,
        maxHp: 600,
        faint: undefined,
        isHit: false,
        actions: [
          { name: "Frappe", amount: 50, effect: "attack" },
          { name: "Bouclier de l'ombre", amount: 50, effect: "defense" },
          { name: "Rêve éveillé", amount: 150, effect: "unknown" },
          { name: "Cauchemard", amount: 200, effect: "unknown" },
        ],
        expectedAction: undefined,
      },
      textMessageOne: " ",
      textMessageTwo: "",
      playerActionSelectable: undefined,
      round: 1,
      gameOver: false
    };
  }

  componentDidMount() {
    this.startingSequence();
  }

  startingSequence = () => {
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

  selectPlayer() {
    let playersToExclude = [];

    for (let i = 0; i < this.state.players.length; i++) {
      if (this.state.players[i].hp <= 0) {
        playersToExclude.push(i);
      }
    }

    const num = Math.floor(Math.random() * this.state.players.length);

    return (_.includes(playersToExclude, num)) ? this.selectPlayer() : num;
  }

  enemyTurn = () => {
    const playerSelected = this.selectPlayer();
    const enemyActionAmount = this.state.enemy.expectedAction.amount;
    const enemyActionName = this.state.enemy.expectedAction.name;

    // first, check if enemy fainted. End Game if they did.
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
    } else {
      // if enemy is still alive, proceed with enemy turn
      this.setState(
        prevState => {
          const players = [...this.state.players];
          players[playerSelected] = { ...players[playerSelected], isHit: true, hp: (prevState.players[playerSelected].hp - enemyActionAmount <= 0 ? 0 : prevState.players[playerSelected].hp - enemyActionAmount) };

          return {
            players,
            textMessageOne: `${
              this.state.enemy.name
            } utilise ${enemyActionName} sur ${this.state.players[playerSelected].name} pour ${enemyActionAmount}pts de dégats!`
          };
        },
        () => {
          setTimeout(() => {
            const players = [...this.state.players];

            if (this.state.players[playerSelected].hp === 0) {
              players[playerSelected] = { ...players[playerSelected], faint: true, isHit: false };

              this.setState(
                {
                  textMessageOne: `${this.state.players[playerSelected].name} a été terrassé.`,
                  players
                },
                () => {
                  setTimeout(() => {
                    //All players dead
                    const allPlayersDead = _.find(this.state.players, (player) => { return player.hp > 0 });
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
              players[playerSelected] = { ...players[playerSelected], isHit: false, faint: false };
              this.setState({
                textMessageOne: "",
                round: this.state.round + 1,
                players
              });
              this.nextEnemyAction();
            }
          }, 2000);
        }
      );
    }
  }

  handleClickOnPlayer = (player) => {
    // 1 - Player click on an other player or himself
    const players = [...this.state.players];
    for (let i = 0; i < this.state.players.length; i++) {
      if(this.state.players[i].hp > 0) {
        players[i] = { ...players[i], isSelectable: false };
        if (player.name === players[i].name) {
          const newHp = (players[i].hp + this.state.playerActionSelectable.amount) < players[i].maxHp ? players[i].hp + this.state.playerActionSelectable.amount : players[i].maxHp;
          players[i] = { ...players[i], hp: newHp };
        }
      }
    }
    this.setState({
      textMessageOne: `${
        this.state.players[0].name
      } utilise ${this.state.playerActionSelectable.name} pour soigner ${player.name} de ${this.state.playerActionSelectable.amount}pts de vie!`,
      players
    });
    //2 - ENEMY TURN
    setTimeout(() => {
      this.setState({
        playerActionSelectable: undefined,
      });
      this.enemyTurn();
    }, 3000);
  }

  handleActionClick = (action) => {
    const { effect, name, amount } = action;
    // 1 - ATTACK
    if (effect === "attack") {
      // 1.1 - PLAYER ACTION
      this.setState({
        enemy: {
          ...this.state.enemy,
          hp: (this.state.enemy.hp - amount <= 0 ? 0 : this.state.enemy.hp - amount),
          isHit: true,
        },
        textMessageOne: `${
          this.state.players[0].name
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
    // 2 - DEFENSE
    } else if (effect === "defense") {
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
                    onClick={player.isSelectable ? this.handleClickOnPlayer : () => { return null }}
                  />
                ))}

                <EnemyBox
                  enemyName={this.state.enemy.name}
                  enemyLevel={this.state.enemy.level}
                  enemyHP={this.state.enemy.hp}
                  enemyMaxHP={this.state.enemy.maxHp}
                  enemyFaint={this.state.enemy.faint}
                  enemyIsHit={this.state.enemy.isHit}
                  enemyExpectedAction={this.state.enemy.expectedAction}
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
                  Object.keys(this.state.players[0].actions).map((key, index) => {
                    return (
                      <Actions
                        key={key}
                        index={index}
                        action={this.state.players[0].actions[key]}
                        onClick={this.handleActionClick}
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
