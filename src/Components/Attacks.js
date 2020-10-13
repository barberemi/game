import React, { Component } from "react";
import PropTypes from 'prop-types';

class Attacks extends Component {
  render() {
    const { name, damage } = this.props.details;
    return (
      <div className="attack-container">
        <div>
          <span className="move-pointer" onClick={() => this.props.handleAttackClick(name, damage)}>
            {name}
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
