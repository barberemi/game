import React, { Component } from 'react'
import Avatar from './Avatar'
import PropTypes from 'prop-types'
import _ from 'lodash'
import HpBar from './HpBar'

export class PlayerBox extends Component {
  expectedAction(me, isSelectable) {
    if (isSelectable) {
      return <i className="far fa-hand-point-down" />
    } else if (me) {
      return <i className="fas fa-long-arrow-alt-down" />
    } else {
      return <br />
    }
  }

  render() {
    return (
      <div
        id="hero-container"
        className={
          this.props.player.isSelectable ? 'hero-container-selected' : null
        }
        onClick={() => this.props.onClick(this.props.player)}
      >
        <div id="hero-info-box">
          <HpBar hp={this.props.player.hp} maxHp={this.props.player.maxHp} />
        </div>

        <div className="action-intention">
          {this.expectedAction(
            this.props.player.me,
            this.props.player.isSelectable
          )}
        </div>
        {/* HERO POKEMON AVATAR PICTURE */}
        <div className="avatar-box">
          <Avatar
            faint={this.props.player.faint}
            isHit={this.props.player.isHit}
            logoName={this.props.player.name.toLowerCase()}
            className={`avatar mt-5 ${
              this.props.player.isSelectable ? 'hero-hover-selected' : ''
            }`}
          />
          {!this.props.player.faint &&
            _.map(this.props.player.hot, ({ amount }, index) => (
              <span key={index} className="small avatar-effect">
                {amount}
                <i className="fas fa-medkit" />
              </span>
            ))}
          {!this.props.player.faint &&
            _.map(this.props.player.dot, ({ amount }, index) => (
              <span key={index} className="small avatar-effect">
                {amount}
                <i className="fas fa-burn" />
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
    actions: PropTypes.array,
    dot: PropTypes.array,
    hot: PropTypes.array
  }),
  onClick: PropTypes.func
}

export default PlayerBox
