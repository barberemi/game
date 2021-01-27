import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles.scss' // dont remove, used to svg animations etc
import Xarrow from 'react-xarrows'

class ArrowTrait extends Component {
  render() {
    return (
      <Xarrow
        start={this.props.from}
        end={this.props.to}
        color={this.props.isNext ? '#000' : '#fff'}
        dashness={{
          strokeLen: 40,
          nonStrokeLen: 40,
          animation: this.props.isNext
        }}
        curveness={0}
      />
    )
  }
}

ArrowTrait.propTypes = {
  from: PropTypes.string,
  to: PropTypes.string,
  isNext: PropTypes.bool
}

export default ArrowTrait
