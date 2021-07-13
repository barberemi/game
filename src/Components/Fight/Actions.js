import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import ReactTooltip from 'react-tooltip'
import { getIconSkillType, getLabelTypeSkill } from '../../utils/skillHelper'
import ReactDOMServer from 'react-dom/server'

const Image = styled.img`
  border: solid 1px #fff;
  box-shadow: 3px 3px 5px black;
`

const SkillEffect = styled.div`
  position: absolute;
  color: white;
  width: auto;
  font-size: 16px;
  right: 0;
  padding: 0 5px;
  border: solid 1px #fff;
  border-top: solid 1px #fff;
  border-radius: 0 0 5px 5px;
  box-shadow: 0 3px 5px black;
`

const SkillName = styled.div`
  color: #fff;
  width: 50px;
  font-size: 12px;
  position: absolute;
  padding-top: 5px;
`

class Actions extends Component {
  expectedEffect(amount, effect) {
    if (amount) {
      return (
        <SkillEffect
          className={
            effect === 'heal' || effect === 'hot' ? 'bg-success' : 'bg-danger'
          }
        >
          <span className="small">{amount}</span>
        </SkillEffect>
      )
    } else {
      return <SkillEffect className="pt-1">{effect}</SkillEffect>
    }
  }

  isBlocked(nbBlockedRounds) {
    if (nbBlockedRounds > 0) {
      return (
        <span className="small">
          {nbBlockedRounds} {nbBlockedRounds === 1 ? 'tour' : 'tours'}{' '}
          <i className="fas fa-lock" />{' '}
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
      description,
      cooldown,
      image,
      duration,
      nbBlockedTurns
    } = this.props.action

    return (
      <>
        <div
          className={`attack-container position-relative attack-container-nb-${this.props.number}`}
          style={{
            opacity:
              (effect === 'melee' && !this.props.frontPlayer) ||
              nbBlockedTurns !== 0
                ? '0.65'
                : '1'
          }}
        >
          <div
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
              width="55px"
              className="move-pointer"
              style={{
                cursor:
                  (effect === 'melee' && !this.props.frontPlayer) ||
                  nbBlockedTurns !== 0
                    ? 'not-allowed'
                    : 'pointer'
              }}
              data-tip={ReactDOMServer.renderToStaticMarkup(
                <div>
                  <span
                    style={{ fontSize: '18px' }}
                    className={
                      effect === 'heal' || effect === 'hot'
                        ? 'text-success'
                        : 'text-danger'
                    }
                  >
                    {name}
                  </span>
                  <hr className="my-3" style={{ filter: 'invert(100%)' }} />
                  <span style={{ filter: 'invert(100%)' }}>
                    {getIconSkillType(effect)}
                  </span>{' '}
                  {getLabelTypeSkill(effect)}
                  <br />
                  {duration > 0 && (
                    <>
                      <br />
                      <b>Durée :</b> {duration} tours
                      <br />
                    </>
                  )}
                  {cooldown > 0 && (
                    <>
                      <br />
                      <b>Récupération :</b> {cooldown}{' '}
                      {cooldown > 1 ? 'tours' : 'tour'}
                      <br />
                    </>
                  )}
                  <hr className="my-3" style={{ filter: 'invert(100%)' }} />
                  {description}
                </div>
              )}
              data-html={true}
            />
          </div>
          <SkillName>{this.isBlocked(nbBlockedTurns)}</SkillName>
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
    cooldown: PropTypes.number,
    description: PropTypes.string,
    image: PropTypes.string,
    nbBlockedTurns: PropTypes.number
  }),
  number: PropTypes.number,
  frontPlayer: PropTypes.bool,
  onClick: PropTypes.func
}

export default Actions
