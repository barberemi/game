import React, { Component, Fragment } from "react";
import PropTypes from 'prop-types';
import styled from "@emotion/styled";
import _ from "lodash";
import helmetSvg from "./svg/helmet.svg";
import amuletSvg from "./svg/amulet.svg";
import shouldersSvg from "./svg/shoulders.svg";
import gloversSvg from "./svg/glovers.svg";
import armorSvg from "./svg/armor.svg";
import beltSvg from "./svg/belt.svg";
import pantsSvg from "./svg/pants.svg";
import shoesSvg from "./svg/shoes.svg";
import weaponSvg from "./svg/weapon.svg";
import {getColorItem, getItemTranslationRarity, getItemTranslationType} from "../../utils/itemHelper";

const Tooltip = styled.div`
  text-align: left;
`

const Title = styled.div`
 font-size: 16px;
`

const Svg = styled.img`
  height: 20px;
  width: 20px;
`

const Text = styled.span`
  padding-left: 5px;
`

class ItemTooltip extends Component {
  constructor(props) {
    super(props);
    let svg = null;

    switch (props.item.type) {
      case "helmet":
        svg = helmetSvg;
        break;
      case "amulet":
        svg = amuletSvg;
        break;
      case "shoulders":
        svg = shouldersSvg;
        break;
      case "glovers":
        svg = gloversSvg;
        break;
      case "armor":
        svg = armorSvg;
        break;
      case "belt":
        svg = beltSvg;
        break;
      case "pants":
        svg = pantsSvg;
        break;
      case "shoes":
        svg = shoesSvg;
        break;
      case "weapon":
        svg = weaponSvg;
        break;
      default:
        break;
    }

    this.state = {
      svg: svg,
    }
  }

  render() {
    const { item, oldItem } = this.props;
    const { svg } = this.state;
    let tabCharactersitics = [];

    return (
      <Tooltip>
        <Title style={{color: getColorItem(item)}}>{item.name}</Title>
        <div style={{color: getColorItem(item)}}><i>{getItemTranslationRarity(item)}</i></div>
        <div>
          {svg && (
            <Svg src={svg} alt={item.type} />
          )}
          <Text>{getItemTranslationType(item)}</Text>
        </div>
        <br />
        <div>
          {item.characteristics &&_.map(item.characteristics, (characteristic, index) => (
            <div key={index} className={!oldItem && !item.equipped ? "text-success" : ""}>+{characteristic.amount} {characteristic.characteristic.name}</div>
          ))}
        </div>
        {oldItem && (
          <>
            <br />
            <div className="text-warning">Comparatif : </div>
            {oldItem.characteristics && _.map(oldItem.characteristics, oldCharac => {
              const newCharac = _.find(item.characteristics, { characteristic: { name: oldCharac.characteristic.name }});
              tabCharactersitics.push(oldCharac.characteristic.name);

              if(newCharac) {
                const operation = (newCharac.amount - oldCharac.amount) > 0 ? "+": "";
                return <div className={operation !== "" ? "text-success" : "text-danger"}>{operation}{newCharac.amount - oldCharac.amount} {oldCharac.characteristic.name}</div>;
              } else {
                return <div className="text-danger">-{oldCharac.amount} {oldCharac.characteristic.name}</div>;
              }
            })}
            {item.characteristics && _.map(item.characteristics, newCharac => {
              if (!_.includes(tabCharactersitics, newCharac.characteristic.name)) {
                return <div className="text-success">+{newCharac.amount} {newCharac.characteristic.name}</div>;
              }
            })}
          </>
        )}
        <br />
        <div>Niv {item.level}</div>
        <div>Prix de vente : {item.cost} <i className="far fa-money-bill-alt" /></div>
      </Tooltip>
    );
  }
}

ItemTooltip.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    cost: PropTypes.number,
    level: PropTypes.number,
    type: PropTypes.string,
    rarity: PropTypes.string,
  }),
  oldItem: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    cost: PropTypes.number,
    level: PropTypes.number,
    type: PropTypes.string,
    rarity: PropTypes.string,
  }),
}

export default ItemTooltip;
