import React, { Component } from "react";
import PropTypes from 'prop-types';
import styled from "@emotion/styled";
import { getColorItem, isAnEquippedItem } from "../../utils/itemHelper";
import ReactDOMServer from 'react-dom/server';
import ItemTooltip from "./ItemTooltip";

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
  background-color: rgba(0,0,0,0.9) !important;
  position: absolute;
  border: 1px solid #2f3124;
  width: 150px;
  z-index: 1;
  top: 30px;
`

const ActionBtn = styled.div`
  border: 1px solid #2f3124;
  cursor: pointer;
`

class ItemBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayActions: false,
    }
  }

  toggleDisplayActions = () => {
    this.setState({displayActions: !this.state.displayActions});
  }

  render() {
    const { item, displayText, oldItem } = this.props;
    const { displayActions } = this.state;

    if (!item) {
      return (
        <Box style={{borderColor: "grey"}} />
      );
    }

    return (
      <>
        <Box
          style={{borderColor: getColorItem(item)}}
          data-tip={ReactDOMServer.renderToStaticMarkup(<ItemTooltip item={item} oldItem={oldItem} />)}
          data-html={true}
          onClick={() => this.setState({displayActions: !displayActions})}
        >
          {item.equipped && !displayText && (
            <Equipped className="text-success">
              <i className="far fa-check-square" />
            </Equipped>
          )}
          <Image src={item.image} alt={item.name} />
          <Level>
            {item.level}
          </Level>
        </Box>
        {displayText && <Text style={{color: getColorItem(item)}}>{item.name}</Text>}
        <ActionsBox className={displayActions ? "d-block" : "d-none"}>
          <div className="p-3">
            {isAnEquippedItem(item) && (
              <ActionBtn className="py-2 mb-4 text-warning" onClick={() => {this.toggleDisplayActions();this.props.onChangeEquippedItem(item);}}>
                {item.equipped === true ? "Déséquiper" : "S'équiper"}
              </ActionBtn>
            )}
            <ActionBtn className="py-2 mb-4 text-danger" onClick={() => {this.toggleDisplayActions();this.props.onDeleteItem(item);}}>
              Supprimer
            </ActionBtn>
            <ActionBtn className="py-2 text-white" onClick={() => this.toggleDisplayActions()}>
              Annuler
            </ActionBtn>
          </div>
        </ActionsBox>
      </>
    );
  }
}

ItemBox.defaultProps = {
  displayText: true,
}

ItemBox.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
    cost: PropTypes.number,
    level: PropTypes.number,
    type: PropTypes.string,
    rarity: PropTypes.string,
    equipped: PropTypes.bool,
  }),
  oldItem: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
    cost: PropTypes.number,
    level: PropTypes.number,
    type: PropTypes.string,
    rarity: PropTypes.string,
    equipped: PropTypes.bool,
  }),
  displayText: PropTypes.bool,
  onDeleteItem: PropTypes.func,
  onChangeEquippedItem: PropTypes.func,
}

export default ItemBox;
