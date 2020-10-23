import React, { Component } from "react";
import PropTypes from "prop-types";

export class HpBar extends Component {
  colorBar(percentage) {
    console.log(percentage);
    switch (true) {
      case (percentage >= 50):
        return "bg-success";
      case (percentage >= 30 && percentage <= 49):
        return "bg-warning";
      default:
        return "bg-danger";
    }
  }
  render() {
    // calc player progress bar percentage based on HP
    let percentage = (this.props.hp / this.props.maxHp) * 100;


    return (
      <div className="d-flex justify-content-between align-items-center">
        <div className="progress both-progress">
          <div
            className={`progress-bar ${this.colorBar(percentage)}`}
            role="progressbar"
            style={{ width: percentage + "%"}}
            aria-valuemin="0"
            aria-valuemax="100"
          />
          <div className="hp-progress-bar">
            {this.props.hp}/{this.props.maxHp}
          </div>
        </div>
      </div>
    );
  }
}

HpBar.propTypes = {
  hp: PropTypes.number,
  maxHp: PropTypes.number,
}

export default HpBar;
