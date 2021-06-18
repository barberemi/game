import React, { Component } from 'react'
import Avatar from './Avatar'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { getIconSkillType } from '../../utils/skillHelper'
import HpBar from './HpBar'

export class PlayerBox extends Component {
  expectedAction(isSelectable) {
    if (isSelectable) {
      return <i className="far fa-hand-point-down" />
    } else {
      return <br />
    }
  }

  render() {
    return (
      <div
        id="hero-container"
        className={`col-sm-4${
          this.props.player.isSelectable ? ' hero-container-selected' : ''
        }`}
        onClick={() => this.props.onClick(this.props.player)}
      >
        <div>
          <div className="justify-content-between align-items-center">
            <h2 className="character-name">{this.props.player.name}</h2>
          </div>
          <HpBar hp={this.props.player.hp} maxHp={this.props.player.maxHp} />
        </div>

        <div className="action-intention">
          {this.expectedAction(this.props.player.isSelectable)}
        </div>
        {/* HERO POKEMON AVATAR PICTURE */}
        <div className="avatar-box">
          <Avatar
            faint={this.props.player.faint}
            isHit={this.props.player.isHit}
            isPlayer={true}
            logoName={'academies/' + this.props.player.image + '.png'}
            className={`avatar mt-1 ${
              this.props.player.isSelectable ? 'hero-hover-selected' : ''
            }`}
          />
          {!this.props.player.faint &&
            _.map(this.props.player.hot, ({ amount }, index) => (
              <span key={index} className="small avatar-effect">
                {amount}
                {getIconSkillType('hot')}
              </span>
            ))}
          {!this.props.player.faint &&
            _.map(this.props.player.dot, ({ amount }, index) => (
              <span key={index} className="small avatar-effect">
                {amount}
                {getIconSkillType('dot')}
              </span>
            ))}
        </div>
        {/* END HERO POKEMON AVATAR PICTURE */}
      </div>
    )
  }
}

PlayerBox.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    me: PropTypes.bool,
    level: PropTypes.number,
    hp: PropTypes.number,
    maxHp: PropTypes.number,
    faint: PropTypes.bool,
    isHit: PropTypes.bool,
    isSelectable: PropTypes.bool,
    skills: PropTypes.array,
    dot: PropTypes.array,
    hot: PropTypes.array
  }),
  onClick: PropTypes.func
}

export default PlayerBox
