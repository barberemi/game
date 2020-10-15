import React, { Component } from "react";
import Avatar from "./Avatar";
import PropTypes from "prop-types";

export class EnemyBox extends Component {
  expectedAction(action) {
    if (action !== undefined) {
      switch (action.effect) {
        case "melee":
          return <><i className="fas fa-fist-raised"/> <span className="small">{action.amount}</span></>;
        case "range":
          return <><i className="fas fa-bolt"/> <span className="small">{action.amount}</span></>;
        case "heal":
          return <><i className="fas fa-hand-holding-medical"/> <span className="small">{action.amount}</span></>;
        case "movement":
          return <><i className="fas fa-wind"/> <span className="small">{action.amount}</span></>;
        case "unknown":
          return <i className="fas fa-question"/>;
        default:
          return <br />;
      }
    } else {
      return <br />;
    }
  }

  render() {
    // calc enemy progress bar percentage based on HP
    let percentage = (this.props.enemy.hp / this.props.enemy.maxHp) * 100 + "%";

    return (
      <div id="enemy-container">
        {/* ENEMY POKEMON INFO BOX */}
        <div id="enemy-info-box">
          <div className="justify-content-between align-items-center">
            <h2>{this.props.enemy.name}</h2>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="progress both-progress">
              <div
                className="progress-bar bg-danger"
                role="progressbar"
                style={{ width: percentage }}
                aria-valuemin="0"
                aria-valuemax="100"
              />
              <div className="hp-progress-bar">
                <span>{this.props.enemy.hp}/{this.props.enemy.maxHp}</span>
              </div>
            </div>
          </div>
        </div>
        {/* END ENEMY POKEMON INFO BOX */}
        <div className="action-intention">
          {this.expectedAction(this.props.expectedAction)}
        </div>
        {/* ENEMY POKEMON AVATAR PICTURE */}
        <div className="mt-4 mr-sm-4 avatar-box">
          <Avatar
            faint={this.props.enemy.faint}
            isHit={this.props.enemy.isHit}
            logoName={this.props.enemy.name.toLowerCase()}
            className="avatar ml-3 mt-3"
          />
          <div className="oval" />
        </div>
        {/* END ENEMY POKEMON AVATAR PICTURE */}
      </div>
    );
  }
}

EnemyBox.propTypes = {
  enemy: PropTypes.shape({
    name: PropTypes.string,
    level: PropTypes.number,
    hp: PropTypes.number,
    maxHp: PropTypes.number,
    faint: PropTypes.bool,
    isHit: PropTypes.bool,
    actions: PropTypes.array,
  }),
  expectedAction: PropTypes.shape({
    name: PropTypes.string,
    amount: PropTypes.number,
    effect: PropTypes.string,
  })
}

export default EnemyBox;
