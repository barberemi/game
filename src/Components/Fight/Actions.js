import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getIconSkillType } from '../../utils/skillHelper'
import SkillCard from '../Skill/SkillCard'
import ReactTooltip from 'react-tooltip'

class Actions extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayCard: false
    }
  }

  expectedEffect(amount, effect) {
    if (amount) {
      return (
        <>
          {' '}
          {getIconSkillType(effect)} <span className="small">{amount}</span>
        </>
      )
    } else {
      return <> {getIconSkillType(effect)}</>
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
      <>
        <div
          className={`attack-container btn ${this.disabledAction(
            this.props.frontPlayer,
            effect,
            nbBlockedTurns
          )}`}
          onDoubleClick={() => {
            if (
              this.disabledAction(
                this.props.frontPlayer,
                effect,
                nbBlockedTurns
              ) === ''
            ) {
              this.props.onDoubleClick(this.props.action)
            }
          }}
          onClick={() =>
            this.setState({
              displayCard: !this.state.displayCard
            })
          }
        >
          <div>
            <span
              className="move-pointer"
              data-tip="1 clic : visualiser, 2 clics : utiliser"
            >
              {this.isBlocked(nbBlockedTurns, duration)}
              {name}
              {this.expectedEffect(amount, effect)}
            </span>
          </div>
        </div>
        <SkillCard
          className={this.state.displayCard ? 'd-block' : 'd-none'}
          skill={this.props.action}
        />
        <ReactTooltip />
      </>
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
  onDoubleClick: PropTypes.func
}

export default Actions
