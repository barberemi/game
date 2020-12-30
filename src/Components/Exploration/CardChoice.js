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
    const { card, type, explorationId } = this.props

    return (
      <div
        className={`col-sm-3 mt-5 mb-5 ${card.id === 1 ? 'offset-sm-2' : ''}`}
      >
        <div className="card">
          <img className="card-img-top" src={card.img_url} alt={card.name} />
          <AdventureButton to="/exploration" className={`card-footer btn`}>
            {card.text_btn}
          </AdventureButton>
        </div>
      </div>
    )
  }
}

CardChoice.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number,
    img_url: PropTypes.string,
    text_btn: PropTypes.string,
    name: PropTypes.string,
    action: PropTypes.string
  }),
  type: PropTypes.string,
  explorationId: PropTypes.number
}

export default CardChoice
