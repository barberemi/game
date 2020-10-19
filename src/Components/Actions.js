import React, { Component } from "react";
import PropTypes from 'prop-types';

class Actions extends Component {
  expectedEffect(amount, effect) {
    switch (effect) {
      case "melee":
        return <> <i className="fas fa-fist-raised"/> <span className="small">{amount}</span></>;
      case "range":
        return <> <i className="fas fa-bolt"/> <span className="small">{amount}</span></>;
      case "heal":
        return <> <i className="fas fa-hand-holding-medical"/> <span className="small">{amount}</span></>;
      case "movement":
        return <> <i className="fas fa-shoe-prints"/></>;
      default:
        return "";
    }
  }

  isBlocked(nbBlockedRounds, isBlock) {
    if (nbBlockedRounds > 0) {
      return <>(<span className="small">{isBlock}</span> <i className="fas fa-lock"/>) </>;
    }

    return "";
  }

  disabledAction(isFrontPlayer, effect, isBlock) {
    return (effect === "melee" && !isFrontPlayer) || isBlock !== 0 ? "disabled" : "";
  }

  render() {
    const { name, amount, effect, isBlock } = this.props.action;

    return (
      <div className={`attack-container btn ${this.disabledAction(this.props.frontPlayer, effect, isBlock)}`}>
        <div>
          <span
            className="move-pointer"
            onClick={() => {
              if (this.disabledAction(this.props.frontPlayer, effect, isBlock) === "") {
                this.props.onClick(this.props.action);
              }
            }}
            >
            {this.isBlocked(isBlock, isBlock)}{name}{this.expectedEffect(amount, effect)}
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
    isBlock: PropTypes.number,
  }),
  frontPlayer: PropTypes.bool,
  onClick: PropTypes.func,
}

export default Actions;
