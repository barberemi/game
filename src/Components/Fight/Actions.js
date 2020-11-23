import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Actions extends Component {
  expectedEffect(amount, effect) {
    switch (effect) {
      case 'melee':
        return (
          <>
            {' '}
            <i className="fas fa-fist-raised" />{' '}
            <span className="small">{amount}</span>
          </>
        )
      case 'range':
        return (
          <>
            {' '}
            <i className="fas fa-bolt" />{' '}
            <span className="small">{amount}</span>
          </>
        )
      case 'dot':
        return (
          <>
            {' '}
            <i className="fas fa-burn" />{' '}
            <span className="small">{amount}</span>
          </>
        )
      case 'heal':
        return (
          <>
            {' '}
            <i className="fas fa-hand-holding-medical" />{' '}
            <span className="small">{amount}</span>
          </>
        )
      case 'hot':
        return (
          <>
            {' '}
            <i className="fas fa-medkit" />{' '}
            <span className="small">{amount}</span>
          </>
        )
      case 'movement':
        return (
          <>
            {' '}
            <i className="fas fa-shoe-prints" />
          </>
        )
      default:
        return ''
    }
  }

  isBlocked(nbBlockedRounds, duration) {
    if (nbBlockedRounds > 0) {
      return (
        <span className="small">
          ({nbBlockedRounds} <i className="fas fa-lock" />){' '}
        </span>
      )
    } else if (duration) {
      return (
        <span className="small">
          ({duration} <i className="fas fa-clock" />){' '}
        </span>
      )
    }

    return ''
  }

  disabledAction(isFrontPlayer, effect, nbBlockedTurns) {
    return (effect === 'melee' && !isFrontPlayer) || nbBlockedTurns !== 0
      ? 'disabled'
      : ''
  }

  render() {
    const { name, amount, effect, duration, nbBlockedTurns } = this.props.action

    return (
      <div
        className={`attack-container btn ${this.disabledAction(
          this.props.frontPlayer,
          effect,
          nbBlockedTurns
        )}`}
      >
        <div>
          <span
            className="move-pointer"
            onClick={() => {
              if (
                this.disabledAction(
                  this.props.frontPlayer,
                  effect,
                  nbBlockedTurns
                ) === ''
              ) {
                this.props.onClick(this.props.action)
              }
            }}
          >
            {this.isBlocked(nbBlockedTurns, duration)}
            {name}
            {this.expectedEffect(amount, effect)}
          </span>
        </div>
      </div>
    )
  }
}

Actions.propTypes = {
  action: PropTypes.shape({
    name: PropTypes.string,
    amount: PropTypes.number,
    effect: PropTypes.string,
    duration: PropTypes.number,
    nbBlockedTurns: PropTypes.number
  }),
  frontPlayer: PropTypes.bool,
  onClick: PropTypes.func
}

export default Actions
