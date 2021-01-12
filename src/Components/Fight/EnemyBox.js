import React, { Component } from 'react'
import Avatar from './Avatar'
import PropTypes from 'prop-types'
import _ from 'lodash'
import HpBar from './HpBar'
import { getIconSkillType } from '../../utils/skillHelper'

export class EnemyBox extends Component {
  expectedAction(action) {
    if (action !== undefined) {
      if (action.amount) {
        if (action.duration) {
          return (
            <>
              {' '}
              <span className="small">
                ({action.duration} <i className="fas fa-clock" />)
              </span>{' '}
              {getIconSkillType(action.effect)}{' '}
              <span className="small">{action.amount}</span>
            </>
          )
        } else {
          return (
            <>
              {getIconSkillType(action.effect)}{' '}
              <span className="small">{action.amount}</span>
            </>
          )
        }
      } else {
        return <> {getIconSkillType(action.effect)}</>
      }
    } else {
      return <br />
    }
  }

  render() {
    return (
      <div id="enemy-container" className="col-sm-4 offset-sm-5">
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
            logoName={'boss/' + this.props.enemy.image}
            className="avatar mt-5"
          />
          {!this.props.enemy.faint &&
            _.map(this.props.enemy.hot, ({ amount }, index) => (
              <span key={index} className="small avatar-effect">
                {amount}
                <i className="fas fa-medkit" />
              </span>
            ))}
          {!this.props.enemy.faint &&
            _.map(this.props.enemy.dot, ({ amount }, index) => (
              <span key={index} className="small avatar-effect">
                {amount}
                <i className="fas fa-burn" />
              </span>
            ))}
        </div>
        {/* END ENEMY POKEMON AVATAR PICTURE */}
      </div>
    )
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
    skills: PropTypes.array,
    dot: PropTypes.array,
    hot: PropTypes.array
  }),
  expectedAction: PropTypes.shape({
    name: PropTypes.string,
    amount: PropTypes.number,
    effect: PropTypes.string,
    duration: PropTypes.number
  })
}

export default EnemyBox
