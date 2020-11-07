import React, { Component } from "react";
import PropTypes from 'prop-types';
import styled from "@emotion/styled";
import _ from "lodash";
import ItemBox from "./ItemBox";

const Equipment = styled.div`
  padding: 10px;
`

class EquippedItems extends Component {
  render() {
    return (
      <div className="col-sm-12">
        <Equipment id="helmet" className="col-sm-12 float-left d-flex flex-column align-items-center">
          <ItemBox item={_.find(this.props.items, { type: "helmet" })} />
        </Equipment>

        <Equipment id="amulet" className="col-sm-6 float-left d-flex flex-column align-items-center">
          <ItemBox item={_.find(this.props.items, { type: "amulet" })} />
        </Equipment>
        <Equipment id="shoulders" className="col-sm-6 float-left d-flex flex-column align-items-center">
          <ItemBox item={_.find(this.props.items, { type: "shoulders" })} />
        </Equipment>

        <Equipment id="gloves" className="col-sm-4 float-left d-flex flex-column align-items-center">
          <ItemBox item={_.find(this.props.items, { type: "gloves" })} />
        </Equipment>
        <Equipment id="armor" className="col-sm-4 float-left d-flex flex-column align-items-center">
          <ItemBox item={_.find(this.props.items, { type: "armor" })} />
        </Equipment>
        <Equipment id="belt" className="col-sm-4 float-left d-flex flex-column align-items-center">
          <ItemBox item={_.find(this.props.items, { type: "belt" })} />
        </Equipment>

        <Equipment id="pantalon" className="col-sm-6 float-left d-flex flex-column align-items-center">
          <ItemBox item={_.find(this.props.items, { type: "pantalon" })} />
        </Equipment>
        <Equipment id="shoes" className="col-sm-6 float-left d-flex flex-column align-items-center">
          <ItemBox item={_.find(this.props.items, { type: "shoes" })} />
        </Equipment>

        <Equipment id="weapon" className="col-sm-12 float-left d-flex flex-column align-items-center">
          <ItemBox item={_.find(this.props.items, { type: "weapon" })} />
        </Equipment>
      </div>
    );
  }
}

EquippedItems.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
    cost: PropTypes.number,
    level: PropTypes.number,
    type: PropTypes.string,
    rarity: PropTypes.string,
    equipped: PropTypes.bool,
  })),
  academyImage: PropTypes.string,
}

export default EquippedItems;
