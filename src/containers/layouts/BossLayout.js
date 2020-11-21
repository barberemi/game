import React from 'react'
import styled from '@emotion/styled'

const Background = styled.div`
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8) !important;
`

export default ({ children }) => {
  return <Background>{children}</Background>
}
