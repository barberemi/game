import React, { Component } from 'react';
import "./animate.css";
import "./bootstrap.css";
import "./App.css";
import TextBox from "./Components/TextBox";
import Attacks from "./Components/Attacks";
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
          level: 50,
          hp: 300,
          maxHp: 300,
          faint: undefined,
          attacks: [
            { name: "Morsure", damage: 10, cost: 0 },
            { name: "Eclair", damage: 30, cost: 10 },
            { name: "Tonnerre", damage: 35, cost: 20 },
            { name: "Méga éclair", damage: 45, cost: 30 },
          ],
        },
        {
          name: "Emolga",
          level: 45,
          hp: 250,
          maxHp: 250,
          faint: undefined,
          attacks: [
            { name: "Morsure", damage: 10, cost: 0 },
            { name: "Eclair", damage: 30, cost: 10 },
            { name: "Tonnerre", damage: 35, cost: 20 },
            { name: "Méga éclair", damage: 45, cost: 30 },
          ],
        },
        {
          name: "Teddiursa",
          level: 35,
          hp: 150,
          maxHp: 150,
          faint: undefined,
          attacks: [
            { name: "Morsure", damage: 10, cost: 0 },
            { name: "Eclair", damage: 30, cost: 10 },
            { name: "Tonnerre", damage: 35, cost: 20 },
            { name: "Méga éclair", damage: 45, cost: 30 },
          ],
        },
        {
          name: "Togepi",
          level: 40,
          hp: 200,
          maxHp: 200,
          faint: undefined,
          attacks: [
            { name: "Morsure", damage: 10, cost: 0 },
            { name: "Eclair", damage: 30, cost: 10 },
            { name: "Tonnerre", damage: 35, cost: 20 },
            { name: "Méga éclair", damage: 45, cost: 30 },
          ],
        }
      ],
      enemy: {
        name: "Mewtwo",
        level: 60,
        hp: 1000,
        maxHp: 1000,
        faint: undefined,
        attackNames: ["Frappe", "Balle de l'ombre", "Rêve éveillé", "Cauchemard"],
        attackDamages: [100, 100, 100, 100],
      },
      textMessageOne: " ",
      textMessageTwo: "",
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
              faint: false,
            },
          };
        },
        () => {
          setTimeout(() => {
            const players = [...this.state.players];
            for (let i = 0; i < this.state.players.length; i++) {
              players[i] = { ...players[i], faint: false };
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
                }, 3000);
              }
            );
          }, 3000);
        }
      );
    }, 1000);
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
    // calc next enemy attack name + damage and player attacked
    const playerAttacked = this.selectPlayer();
    const enemyAttack = Math.floor(Math.random() * this.state.enemy.attackNames.length);
    const enemyAttackDamage = this.state.enemy.attackDamages[enemyAttack];
    const enemyAttackName = this.state.enemy.attackNames[enemyAttack];

    // first, check if enemy fainted. End Game if they did.
    if (this.state.enemy.hp === 0) {
      this.setState(
        {
          textMessageOne: `${this.state.enemy.name} a perdu.`,
          textMessageTwo: `Vous avez gagné!`,
          enemy: {
            ...this.state.enemy,
            faint: true,
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
          players[playerAttacked] = { ...players[playerAttacked], hp: (prevState.players[playerAttacked].hp - enemyAttackDamage <= 0 ? 0 : prevState.players[playerAttacked].hp - enemyAttackDamage) };

          return {
            players,
            textMessageOne: `${
              this.state.enemy.name
            } utilise ${enemyAttackName} sur ${this.state.players[playerAttacked].name} pour ${enemyAttackDamage}pts de dégats!`
          };
        },
        () => {
          setTimeout(() => {
            if (this.state.players[playerAttacked].hp === 0) {
              const players = [...this.state.players];
              players[playerAttacked] = { ...players[playerAttacked], faint: true };

              this.setState(
                {
                  textMessageOne: `${this.state.players[playerAttacked].name} a été terrassé.`,
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
                        textMessageOne: ""
                      });
                    }
                  }, 3000);
                }
              );
            } else {
              this.setState({
                textMessageOne: ""
              });
            }
          }, 2000);
        }
      );
    }
  }

  handleAttackClick = (name, damage) => {
    // use attack to calculate enemy HP and adjust progress bar
    this.setState(
      prevState => {
        return {
          enemy: {
            ...this.state.enemy,
            hp: (prevState.enemy.hp - damage <= 0 ? 0 : prevState.enemy.hp - damage),
          },
          textMessageOne: `${
            this.state.players[0].name
          } utilise ${name} pour ${damage}pts de dégats!`
        };
      },
      () => {
        // wait X seconds before enemy attacks
        setTimeout(() => {
          // Enemy turn
          this.enemyTurn();
        }, 3000);
      }
    );
  }

  handlePlayAgain = () => {
    const players = [...this.state.players];
    for (let i = 0; i < this.state.players.length; i++) {
      players[i] = { ...players[i], faint: false, hp: this.state.players[i].maxHp };
    }

    this.setState({
      enemy: {
        ...this.state.enemy,
        hp: this.state.enemy.maxHp,
        faint: false,
      },
      gameOver: false,
      textMessageOne: "",
      textMessageTwo: "",
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

              <div className="all-players-box">
                <EnemyBox
                  enemyName={this.state.enemy.name}
                  enemyLevel={this.state.enemy.level}
                  enemyHP={this.state.enemy.hp}
                  enemyMaxHP={this.state.enemy.maxHp}
                  enemyFaint={this.state.enemy.faint}
                />

                {_.map(this.state.players, player => (
                  <PlayerBox
                    key={player.name}
                    playerName={player.name}
                    playerLevel={player.level}
                    playerHP={player.hp}
                    playerMaxHP={player.maxHp}
                    playerFaint={player.faint}
                  />
                ))}
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
                  Object.keys(this.state.players[0].attacks).map((key, index) => {
                    return (
                      <Attacks
                        key={key}
                        index={index}
                        details={this.state.players[0].attacks[key]}
                        handleAttackClick={this.handleAttackClick}
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
