import React, { Component } from "react";
import PropTypes from 'prop-types';
import styled from "@emotion/styled";
import _ from "lodash";
import ItemBox from "./ItemBox";

const Container = styled.div`
 max-height: 70vh;
 min-height: 70vh;
 overflow-y: scroll;
 padding-left: 30px;
`

const Item = styled.div`
  margin: 15px 20px;
`

class ItemList extends Component {
  render() {
    const { items } = this.props;

    return (
      <>
        <Container className="position-relative">
          {_.map(items, item => (
            <Item className="float-left d-flex position-relative" key={item.id}>
              <ItemBox item={item} oldItem={!item.equipped ? _.find(items, { type: item.type, equipped: true }) : null} displayText={false} {...this.props} />
            </Item>
          ))}
        </Container>
      </>
    );
  }
}

ItemList.propTypes = {
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
  displayActions: PropTypes.bool,
  onDeleteItem: PropTypes.func,
  onChangeEquippedItem: PropTypes.func,
}

export default ItemList;
