import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import _ from 'lodash'
import ItemBox from './ItemBox'
import ReactTooltip from 'react-tooltip'

const Container = styled.div`
  min-height: 100px;
  overflow-y: scroll;
  padding-left: 30px;

  ${(props) =>
    props.minusPadding &&
    css`
      padding-left: 0px;
    `};
`

const Item = styled.div`
  margin: 15px 20px;

  ${(props) =>
    props.minusPadding &&
    css`
      margin: 5px;
    `};
`

class ItemList extends Component {
  render() {
    const {
      items,
      onClick,
      minusPadding,
      addEmptyZones,
      trueItem,
      id
    } = this.props

    return (
      <>
        <Container
          className="position-relative"
          minusPadding={minusPadding}
          id={id}
        >
          {_.map(items, (item) => (
            <Item
              className="float-left d-flex position-relative"
              minusPadding={minusPadding}
              key={item.id}
            >
              <div onClick={() => (onClick ? onClick(item) : null)}>
                <ItemBox
                  item={trueItem ? { item: item } : item}
                  oldItem={
                    !item.isEquipped
                      ? _.find(items, { type: item.type, isEquipped: true })
                      : null
                  }
                  displayText={false}
                  {...this.props}
                />
              </div>
            </Item>
          ))}
          {addEmptyZones > 0 &&
            _.map(Array(addEmptyZones), () => (
              <Item
                className="float-left d-flex position-relative"
                minusPadding={minusPadding}
                data-tip="Disponible"
              >
                <ItemBox />
              </Item>
            ))}
          <ReactTooltip />
        </Container>
      </>
    )
  }
}

ItemList.defaultProps = {
  trueItem: false
}

ItemList.propTypes = {
  id: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      image: PropTypes.string,
      cost: PropTypes.number,
      level: PropTypes.number,
      type: PropTypes.string,
      rarity: PropTypes.string,
      isEquipped: PropTypes.bool
    })
  ),
  minusPadding: PropTypes.bool,
  displayActions: PropTypes.bool,
  displayPutOrTakeOnGuild: PropTypes.bool,
  onDeleteItem: PropTypes.func,
  onPutOrTakeOnGuild: PropTypes.func,
  onChangeEquippedItem: PropTypes.func,
  isGuildItem: PropTypes.bool,
  hasGuild: PropTypes.bool,
  addEmptyZones: PropTypes.number,
  onClick: PropTypes.func,
  userLevel: PropTypes.number,
  trueItem: PropTypes.bool
}

export default ItemList
