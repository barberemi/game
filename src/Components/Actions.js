import React, { Component } from "react";
import PropTypes from 'prop-types';

class Actions extends Component {
  expectedEffect(amount, effect) {
    switch (effect) {
      case "attack":
        return <><i className="fas fa-fist-raised"/> <span className="small">{amount}</span></>;
      case "defense":
        return <><i className="fas fa-shield-alt"/> <span className="small">{amount}</span></>;
      default:
        return "";
    }
  }

  render() {
    const { name, amount, effect } = this.props.action;
    return (
      <div className="attack-container">
        <div>
          <span className="move-pointer" onClick={() => this.props.onClick(this.props.action)}>
            {name} {this.expectedEffect(amount, effect)}
          </span>
        </div>
      </div>
    );
  }
}

Actions.propTypes = {
  detail: PropTypes.shape({
    name: PropTypes.string,
    amount: PropTypes.number,
    effect: PropTypes.string,
  }),
  onClick: PropTypes.func,
}

export default Actions;
