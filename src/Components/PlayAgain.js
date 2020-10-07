import React, { Component } from "react";
import PropTypes from 'prop-types';

class PlayAgain extends Component {
  render() {
    return (
      <div className="battle-text-content">
        <p id="play-again-text" onClick={() => this.props.handlePlayAgain()}>
          Clique ici pour recommencer une partie
        </p>
      </div>
    );
  }
}

PlayAgain.propTypes = {
  handlePlayAgain: PropTypes.func,
}

export default PlayAgain;
