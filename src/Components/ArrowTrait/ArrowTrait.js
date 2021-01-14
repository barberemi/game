import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles.scss' // dont remove, used to svg animations etc
import Arrow, { DIRECTION } from 'react-arrows'

class ArrowTrait extends Component {
  render() {
    return (
      <Arrow
        className="arrow"
        from={{
          direction: DIRECTION.TOP,
          node: () => document.getElementById(this.props.from),
          translation: [0, 0]
        }}
        to={{
          direction: DIRECTION.BOTTOM,
          node: () => document.getElementById(this.props.to),
          translation: [0, 0]
        }}
      />
    )
  }
}

ArrowTrait.propTypes = {
  from: PropTypes.string,
  to: PropTypes.string
}

export default ArrowTrait
