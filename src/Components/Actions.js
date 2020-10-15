import React, { Component } from "react";
import PropTypes from 'prop-types';

class Actions extends Component {
  expectedEffect(amount, effect) {
    switch (effect) {
      case "melee":
        return <><i className="fas fa-fist-raised"/> <span className="small">{amount}</span></>;
      case "range":
        return <><i className="fas fa-bolt"/> <span className="small">{amount}</span></>;
      case "heal":
        return <><i className="fas fa-hand-holding-medical"/> <span className="small">{amount}</span></>;
      case "movement":
        return <i className="fas fa-shoe-prints"/>;
      default:
        return "";
    }
  }

  disabledAction(isFrontPlayer, effect) {
    return effect === "melee" && !isFrontPlayer ? "disabled" : null;
  }
  render() {
    const { name, amount, effect } = this.props.action;

    return (
      <div className={`attack-container btn ${this.disabledAction(this.props.frontPlayer, effect)}`}>
        <div>
          <span
            className="move-pointer"
            onClick={() => {
              if (this.disabledAction(this.props.frontPlayer, effect) === null) {
                this.props.onClick(this.props.action);
              }
            }}
            >
            {name} {this.expectedEffect(amount, effect)}
          </span>
        </div>
      </div>
    );
  }
}

Actions.propTypes = {
  action: PropTypes.shape({
    name: PropTypes.string,
    amount: PropTypes.number,
    effect: PropTypes.string,
  }),
  frontPlayer: PropTypes.bool,
  onClick: PropTypes.func,
}

export default Actions;
