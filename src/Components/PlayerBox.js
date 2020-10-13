import React, { Component } from "react";
import Avatar from "./Avatar";

export class PlayerBox extends Component {
  render() {
    // calc player progress bar percentage based on HP
    let percentage = (this.props.playerHP / this.props.playerMaxHP) * 100 + "%";

    return (
      <div id="hero-container">
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
                {this.props.playerHP}/{this.props.playerMaxHP}
              </div>
            </div>
          </div>
        </div>
        {/* END HERO POKEMON INFO BOX */}

        {/* HERO POKEMON AVATAR PICTURE */}
        <div className="mr-sm-4 avatar-box">
          <Avatar
            faint={this.props.playerFaint}
            isHit={this.props.playerIsHit}
            logoName={this.props.playerName.toLowerCase()}
            className="avatar mr-3 mt-5"
          />
          <div className="oval" />
        </div>
        {/* END HERO POKEMON AVATAR PICTURE */}
      </div>
    );
  }
}

export default PlayerBox;
