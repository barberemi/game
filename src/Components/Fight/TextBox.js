import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TextBox extends Component {
  render() {
    return (
      <div className="battle-text-content">
        <p>
          {this.props.messageOne} <br /> {this.props.messageTwo}
        </p>
      </div>
    )
  }
}

TextBox.propTypes = {
  messageOne: PropTypes.string,
  messageTwo: PropTypes.string
}

export default TextBox
