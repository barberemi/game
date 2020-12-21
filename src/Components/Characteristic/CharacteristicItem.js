import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import _ from 'lodash'
import { getCharacteristicTranslationName } from '../../utils/characteristicHelper'

import focusSvg from './focus.svg'
import hasteSvg from './haste.svg'
import healthSvg from './health.svg'
import intelligenceSvg from './intelligence.svg'
import strengthSvg from './strength.svg'
import experienceSvg from './experience.svg'

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
      case 'focus':
        this.setState({
          label: getCharacteristicTranslationName(this.props),
          color: '#9256ff',
          svg: focusSvg
        })
        break
      case 'haste':
        this.setState({
          label: getCharacteristicTranslationName(this.props),
          color: '#ff8b2d',
          svg: hasteSvg
        })
        break
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
      default:
        this.setState({
          label: getCharacteristicTranslationName(this.props),
          color: '#27cc4e',
          svg: healthSvg
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

  render() {
    const { amount, name } = this.props
    const { label, color, svg } = this.state

    return (
      <Characteristic className="col-md-4 col-sm-5">
        <Image src={svg} alt="img" />
        <TextBox>
          <div style={{ color }}>
            {amount}
            {this.getAdditionalCharacteristic(name)}
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
        equipped: PropTypes.bool,
        characteristics: PropTypes.arrayOf(PropTypes.shape({}))
      }),
      isEquipped: PropTypes.bool
    })
  )
}

export default CharacteristicItem
