import React, { Component } from "react";
import Avatar from "./Avatar";
import PropTypes from "prop-types";
import _ from "lodash";
import HpBar from "./HpBar";

export class EnemyBox extends Component {
  expectedAction(action) {
    if (action !== undefined) {
      switch (action.effect) {
        case "melee":
          return <><i className="fas fa-fist-raised"/> <span className="small">{action.amount}</span></>;
        case "range":
          return <><i className="fas fa-bolt"/> <span className="small">{action.amount}</span></>;
        case "dot":
          return <> <span className="small">({action.duration} <i className="fas fa-clock"/>)</span> <i className="fas fa-burn"/> <span className="small">{action.amount}</span></>;
        case "heal":
          return <><i className="fas fa-hand-holding-medical"/> <span className="small">{action.amount}</span></>;
        case "hot":
          return <> <span className="small">({action.duration} <i className="fas fa-clock"/>)</span> <i className="fas fa-hand-holding-medical"/> <span className="small">{action.amount}</span></>;
        case "skill_block":
          return <><i className="fas fa-lock"/> <span className="small">{action.amount}</span></>;
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
    return (
      <div id="enemy-container">
        {/* ENEMY POKEMON INFO BOX */}
        <div id="enemy-info-box">
          <div className="justify-content-between align-items-center">
            <h2 className="enemy-name">{this.props.enemy.name}</h2>
          </div>
          <HpBar hp={this.props.enemy.hp} maxHp={this.props.enemy.maxHp} />
        </div>
        {/* END ENEMY POKEMON INFO BOX */}
        <div className="action-intention">
          {this.expectedAction(this.props.expectedAction)}
        </div>
        {/* ENEMY POKEMON AVATAR PICTURE */}
        <div className="avatar-box">
          <Avatar
            faint={this.props.enemy.faint}
            isHit={this.props.enemy.isHit}
            logoName={this.props.enemy.name.toLowerCase()}
            className="avatar mt-4"
          />
          {!this.props.enemy.faint && _.map(this.props.enemy.hot, ({amount}, index) => (
            <span key={index} className="small avatar-effect">{amount}<i className="fas fa-medkit"/></span>
          ))}
          {!this.props.enemy.faint && _.map(this.props.enemy.dot, ({amount}, index) => (
            <span key={index} className="small avatar-effect">{amount}<i className="fas fa-burn"/></span>
          ))}
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
    dot: PropTypes.array,
    hot: PropTypes.array,
  }),
  expectedAction: PropTypes.shape({
    name: PropTypes.string,
    amount: PropTypes.number,
    effect: PropTypes.string,
    duration: PropTypes.number,
  })
}

export default EnemyBox;
