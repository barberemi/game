import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const Background = styled.div`
  // background-image: url('https://cdnb.artstation.com/p/assets/images/images/009/758/823/large/nikita-bulatov-0000.jpg?1520752299');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100vh;

  @media (min-width: 410px) {
    background-image: url(${process.env.PUBLIC_URL +
    '/img/backgrounds/home-height.jpg'});
  }
  @media (min-width: 768px) {
    background-image: url(${process.env.PUBLIC_URL +
    '/img/backgrounds/home-bg.jpg'});
  }
`

const LoginLayout = ({ children }) => <Background>{children}</Background>

LoginLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default LoginLayout
