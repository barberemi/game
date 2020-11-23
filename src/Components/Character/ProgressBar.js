import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class ProgressBar extends Component {
  render() {
    // calc player progress bar percentage based on HP
    let percentage = (this.props.actual / this.props.max) * 100

    return (
      <div className="d-flex justify-content-between align-items-center">
        <div
          className="progress both-progress"
          style={{ backgroundColor: this.props.transparentColor }}
        >
          <div
            className="progress-bar"
            role="progressbar"
            style={{
              width: percentage + '%',
              backgroundColor: this.props.color
            }}
            aria-valuemin="0"
            aria-valuemax="100"
          />
          <div className="hp-progress-bar">
            {this.props.actual}/{this.props.max}
          </div>
        </div>
      </div>
    )
  }
}

ProgressBar.propTypes = {
  actual: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  transparentColor: PropTypes.string.isRequired
}

export default ProgressBar
