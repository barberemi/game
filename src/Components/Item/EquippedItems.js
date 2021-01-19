import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import _ from 'lodash'
import ItemBox from './ItemBox'
import ReactTooltip from 'react-tooltip'

const Equipment = styled.div`
  padding: 10px;
`

class EquippedItems extends Component {
  render() {
    return (
      <div className="col-sm-12">
        <Equipment
          id="helmet"
          className="col-sm-12 float-left d-flex flex-column align-items-center"
        >
          <ItemBox
            item={_.find(this.props.items, { item: { type: 'helmet' } })}
            {...this.props}
          />
        </Equipment>

        <Equipment
          id="amulet"
          className="col-sm-6 float-left d-flex flex-column align-items-center"
        >
          <ItemBox
            item={_.find(this.props.items, { item: { type: 'amulet' } })}
            {...this.props}
          />
        </Equipment>
        <Equipment
          id="shoulders"
          className="col-sm-6 float-left d-flex flex-column align-items-center"
        >
          <ItemBox
            item={_.find(this.props.items, { item: { type: 'shoulders' } })}
            {...this.props}
          />
        </Equipment>

        <Equipment
          id="glovers"
          className="col-sm-4 float-left d-flex flex-column align-items-center"
        >
          <ItemBox
            item={_.find(this.props.items, { item: { type: 'glovers' } })}
            {...this.props}
          />
        </Equipment>
        <Equipment
          id="armor"
          className="col-sm-4 float-left d-flex flex-column align-items-center"
        >
          <ItemBox
            item={_.find(this.props.items, { item: { type: 'armor' } })}
            {...this.props}
          />
        </Equipment>
        <Equipment
          id="belt"
          className="col-sm-4 float-left d-flex flex-column align-items-center"
        >
          <ItemBox
            item={_.find(this.props.items, { item: { type: 'belt' } })}
            {...this.props}
          />
        </Equipment>

        <Equipment
          id="pants"
          className="col-sm-6 float-left d-flex flex-column align-items-center"
        >
          <ItemBox
            item={_.find(this.props.items, { item: { type: 'pants' } })}
            {...this.props}
          />
        </Equipment>
        <Equipment
          id="shoes"
          className="col-sm-6 float-left d-flex flex-column align-items-center"
        >
          <ItemBox
            item={_.find(this.props.items, { item: { type: 'shoes' } })}
            {...this.props}
          />
        </Equipment>

        <Equipment
          id="weapon"
          className="col-sm-12 float-left d-flex flex-column align-items-center"
        >
          <ItemBox
            item={_.find(this.props.items, { item: { type: 'weapon' } })}
            {...this.props}
          />
        </Equipment>
        <ReactTooltip />
      </div>
    )
  }
}

EquippedItems.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      item: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        image: PropTypes.string,
        cost: PropTypes.number,
        level: PropTypes.number,
        type: PropTypes.string,
        rarity: PropTypes.string,
        equipped: PropTypes.bool
      }),
      isEquipped: PropTypes.bool
    })
  ),
  displayActions: PropTypes.bool,
  onDeleteItem: PropTypes.func,
  onChangeEquippedItem: PropTypes.func
}

export default EquippedItems
