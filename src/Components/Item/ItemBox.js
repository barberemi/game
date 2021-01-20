import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { getColorItem, isAnEquippedItem } from '../../utils/itemHelper'
import ReactDOMServer from 'react-dom/server'
import ItemTooltip from './ItemTooltip'

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
  width: 55px;
  height: 55px;
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
  padding-top: 20px;
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
      isGuildItem,
      hasGuild,
      withOpacity
    } = this.props
    const { stateActions } = this.state

    if (!item) {
      return <Box style={{ borderColor: 'grey' }} />
    }

    const trueItem = item.item ? item.item : item.itemNeededToCraft

    return (
      <>
        <Box
          style={{
            borderColor: getColorItem(trueItem),
            opacity: withOpacity ? '0.5' : '1'
          }}
          data-tip={ReactDOMServer.renderToStaticMarkup(
            <ItemTooltip
              item={trueItem}
              oldItem={oldItem}
              isEquipped={item.isEquipped}
            />
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
              trueItem.image
                ? process.env.PUBLIC_URL + '/img/items/' + trueItem.image
                : process.env.PUBLIC_URL + '/img/items/armor/bandit.png'
            }
            alt={trueItem.name}
          />
          {trueItem.level && <Level>{trueItem.level}</Level>}
        </Box>
        {displayText && (
          <Text style={{ color: getColorItem(trueItem) }}>{trueItem.name}</Text>
        )}
        {displayActions && (
          <ActionsBox className={stateActions ? 'd-block' : 'd-none'}>
            <div className="p-3">
              {isGuildItem && (
                <ActionBtn
                  className="py-2 mb-4 text-success"
                  onClick={() => {
                    this.toggleDisplayActions()
                    this.props.onPutOrTakeOnGuild(item)
                  }}
                >
                  Prendre
                </ActionBtn>
              )}
              {!isGuildItem && (
                <>
                  {isAnEquippedItem(trueItem) && (
                    <ActionBtn
                      className="py-2 mb-4 text-success"
                      onClick={() => {
                        this.toggleDisplayActions()
                        this.props.onChangeEquippedItem(item)
                      }}
                    >
                      {item.isEquipped === true ? 'Déséquiper' : "S'équiper"}
                    </ActionBtn>
                  )}
                  {hasGuild && (
                    <ActionBtn
                      className="py-2 mb-4 text-warning"
                      onClick={() => {
                        this.toggleDisplayActions()
                        this.props.onPutOrTakeOnGuild(item)
                      }}
                    >
                      Envoyer à la guilde
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
                </>
              )}
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
  displayText: true,
  isGuildItem: false
}

ItemBox.propTypes = {
  item: PropTypes.shape({
    item: PropTypes.shape({}),
    itemNeededToCraft: PropTypes.shape({}),
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
  onPutOrTakeOnGuild: PropTypes.func,
  isGuildItem: PropTypes.bool,
  hasGuild: PropTypes.bool,
  onChangeEquippedItem: PropTypes.func
}

export default ItemBox
