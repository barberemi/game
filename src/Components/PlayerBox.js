import React, { Component } from "react";
import Avatar from "./Avatar";
import PropTypes from "prop-types";

export class PlayerBox extends Component {
  expectedAction(me, isSelectable) {
    if (isSelectable) {
      return <i className="far fa-hand-point-down"/>;
    } else if (me) {
      return <i className="fas fa-long-arrow-alt-down"/>;
    } else {
      return <br />;
    }
  }

  render() {
    // calc player progress bar percentage based on HP
    let percentage = (this.props.player.hp / this.props.player.maxHp) * 100 + "%";

    return (
      <div
        id="hero-container"
        className={this.props.player.isSelectable ? "hero-container-selected" : null}
        onClick={() => this.props.onClick(this.props.player)}
      >
        {/* HERO POKEMON INFO BOX */}
        <div id="hero-info-box">
          <div className="d-flex justify-content-between align-items-center">
            <div className="progress both-progress">
              <div
                className="progress-bar bg-danger"
                role="progressbar"
                style={{ width: percentage }}
                aria-valuemin="0"
                aria-valuenow="75"
                aria-valuemax="100"
              />
              <div className="hp-progress-bar">
                {this.props.player.hp}/{this.props.player.maxHp}
              </div>
            </div>
          </div>
        </div>
        {/* END HERO POKEMON INFO BOX */}
        <div className="action-intention">
          {this.expectedAction(this.props.player.me, this.props.player.isSelectable)}
        </div>
        {/* HERO POKEMON AVATAR PICTURE */}
        <div className="avatar-box">
          <Avatar
            faint={this.props.player.faint}
            isHit={this.props.player.isHit}
            logoName={this.props.player.name.toLowerCase()}
            className="avatar mt-5"
          />
          <div className={`oval ${this.props.player.isSelectable ? "hero-oval-selected" : ""}`} />
        </div>
        {/* END HERO POKEMON AVATAR PICTURE */}
      </div>
    );
  }
}

PlayerBox.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    me: PropTypes.bool,
    level: PropTypes.number,
    hp: PropTypes.number,
    maxHp: PropTypes.number,
    faint: PropTypes.bool,
    isHit: PropTypes.bool,
    isSelectable: PropTypes.bool,
    actions: PropTypes.array,
  }),
  onClick: PropTypes.func,
}

export default PlayerBox;
