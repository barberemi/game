import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import _ from 'lodash'
import { monsters } from '../../utils/monsterHelper'

const cssClassic = (props) =>
  css`
    background: url(${process.env.PUBLIC_URL +
    '/img/boss/' +
    props.params.name +
    '/' +
    props.params.name +
    '-sprite.png'});

    margin: 0 auto;
    width: calc(${props.params.width} / ${props.params.nbByLine});
    height: ${props.params.height};
    animation: sprite-monster-${props.params.size} ${props.params.timing}s steps(
        ${props.params.nbByLine}
      ) infinite;

    @keyframes sprite-monster-tall {
      from {
        background-position: 0;
      }
      to {
        background-position: 9216px;
      }
    }

    @keyframes sprite-monster-small {
      from {
        background-position: 0;
      }
      to {
        background-position: 6144px;
      }
    }
  `

const cssMobile = (props) =>
  css`
    background: url(${process.env.PUBLIC_URL +
    '/img/boss/' +
    props.params.name +
    '/' +
    props.params.name +
    '-sprite-mobile.png'});

    margin: 0 auto;
    width: calc(${props.params.widthMobile} / ${props.params.nbByLine});
    height: ${props.params.heightMobile};
    animation: sprite-mobile-monster-${props.params.size} ${props.params
        .timing}s steps(${props.params.nbByLine}) infinite;

    @keyframes sprite-mobile-monster-tall {
      from {
        background-position: 0px;
      }
      to {
        background-position: 4608px;
      }
    }

    @keyframes sprite-mobile-monster-small {
      from {
        background-position: 0px;
      }
      to {
        background-position: 3072px;
      }
    }
  `

const Sprite = styled.div`
  -moz-transform: scaleX(-1);
  -o-transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);

  @media (min-width: 375px) {
    ${cssMobile};
  }

  @media (min-width: 768px) {
    ${cssClassic};
  }
`

class MonsterSprite extends Component {
  render() {
    return (
      <Sprite
        params={
          _.find(monsters, {
            name: this.props.image.split('/')[0]
          }) ??
          _.find(monsters, {
            name: 'Orc'
          })
        }
      />
    )
  }
}

MonsterSprite.propTypes = {
  image: PropTypes.string.isRequired
}

export default MonsterSprite
