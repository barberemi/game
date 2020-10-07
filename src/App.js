import React, { Component } from 'react';
import "./animate.css";
import "./bootstrap.css";
import "./App.css";
import TextBox from "./Components/TextBox";
import Attacks from "./Components/Attacks";
import EnemyBox from "./Components/EnemyBox";
import PlayerBox from "./Components/PlayerBox";
import PlayAgain from "./Components/PlayAgain";

class App extends Component {
  state = {
    playerName: "Pikachu",
    playerLevel: 45,
    playerHP: 200,
    playerMaxHP: 200,
    playerAttacks: {
      attackOne: { name: "Morsure", damage: 10 },
      attackTwo: { name: "Eclair", damage: 30 },
      attackThree: { name: "Tonnère", damage: 35 },
      attackFour: { name: "Méga éclair", damage: 45 }
    },
    playerFaint: "",
    enemyName: "Mewtwo",
    enemyLevel: 43,
    enemyHP: 200,
    enemyMaxHP: 200,
    enemyAttackNames: ["Frappe", "Balle de l'ombre", "Rêve éveillé", "Cauchemard"],
    enemyAttackDamage: [10, 30, 35, 45],
    enemyFaint: "",
    textMessageOne: " ",
    textMessageTwo: "",
    gameOver: false
  };

  componentDidMount() {
    this.startingSequence();
  }

  startingSequence = () => {
    setTimeout(() => {
      this.setState(
        () => {
          return {
            textMessageOne: `${this.state.enemyName} apparait!`,
            enemyFaint: false
          };
        },
        () => {
          setTimeout(() => {
            this.setState(
              {
                textMessageOne: `Go ${this.state.playerName}!`,
                playerFaint: false
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
    if (this.state.enemyHP === 0) {
      this.setState(
        {
          textMessageOne: `${this.state.enemyName} a perdu.`,
          textMessageTwo: `${this.state.playerName} a gagné!`,
          enemyFaint: true
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
          if (prevState.playerHP - enemyAttackDamage <= 0) {
            return {
              playerHP: 0,
              textMessageOne: `${
                this.state.enemyName
              } utilise ${enemyAttackName} pour ${enemyAttackDamage}pts de dégats!`
            };
          } else {
            return {
              playerHP: prevState.playerHP - enemyAttackDamage,
              textMessageOne: `${
                this.state.enemyName
              } utilise ${enemyAttackName} pour ${enemyAttackDamage}pts de dégats!`
            };
          }
        },
        () => {
          setTimeout(() => {
            if (this.state.playerHP === 0) {
              this.setState(
                {
                  textMessageOne: `${this.state.playerName} a perdu.`,
                  textMessageTwo: `${this.state.enemyName} a gagné!`,
                  playerFaint: true
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
    // implicit return single value
    // this.setState(prevState => ({
    //   enemyHP: prevState.enemyHP - damage
    // }));

    damage = damage + Math.floor(Math.random() * 11);

    // use attack to calculate enemy HP and adjust progress bar
    this.setState(
      prevState => {
        if (prevState.enemyHP - damage <= 0) {
          return {
            enemyHP: 0,
            textMessageOne: `${
              this.state.playerName
            } utilise ${name} pour ${damage}pts de dégats!`
          };
        } else {
          return {
            enemyHP: prevState.enemyHP - damage,
            textMessageOne: `${
              this.state.playerName
            } utilise ${name} pour ${damage}pts de dégats!`
          };
        }
      },
      () => {
        // wait X seconds before enemy attacks
        setTimeout(() => {
          // calc next enemy attack name and damage
          let enemyAttack = Math.floor(Math.random() * 4);
          let enemyAttackDamage = this.state.enemyAttackDamage[enemyAttack];
          let enemyAttackName = this.state.enemyAttackNames[enemyAttack];

          // once the state is changed, start enemy turn
          this.enemyTurn(enemyAttackName, enemyAttackDamage);
        }, 3000);
      }
    );
  };

  handlePlayAgain = () => {
    this.setState({
      playerHP: this.state.playerMaxHP,
      enemyHP: this.state.enemyMaxHP,
      gameOver: false,
      textMessageOne: "",
      textMessageTwo: "",
      enemyFaint: false,
      playerFaint: false
    });
  };

  render() {
    return (
      <div className="container h-100">
        <div className="row row h-100 justify-content-center align-items-center">
          <div className="col-sm-12">
            {/* BATTLE SCREEN CONTAINER */}
            <div id="battle-container" className="px-2 mx-auto">
              <EnemyBox
                enemyName={this.state.enemyName}
                enemyLevel={this.state.enemyLevel}
                enemyHP={this.state.enemyHP}
                enemyMaxHP={this.state.enemyMaxHP}
                enemyFaint={this.state.enemyFaint}
              />

              <PlayerBox
                playerName={this.state.playerName}
                playerLevel={this.state.playerLevel}
                playerHP={this.state.playerHP}
                playerMaxHP={this.state.playerMaxHP}
                playerFaint={this.state.playerFaint}
              />

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
                  Object.keys(this.state.playerAttacks).map((key, index) => {
                    return (
                      <Attacks
                        key={key}
                        index={index}
                        details={this.state.playerAttacks[key]}
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
