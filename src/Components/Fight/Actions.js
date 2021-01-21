import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { getIconSkillType } from '../../utils/skillHelper'
import ReactTooltip from 'react-tooltip'

const Image = styled.img`
  border: solid #000;
`

const SkillEffect = styled.div`
  position: absolute;
  color: #fff;
  background-color: #ffc312;
  width: 30px;
  font-size: 16px;
  right: 17px;
  border: solid 1px #fff;
`

const SkillName = styled.div`
  color: #fff;
  width: 80px;
  font-size: 12px;
  position: absolute;
  padding-top: 5px;
`

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
        <SkillEffect>
          <span className="small">{amount}</span>
          <br />
          {getIconSkillType(effect)}
        </SkillEffect>
      )
    } else {
      return (
        <SkillEffect className="pt-1">{getIconSkillType(effect)}</SkillEffect>
      )
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

  render() {
    const {
      name,
      amount,
      effect,
      duration,
      description,
      image,
      nbBlockedTurns
    } = this.props.action

    return (
      <>
        <div
          className="attack-container position-relative"
          style={{
            opacity:
              (effect === 'melee' && !this.props.frontPlayer) ||
              nbBlockedTurns !== 0
                ? '0.65'
                : '1'
          }}
          onClick={() => {
            if (nbBlockedTurns === 0) {
              if (
                (effect === 'melee' && this.props.frontPlayer) ||
                effect !== 'melee'
              ) {
                this.props.onClick(this.props.action)
              }
            }
          }}
        >
          {this.expectedEffect(amount, effect)}
          <Image
            src={process.env.PUBLIC_URL + '/img/skills/' + image}
            width="80px"
            className="move-pointer"
            style={{
              cursor:
                (effect === 'melee' && !this.props.frontPlayer) ||
                nbBlockedTurns !== 0
                  ? 'not-allowed'
                  : 'pointer'
            }}
            data-tip={description}
          />
          <SkillName>
            {this.isBlocked(nbBlockedTurns, duration)}
            {name}
          </SkillName>
        </div>
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
    description: PropTypes.string,
    image: PropTypes.string,
    nbBlockedTurns: PropTypes.number
  }),
  frontPlayer: PropTypes.bool,
  onClick: PropTypes.func
}

export default Actions
