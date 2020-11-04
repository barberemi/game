import React, { Component } from "react";
import PropTypes from 'prop-types';
import styled from "@emotion/styled";
import _ from "lodash";
import {
  getColorItem,
  getItemTranslationRarity,
  getItemTranslationType,
  getCharacteristicText
} from "../../utils/itemHelper";

const Tooltip = styled.div`
  text-align: left;
`

const Title = styled.div`
 font-size: 16px;
`

class ItemTooltip extends Component {
  render() {
    const { item } = this.props;

    return (
      <Tooltip>
        <Title style={{color: getColorItem(item)}}>{item.name}</Title>
        <div style={{color: getColorItem(item)}}><i>{getItemTranslationRarity(item)}</i></div>
        <br />
        <div>{getItemTranslationType(item)}</div>
        <div>
          {_.map(item.characteristics, characteristic => (
            <>
              {getCharacteristicText(characteristic)} <br />
            </>
          ))}
        </div>
        <br />
        <div>Niv {item.level}</div>
        <div>Prix de vente : {item.cost} <i className="far fa-money-bill-alt" /></div>
      </Tooltip>
    );
  }
}

ItemTooltip.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    cost: PropTypes.number,
    level: PropTypes.number,
    type: PropTypes.string,
    rarity: PropTypes.string,
  }),
}

export default ItemTooltip;
