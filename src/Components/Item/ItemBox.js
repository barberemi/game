import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { getColorItem, isAnEquippedItem } from '../../utils/itemHelper'
import ReactDOMServer from 'react-dom/server'
import ItemTooltip from './ItemTooltip'
import ReactTooltip from 'react-tooltip'

const Box = styled.div`
  border: 2px solid;
  background-color: #000;
  width: 60px;
  height: 60px;

  &:hover {
    cursor: pointer;
  }
`

const Image = styled.img`
  width: 50px;
  height: 50px;
`

const Level = styled.div`
  z-index: 1;
  background-color: #000;
  width: 25px;
  height: 20px;
  border: 1px solid #fff;
  padding-top: 2px;
`

const Equipped = styled.div`
  z-index: 1;
  background-color: #000;
  position: absolute;
  width: 14px;
  height: 14px;
  right: 3px;
`

const Text = styled.div`
  padding: 0 10px;
  display: table-cell;
  padding-top: 15px;
`

const ActionsBox = styled.div`
  background-color: rgba(0, 0, 0, 0.9) !important;
  position: absolute;
  border: 1px solid #2f3124;
  width: 150px;
  z-index: 2;
  top: 30px;
`

const ActionBtn = styled.div`
  border: 1px solid #2f3124;
  cursor: pointer;
`

class ItemBox extends Component {
  constructor(props) {
    super(props)

    this.state = {
      stateActions: false
    }
  }

  toggleDisplayActions = () => {
    this.setState({ stateActions: !this.state.stateActions })
  }

  render() {
    const {
      item,
      displayText,
      oldItem,
      displayActions,
      withOpacity
    } = this.props
    const { stateActions } = this.state

    if (!item) {
      return <Box style={{ borderColor: 'grey' }} />
    }

    return (
      <>
        <Box
          style={{
            borderColor: getColorItem(item.item),
            opacity: withOpacity ? '0.5' : '1'
          }}
          data-tip={ReactDOMServer.renderToStaticMarkup(
            <ItemTooltip item={item.item} oldItem={oldItem} />
          )}
          data-html={true}
          onClick={() => this.setState({ stateActions: !stateActions })}
        >
          {item.isEquipped && !displayText && (
            <Equipped className="text-success">
              <i className="far fa-check-square" />
            </Equipped>
          )}
          <Image
            src={
              item.item.image
                ? item.item.image
                : 'https://www.gameuionweb.com/zelda-botw/items/weapons/BotW_Ancient_Short_Sword_Icon.png'
            }
            alt={item.item.name}
          />
          {item.item.level && <Level>{item.item.level}</Level>}
        </Box>
        <ReactTooltip />
        {displayText && (
          <Text style={{ color: getColorItem(item.item) }}>
            {item.item.name}
          </Text>
        )}
        {displayActions && (
          <ActionsBox className={stateActions ? 'd-block' : 'd-none'}>
            <div className="p-3">
              {isAnEquippedItem(item.item) && (
                <ActionBtn
                  className="py-2 mb-4 text-warning"
                  onClick={() => {
                    this.toggleDisplayActions()
                    this.props.onChangeEquippedItem(item)
                  }}
                >
                  {item.isEquipped === true ? 'Déséquiper' : "S'équiper"}
                </ActionBtn>
              )}
              <ActionBtn
                className="py-2 mb-4 text-danger"
                onClick={() => {
                  this.toggleDisplayActions()
                  this.props.onDeleteItem(item)
                }}
              >
                Supprimer
              </ActionBtn>
              <ActionBtn
                className="py-2 text-white"
                onClick={() => this.toggleDisplayActions()}
              >
                Annuler
              </ActionBtn>
            </div>
          </ActionsBox>
        )}
      </>
    )
  }
}

ItemBox.defaultProps = {
  displayText: true
}

ItemBox.propTypes = {
  item: PropTypes.shape({
    item: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      image: PropTypes.string,
      cost: PropTypes.number,
      level: PropTypes.number,
      type: PropTypes.string,
      rarity: PropTypes.string
    }),
    isEquipped: PropTypes.bool
  }),
  oldItem: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
    cost: PropTypes.number,
    level: PropTypes.number,
    type: PropTypes.string,
    rarity: PropTypes.string
  }),
  withOpacity: PropTypes.bool,
  displayActions: PropTypes.bool,
  displayText: PropTypes.bool,
  onDeleteItem: PropTypes.func,
  onChangeEquippedItem: PropTypes.func
}

export default ItemBox
