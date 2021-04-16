import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const ProgressDiv = styled.div`
  border-radius: 10px;
`

const ProgressSubDiv = styled.div`
  border-radius: 10px;
`

export class ConstructionProgressBar extends Component {
  getColor = (percent) => {
    switch (true) {
      case percent <= 50:
        return '#dc3545'
      case percent <= 99:
        return '#ffc107'
      default:
        return '#28a745'
    }
  }

  getTransparentColor = (percent) => {
    switch (true) {
      case percent <= 50:
        return '#e09a9a'
      case percent <= 99:
        return '#eee48a'
      default:
        return '#cdfccd'
    }
  }

  render() {
    let percentage =
      ((this.props.max - this.props.remaining) / this.props.max) * 100

    return (
      <ProgressDiv className="d-flex justify-content-between align-items-center">
        <div
          className="progress both-progress"
          style={{ backgroundColor: this.getTransparentColor(percentage) }}
        >
          <ProgressSubDiv
            className="progress-bar"
            role="progressbar"
            style={{
              width: percentage + '%',
              backgroundColor: this.getColor(percentage)
            }}
            aria-valuemin="0"
            aria-valuemax="100"
          />
          <div className="hp-progress-bar">{percentage} %</div>
        </div>
      </ProgressDiv>
    )
  }
}

ConstructionProgressBar.propTypes = {
  remaining: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired
}

export default ConstructionProgressBar
