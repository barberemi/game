import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

const background = (props) =>
  css`
    background: url(${process.env.PUBLIC_URL +
    '/img/academies/' +
    props.name +
    '/' +
    props.name +
    '-sprite.png'});
  `

const backgroundMobile = (props) =>
  css`
    background: url(${process.env.PUBLIC_URL +
    '/img/academies/' +
    props.name +
    '/' +
    props.name +
    '-sprite-mobile.png'});
  `

const Sprite = styled.div`
  @media (min-width: 375px) {
    margin: 0 auto;
    width: calc(2560px / 10);
    height: 200px;
    ${backgroundMobile};
    animation: sprite-mobile 1s steps(10) infinite;
  }

  @media (min-width: 768px) {
    margin: 0 auto;
    width: calc(5120px / 10);
    height: 380px;
    ${background};
    animation: sprite 1s steps(10) infinite;
  }
`

class AcademySprite extends Component {
  render() {
    return <Sprite name={this.props.name} />
  }
}

AcademySprite.propTypes = {
  name: PropTypes.string.isRequired
}

export default AcademySprite
