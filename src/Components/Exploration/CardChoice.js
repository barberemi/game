import React, { Component } from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const AdventureButton = styled(Link)`
  background-color: #ffc312;
  color: black;

  &:hover {
    color: #fff;
  }
`

class CardChoice extends Component {
  render() {
    return (
      <div className={`col-sm-3 mt-5 mb-5 ${this.props.className}`}>
        <div className="card">
          <img
            className="card-img-top"
            src={this.props.card.img_url}
            alt={this.props.card.name}
          />
          <AdventureButton to="/exploration" className={`card-footer btn`}>
            {this.props.card.text_btn}
          </AdventureButton>
        </div>
      </div>
    )
  }
}

CardChoice.propTypes = {
  card: PropTypes.shape({
    img_url: PropTypes.string,
    text_btn: PropTypes.string,
    name: PropTypes.string
  }),
  className: PropTypes.string
}

export default CardChoice
