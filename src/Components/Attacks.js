import React, { Component } from "react";
import PropTypes from 'prop-types';

class Attacks extends Component {
  manaCost(cost) {
    return cost === 0 ? null : `(${cost} mana)`;
  }
  render() {
    const { name, damage, cost } = this.props.details;
    return (
      <div className="attack-container">
        <div>
          <span className="move-pointer" onClick={() => this.props.handleAttackClick(name, damage)}>
            {name} <span className="small">{this.manaCost(cost)}</span>
          </span>
        </div>
      </div>
    );
  }
}

Attacks.propTypes = {
  detail: PropTypes.shape({
    name: PropTypes.string,
    damage: PropTypes.number
  }),
  handleAttackClick: PropTypes.func,
}

export default Attacks;
