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
          level: 45,
          hp: 200,
          maxHp: 200,
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
          hp: 200,
          maxHp: 200,
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
          level: 45,
          hp: 200,
          maxHp: 200,
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
          level: 45,
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
        level: 43,
        hp: 200,
        maxHp: 200,
        faint: undefined,
        attackNames: ["Frappe", "Balle de l'ombre", "Rêve éveillé", "Cauchemard"],
        attackDamages: [10, 30, 35, 45],
      },
      // playerName: "Pikachu",
      // playerLevel: 45,
      // playerHP: 200,
      // playerMaxHP: 200,
      // playerFaint: undefined,
      // playerAttacks: {
      //   attackOne: { name: "Morsure", damage: 10, cost: 0 },
      //   attackTwo: { name: "Eclair", damage: 30, cost: 10 },
      //   attackThree: { name: "Tonnerre", damage: 35, cost: 20 },
      //   attackFour: { name: "Méga éclair", damage: 45, cost: 30 }
      // },
      // enemyName: "Mewtwo",
      // enemyLevel: 43,
      // enemyHP: 200,
      // enemyMaxHP: 200,
      // enemyAttackNames: ["Frappe", "Balle de l'ombre", "Rêve éveillé", "Cauchemard"],
      // enemyAttackDamage: [10, 30, 35, 45],
      // enemyFaint: undefined,
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
  };

  enemyTurn = (enemyAttackName, enemyAttackDamage) => {
    enemyAttackDamage = enemyAttackDamage + Math.floor(Math.random() * 11);
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

          if (prevState.players[0].hp - enemyAttackDamage <= 0) {
            players[0] = { ...players[0], hp: 0 };
            return {
              players,
              textMessageOne: `${
                this.state.enemy.name
              } utilise ${enemyAttackName} pour ${enemyAttackDamage}pts de dégats!`
            };
          } else {
            players[0] = { ...players[0], hp: prevState.players[0].hp - enemyAttackDamage };
            return {
              players,
              textMessageOne: `${
                this.state.enemy.name
              } utilise ${enemyAttackName} pour ${enemyAttackDamage}pts de dégats!`
            };
          }
        },
        () => {
          setTimeout(() => {
            if (this.state.players[0].hp === 0) {
              const players = [...this.state.players];
              players[0] = { ...players[0], faint: true };

              this.setState(
                {
                  textMessageOne: `${this.state.players[0].name} a perdu.`,
                  textMessageTwo: `${this.state.enemy.name} a gagné!`,
                  players
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
          }, 2000);
        }
      );
    }
  };

  handleAttackClick = (name, damage) => {
    damage = damage + Math.floor(Math.random() * 11);

    // use attack to calculate enemy HP and adjust progress bar
    this.setState(
      prevState => {
        if (prevState.enemy.hp - damage <= 0) {
          return {
            enemy: {
              ...this.state.enemy,
              hp: 0,
            },
            textMessageOne: `${
              this.state.players[0].name
            } utilise ${name} pour ${damage}pts de dégats!`
          };
        } else {
          return {
            enemy: {
              ...this.state.enemy,
              hp: prevState.enemy.hp - damage,
            },
            textMessageOne: `${
              this.state.players[0].name
            } utilise ${name} pour ${damage}pts de dégats!`
          };
        }
      },
      () => {
        // wait X seconds before enemy attacks
        setTimeout(() => {
          // calc next enemy attack name and damage
          let enemyAttack = Math.floor(Math.random() * 4);
          let enemyAttackDamage = this.state.enemy.attackDamages[enemyAttack];
          let enemyAttackName = this.state.enemy.attackNames[enemyAttack];

          // once the state is changed, start enemy turn
          this.enemyTurn(enemyAttackName, enemyAttackDamage);
        }, 3000);
      }
    );
  };

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
  };

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
