import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import _ from 'lodash'
import { getCharacteristicTranslationName } from '../../utils/characteristicHelper'

import actionSvg from './action.svg'
import healthSvg from './health.svg'
import intelligenceSvg from './intelligence.svg'
import strengthSvg from './strength.svg'
import experienceSvg from './experience.svg'
import defenseSvg from './defense.svg'

const Characteristic = styled.div`
  display: flex;
  float: left;
`

const Image = styled.img`
  width: 60px;
  height: 60px;
`

const TextBox = styled.div`
  padding: 0 10px;
  display: table-cell;
  margin-top: auto;
  text-align: left;
`

class CharacteristicItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      label: null,
      color: null,
      svg: null
    }
  }

  componentDidMount() {
    switch (this.props.name) {
      case 'intelligence':
        this.setState({
          label: getCharacteristicTranslationName(this.props),
          color: '#1c8aff',
          svg: intelligenceSvg
        })
        break
      case 'strength':
        this.setState({
          label: getCharacteristicTranslationName(this.props),
          color: '#f33232',
          svg: strengthSvg
        })
        break
      case 'experience':
        this.setState({
          label: getCharacteristicTranslationName(this.props),
          color: '#bfbfbf',
          svg: experienceSvg
        })
        break
      case 'health':
        this.setState({
          label: getCharacteristicTranslationName(this.props),
          color: '#27cc4e',
          svg: healthSvg
        })
        break
      case 'remainingActions':
        this.setState({
          label: getCharacteristicTranslationName(this.props),
          color: '#ff8b2d',
          svg: actionSvg
        })
        break
      default:
        this.setState({
          label: getCharacteristicTranslationName(this.props),
          color: '#808080',
          svg: defenseSvg
        })
        break
    }
  }

  getAdditionalCharacteristic(name) {
    let addition = 0

    _.map(this.props.equippedItems, (item) => {
      _.map(item.item.characteristics, (characteristic) => {
        if (characteristic.characteristic.name === name) {
          addition = addition + characteristic.amount
        }
      })
    })

    return addition !== 0 ? ' + ' + addition : ''
  }

  getAmount(name, amount, displayJob) {
    if (name === 'defense' && displayJob) {
      return amount / 2
    }
    if (name === 'remainingActions' && displayJob) {
      return amount > 1 ? amount - 1 : 0
    }

    return amount
  }

  getAdditionalJobCharacteristic(name, amount, displayJob) {
    if (name === 'defense' && displayJob) {
      return (
        <>
          {' '}
          + {amount / 2}{' '}
          <img
            src={process.env.PUBLIC_URL + '/img/jobs/defender.svg'}
            alt="defenseur"
            width="30px"
          />
        </>
      )
    }
    if (name === 'remainingActions' && displayJob) {
      return (
        <>
          {' '}
          + {amount > 0 ? 1 : 0}{' '}
          <img
            src={process.env.PUBLIC_URL + '/img/jobs/engineer.svg'}
            alt="ingenieur"
            width="30px"
          />
        </>
      )
    }

    return ''
  }

  render() {
    const { amount, name, description, displayJob } = this.props
    const { label, color, svg } = this.state

    return (
      <Characteristic className="col-md-4 col-sm-5">
        <Image src={svg} alt="img" data-tip={description} />
        <TextBox>
          <div style={{ color }}>
            {this.getAmount(name, amount, displayJob)}
            {this.getAdditionalCharacteristic(name)}
            {this.getAdditionalJobCharacteristic(name, amount, displayJob)}
          </div>
          <span>{label}</span>
        </TextBox>
      </Characteristic>
    )
  }
}

CharacteristicItem.propTypes = {
  name: PropTypes.string,
  amount: PropTypes.number,
  description: PropTypes.string,
  displayJob: PropTypes.bool,
  equippedItems: PropTypes.arrayOf(
    PropTypes.shape({
      item: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        image: PropTypes.string,
        cost: PropTypes.number,
        level: PropTypes.number,
        type: PropTypes.string,
        rarity: PropTypes.string,
        isEquipped: PropTypes.bool,
        characteristics: PropTypes.arrayOf(PropTypes.shape({}))
      }),
      isEquipped: PropTypes.bool
    })
  )
}

export default CharacteristicItem
